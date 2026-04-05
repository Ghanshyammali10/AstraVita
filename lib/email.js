const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

async function sendEmail(to, subject, contentBody) {
  try {
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
              .header { text-align: center; margin-bottom: 30px; padding: 20px; border-bottom: 2px solid #A81B1B; }
              .content { background-color: #ffffff; padding: 30px; border-radius: 8px; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
              .button { 
                  display: inline-block; 
                  padding: 12px 25px; 
                  background-color: #A81B1B; 
                  color: white !important; 
                  text-decoration: none; 
                  border-radius: 25px; 
                  margin: 20px 0;
                  font-weight: bold;
              }
              .info-box {
                  background-color: #f8f9fa;
                  border-left: 4px solid #A81B1B;
                  padding: 15px;
                  margin: 20px 0;
              }
              h2, h3 { color: #A81B1B; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h2 style="color: #A81B1B; margin: 0;">AstraVita Notification</h2>
              </div>
              <div class="content">
                  ${contentBody}
              </div>
              <div class="footer">
                  <p>This is an automated message from AstraVita. Please do not reply to this email.</p>
                  <p> &copy; ${new Date().getFullYear()} AstraVita. All rights reserved.</p>
                  <p style="font-size: 11px; color: #888;">
                      If you received this email by mistake, please disregard it.<br>
                      Your privacy and data security are important to us.
                  </p>
              </div>
          </div>
      </body>
      </html>`;

    await transporter.sendMail({
      from: `"AstraVita" <${process.env.EMAIL_USER}>`,
      to, 
      subject,
      html: htmlBody,
      text: contentBody.replace(/<[^>]*>?/gm, '') // Plain text fallback
    });
    return true;
  } catch (err) {
    console.error('Email failed:', err.message);
    return false;
  }
}

module.exports = { sendEmail };
