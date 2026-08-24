export const sendOtpTemplate = (fullName, otp) => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - TodoApp</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #10182d;
    font-family: Arial, Helvetica, sans-serif;
">

    <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="
            background: linear-gradient(135deg, #572da7, #10182d, #06a5c2);
            padding: 45px 15px;
        ">

        <tr>
            <td align="center">

                <!-- Main Card -->
                <table width="600" cellpadding="0" cellspacing="0" border="0"
                    style="
                        max-width: 600px;
                        width: 100%;
                        background-color: #ffffff;
                        border-radius: 16px;
                        overflow: hidden;
                    ">

                    <!-- Header -->
                    <tr>
                        <td align="center"
                            style="
                                padding: 32px 20px;
                                background: linear-gradient(135deg, #572da7, #10182d, #06a5c2);
                            ">

                            <h1 style="
                                margin: 0;
                                font-size: 30px;
                                color: #ffffff;
                                font-weight: 700;
                            ">
                                Todo<span style="color: #06b6d4;">App</span>
                            </h1>

                            <p style="
                                margin: 10px 0 0;
                                color: #ffffff;
                                font-size: 14px;
                            ">
                                Manage your daily tasks and stay productive.
                            </p>

                        </td>
                    </tr>


                    <!-- Content -->
                    <tr>
                        <td style="padding: 45px 35px;">

                            <!-- Icon -->
                            <div style="
                                width: 65px;
                                height: 65px;
                                line-height: 65px;
                                margin: 0 auto 20px;
                                background-color: #7c3aed;
                                border-radius: 50%;
                                text-align: center;
                                font-size: 30px;
                            ">
                                🔐
                            </div>


                            <h2 style="
                                margin: 0;
                                text-align: center;
                                color: #079fbd;
                                font-size: 26px;
                            ">
                                Verify Your Email
                            </h2>


                            <p style="
                                margin: 18px 0 0;
                                text-align: center;
                                color: #555555;
                                font-size: 16px;
                                line-height: 1.7;
                            ">
                                Hi ${fullName}, use the verification code below
                                to verify your TodoApp account.
                            </p>


                            <!-- OTP Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="
                                    margin-top: 30px;
                                    background-color: #f4fbfc;
                                    border-radius: 12px;
                                ">

                                <tr>
                                    <td align="center" style="padding: 25px;">

                                        <p style="
                                            margin: 0 0 12px;
                                            color: #572da7;
                                            font-size: 13px;
                                            font-weight: bold;
                                            text-transform: uppercase;
                                            letter-spacing: 1px;
                                        ">
                                            Your Verification Code
                                        </p>

                                        <div style="
                                            display: inline-block;
                                            padding: 15px 28px;
                                            background-color: #ffffff;
                                            border: 2px solid #06b6d4;
                                            border-radius: 10px;
                                            color: #572da7;
                                            font-size: 32px;
                                            font-weight: bold;
                                            letter-spacing: 8px;
                                        ">
                                            ${otp}
                                        </div>

                                    </td>
                                </tr>

                            </table>


                            <!-- Expiration Warning -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="margin-top: 25px;">

                                <tr>
                                    <td align="center">

                                        <p style="
                                            margin: 0;
                                            color: #555555;
                                            font-size: 14px;
                                            line-height: 1.6;
                                        ">
                                            ⏱️ This verification code will expire in
                                            <strong style="color: #572da7;">
                                                10 minutes
                                            </strong>.
                                        </p>

                                    </td>
                                </tr>

                            </table>


                            <!-- Security Message -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="
                                    margin-top: 25px;
                                    background-color: #fff5fa;
                                    border-radius: 10px;
                                ">

                                <tr>
                                    <td style="padding: 18px;">

                                        <p style="
                                            margin: 0;
                                            color: #555555;
                                            font-size: 13px;
                                            line-height: 1.6;
                                        ">
                                            🔒 <strong>Security reminder:</strong>
                                            Never share this verification code with
                                            anyone. TodoApp will never ask you for your
                                            OTP.
                                        </p>

                                    </td>
                                </tr>

                            </table>


                            <p style="
                                margin: 30px 0 0;
                                text-align: center;
                                color: #777777;
                                font-size: 13px;
                                line-height: 1.6;
                            ">
                                If you didn't request this code, you can safely
                                ignore this email.
                            </p>

                        </td>
                    </tr>


                    <!-- Footer -->
                    <tr>
                        <td align="center"
                            style="
                                padding: 25px 20px;
                                background-color: #10182d;
                            ">

                            <p style="
                                margin: 0 0 8px;
                                color: #ffffff;
                                font-size: 15px;
                                font-weight: bold;
                            ">
                                TodoApp
                            </p>

                            <p style="
                                margin: 0;
                                color: #aaaaaa;
                                font-size: 12px;
                            ">
                                Manage your daily tasks and stay productive.
                            </p>

                            <p style="
                                margin: 12px 0 0;
                                color: #777777;
                                font-size: 11px;
                            ">
                                © 2026 TodoApp. All rights reserved.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>

    </table>

</body>

</html>
`;
};
export const welcomeUserTemplate = (fullName) =>{
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Welcome to TodoApp</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #10182d;
    font-family: Arial, Helvetica, sans-serif;
">

    <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="
            background: linear-gradient(135deg, #572da7, #10182d, #06a5c2);
            padding: 40px 15px;
        ">

        <tr>
            <td align="center">

                <!-- Main Card -->
                <table width="600" cellpadding="0" cellspacing="0" border="0"
                    style="
                        max-width: 600px;
                        width: 100%;
                        background-color: #ffffff;
                        border-radius: 16px;
                        overflow: hidden;
                    ">

                    <!-- Header -->
                    <tr>
                        <td align="center"
                            style="
                                padding: 30px 20px;
                                background: linear-gradient(135deg, #572da7, #10182d, #06a5c2);
                            ">

                            <h1 style="
                                margin: 0;
                                color: #ffffff;
                                font-size: 30px;
                                font-weight: 700;
                            ">
                                Todo<span style="color: #06b6d4;">App</span>
                            </h1>

                            <p style="
                                margin: 10px 0 0;
                                color: #ffffff;
                                font-size: 14px;
                            ">
                                Stay organized. Stay productive.
                            </p>

                        </td>
                    </tr>


                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 35px;">

                            <h2 style="
                                margin: 0 0 15px;
                                color: #079fbd;
                                font-size: 25px;
                            ">
                                Welcome Back, ${fullName}! 👋
                            </h2>

                            <p style="
                                margin: 0 0 20px;
                                color: #333333;
                                font-size: 16px;
                                line-height: 1.7;
                            ">
                                Your TodoApp account has been created successfully.
                                You're now ready to organize your tasks, track your
                                progress, and stay productive.
                            </p>


                            <!-- Feature Card -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                style="
                                    background-color: #f8f9fc;
                                    border-radius: 12px;
                                    margin: 25px 0;
                                ">

                                <tr>
                                    <td style="padding: 22px;">

                                        <h3 style="
                                            margin: 0 0 15px;
                                            color: #572da7;
                                            font-size: 18px;
                                        ">
                                            What you can do 🚀
                                        </h3>

                                        <p style="
                                            margin: 8px 0;
                                            color: #555555;
                                            font-size: 14px;
                                        ">
                                            ✓ Create and manage your todos
                                        </p>

                                        <p style="
                                            margin: 8px 0;
                                            color: #555555;
                                            font-size: 14px;
                                        ">
                                            ✓ Set priorities and deadlines
                                        </p>

                                        <p style="
                                            margin: 8px 0;
                                            color: #555555;
                                            font-size: 14px;
                                        ">
                                            ✓ Track completed and pending tasks
                                        </p>

                                        <p style="
                                            margin: 8px 0;
                                            color: #555555;
                                            font-size: 14px;
                                        ">
                                            ✓ Keep everything organized
                                        </p>

                                    </td>
                                </tr>

                            </table>


                            <!-- Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center">

                                        <a href="http://localhost:5500/dashboard.html"
                                            style="
                                                display: inline-block;
                                                padding: 14px 35px;
                                                background-color: #06b6d4;
                                                color: #ffffff;
                                                text-decoration: none;
                                                border-radius: 10px;
                                                font-size: 16px;
                                                font-weight: bold;
                                            ">
                                            Go To Dashboard
                                        </a>

                                    </td>
                                </tr>
                            </table>


                            <p style="
                                margin: 30px 0 0;
                                color: #666666;
                                font-size: 14px;
                                line-height: 1.6;
                                text-align: center;
                            ">
                                Start planning your day and get things done. 💪
                            </p>

                        </td>
                    </tr>


                    <!-- Footer -->
                    <tr>
                        <td align="center"
                            style="
                                padding: 22px;
                                background-color: #10182d;
                            ">

                            <p style="
                                margin: 0 0 8px;
                                color: #ffffff;
                                font-size: 14px;
                                font-weight: bold;
                            ">
                                TodoApp
                            </p>

                            <p style="
                                margin: 0;
                                color: #aaaaaa;
                                font-size: 12px;
                            ">
                                Manage your daily tasks and stay productive.
                            </p>

                            <p style="
                                margin: 12px 0 0;
                                color: #777777;
                                font-size: 11px;
                            ">
                                © 2026 TodoApp. All rights reserved.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>

    </table>

</body>
</html>
`;
}