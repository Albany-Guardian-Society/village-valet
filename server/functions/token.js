const jwt = require("jsonwebtoken");

require("dotenv").config();
/**
 * @module UserTokenGenerator
 */
/**
 * Secret Key to Sign Tokens
 */
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Generates Ride Confirmation Token
 * @param {Object} ride - Ride object
 * @returns {token}
 */
exports.generateRideConfirmationToken = (ride) => {
    return jwt.sign({
        scope: 'confirm_ride',
        id: ride.driver.id,
        ride_id: ride.id,
        village_id: ride.ride_data.village_id
    }, JWT_SECRET, {
        expiresIn: "72h",
        audience: 'user',
    })
}

/**
 * Generates Ride Confirmation Token
 * @param {Object} admin - Operator Object
 * @returns {token}
 */
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


