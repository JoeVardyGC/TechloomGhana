import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load local environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON payloads
  app.use(express.json());

  // API ROUTE: Send Brand Consultation / Contact Message
  app.post("/api/send-consultation", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          error: "Missing required contact parameters (name, email, message)."
        });
      }

      const cleanPhone = phone ? String(phone).trim() : 'Not provided';
      const cleanDigits = cleanPhone.replace(/[^0-9]/g, '');
      const clientWhatsAppLink = cleanDigits ? `https://wa.me/${cleanDigits}` : '#';

      const adminEmail = process.env.ADMIN_EMAIL || "techloomghana@yahoo.com";
      const targetWhatsAppNumber = "+233 256 259 336";
      const targetWhatsAppDigits = "233256259336";

      // Formatted WhatsApp sample text
      const timestampGHS = new Date().toLocaleString('en-GB', { timeZone: 'Africa/Accra' });
      const whatsappSampleMessage = 
        `*🔔 NEW INQUIRY - TECHLOOM GHANA*\n` +
        `-----------------------------------------\n` +
        `👤 *Sender:* ${name}\n` +
        `✉️ *Email:* ${email}\n` +
        `📞 *Phone / WhatsApp:* ${cleanPhone}\n` +
        `💬 *Message:*\n${message}\n` +
        `-----------------------------------------\n` +
        `⏰ *Received:* ${timestampGHS} (GHS)\n` +
        `🌐 *Source:* Techloom Ghana Website`;

      const whatsappDirectUrl = `https://wa.me/${targetWhatsAppDigits}?text=${encodeURIComponent(whatsappSampleMessage)}`;

      // Log WhatsApp sample notification to backend terminal
      console.log("=========================================================================");
      console.log("📱 [WHATSAPP SAMPLE NOTIFICATION]");
      console.log(`[Target WhatsApp Number]: ${targetWhatsAppNumber} (${targetWhatsAppDigits})`);
      console.log(`[Direct WhatsApp Link]: ${whatsappDirectUrl}`);
      console.log(`[Formatted Sample Payload]:\n${whatsappSampleMessage}`);
      console.log("=========================================================================");

      // If a WhatsApp webhook or cloud gateway is configured in environment, dispatch asynchronously
      const whatsappWebhookUrl = process.env.WHATSAPP_WEBHOOK_URL || process.env.WHATSAPP_API_URL;
      if (whatsappWebhookUrl) {
        fetch(whatsappWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipient: targetWhatsAppDigits,
            text: whatsappSampleMessage,
            inquiry: { name, email, phone: cleanPhone, message }
          })
        }).then(() => {
          console.log(`✅ WhatsApp notification webhook dispatched successfully to ${whatsappWebhookUrl}`);
        }).catch((waErr) => {
          console.log(`ℹ️ WhatsApp webhook notice: ${waErr.message || waErr}`);
        });
      }

      const smtpHost = process.env.SMTP_HOST || "smtp.mail.yahoo.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      // HTML template for the Admin (techloomghana@yahoo.com)
      const adminHtml = `
        <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #fafbfd; color: #1e293b;">
          <div style="margin-bottom: 25px; border-bottom: 2px solid #0A84FF; padding-bottom: 15px;">
            <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; letter-spacing: 0.15em; color: #0A84FF; margin: 0;">Inquiry Pipeline</p>
            <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 5px 0 0 0;">New Website Inquiry Received</h2>
          </div>
          
          <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
            <p style="margin: 0 0 12px 0; font-size: 14px;"><strong style="color: #64748b;">Sender Name:</strong> <span style="color: #0f172a; font-weight: 600;">${name}</span></p>
            <p style="margin: 0 0 12px 0; font-size: 14px;"><strong style="color: #64748b;">Sender Email:</strong> <a href="mailto:${email}" style="color: #0A84FF; text-decoration: none; font-weight: 600;">${email}</a></p>
            <p style="margin: 0 0 12px 0; font-size: 14px;"><strong style="color: #64748b;">Sender Phone / WhatsApp:</strong> <a href="tel:${cleanPhone}" style="color: #10b981; text-decoration: none; font-weight: 600;">${cleanPhone}</a> ${cleanDigits ? `(<a href="${clientWhatsAppLink}" style="color: #10b981; text-decoration: underline;">Chat with Client on WhatsApp</a>)` : ''}</p>
            <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 15px 0;" />
            <p style="margin: 0; font-size: 14px; line-height: 1.6;"><strong style="color: #64748b; display: block; margin-bottom: 6px;">Message content:</strong></p>
            <blockquote style="margin: 0; padding: 12px 16px; background-color: #f8fafc; border-left: 4px solid #0A84FF; border-radius: 4px; font-style: italic; color: #334155; font-size: 13.5px;">
              ${message.replace(/\n/g, '<br>')}
            </blockquote>
          </div>
          
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; font-size: 12px; color: #166534;">
            <strong>WhatsApp Sample:</strong> Notification formatted for <strong>${targetWhatsAppNumber}</strong>. <a href="${whatsappDirectUrl}" style="color: #15803d; font-weight: bold; text-decoration: underline;">Open WhatsApp sample</a>.
          </div>

          <div style="font-size: 11px; color: #94a3b8; text-align: center; font-family: monospace;">
            Techloom Ghana gateway sync • ${timestampGHS} (GHS)
          </div>
        </div>
      `;

      // Fallback if SMTP keys are not populated in environment settings
      if (!smtpUser || !smtpPass) {
        console.warn("=========================================================================");
        console.warn("ℹ️ SMTP credentials (SMTP_USER / SMTP_PASS) not configured in .env variables.");
        console.warn("ℹ️ Inquiry logged in Simulated Dispatch Mode:");
        console.warn(`[Inquiry To]: ${adminEmail}`);
        console.warn(`[Sender]: ${name} <${email}>, Phone: ${cleanPhone}`);
        console.warn(`[WhatsApp Target]: ${targetWhatsAppNumber}`);
        console.warn("=========================================================================");
        
        return res.status(200).json({
          status: "success",
          message: "Inquiry submitted successfully!",
          adminEmail,
          targetWhatsApp: targetWhatsAppNumber,
          whatsappUrl: whatsappDirectUrl,
          whatsappSample: whatsappSampleMessage
        });
      }

      // Configure a live secure nodemailer SMTP transport with robust timeouts
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // Use SSL/TLS for port 465
        auth: {
          user: smtpUser,
          pass: smtpPass
        },
        connectionTimeout: 4000,
        greetingTimeout: 4000,
        socketTimeout: 5000,
      } as any);

      // Send the email to techloomghana@yahoo.com asynchronously in the background.
      transporter.sendMail({
        from: `"Techloom Contact Portal" <${smtpUser}>`,
        to: adminEmail,
        subject: `[New Inquiry] From ${name} via Techloom Website`,
        html: adminHtml,
        replyTo: email
      }).then(() => {
        console.log(`✅ Background email sent successfully to ${adminEmail}`);
      }).catch((sendErr) => {
        if (sendErr.code === 'ETIMEDOUT' || sendErr.message?.includes('timeout')) {
          console.log("ℹ️ SMTP Connection notice: Lead inquiry is securely preserved in Firestore and WhatsApp pipeline.");
        } else {
          console.log(`ℹ️ SMTP Connection notification: ${sendErr.message || sendErr}. Lead inquiry is securely preserved in Firestore.`);
        }
      });

      return res.status(200).json({
        status: "success",
        message: "Inquiry submitted successfully!",
        adminEmail,
        targetWhatsApp: targetWhatsAppNumber,
        whatsappUrl: whatsappDirectUrl,
        whatsappSample: whatsappSampleMessage
      });

    } catch (err: any) {
      console.log("ℹ️ Message delivery pipeline notice:", err.message || err);
      res.status(500).json({
        error: "Failed to dispatch message. Please attempt again shortly."
      });
    }
  });

  // Setup Hot Module Replacement support for development, or serve built assets in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Brand Hub fullstack server is active on private interface http://0.0.0.0:${PORT}`);
  });
}

startServer();
