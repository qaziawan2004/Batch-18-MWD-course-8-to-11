export const sendEmail = async (request, response) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE, //gmail
            auth: {
                user: process.env.SMTP_USER_EMAIL,
                pass: process.env.SMTP_APP_PASS //app password
            }
        });


        const mailOptions = {
            from: process.env.SMTP_USER_EMAIL,
            to: process.env.SMTP_USER_EMAIL,
            subject: 'Welcome User',
            html: welcomeUserTemplate()
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {

                return response.json({
                    messagae: `Error sending email: ${error.message}`,
                    status: false
                })
            }

            response.json({
                messagae: `Email sent:  ${info.response}`,
                status: true
            })

        });



    } catch (error) {
        response.json({
            status: false,
            message: error.message
        })
    }
}