import {
    addOperator,
    getOperatorById,
    getOperatorByUsername,
    getOperators,
    removeOperator,
    updateOperator
} from "../firebase/operators";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET;

export const login = async(req,res) => {
    const {username, password} = req.body;
    const operator = await getOperatorByUsername(username);
    if (operator) {
        if (bcrypt.compareSync(password, operator[0].password)) {
            const newToken = jwt.sign({id: operator[0].id, village_id: operator[0].village_id}, JWT_SECRET, {
                expiresIn: "1h",
                audience: 'website',
            });
            res.setHeader("token", newToken);
            res.status(200).send();
        }
        res.status(401).send({error:'Username/Password Combination Incorrect'})
    }
    res.status(404).send({error:'Username not found'})
};

export const changePassword = async(req,res) => {
    const {id, password} = req.body;
    const operator = await getOperatorById(id);
    if (operator) {
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

export const getAllOperators = async(req,res) => {
    const {village_id} = res.locals.jwtPayload;
    if (village_id !== 'admin') {
        res.status(403).send({error:'Access forbidden'})
    }
    res.status(200).send(await getOperators())
};

export const getOneOperator = async(req,res) => {
    const {id, village_id} = res.locals.jwtPayload;
    const operator_id = req.query.id;
    if (id !== operator_id && village_id !== 'admin') {
        res.status(403).send({error:'Access forbidden'})
    }
    res.status(200).send(await getOperatorById(operator_id))
};

export const postOperator = async(req,res) => {
    const {village_id} = res.locals.jwtPayload;
    const operator = req.body.operator;
    if (village_id !== 'admin') {
        res.status(401).send({error:'Access forbidden'});
        return
    }
    if (operator == null) {
        res.status(400).send({error:'Missing from body: operator'});
        return
    }
    if (await addOperator(operator)) {
        res.status(200).send({success:true});
        return
    }
    res.status(500).send({error:"Could not add operator to database"})
};

export const putOperator = async(req,res) => {
    const {id, village_id} = res.locals.jwtPayload;
    const operator = req.body.operator;
    if (operator == null) {
        res.status(400).send({error:'Missing from body: operator'});
        return
    }
    if (id !== operator.id && village_id !== 'admin') {
        res.status(401).send({error:'Access forbidden'});
        return
    }
    if (await updateOperator(operator)) {
        res.status(200).send({success:true});
        return
    }
    res.status(500).send({error:"Could not edit operator in database"})
};

export const deleteOperator = async(req,res) => {
    const {id, village_id} = res.locals.jwtPayload;
    const operator_id = req.body['operator_id'];
    if (id !== operator_id && village_id !== 'admin') {
        res.status(401).send({error:'Access forbidden'});
        return
    }
    if (operator_id == null) {
        res.status(400).send({error:'Missing from body: operator'});
        return
    }

    if (await removeOperator(operator_id)) {
        res.status(200).send({success:true});
        return
    }
    res.status(500).send({error:"Could not remove operator from database"})
};


