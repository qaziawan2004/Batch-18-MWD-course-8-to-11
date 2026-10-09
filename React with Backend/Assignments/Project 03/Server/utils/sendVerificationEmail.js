import nodemailer from "nodemailer";

const sendVerificationEmail = async (
  email,
  name,
  verificationCode
) => {

  const transporter =
    nodemailer.createTransport({
      host: process.env.SMTP_HOST,

      port: Number(
        process.env.SMTP_PORT
      ),

      secure:
        Number(
          process.env.SMTP_PORT
        ) === 465,

      auth: {
        user:
          process.env.SMTP_USER,

        pass:
          process.env.SMTP_PASSWORD
      }
    });


  const mailOptions = {
    from: process.env.EMAIL_FROM,

    to: email,

    subject:
      "Todo App - Email Verification Code",

    html: `
      <div
        style="
          font-family: Arial;
          max-width: 600px;
          margin: auto;
          padding: 30px;
        "
      >

        <h2>
          Welcome to Todo App, ${name}!
        </h2>

        <p>
          Thank you for creating an account.
        </p>

        <p>
          Your email verification code is:
        </p>

        <div
          style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            background: #f3f4f6;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
          "
        >
          ${verificationCode}
        </div>

        <p>
          This code will expire in 10 minutes.
        </p>

        <p>
          If you did not create this account,
          you can safely ignore this email.
        </p>

      </div>
    `
  };


  await transporter.sendMail(
    mailOptions
  );
};

export default sendVerificationEmail;
