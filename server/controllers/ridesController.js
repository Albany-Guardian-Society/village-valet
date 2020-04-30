const {addRide, getRide, getRides, getRidesByDate, removeRide, updateRide} = require("../firebase/rides");
const {sendConfirmationEmail, sendCancellationEmail} = require("../functions/administration");

/**
 * @module RidesController
 */

/**
 * Returns to requester all rides they have access to
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.getAllRides = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const date = req.query.date;
    if (date == null) {
        res.status(200).send(await getRides(village_id));
        return
    }
    res.status(200).send(await getRidesByDate(village_id, date))
};


/**
 * Returns to requester the specific ride, if they have access to
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.getOneRide = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const id = req.query.id;
    if (!id) {
        res.status(400).send({error: 'Missing query parameter: id'});
        return
    }
    res.status(200).send(await getRide(village_id, id))
};


/**
 * Takes the request and adds the ride to the database
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.postRide = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const ride = req.body.ride;
    if (!ride) {
        res.status(400).send({error: 'Missing from body: ride'});
        return
    }
    if (ride.village_id !== village_id && village_id !== 'admin') {
        res.status(401).send({error: 'Access forbidden'});
        return
    }
    const id = await addRide(ride);
    ride.id = id;
    if (id) {
        res.status(201).send({success: true, id: id});
        await sendConfirmationEmail(ride)
        return
    }
    res.status(500).send({error: "Could not add ride to database"})
};


/**
 * Takes the request and edits the entire ride in the database
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.putRide = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const ride = req.body.ride;
    if (!ride) {
        res.status(400).send({error: 'Missing from body: ride'});
        return
    }
    const oldRide = await getRide(village_id, ride.id);
    if (!oldRide) {
        res.status(404).send({error: 'Ride not found'});
        return
    }
    if (oldRide.ride_data.village_id !== village_id && village_id !== ride.ride_data.village_id && village_id !== 'admin') {
        res.status(401).send({error: 'Access forbidden'});
        return
    }
    if (await updateRide(ride)) {
        res.status(200).send({success: true});
        return
    }
    res.status(500).send({error: "Could not  update ride in database"})
};

/**
 * Takes the request and edits only the status of ride in the database
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.patchRideStatus = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const {ride_id, status} = req.body;
    if (!ride_id || !status) {
        res.status(400).send({error: 'Missing user id or status from body'});
        return
    }
    const oldRide = await getRide(village_id, ride_id);
    if (oldRide.length === 0) {
        res.status(404).send({error: 'Ride not found'});
        return
    }
    if (oldRide.ride_data.village_id !== village_id && village_id !== 'admin') {
        res.status(401).send({error: 'Access forbidden'});
        return
    }
    oldRide.status = status
    if (await updateRide(oldRide)) {
        res.status(200).send({success: true});
        return
    }
    res.status(500).send({error: "Could not  update ride in database"})
};

/**
 * Takes the request and removes the ride from the database
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.deleteRide = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const ride_id = req.body.ride_id;
    if (!ride_id) {
        res.status(400).send({error: 'Missing from body: ride_id'});
        return
    }
    const ride = await getRide(village_id, ride_id);
    if (ride == null) {
        res.status(404).send({error: "Could not find ride in database"})
    }
    if (village_id !== ride.ride_data.village_id && village_id !== 'admin') {
        res.status(401).send({error: 'Access forbidden'});
        return
    }
    if (await removeRide(ride_id)) {
        res.status(200).send({success: true});
        await sendCancellationEmail(ride);
        return
    }
    res.status(500).send({error:"Could not delete ride from database"})
};



