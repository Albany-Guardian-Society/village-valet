import {checkJWT, checkParameterJWT} from "./middleware/JWToken";
import {deleteUser, getAllUsers, getOneUser, patchUser, postUser, putUser} from "./controllers/usersController";
import {deleteRide, getAllRides, getOneRide, postRide, putRide} from "./controllers/ridesController";
import {deleteVillage, getAllVillages, getOneVillage, postVillage, putVillage} from "./controllers/villagesController";
import {
    deleteOperator,
    getAllOperators,
    getOneOperator,
    login,
    postOperator,
    putOperator
} from "./controllers/operatorController";
import {confirmRide} from "./controllers/administrationController";

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

const routerDatabase = app.router();
app.use('/api/database', routerDatabase);

const routerAdminstration = app.router()
app.use('/admin/', routerAdminstration);


//User Endpoints
routerDatabase.get('/users/all', checkJWT, getAllUsers);
routerDatabase.get('/users/user', checkJWT, getOneUser);
routerDatabase.post('/users/user', checkJWT, postUser);
routerDatabase.patch('/users/user', checkJWT, patchUser);
routerDatabase.put('/users/user', checkJWT, putUser);
routerDatabase.delete('/users/user', checkJWT, deleteUser);

//Ride Endpoints
routerDatabase.get('/rides/all', checkJWT, getAllRides);
routerDatabase.get('/rides/ride', checkJWT, getOneRide);
routerDatabase.post('/rides/ride', checkJWT, postRide);
routerDatabase.put('/rides/ride', checkJWT, putRide);
routerDatabase.delete('/rides/ride', checkJWT, deleteRide);

//Village Endpoints
routerDatabase.get('/villages/all', checkJWT, getAllVillages);
routerDatabase.get('/villages/village', checkJWT, getOneVillage);
routerDatabase.post('/villages/village', checkJWT, postVillage);
routerDatabase.put('/villages/village', checkJWT, putVillage);
routerDatabase.delete('/villages/village', checkJWT, deleteVillage);

//Operator Endpoints
routerDatabase.get('/operators/all', checkJWT, getAllOperators);
routerDatabase.get('/operators/operator', checkJWT, getOneOperator);
routerDatabase.post('/operators/operator', checkJWT, postOperator);
routerDatabase.put('/operators/operator', checkJWT, putOperator);
routerDatabase.delete('/operators/operator', checkJWT, deleteOperator);

//Administration Endpoints
routerAdminstration.get('/confirm_ride', checkParameterJWT, confirmRide)
routerAdminstration.get('/login', login)