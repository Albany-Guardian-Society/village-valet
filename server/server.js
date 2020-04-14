import * as routes from "./routes/index"
import {Router} from "express";
const app = require('express')();
const helmet = require("helmet");
const cors = require('cors');
const bodyParser = require("body-parser");

const admin = require("firebase-admin");
const serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://village-valet.firebaseio.com"
});

const firestore = admin.firestore();
firestore.collection()
export default firestore

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use("/", routes);

const routerFirestore = app.router();
app.use('/firestore',routerFirestore);
routerFirestore.get('/users')
