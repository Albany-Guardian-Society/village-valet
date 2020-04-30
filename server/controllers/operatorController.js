const {
    addOperator,
    getOperatorById,
    getOperatorByIdFull,
    getOperatorByUsername,
    getOperators,
    removeOperator,
    updateOperator
} = require("../firebase/operators");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

/**
 * @const {string}
 */
const JWT_SECRET = process.env.JWT_SECRET;


/**
 * Receives a login request and if valid sends the client a valid token
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.login = async (req, res) => {
    const {username, password} = req.body;
    const operator = await getOperatorByUsername(username);
    if (!username || !password) {
        res.status(400).send({error: "Missing username/password"});
        return;
    }
    if (operator.length !== 0) {
        if (bcrypt.compareSync(password, operator[0].password)) {
            const newToken = jwt.sign({id: operator[0].id, village_id: operator[0].village_id}, JWT_SECRET, {
                expiresIn: "1h",
                audience: 'website',
            });
            res.setHeader("token", newToken);
            res.status(200).send({
                is_admin: operator[0].village_id === 'admin', operator_id: operator[0].id,
                first_name: operator[0].first_name, last_name: operator[0].last_name
            });
            return
        }
        res.status(401).send({error: 'Username/Password Combination Incorrect'});
        return
    }
    res.status(404).send({error:'Username not found'})
};

/**
 * Receives a password change request, and if valid, changes the password of the operator. Currently not in use
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.changePassword = async (req, res) => {
    const {scope, password} = req.body;
    if (scope !== 'change_password') {

    }
    if (!password) {
        res.status(400).send({error: "No password found"});
        return
    }
    if (password.length < 8) {
        res.status(400).send({error: "Password needs to be at least 8 characters"});
        return
    }
    const {id} = res.locals.jwtPayload;
    const operator = await getOperatorById(id);
    if (operator.length !== 0) {
        operator[0]['password'] = await bcrypt.hash(password, 10);
        if (await updateOperator(operator)) {
            res.status(200).send('Password has been changed');

        } else {
            res.status(500).send('Could not update operator in the database')

        }
    } else {
        res.status(404).send('Operator could not be found')
    }
};

/**
 * Return all operator information (except password) to admin
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.getAllOperators = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    if (village_id !== 'admin') {
        res.status(403).send({error: 'Access forbidden'});
        return
    }
    res.status(200).send(await getOperators())
};

/**
 * Returns a single operator to either to the admin or that specific operator
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.getOneOperator = async (req, res) => {
    const {id, village_id} = res.locals.jwtPayload;
    const operator_id = req.query.id;
    if (id !== operator_id && village_id !== 'admin') {
        res.status(403).send({error: 'Access forbidden'});
        return
    }
    res.status(200).send(await getOperatorById(operator_id))
};

/**
 * Return the requester's own information
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.getSelfOperator = async (req, res) => {
    const {id} = res.locals.jwtPayload;
    const operator = await getOperatorById(id)
    if (operator) {
        res.status(200).send(operator)
        return
    }
    res.status(404).send({error: "Operator not found"})
};

/**
 * Takes request and adds operator to the database
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.postOperator = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const operator = req.body.operator;
    if (village_id !== 'admin') {
        res.status(401).send({error: 'Access forbidden'});
        return
    }
    if (operator == null) {
        res.status(400).send({error: 'Missing from body: operator'});
        return
    }
    const id = await addOperator(operator);
    if (id) {
        res.status(201).send({success: true, id: id});
        return
    }
    res.status(500).send({error: "Could not add operator to database"})
};

/**
 * Takes request and edits operator in the database
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.putOperator = async (req, res) => {
    const {id, village_id} = res.locals.jwtPayload;
    const operator = req.body.operator;
    if (operator == null) {
        res.status(400).send({error: 'Missing from body: operator'});
        return
    }
    if (id !== operator.id && village_id !== 'admin') {
        res.status(401).send({error: 'Access forbidden'});
        return
    }
    if (!operator.password) {
        const oldOperator = await getOperatorByIdFull(operator.id)
        if (!oldOperator) {
            res.status(404).send({error: "Operator not found"})
            return
        }
        operator.password = oldOperator.password
    }
    if (await updateOperator(operator)) {
        res.status(200).send({success: true});
        return
    }
    res.status(500).send({error: "Could not edit operator in database"})
};

/**
 * Takes request and removes operator frome the database
 *
 * @param {Request} req - Request that was received from the client
 * @param {Response} res - Response that will be sent to the client
 * @returns {Promise<void>}
 */
exports.deleteOperator = async (req, res) => {
    const {id, village_id} = res.locals.jwtPayload;
    const operator_id = req.body['operator_id'];
    if (id !== operator_id && village_id !== 'admin') {
        res.status(401).send({error: 'Access forbidden'});
        return
    }
    if (operator_id == null) {
        res.status(400).send({error: 'Missing from body: operator'});
        return
    }

    if (await removeOperator(operator_id)) {
        res.status(200).send({success:true});
        return
    }
    res.status(500).send({error:"Could not remove operator from database"})
};


