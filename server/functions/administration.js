const {getDrivers, getUser} = require("../firebase/users");
const moment = require("moment")
const {sendEmail} = require("./email");
const {getOperators, getOperatorByUsername, addOperator, removeOperator} = require("../firebase/operators");
const {getVillage, getVillages} = require("../firebase/villages");
const {generateRideConfirmationToken, generateAdminConfirmationToken} = require("./token");
const generator = require('generate-password');
const bcrypt = require("bcryptjs");


require("dotenv").config()

/**
 * @module Administration
 */
/**
 * Village Valet Email
 */
const EMAIL = process.env.SMTP_EMAIL;
/**
 *  Village Valet Domain Name

 */
const HOST_NAME = process.env.HOST_NAME;

/**
 * Sends Expiration Notification Email. Currently not in use
 * @returns {Promise<void>}
 */
exports.sendExpirationNotifications = async () => {
    const drivers = await getDrivers();
    const operators = await getOperators();
    const villages = await getVillages()
    for (const driver of drivers) {
        for (const vetting of drivers.vetting) {
            for (const specific_vetting of vetting.specfic_vettings) {
                if (specific_vetting.expiration_date === moment().add(14, 'days').format("MM-DD-YYYY") ||
                    specific_vetting.expiration_date === moment().add(7, 'days').format("MM-DD-YYYY") ||
                    specific_vetting.expiration_date === moment().add(1, 'days').format("MM-DD-YYYY") ||
                    specific_vetting.expiration_date === moment().add(30, 'days').format("MM-DD-YYYY")) {
                    const village = villages[vetting.village_id]
                    if (driver.personal_info.email) {
                        const message = {
                            // Comma separated list of recipients
                            to: '"' + driver.personal_info.first_name + " " + driver.personal_info.last_name + '" <' + driver.personal_info.email + ">",

                            replyTo: village.email,


                            // Subject of the message
                            subject: driver.personal_info.first_name + " " + driver.personal_info.last_name + ' Vetting Qualification is Almost Expired: ' + specific_vetting.expiration_date,

                            // plaintext body
                            text: '',


                            // HTML body
                            html: `<p><strong><u>Vetting Qualification Expiration Notice</u></strong></p>\n` +
                                `<p>Hello ${driver.personal_info.first_name} ${driver.personal_info.last_name},</p>\n` +
                                `<p>Our system has detected that your vetting qualification will expire soon.</p>\n` +
                                `<p><strong>Expiration Date:</strong> ${specific_vetting.expiration_date} </p>\n` +
                                `<p><br></p>\n` +
                                `<p>We recommend that you renew your vetting qualification as soon as possible. If your qualification is not renewed before the expiration date then we will have to suspend your account as a driver. 
       Please call us to renew your vetting information. Thank you very much for your time. If you have any questions or would like to make any changes please feel
            or need any assistance feel free to contact us.</p>\n` +
                                `<p><br></p>\n` +
                                `<p>Sincerely,</p>\n` +
                                `<p>Village Valet</p>\n` +
                                `<p><br></p>\n` +
                                `<p>${village.phone_number}</p>\n` +
                                `<p>${village.email}</p>\n`

                        };
                        await sendEmail(message);
                    } else {
                        const village_operators = operators.map(operator => operator.village_id === vetting.village_id)
                        for (const operator of village_operators) {
                            const message = {
                                // Comma separated list of recipients
                                to: '"' + operator.first_name + " " + operator.last_name + '" <' + operator.email + ">",

                                replyTo: village.email,


                                // Subject of the message
                                subject: 'Your Vetting Qualification is Almost Expired: ' + specific_vetting.expiration_date,

                                // plaintext body
                                text: '',


                                // HTML body
                                html: `<p><strong><u>Vetting Qualification Expiration Notice</u></strong></p>\n` +
                                    `<p>Hello ${operator.first_name} ${operator.last_name},</p>\n` +
                                    `<p>Our system has detected that ${driver.first_name} ${driver.last_name} vetting qualification will expire soon.</p>\n` +
                                    `<p><strong>Expiration Date:</strong> ${specific_vetting.expiration_date} </p>\n` +
                                    `<p><br></p>\n` +
                                    `<p>We recommend that you renew their vetting qualification as soon as possible. If their qualification is not renewed before the expiration date then we will have to suspend their account as a driver. 
           Thank you very much for your time. </p>\n` +
                                    `<p><br></p>\n` +
                                    `<p>Sincerely,</p>\n` +
                                    `<p>Village Valet</p>\n` +
                                    `<p><br></p>\n` +
                                    `<p>${village.phone_number}</p>\n` +
                                    `<p>${village.email}</p>\n`
                            };
                            await sendEmail(message);
                        }
                    }

                }
            }
        }
    }
}

/**
 * Sends ride confirmation emails
 * @param {Object} ride - Ride object
 * @returns {Promise<void>}
 */
exports.sendConfirmationEmail = async (ride) => {
    const driver = await getUser(ride.ride_data.village_id, ride.driver.id)
    const rider = await getUser(ride.ride_data.village_id, ride.rider.id)
    const village = await getVillage(ride.ride_data.village_id)
    if (driver.personal_info.email) {
        const message = {
            // Comma separated list of recipients
            to: '"' + driver.personal_info.first_name + " " + driver.personal_info.last_name + '" <' + driver.personal_info.email + ">",

            replyTo: village.email,

            // Subject of the message
            subject: 'AGS Village Valet Ride Confirmation: ' + ride.ride_data.date,

            // plaintext body
            text: '',
            html: `<p><strong><u>AGS Village Valet Ride Confirmation</u></strong></p>\n` +
                `<p>Hello ${driver.personal_info.first_name} ${driver.personal_info.last_name},</p>\n` +
                `<p>The following information is your trip summary for your drive with ${rider.personal_info.first_name} ${rider.personal_info.last_name}</p>\n` +
                `<p><strong>Date:</strong> ${ride.ride_data.date} </p>\n` +
                `<p><strong>Pickup Address:</strong> ${ride.locations.pickup.address}</p>\n` +
                `<p><strong>Pickup Time:</strong> ${ride.locations.pickup.time}</p>\n` +
                `<p><strong>Pickup Special:</strong> ${ride.locations.pickup.special}</p>\n` +
                `<p><strong>Drop off Address:</strong> ${ride.locations.dropoff.address}</p>\n` +
                `<p><strong>Drop off Time:</strong> ${ride.locations.dropoff.time}</p>\n` +
                `<p><strong>Dropoff Special:</strong> ${ride.locations.dropoff.special}</p>\n` +
                `<p><strong>Total Trip Duration:</strong> ${moment("2015-01-01").startOf('day')
                    .seconds(ride.ride_data.time_total.rider).format('H:mm')}</p>\n` +
                `<p><br></p>\n` +
                `<p>Your rider, ${rider.personal_info.first_name} ${rider.personal_info.last_name},
             may have special accommodations which can be seen here: ${rider.accommodations.special}. </p>\n`
                + `<p> Please confirm your ride by calling us or clicking the following link https://${HOST_NAME}/api/v1/admin/confirm_ride?token=${await generateRideConfirmationToken(ride)} </p>`
                + `<p>You will be unable to cancel this ride 48 hours prior to the pick up time. If you have any questions or would like to make any changes please feel
            free to contact us. </p>\n` +
                `<p><br></p>\n` +
                `<p>Sincerely,</p>\n` +
                `<p>Village Valet</p>\n` +
                `<p><br></p>\n` +
                `<p>${village.phone_number}</p>\n` +
                `<p>${village.email}</p>\n`
        };
        await sendEmail(message)
    }
    if (rider.personal_info.email) {
        const message = {
            // Comma separated list of recipients
            to: '"' + rider.personal_info.first_name + " " + rider.personal_info.last_name + '" <' + rider.personal_info.email + ">",

            replyTo: village.email,

            // Subject of the message
            subject: 'AGS Village Valet Ride Confirmation: ' + ride.ride_data.date,

            // plaintext body
            text: '',
            html: `<p><strong><u>AGS Village Valet Ride Confirmation</u></strong></p>\n` +
                `<p>Hello ${rider.personal_info.first_name} ${rider.personal_info.last_name},</p>\n` +
                `<p>The following information is your trip summary for your drive with ${rider.personal_info.first_name} ${rider.personal_info.last_name}</p>\n` + `<p><strong>Date:</strong> ${ride.ride_data.date} </p>\n` +
                `<p><strong>Pickup Address:</strong> ${ride.locations.pickup.address}</p>\n` +
                `<p><strong>Pickup Time:</strong> ${ride.locations.pickup.time}</p>\n` +
                `<p><strong>Pickup Special:</strong> ${ride.locations.pickup.special}</p>\n` +
                `<p><strong>Drop off Address:</strong> ${ride.locations.dropoff.address}</p>\n` +
                `<p><strong>Drop off Time:</strong> ${ride.locations.dropoff.time}</p>\n` +
                `<p><strong>Dropoff Special:</strong> ${ride.locations.dropoff.special}</p>\n` +
                `<p><strong>Total Trip Duration:</strong> ${moment("2015-01-01").startOf('day')
                    .seconds(ride.ride_data.time_total.rider).format('H:mm')}</p>\n` +
                `<p><br></p>\n` +
                `<p>Your driver, ${driver.personal_info.first_name} ${driver.personal_info.last_name}, will be driving a 
            ${ride.driver.vehicle.color} ${ride.driver.vehicle.make_model} with the license plate ${ride.driver.vehicle.lp}.
            They are aware of any special accommodations that you may have requested: ${rider.accommodations.special}. You will be unable to cancel this
            ride 48 hours prior to the pick up time. If you have any questions or would like to make any changes please feel
            free to contact us</p>` +
                `<p><br></p>\n` +
                `<p>Sincerely,</p>\n` +
                `<p>Village Valet</p>\n` +
                `<p><br></p>\n` +
                `<p>${village.phone_number}</p>\n` +
                `<p>${village.email}</p>\n`

        };
        await sendEmail(message)
    }
}

/**
 * Sends ride cancellation email
 * @param {Object} ride - Ride object
 * @returns {Promise<void>}
 */
exports.sendCancellationEmail = async (ride) => {
    const driver = await getUser(ride.ride_data.village_id, ride.driver.id)
    const rider = await getUser(ride.ride_data.village_id, ride.rider.id)
    const village = (await getVillage(ride.ride_data.village_id))[0]
    if (driver.personal_info.email) {
        const message = {
            // Comma separated list of recipients
            to: '"' + driver.personal_info.first_name + " " + driver.personal_info.last_name + '" <' + driver.personal_info.email + ">",

            replyTo: village.email,

            // Subject of the message
            subject: 'AGS Village Valet Ride Cancellation: ' + ride.ride_data.date,

            // plaintext body
            text: '',
            html: `<p><strong><u>AGS Village Valet Ride Cancellation</u></strong></p>\n` +
                `<p>Hello ${driver.personal_info.first_name} ${driver.personal_info.last_name},</p>\n` +
                `<p>We are contacting to information you that the ride scheduled for ${rider.personal_info.first_name} ${rider.personal_info.last_name} on ${ride.ride_data.date} at  ${ride.locations.pickup.time} has been cancelled. </p>\n` +
                `<p>If you have any questions feel free to contact us. </p>\n` +
                `<p>Sincerely,</p>\n` +
                `<p>Village Valet</p>\n` +
                `<p><br></p>\n` +
                `<p>${village.phone_number}</p>\n` +
                `<p>${village.email}</p>\n`
        };
        await sendEmail(message)
    }
    if (rider.personal_info.email) {
        const message = {
            // Comma separated list of recipients
            to: '"' + rider.personal_info.first_name + " " + rider.personal_info.last_name + '" <' + rider.personal_info.email + ">",

            replyTo: village.email,

            // Subject of the message
            subject: 'AGS Village Valet Ride Cancellation: ' + ride.ride_data.date,

            // plaintext body
            text: '',
            html: `<p><strong><u>AGS Village Valet Ride Cancellation</u></strong></p>\n` +
                `<p>Hello ${rider.personal_info.first_name} ${rider.personal_info.last_name},</p>\n` +
                `<p>We are contacting to information you that the ride scheduled for  ${ride.ride_data.date} at  ${ride.locations.pickup.time} has been cancelled. </p>\n` +
                `<p> If you have any questions feel free to contact us. </p>\n` +
                `<p>Sincerely,</p>\n` +
                `<p>Village Valet</p>\n` +
                `<p><br></p>\n` +
                `<p>${village.phone_number}</p>\n` +
                `<p>${village.email}</p>\n`
        };
        await sendEmail(message)
    }
}

/**
 * Runs startup if no admin exists
 * @returns {Promise<void>}
 */
exports.adminStartUp = async () => {
    const admins = await getOperatorByUsername('admin');
    for (const admin of admins) {
        if (!admin.confirmed) {
            await removeOperator(admin.id)
        }

    }
    for (const admin of admins) {
        if (admin.confirmed) {
            return;
        }
    }
    const password = generator.generate({
        length: 16,
        numbers: true,
        symbols: true,
        strict: true
    });
    const hash = await bcrypt.hash(password, 10);
    const admin = {
        first_name: 'Admin',
        last_name: 'Admin',
        email: EMAIL,
        username: 'admin',
        village_id: 'admin',
        password: hash,
        confirmed: false
    }
    admin.id = await addOperator(admin);
    await sendStartUpEmail(admin, password)
}
/**
 * Sends admin username and password email
 * @param {Object} admin - Operator Object
 * @param {string} password
 * @returns {Promise<void>}
 */
const sendStartUpEmail = async (admin, password) => {
    const message = {
        // Comma separated list of recipients
        to: EMAIL,

        // Subject of the message
        subject: 'Startup Email For Village Valet',

        // plaintext body
        text: '',
        html: `<p>Hello Administrator,</p>\n` +
            `<p>Here is the username and password for the current account:</p>\n` +
            `<p>Username: <strong>admin</strong></p>\n` +
            `<p>Password: <strong>${password}</strong></p>\n` +
            `<p>Please click the following link to confirm the account activation: https://${HOST_NAME}/api/v1/admin/confirm_admin?token=${await generateAdminConfirmationToken(admin)}</p>\n` +
            `<p><br></p>\n` +
            `<p>Sincerely,</p>\n` +
            `<p>Village Valet System</p>\n`
    };
    await sendEmail(message)
}

