import {getRide, updateRide} from "../firebase/rides";

export const confirmRide = async (req, res) => {
    const {scope, id, ride_id, village_id} = res.locals.jwtPayload;
    if (scope !== 'confirm_ride') {
        res.status('401').send({error: 'Invalid Scope'});
        return
    }
    if (!scope || !id || !ride_id) {
        res.status('401').send({error: 'Invalid Token Body'});
        return
    }
    const oldRideArray = await getRide(village_id, ride_id);
    if (oldRideArray.length === 0) {
        res.status(404).send({error: 'Ride not found'});
        return
    }
    const oldRide = oldRideArray[0];
    if (oldRide.driver.id !== id) {
        res.status(409).send({error: 'Driver is longer associated with this ride'});
        return
    }
    oldRide.driver_confirmed = true;
    if (await updateRide(oldRide)) {
        res.status(200).send({success: true});
        return
    }
    res.status(500).send({error: 'Could not edit ride in database'})
};


