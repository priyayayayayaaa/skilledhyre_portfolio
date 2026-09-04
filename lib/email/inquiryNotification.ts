import { ProjectInquiryRecord } from "../db";

export interface EmailNotificationResult {
  sent: boolean;
  error?: string;
  provider: "Resend";
}

/**
 * Triggers team email notification for a newly created Project Inquiry using Resend API.
 * Environment Variables:
 * - RESEND_API_KEY (or EMAIL_PROVIDER_API_KEY)
 * - PROJECT_INQUIRY_NOTIFICATION_EMAIL (default: teamskilledhyre@gmail.com)
 * - EMAIL_FROM (default: SkilledHyre Inquiries <onboarding@resend.dev>)
 *
 * Non-blocking: Errors are returned cleanly to the caller without throwing.
 */
export async function sendInquiryNotificationEmail(
  inquiry: ProjectInquiryRecord
): Promise<EmailNotificationResult> {
  const recipientEmail = process.env.PROJECT_INQUIRY_NOTIFICATION_EMAIL || "teamskilledhyre@gmail.com";
  const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_PROVIDER_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || "SkilledHyre Inquiries <onboarding@resend.dev>";

  if (!apiKey) {
    const errorMsg = "RESEND_API_KEY is not configured in environment variables.";
    console.warn(`[Resend Warning] Cannot send email for inquiry ${inquiry.id}: ${errorMsg}`);
    return { sent: false, error: errorMsg, provider: "Resend" };
  }

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
        subject: `New Project Inquiry — ${inquiry.name} (${inquiry.company || "Individual"})`,
        html: buildEmailHtml(inquiry),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.info(`[Resend Success] Notification delivered for inquiry ${inquiry.id} (Resend ID: ${data?.id || "ok"})`);
      return { sent: true, provider: "Resend" };
    }

    const errorBody = await response.text();
    console.error(`[Resend API Error] Resend returned status ${response.status} for inquiry ${inquiry.id}: ${errorBody}`);
    return {
      sent: false,
      error: `Resend API HTTP ${response.status}: ${errorBody}`,
      provider: "Resend",
    };
  } catch (error: any) {
    const message = error?.message || "Network exception contacting Resend API";
    console.error(`[Resend Exception] Failed to send email for inquiry ${inquiry.id}: ${message}`);
    return {
      sent: false,
      error: message,
      provider: "Resend",
    };
  }
}

function buildEmailHtml(inquiry: ProjectInquiryRecord): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="border-bottom: 3px solid #00F2FE; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #0F172A; margin: 0; font-size: 22px; font-weight: 800;">🚀 New Project Inquiry</h2>
        <span style="font-size: 12px; color: #64748B; font-family: monospace; text-transform: uppercase; tracking: 1px;">SkilledHyre Labs Protocol</span>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155; margin-bottom: 20px;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748B; width: 140px;">Inquiry ID</td>
          <td style="padding: 10px 0; font-family: monospace; font-weight: bold; color: #0F172A;">${inquiry.id}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748B;">Client Name</td>
          <td style="padding: 10px 0; font-weight: bold; color: #0F172A;">${inquiry.name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748B;">Work Email</td>
          <td style="padding: 10px 0;"><a href="mailto:${inquiry.email}" style="color: #0284C7; font-weight: bold; text-decoration: none;">${inquiry.email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748B;">Company</td>
          <td style="padding: 10px 0; color: #0F172A;">${inquiry.company || "N/A"}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748B;">Capabilities</td>
          <td style="padding: 10px 0; color: #0F172A;">${inquiry.capabilities.map((c) => `<span style="background: #E0F2FE; color: #0369A1; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-right: 4px; display: inline-block;">${c}</span>`).join(" ")}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: 600; color: #64748B;">Estimated Budget</td>
          <td style="padding: 10px 0;"><span style="background: #F1F5F9; color: #0F172A; padding: 4px 10px; border-radius: 6px; font-family: monospace; font-weight: bold; border: 1px solid #E2E8F0;">${inquiry.budget || "Not specified"}</span></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 600; color: #64748B;">Inquiry Status</td>
          <td style="padding: 10px 0;"><span style="background: #DCFCE7; color: #15803D; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">NEW</span></td>
        </tr>
      </table>

      <div style="padding: 16px; background: #F8FAFC; border-left: 4px solid #00F2FE; border-radius: 6px; margin-bottom: 20px;">
        <div style="font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Project Scope & Description</div>
        <p style="margin: 0; font-size: 14px; color: #1E293B; line-height: 1.6; white-space: pre-wrap;">${inquiry.projectDescription || "No project description provided."}</p>
      </div>

      <div style="border-t border-gray-100 pt-4 text-align: center;">
        <p style="font-size: 11px; color: #94A3B8; margin: 0;">Submitted on ${inquiry.createdAt.toUTCString()}</p>
      </div>
    </div>
  `;
}
