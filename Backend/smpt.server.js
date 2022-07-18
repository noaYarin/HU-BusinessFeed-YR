const nodeMailer = require('nodemailer');
const SMTPServer = require("smtp-server").SMTPServer;
const server = new SMTPServer({
    //options
});

const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: emailUser.email,
    subject: emailUser.subject,
    text: emailUser.message,
    html: emailUser.html
};
emailUser = {
    email: "businessfeed555@gmail.com",
    subject: "Hello from Business Feed",
    message: "",
    html: "<h1>Hi Yarin!</h1>"
}

// verify connection configuration

server.listen(587, SMTP_HOST, () => {
    transporter.verify(function (error, success) {
        if (error) return console.log(error);
        console.log('Server is ready to take our messages');
    });
});

await transporter.sendMail(mailOptions);
