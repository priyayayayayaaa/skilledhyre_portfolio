import { ProjectInquiryRecord } from "../db";

export interface EmailNotificationResult {
  sent: boolean;
  error?: string;
  provider?: string;
}

/**
 * Triggers team email notification for a newly created Project Inquiry.
 * Primary: Resend API (if EMAIL_PROVIDER_API_KEY or RESEND_API_KEY is provided).
 * Secondary: Webhook (if NOTIFICATION_WEBHOOK_URL is provided).
 * Fallback: FormSubmit zero-config endpoint to teamskilledhyre@gmail.com.
 * Non-blocking: Errors are logged server-side and never throw to caller.
 */
export async function sendInquiryNotificationEmail(
  inquiry: ProjectInquiryRecord
): Promise<EmailNotificationResult> {
  const recipientEmail = process.env.PROJECT_INQUIRY_NOTIFICATION_EMAIL || "teamskilledhyre@gmail.com";
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY || process.env.RESEND_API_KEY;
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL || process.env.WEBHOOK_URL;
  const fromEmail = process.env.EMAIL_FROM || "SkilledHyre Inquiries <onboarding@resend.dev>";

  // 1. Resend API Dispatch (If API key provided)
  if (apiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail],
          subject: `🚀 New Project Inquiry: ${inquiry.name} (${inquiry.company || "Individual"})`,
          html: buildEmailHtml(inquiry),
        }),
      });

      if (response.ok) {
        console.info(`[Email Success] Resend notification delivered for inquiry ${inquiry.id}`);
        return { sent: true, provider: "Resend" };
      }
      const errText = await response.text();
      console.warn(`[Email Warning] Resend API error (${response.status}): ${errText}`);
    } catch (err: any) {
      console.warn(`[Email Warning] Resend exception: ${err?.message || err}`);
    }
  }

  // 2. Custom Webhook Dispatch (If webhook URL provided)
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🚀 *New Project Inquiry Received!*\n*Name:* ${inquiry.name}\n*Email:* ${inquiry.email}\n*Company:* ${inquiry.company || "N/A"}\n*Capabilities:* ${inquiry.capabilities.join(", ")}\n*Budget:* ${inquiry.budget || "Not specified"}\n*Scope:* ${inquiry.projectDescription || "None"}`,
          inquiry,
        }),
      });
      if (response.ok) {
        console.info(`[Webhook Success] Webhook notification delivered for inquiry ${inquiry.id}`);
        return { sent: true, provider: "Webhook" };
      }
    } catch (err: any) {
      console.warn(`[Webhook Warning] Webhook exception: ${err?.message || err}`);
    }
  }

  // 3. Zero-Config FormSubmit Fallback to teamskilledhyre@gmail.com
  try {
    const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`;
    const response = await fetch(formSubmitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `🚀 New Project Inquiry from ${inquiry.name} - ${inquiry.company || "SkilledHyre Portfolio"}`,
        _template: "table",
        "Inquiry ID": inquiry.id,
        Name: inquiry.name,
        "Work Email": inquiry.email,
        Company: inquiry.company || "N/A",
        Capabilities: inquiry.capabilities.join(", "),
        "Estimated Budget": inquiry.budget || "Not specified",
        "Project Scope": inquiry.projectDescription || "No description provided.",
        "Submitted At": inquiry.createdAt.toISOString(),
      }),
    });

    if (response.ok) {
      console.info(`[Email Fallback Success] FormSubmit delivered to ${recipientEmail} for inquiry ${inquiry.id}`);
      return { sent: true, provider: "FormSubmit" };
    }
    const errText = await response.text();
    console.error(`[Email Fallback Error] FormSubmit returned status ${response.status}: ${errText}`);
    return { sent: false, error: errText };
  } catch (error: any) {
    console.error(`[Email Fallback Exception] Failed to send email via fallback:`, error?.message || error);
    return { sent: false, error: error?.message || "Fallback exception" };
  }
}

function buildEmailHtml(inquiry: ProjectInquiryRecord): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="border-bottom: 2px solid #00F2FE; padding-bottom: 12px; margin-bottom: 16px;">
        <h2 style="color: #0F172A; margin: 0; font-size: 20px;">🚀 New Project Inquiry Submitted</h2>
        <span style="font-size: 12px; color: #64748B; font-family: monospace;">SkilledHyre Labs Protocol</span>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
        <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Inquiry ID:</td><td>${inquiry.id}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${inquiry.name}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Work Email:</td><td><a href="mailto:${inquiry.email}" style="color: #0284C7; text-decoration: none;">${inquiry.email}</a></td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td>${inquiry.company || "N/A"}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Capabilities:</td><td>${inquiry.capabilities.join(", ")}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Estimated Budget:</td><td><span style="background: #F1F5F9; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${inquiry.budget || "Not specified"}</span></td></tr>
      </table>
      <div style="margin-top: 16px; padding: 12px; background: #F8FAFC; border-left: 4px solid #00F2FE; border-radius: 4px;">
        <strong style="font-size: 12px; color: #475569; text-transform: uppercase;">Project Scope / Challenge:</strong>
        <p style="margin: 6px 0 0 0; font-size: 14px; color: #1E293B; white-space: pre-wrap;">${inquiry.projectDescription || "No description provided."}</p>
      </div>
      <p style="font-size: 11px; color: #94A3B8; margin-top: 20px;">Submitted at: ${inquiry.createdAt.toISOString()}</p>
    </div>
  `;
}
