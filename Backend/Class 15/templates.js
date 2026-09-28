const welcomeUserTemplate = () =>{
    return`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Welcome</title>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: "Inter", sans-serif;
            min-height: 100vh;
            overflow: hidden;
            background:
                radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.45), transparent 30%),
                radial-gradient(circle at 90% 20%, rgba(236, 72, 153, 0.4), transparent 30%),
                radial-gradient(circle at 50% 100%, rgba(6, 182, 212, 0.4), transparent 35%),
                linear-gradient(135deg, #0f172a, #1e1b4b, #111827);

            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        /* Decorative circles */

        .circle {
            position: absolute;
            border-radius: 50%;
            filter: blur(2px);
            opacity: 0.7;
        }

        .circle-one {
            width: 220px;
            height: 220px;
            background: linear-gradient(135deg, #8b5cf6, #ec4899);
            top: -70px;
            left: -60px;
        }

        .circle-two {
            width: 180px;
            height: 180px;
            background: linear-gradient(135deg, #06b6d4, #3b82f6);
            right: -50px;
            bottom: -40px;
        }

        .circle-three {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #f59e0b, #ef4444);
            top: 15%;
            right: 15%;
            opacity: 0.45;
        }

        /* Main card */

        .welcome-container {
            width: min(92%, 680px);
            position: relative;
            z-index: 2;
        }

        .welcome-card {
            position: relative;
            padding: 55px 50px;
            text-align: center;

            background: rgba(255, 255, 255, 0.10);
            border: 1px solid rgba(255, 255, 255, 0.20);
            border-radius: 30px;

            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);

            box-shadow:
                0 30px 80px rgba(0, 0, 0, 0.35),
                inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        /* Logo */

        .logo {
            width: 82px;
            height: 82px;
            margin: 0 auto 28px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 24px;

            background: linear-gradient(
                135deg,
                #8b5cf6,
                #ec4899,
                #f97316
            );

            color: white;
            font-size: 38px;

            box-shadow:
                0 15px 35px rgba(139, 92, 246, 0.4);
        }

        /* Text */

        .welcome-small {
            color: #c4b5fd;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 12px;
        }

        h1 {
            color: #ffffff;
            font-size: clamp(36px, 6vw, 56px);
            font-weight: 800;
            letter-spacing: -2px;
            line-height: 1.1;
            margin-bottom: 18px;
        }

        .username {
            background: linear-gradient(
                90deg,
                #a78bfa,
                #f472b6,
                #fb923c
            );

            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .description {
            max-width: 500px;
            margin: 0 auto 35px;

            color: #cbd5e1;
            font-size: 16px;
            line-height: 1.8;
        }

        /* Buttons */

        .buttons {
            display: flex;
            justify-content: center;
            gap: 14px;
            flex-wrap: wrap;
        }

        .btn {
            min-width: 160px;
            padding: 14px 24px;

            border-radius: 12px;

            text-decoration: none;
            font-size: 15px;
            font-weight: 600;

            transition:
                transform 0.25s ease,
                box-shadow 0.25s ease,
                background 0.25s ease;
        }

        .btn-primary {
            color: white;

            background: linear-gradient(
                135deg,
                #7c3aed,
                #ec4899
            );

            box-shadow:
                0 10px 25px rgba(139, 92, 246, 0.35);
        }

        .btn-primary:hover {
            transform: translateY(-3px);

            box-shadow:
                0 15px 35px rgba(236, 72, 153, 0.4);
        }

        .btn-secondary {
            color: #e2e8f0;

            background: rgba(255, 255, 255, 0.08);

            border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .btn-secondary:hover {
            transform: translateY(-3px);
            background: rgba(255, 255, 255, 0.14);
        }

        /* Bottom message */

        .footer-text {
            margin-top: 30px;
            color: #94a3b8;
            font-size: 13px;
        }

        .footer-text span {
            color: #f472b6;
        }

        /* Responsive */

        @media (max-width: 600px) {

            .welcome-card {
                padding: 40px 25px;
                border-radius: 24px;
            }

            h1 {
                font-size: 38px;
                letter-spacing: -1px;
            }

            .description {
                font-size: 15px;
            }

            .logo {
                width: 70px;
                height: 70px;
                font-size: 32px;
            }

            .btn {
                width: 100%;
            }
        }
    </style>
</head>

<body>

    {/* <!-- Decorative Background --> */}

    <div class="circle circle-one"></div>
    <div class="circle circle-two"></div>
    <div class="circle circle-three"></div>


    {/* <!-- Welcome Section --> */}

    <main class="welcome-container">

        <section class="welcome-card">

            <div class="logo">
                ✨
            </div>

            <div class="welcome-small">
                Account Created Successfully
            </div>

            <h1>
                Welcome,
                <span class="username">Mudassir!</span>
            </h1>

            <p class="description">
                We're excited to have you with us.
                Your account is ready, and you can now explore
                everything our platform has to offer.
            </p>

            <div class="buttons">

                <a href="/dashboard" class="btn btn-primary">
                    Go to Dashboard →
                </a>

                <a href="/" class="btn btn-secondary">
                    Explore Platform
                </a>

            </div>

            <p class="footer-text">
                We're happy you're here <span>♥</span>
            </p>

        </section>

    </main>

</body>
</html>
`
}