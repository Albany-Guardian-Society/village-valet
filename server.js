const {readdirSync} = require('fs')

const getDirectories = source =>
    readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert('./keys/serviceAccountKey.json'),
    databaseURL: "https://village-valet.firebaseio.com"
});

const firestore = admin.firestore();
module.exports = {firestore};

const {checkJWT, checkParameterJWT} = require("./server/middleware/JWToken");
const {deleteUser, getAllUsers, getOneUser, patchUser_active, patchUser_vetting, postUser, putUser} = require("./server/controllers/usersController");
const {deleteRide, getAllRides, getOneRide, postRide, putRide, patchRideStatus} = require("./server/controllers/ridesController");
const {deleteVillage, getAllVillages, getOneVillage, postVillage, putVillage} = require("./server/controllers/villagesController");
const {
    deleteOperator,
    getAllOperators,
    getOneOperator,
    getSelfOperator,
    login,
    postOperator,
    putOperator
} = require("./server/controllers/operatorController");
const {confirmRide, confirmAdmin, googleMapsToken} = require("./server/controllers/administrationController");
const {sendExpirationNotifications, adminStartUp} = require("./server/functions/administration")
require("dotenv").config()
const cron = require('node-cron');

const path = require("path")

const express = require("express")
const helmet = require("helmet")
const {urlencoded, json} = require('body-parser');
const cors = require("cors");
const app = express();


const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(urlencoded({extended: true}));
app.use(json());

const routerDatabase = express.Router();
app.use('/api/v1/database', routerDatabase);

const routerAdminstration = express.Router()
app.use('/api/v1/admin', routerAdminstration);


//User Endpoints
routerDatabase.get('/users/all', checkJWT, getAllUsers);
routerDatabase.get('/users/user', checkJWT, getOneUser);
routerDatabase.post('/users/user', checkJWT, postUser);
routerDatabase.patch('/users/user/vetting', checkJWT, patchUser_vetting);
routerDatabase.patch('/users/user/status', checkJWT, patchUser_active);
routerDatabase.put('/users/user', checkJWT, putUser);
routerDatabase.delete('/users/user', checkJWT, deleteUser);

//Ride Endpoints
routerDatabase.get('/rides/all', checkJWT, getAllRides);
routerDatabase.get('/rides/ride', checkJWT, getOneRide);
routerDatabase.post('/rides/ride', checkJWT, postRide);
routerDatabase.put('/rides/ride', checkJWT, putRide);
routerDatabase.delete('/rides/ride', checkJWT, deleteRide);
routerDatabase.patch('/rides/ride/status', checkJWT, patchRideStatus);


//Village Endpoints
routerDatabase.get('/villages/all', checkJWT, getAllVillages);
routerDatabase.get('/villages/village', checkJWT, getOneVillage);
routerDatabase.post('/villages/village', checkJWT, postVillage);
routerDatabase.put('/villages/village', checkJWT, putVillage);
routerDatabase.delete('/villages/village', checkJWT, deleteVillage);

//Operator Endpoints
routerDatabase.get('/operators/all', checkJWT, getAllOperators);
routerDatabase.get('/operators/operator', checkJWT, getOneOperator);
routerDatabase.get('/operators/self', checkJWT, getSelfOperator);
routerDatabase.post('/operators/operator', checkJWT, postOperator);
routerDatabase.put('/operators/operator', checkJWT, putOperator);
routerDatabase.delete('/operators/operator', checkJWT, deleteOperator);

//Administration Endpoints
routerAdminstration.get('/confirm_ride', checkParameterJWT, confirmRide)
routerAdminstration.get('/confirm_admin', checkParameterJWT, confirmAdmin)
routerAdminstration.post('/login', login)
routerAdminstration.get('/googlemaps', checkJWT, googleMapsToken)

// UI Routes
app.use(express.static(path.resolve('./build/')));
app.get('/*', (req, res) => res.sendFile(path.resolve('./build/index.html')));


app.listen(PORT, () => console.log('Server running on ' + PORT));

cron.schedule("0 6 * * *", sendExpirationNotifications);

adminStartUp().then()

