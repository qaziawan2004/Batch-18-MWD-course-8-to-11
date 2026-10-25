import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
});

const sendOtpEmail = async(email,otp) =>{
    return transporter.sendMail({
        from:`"HCM " <${process.env.EMAIL_USER}>`,
        to:email,
        subject: "Your Otp Verification Code!",
        text:`Your verification code is ${otp}. It expires in 5 minutes.`,
        html:
        `
         <div style="font-family:Arial,sans-serif;max-width:500px;margin:auto;padding:25px;background:#180711;color:#fff;border-radius:15px;">
        <h2 style="color:#15dce7;">Verify Your Email</h2>
        <p>Your one-time verification code is:</p>
        <div style="font-size:32px;font-weight:bold;letter-spacing:8px;padding:20px;background:#27111d;text-align:center;border-radius:10px;">
          ${otp}
        </div>
        <p>This code expires in 5 minutes.</p>
        <p style="color:#bcb5c0;">If you did not request this code, you can ignore this email.</p>
      </div>
        `,
    });
}
export default sendOtpEmail