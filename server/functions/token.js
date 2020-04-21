import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateRideConfirmationToken = (ride) => {
    return jwt.sign({
        scope: 'confirm_ride',
        id: ride.driver.id,
        ride_id: ride.id,
        village_id: ride.village_id
    }, JWT_SECRET, {
        expiresIn: "72h",
        audience: 'user',
    })
}
