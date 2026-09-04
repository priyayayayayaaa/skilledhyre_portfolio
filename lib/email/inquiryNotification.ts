import { ProjectInquiryRecord } from "../db";

export interface EmailNotificationResult {
  sent: boolean;
  error?: string;
}

/**
 * Triggers team email notification for a newly created Project Inquiry.
 * Uses environment variables (PROJECT_INQUIRY_NOTIFICATION_EMAIL, EMAIL_FROM, EMAIL_PROVIDER_API_KEY).
 * Non-blocking: Errors are logged server-side and never throw to caller.
 */
export async function sendInquiryNotificationEmail(
  inquiry: ProjectInquiryRecord
): Promise<EmailNotificationResult> {
  const recipientEmail = process.env.PROJECT_INQUIRY_NOTIFICATION_EMAIL || "teamskilledhyre@gmail.com";
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || "SkilledHyre Inquiries <notifications@skilledhyre.com>";

  if (!recipientEmail || !apiKey) {
    console.info(
      `[Email Notification Info] Email provider or recipient not configured in env. Inquiry ID ${inquiry.id} logged locally.`
    );
    return { sent: false, error: "Email service credentials not configured." };
  }

  try {
    // If using Resend or custom HTTP email API:
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        subject: `🚀 New Project Inquiry from ${inquiry.name} (${inquiry.company || "Individual"})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #00F2FE;">New Project Inquiry Submitted</h2>
            <p><strong>Inquiry ID:</strong> ${inquiry.id}</p>
            <p><strong>Name:</strong> ${inquiry.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
            <p><strong>Company:</strong> ${inquiry.company || "N/A"}</p>
            <p><strong>Capabilities Needed:</strong> ${inquiry.capabilities.join(", ")}</p>
            <p><strong>Estimated Budget:</strong> ${inquiry.budget || "Not specified"}</p>
            <p><strong>Scope / Challenge:</strong></p>
            <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #00F2FE;">
              ${inquiry.projectDescription || "No description provided."}
            </blockquote>
            <p style="font-size: 12px; color: #888;">Submitted at: ${inquiry.createdAt.toISOString()}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[Email Error] Failed to send email for inquiry ${inquiry.id}: ${errText}`);
      return { sent: false, error: errText };
    }

    console.info(`[Email Success] Notification sent successfully for inquiry ${inquiry.id}`);
    return { sent: true };
  } catch (error: any) {
    console.error(`[Email Exception] Exception sending email for inquiry ${inquiry.id}:`, error?.message || error);
    return { sent: false, error: error?.message || "Email request exception" };
  }
}
