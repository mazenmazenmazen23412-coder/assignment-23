
import nodemailer from "nodemailer";

export const SendEamil = async({to,subject,html}:{to:string,subject:string,html:string})=>{
 const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  service:"gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

try {
  const info = await transporter.sendMail({
    from: '"Example Team" <team@example.com>', // sender address
    to,// list of recipients
    subject,
        html
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  
} catch (err) {
  console.error("Error while sending mail:", err);
}
}