const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  });
}

/**
 * Send admin notification email when a school submits an enquiry
 */
async function sendAdminEnquiryNotification(enquiry) {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'hello@stemora.in';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F7FAFB; margin: 0; padding: 24px; color: #0D2136; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 3px solid #0D2136; border-radius: 16px; padding: 32px; box-shadow: 6px 6px 0 #0D2136; }
        .header { border-bottom: 2px solid #DCE8EB; padding-bottom: 16px; margin-bottom: 24px; }
        .logo { font-size: 24px; font-weight: 800; color: #1FAFA9; letter-spacing: -0.5px; }
        .logo b { color: #F2AA1F; }
        .badge { display: inline-block; background: #F2AA1F; color: #0D2136; font-weight: 800; font-size: 13px; padding: 4px 12px; border-radius: 99px; border: 2px solid #0D2136; margin-top: 8px; }
        .field { margin-bottom: 16px; }
        .label { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #4d6275; margin-bottom: 4px; }
        .value { font-size: 16px; font-weight: 600; color: #0D2136; background: #F7FAFB; padding: 10px 14px; border-radius: 8px; border: 1.5px solid #DCE8EB; }
        .message-box { background: #fff8e6; border: 2px solid #F2AA1F; border-radius: 8px; padding: 14px; font-size: 15px; color: #0D2136; }
        .footer { font-size: 12px; color: #8899a6; text-align: center; margin-top: 24px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="logo">Stem<b>ora</b></div>
          <span class="badge">New School Demo &amp; Programme Enquiry</span>
        </div>
        <p style="font-size: 15px;">You have received a new school enquiry through the Stemora website:</p>
        
        <div class="field">
          <div class="label">School Name</div>
          <div class="value">${escapeHtml(enquiry.school_name)}</div>
        </div>
        <div class="field">
          <div class="label">Contact Person</div>
          <div class="value">${escapeHtml(enquiry.contact_person)}</div>
        </div>
        <div class="field">
          <div class="label">Phone Number</div>
          <div class="value"><a href="tel:${escapeHtml(enquiry.phone)}" style="color: #0F7F7B; text-decoration: none; font-weight: bold;">${escapeHtml(enquiry.phone)}</a></div>
        </div>
        <div class="field">
          <div class="label">Email Address</div>
          <div class="value"><a href="mailto:${escapeHtml(enquiry.email)}" style="color: #0F7F7B; text-decoration: none;">${escapeHtml(enquiry.email)}</a></div>
        </div>
        <div class="field">
          <div class="label">Programme Interest</div>
          <div class="value">${escapeHtml(enquiry.programme || 'General Enquiry')}</div>
        </div>
        <div class="field">
          <div class="label">Message / Details</div>
          <div class="message-box">${escapeHtml(enquiry.message || 'No additional message provided.').replace(/\n/g, '<br>')}</div>
        </div>
        
        <div class="footer">
          Received via Stemora Website API • ${new Date().toLocaleString()}
        </div>
      </div>
    </body>
    </html>
  `;

  if (!transporter) {
    console.log('[MAILER] Notice: SMTP not configured. Notification email simulated:');
    console.log(`[MAILER] To: ${adminEmail} | Subject: [Stemora] New Enquiry from ${enquiry.school_name}`);
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Stemora Website" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      replyTo: enquiry.email,
      subject: `⚡ [Stemora Enquiry] New Demo Request from ${enquiry.school_name}`,
      html
    });
    console.log('[MAILER] Admin notification sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[MAILER] Failed to send admin notification:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Send user confirmation email to the school / inquirer
 */
async function sendUserEnquiryConfirmation(enquiry) {
  const transporter = createTransporter();
  if (!transporter) return { success: true, simulated: true };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F7FAFB; margin: 0; padding: 24px; color: #0D2136; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 3px solid #0D2136; border-radius: 16px; padding: 32px; box-shadow: 6px 6px 0 #0D2136; }
        .header { border-bottom: 2px solid #DCE8EB; padding-bottom: 16px; margin-bottom: 20px; }
        .logo { font-size: 26px; font-weight: 800; color: #1FAFA9; letter-spacing: -0.5px; }
        .logo b { color: #F2AA1F; }
        .tagline { color: #4d6275; font-size: 14px; font-weight: 600; margin-top: 4px; }
        h2 { font-size: 22px; color: #0D2136; margin-top: 0; }
        p { font-size: 15px; line-height: 1.6; color: #4d6275; }
        .summary { background: #F7FAFB; border: 2px solid #DCE8EB; border-radius: 10px; padding: 18px; margin: 20px 0; }
        .summary-item { font-size: 14px; margin-bottom: 8px; }
        .summary-item strong { color: #0D2136; }
        .btn { display: inline-block; background: #F2AA1F; color: #0D2136; font-weight: 800; font-size: 15px; padding: 12px 24px; border-radius: 99px; border: 2.5px solid #0D2136; text-decoration: none; box-shadow: 4px 4px 0 #0D2136; margin-top: 10px; }
        .footer { font-size: 12px; color: #8899a6; text-align: center; margin-top: 32px; border-top: 1px solid #DCE8EB; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="logo">Stem<b>ora</b></div>
          <div class="tagline">Lighting Young Minds · Hands-on Robotics &amp; STEM</div>
        </div>
        <h2>Thank you for reaching out, ${escapeHtml(enquiry.contact_person)}!</h2>
        <p>We have received your enquiry for <strong>${escapeHtml(enquiry.school_name)}</strong> regarding our <strong>${escapeHtml(enquiry.programme || 'STEM & Robotics programmes')}</strong>.</p>
        <p>Our academic specialist will review your request and get in touch with you within 24 hours to arrange your school demo session or discuss curriculum options.</p>
        
        <div class="summary">
          <div class="summary-item"><strong>School:</strong> ${escapeHtml(enquiry.school_name)}</div>
          <div class="summary-item"><strong>Contact Person:</strong> ${escapeHtml(enquiry.contact_person)}</div>
          <div class="summary-item"><strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</div>
          <div class="summary-item"><strong>Programme:</strong> ${escapeHtml(enquiry.programme || 'Robotics & Circuits')}</div>
        </div>

        <p>Need urgent assistance? Feel free to reply directly to this email or reach us on WhatsApp/Phone at <strong>+91 98765 43210</strong>.</p>

        <div class="footer">
          © ${new Date().getFullYear()} Stemora Education Pvt Ltd · Bangalore, Karnataka, India<br>
          <a href="https://stemora.in" style="color: #0F7F7B;">www.stemora.in</a>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Stemora" <${process.env.SMTP_USER}>`,
      to: enquiry.email,
      subject: `We've received your Stemora enquiry for ${enquiry.school_name}! 🚀`,
      html
    });
    console.log('[MAILER] User confirmation email sent to:', enquiry.email);
    return { success: true };
  } catch (error) {
    console.error('[MAILER] Failed to send user confirmation email:', error.message);
    return { success: false, error: error.message };
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  sendAdminEnquiryNotification,
  sendUserEnquiryConfirmation
};
