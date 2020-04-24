const {addUser, getUser, getUsers, removeUser, updateUser} = require("../firebase/users");


exports.getAllUsers = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    res.status(200).send(await getUsers(village_id));

};

exports.getOneUser = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const id = req.query.id;
    if (id == null) {
        res.status(400).send({error: 'Missing query parameter: id'});
        return
    }
    res.status(200).send(await getUser(village_id, id))
};


exports.postUser = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const {user} = req.body.user;
    if (user == null) {
        res.status(400).send({error: 'Missing from body: user'});
        return
    }
    if (village_id !== user.primary_village && village_id !== 'admin') {
        res.status(401).send({error: 'Access forbidden'});
        return
    }
    if (await addUser(user)) {
        res.status(201).send({success:true});
        return
    }
    res.status(500).send({error:"Could not add user to database"})
};

exports.putUser = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const {user} = req.body.user;
    if (user == null) {
        res.status(400).send({error: 'Missing from body: user'});
        return
    }
    const oldUserArray = await getUser(village_id, user.id);
    if (oldUserArray.length === 0) {
        res.status(404).send({error: 'User not found'});
        return
    }
    const oldUser = oldUserArray[0];
    if (oldUser[0].user_type !== user.user_type) {
        res.status(400).send({error:'Can not change user type of a user'});
        return
    }
    if (oldUser[0].user_type === 'rider' && user.villages.length > 1) {
        res.status(400).send({error:'User cannot have multiple villages if they are a rider'});
        return
    }
    if (user.user_type === 'driver') {
        if (village_id !== 'admin' && village_id !== user.primary_village) {
            res.status(401).send({error: 'Access forbidden'});
            return
        }
    }
    if (await updateUser(user)) {
        res.status(200).send({success:true});
        return
    }
    res.status(500).send({error:"Could not update user in database"})
};

exports.deleteUser = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const {user_id} = req.body.user_id;
    if (user_id == null) {
        res.status(400).send({error: 'Missing from body: user_id'});
        return
    }
    const oldUserArray = await getUser(village_id, user_id);
    if (oldUserArray.length === 0) {
        res.status(404).send({error: 'User not found'});
        return
    }
    const oldUser = oldUserArray[0];
    if (oldUser.villages.indexOf(village_id) === -1) {
        res.status(401).send({error:'Access forbidden'});
        return
    }
    if (oldUser.primary_village === village_id) {
        if (await removeUser(user_id)) {
            res.status(200).send({success:true});
            return
        }
    }
    else if (oldUser.villages.indexOf(village_id) !== -1) {
        oldUser.villages = oldUser.villages.filter(vId => vId !== village_id);
        oldUser.vetting = oldUser.vetting.filter(v => v.village_id !== village_id);
        if (await updateUser(oldUser)) {
            res.status(200).send({success:true});
            return
        }
    }
    res.status(500).send({error:"Could not delete user from database"})
};

exports.patchUser = async (req, res) => {
    const {village_id} = res.locals.jwtPayload;
    const {user_id, vetting_info} = req.body;
    if (user_id === null) {
        res.status(400).send({error: 'Missing from body: user'});
        return
    }
    const oldUserArray = await getUser(village_id, user_id);
    if (oldUserArray.length === 0) {
        res.status(404).send({error: 'User not found'});
        return
    }
    const oldUser = oldUserArray[0];
    if (oldUser[0].user_type !== 'driver') {
        res.status(400).send({error:'Can not change vetting info for non driver'});
        return
    }
    if (oldUser.villages.indexOf(village_id) === -1 || (vetting_info.village_id !== village_id && village_id !== 'admin')) {
        res.status(401).send({error:'Access forbidden'});
        return
    }
    oldUser.vetting = oldUser.vetting.filter(v => v.village_id !== village_id);
    oldUser.vetting.push(vetting_info);
    if (await updateUser(oldUser)) {
        res.status(200).send({success:true});
        return
    }
    res.status(500).send({error:"Could not update user in database"})
};



