const {getRide, updateRide} = require("../firebase/rides");
const {getOperatorById, updateOperator} = require("../firebase/operators")
require("dotenv").config()

const GoogleMapsToken = process.env.GOOGLE_MAPS_TOKEN

/**
 * @module AdministrationController
 */
/**
 * A function which will confirm the driver will be picking up the rider. Sends a 200 if completed
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 */
exports.confirmRide = async (req, res) => {
    const {scope, id, ride_id, village_id} = res.locals.jwtPayload;
    if (scope !== 'confirm_ride') {
        res.status('401').send({error: 'Invalid Scope'});
        return
    }
    if (!scope || !id || !ride_id || !village_id) {
        res.status('400').send({error: 'Invalid Token Body'});
        return
    }
    const oldRide = await getRide(village_id, ride_id);
    if (!oldRide) {
        res.status(404).send({error: 'Ride not found'});
        return
    }
    if (oldRide.driver.id !== id) {
        res.status(409).send({error: 'Driver is longer associated with this ride'});
        return
    }
    oldRide.ride_data.driver_confirmed = true;
    if (await updateRide(oldRide)) {
        res.status(200).send({success: true});
        return
    }
    res.status(500).send({error: 'Could not edit ride in database'})
};

/**
 * A function which will confirm the admin on initial setup.  Redirects to login page if complete
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.confirmAdmin = async (req, res) => {
    const {scope, id, village_id} = res.locals.jwtPayload;
    if (scope !== 'confirm_admin') {
        res.status('401').send({error: 'Invalid Scope'});
        return
    }
    if (!scope || !id || !village_id) {
        res.status('400').send({error: 'Invalid Token Body'});
        return
    }
    if (village_id !== 'admin') {
        res.status('400').send({error: 'Not an admin token'});
        return
    }
    const admin = await getOperatorById(id);
    if (!admin) {
        res.status(404).send({error: 'Operator not found'});
        return
    }
    admin.confirmed = true
    if (await updateOperator(admin)) {
        res.status(200).redirect(`https://${req.headers.host}/login`);
        return
    }
    res.status(500).send({error: 'Could not edit operator in database'})
};


/**
 * A function which sends the client a Google Maps API Token
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.googleMapsToken = async (req, res) => {
    res.status(200).send({token: GoogleMapsToken})
}


