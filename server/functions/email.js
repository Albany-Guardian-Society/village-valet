const nodemailer = require("nodemailer")


require("dotenv").config();

const SMTP_SERVER = process.env.SMTP_SERVER;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USERNAME = process.env.SMTP_USERNAME;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const EMAIL = process.env.EMAIL;


let transporter;
transporter = nodemailer.createTransport({
    host: SMTP_SERVER,
    port: SMTP_PORT,
    secure: true,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD
    }
});


exports.sendEmail = async (message) => {
    return await transporter.sendMail({
        from: `"Village Valet" <${EMAIL}>`, // sender address
        ...message
    }, (err, data) => {
        if (err) {
            console.log(err);
            return false
        } else {
            return true
        }
    });
};
