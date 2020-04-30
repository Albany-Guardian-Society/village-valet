const {addVillage, getVillage, getVillages, removeVillage, updateVillage} = require("../firebase/villages");


/**
 * @module VillagesController
 */

/**
 * Returns to requester all villages they have access to.
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.getAllVillages = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    res.status(200).send(await getVillages(village_id))
};

/**
 * Returns to requester a village specified by id, if they have access to it.
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.getOneVillage = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const query_village_id = req.query.id;
    if (village_id !== query_village_id && village_id !== 'admin') {
        res.status(403).send({error: 'Access forbidden'});
        return
    }
    res.status(200).send(await getVillage(query_village_id))
};

/**
 * Takes request and adds the village to the database
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.postVillage = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const village = req.body.village;
    if (village_id !== 'admin') {
        res.status(401).send({error: 'Access forbidden'});
        return
    }
    if (village == null) {
        res.status(400).send({error: 'Missing from body: village'});
        return
    }
    const id = await addVillage(village);
    if (id) {
        res.status(201).send({success: true, id: id});
        return
    }
    res.status(500).send({error: "Could not add village to database"})
};

/**
 * Takes request and edits the entire village in the database
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.putVillage = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const village = req.body.village;
    if (village_id !== 'admin') {
        res.status(401).send({error: 'Access forbidden'});
        return
    }
    if (village == null) {
        res.status(400).send({error: 'Missing from body: village'});
        return
    }
    if (!village.id) {
        res.status(400).send({error: 'Missing from body: village.village_id'});
        return
    }
    const oldVillage = await getVillage(village.id);
    if (oldVillage.length === 0) {
        res.status(404).send({error: 'Village not found'});
        return
    }
    if (await updateVillage(village)) {
        res.status(200).send({success: true});
        return
    }
    res.status(500).send({error: "Could not update village in database"})
};


/**
 * Takes request and removes the village from to the database
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.deleteVillage = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const body_village_id = req.body['village_id'];
    if (village_id !== 'admin') {
        res.status(401).send({error: 'Access forbidden'});
        return
    }
    if (body_village_id == null) {
        res.status(400).send({error: 'Missing from body: village_id'});
        return
    }

    if (await removeVillage(body_village_id)) {
        res.status(200).send({success:true});
        return
    }
    res.status(500).send({error:"Could not remove village from database"})
};


