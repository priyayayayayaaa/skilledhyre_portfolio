import { NextRequest, NextResponse } from "next/server";
import { validateProjectInquiryInput } from "@/lib/validations/projectInquiry";
import { checkRateLimit, validatePayloadSize } from "@/lib/security/rateLimiter";
import { saveProjectInquiry, updateInquiryNotificationStatus, NotificationStatus } from "@/lib/db";
import { sendInquiryNotificationEmail } from "@/lib/email/inquiryNotification";

export async function POST(req: NextRequest) {
  try {
    // 1. Validate Payload Size (<100KB)
    const contentLength = req.headers.get("content-length");
    if (!validatePayloadSize(contentLength)) {
      return NextResponse.json(
        {
          success: false,
          message: "Request payload too large.",
        },
        { status: 413 }
      );
    }

    // 2. Client Rate Limiting (5 requests / 15 mins per IP)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-client";

    const rateLimit = checkRateLimit(clientIp, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many inquiries submitted from your IP. Please try again in a few minutes.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // 3. Parse JSON Body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide valid project details.",
          errors: { _json: "Malformed JSON payload." },
        },
        { status: 400 }
      );
    }

    // 4. Server-Side Validation
    const validation = validateProjectInquiryInput(body);
    if (!validation.isValid || !validation.sanitizedData) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide valid project details.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // 5. Persist Inquiry to Database (Primary Source of Truth: status = NEW, notificationStatus = PENDING)
    const inquiryRecord = await saveProjectInquiry(validation.sanitizedData);

    // 6. Attempt Resend Email Notification Layer
    try {
      const emailResult = await sendInquiryNotificationEmail(inquiryRecord);
      if (emailResult.sent) {
        await updateInquiryNotificationStatus(inquiryRecord.id, NotificationStatus.SENT);
      } else {
        await updateInquiryNotificationStatus(inquiryRecord.id, NotificationStatus.FAILED);
        console.warn(`[Notification Warning] Email delivery failed for inquiry ${inquiryRecord.id}: ${emailResult.error}`);
      }
    } catch (emailErr: any) {
      await updateInquiryNotificationStatus(inquiryRecord.id, NotificationStatus.FAILED);
      console.error(`[Notification Exception] Failed notification attempt for inquiry ${inquiryRecord.id}:`, emailErr?.message || emailErr);
    }

    // 7. Return HTTP 201 Success (Database storage succeeded)
    return NextResponse.json(
      {
        success: true,
        message: "Project inquiry submitted successfully.",
        data: {
          id: inquiryRecord.id,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[API Error] Failed to process project inquiry:", error?.message || error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your project inquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}
