const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.REACT_APP_GMAIL_CLIENT_ID, // ClientID
    process.env.REACT_APP_GMAIL_CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
    refresh_token: process.env.REACT_APP_GMAIL_REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken();

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (message) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.REACT_APP_GMAIL_EMAIL,
            clientId: process.env.REACT_APP_GMAIL_CLIENT_ID,
            clientSecret: process.env.REACT_APP_GMAIL_CLIENT_SECRET,
            refreshToken: process.env.REACT_APP_GMAIL_REFRESH_TOKEN,
            accessToken:accessToken,
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Village Valet" <${process.env.REACT_APP_GMAIL_EMAIL}>`, // sender address
        ...message
    });

    console.log("Message sent: %s", info.messageId);
};

export default sendEmail;


