const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID, // ClientID
    process.env.GMAIL_CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
});
let transporter;
oauth2Client.getAccessToken().then(accessToken => {
    transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.GMAIL_EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
            accessToken: accessToken.token,
        }
    })
});
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const whitelist = ['http://localhost:3000', 'http://localhost:80'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

// Then pass them to cors:
app.use(cors(corsOptions));
app.post('/send', async (req, res) => {
    let info = await transporter.sendMail({
        from: `"Village Valet" <${process.env.GMAIL_EMAIL}>`, // sender address
        ...req.body
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.json({
                msg: 'fail'
            })
        } else {
            res.json({
                msg: 'success'
            })
        }
    });
    
});

app.listen(4000, () => {
    console.log('Email server is up')
});