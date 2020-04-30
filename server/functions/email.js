const nodemailer = require("nodemailer")

/**
 *  @module SendEmail
 */
require("dotenv").config();

/**
 * Email Server Address
 */
const SMTP_SERVER = process.env.SMTP_SERVER;

/**
 Email Server Port
 */
const SMTP_PORT = process.env.SMTP_PORT;
/**
 *   Email Username
 */
const SMTP_USERNAME = process.env.SMTP_USERNAME;
/**
 *  Email Password
 */
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
/**
 *  Village Valet Email
 */
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

/**
 * Sends an email
 * @param {Object} message - Message Object
 * @returns {Promise<*>}
 */
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
