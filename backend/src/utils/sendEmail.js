import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_EMAIL || 'mock_user',
      pass: process.env.SMTP_PASSWORD || 'mock_pass',
    },
  });

  const message = {
    from: `${process.env.FROM_NAME || 'MediSync Support'} <${process.env.FROM_EMAIL || 'support@medisync.app'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
