import nodemailer from 'nodemailer';

const mailUser = String(process.env.MAIL_USER || '').trim();
const mailPass = String(process.env.MAIL_PASS || '').replace(/\s+/g, '');

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailUser,
        pass: mailPass
    }
});

export async function verifyMailer() {
    if (!mailUser || !mailPass) {
        console.error('Email configuration is missing: MAIL_USER or MAIL_PASS.');
        return false;
    }

    try {
        await transporter.verify();
        console.log('Gmail SMTP connection verified');
        return true;
    } catch (error) {
        console.error('Gmail SMTP verification failed:', error.message);
        return false;
    }
}

export async function sendOtpEmail(email, name, otp, purpose) {
    const subject = purpose === 'signup'
        ? 'Verify your MarketHub account'
        : 'Reset your MarketHub password';

    const title = purpose === 'signup'
        ? 'Verify your email address'
        : 'Reset your password';

    const message = purpose === 'signup'
        ? 'Use the OTP below to verify your MarketHub account.'
        : 'Use the OTP below to continue resetting your MarketHub password.';

    await transporter.sendMail({
        from: `MarketHub <${mailUser}>`,
        to: email,
        subject,
        html: `
            <div style="font-family:Arial,sans-serif;background:#f5f7fb;padding:32px;">
                <div style="max-width:520px;margin:auto;background:#ffffff;border-radius:18px;padding:32px;box-shadow:0 12px 35px rgba(15,23,42,.08);">
                    <h1 style="margin:0 0 10px;color:#5b4bdb;">MarketHub</h1>
                    <h2 style="margin:0 0 12px;color:#111827;">${title}</h2>
                    <p style="color:#64748b;line-height:1.6;">Hi ${name || 'there'}, ${message}</p>
                    <div style="font-size:34px;letter-spacing:9px;font-weight:800;text-align:center;padding:20px;background:#f0efff;border-radius:14px;color:#4c3fc6;">${otp}</div>
                    <p style="color:#64748b;line-height:1.6;">This OTP expires in 10 minutes. If you did not request this, you can safely ignore this email.</p>
                </div>
            </div>
        `
    });
}
