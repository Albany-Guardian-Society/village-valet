const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.generateRideConfirmationToken = (ride) => {
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

exports.generateAdminConfirmationToken = (admin) => {
    return jwt.sign({
        scope: 'confirm_admin',
        id: admin.id,
        village_id: admin.village_id
    }, JWT_SECRET, {
        expiresIn: "1h",
        audience: 'user',
    })
}


