const {getDrivers, getUser} = require("../firebase/users");
const moment = require("moment")
const {sendEmail} = require("./email");
const {getOperators} = require("../firebase/operators");
const {getVillages} = require("../firebase/villages");
const {generateRideConfirmationToken} = require("./token");


require("dotenv").config()


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

exports.sendConfirmationEmail = async (ride) => {
    const driver = (await getUser(ride.ride_data.village_id, ride.driver.id))
    const rider = (await getUser(ride.ride_data.village_id, ride.rider.id))
    const village = (await getVillages(ride.ride_data.village_id))[0]
    if (driver.personal_info.email) {
        const message = {
            // Comma separated list of recipients
            to: '"' + driver.personal_info.first_name + " " + driver.personal_info.last_name + '" <' + driver.personal_info.email + ">",

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
                `<p><strong>Drop off Address:</strong> ${ride.locations.dropoff.address}</p>\n` +
                `<p><strong>Drop off Time: ${ride.locations.dropoff.time}</strong></p>\n` +
                `<p><strong>Total Trip Duration:  ${ride.ride_data.time_total.rider}</strong></p>\n` +
                `<p><br></p>\n` +
                `<p>Your rider, ${rider.personal_info.first_name} ${rider.personal_info.last_name},
             may have special accommodations which can be seen here: ${rider.accommodations.special}. </p>\n`
                + `<p> Please confirm your ride by calling us or clicking the following link https://${process.env.HOST_NAME}/admin/confirm_ride?token=${await generateRideConfirmationToken(ride)} </p>`
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

            // Subject of the message
            subject: 'AGS Village Valet Ride Confirmation: ' + ride.ride_data.date,

            // plaintext body
            text: '',
            html: `<p><strong><u>AGS Village Valet Ride Confirmation</u></strong></p>\n` +
                `<p>Hello ${rider.personal_info.first_name} ${rider.personal_info.last_name},</p>\n` +
                `<p>The following information is your trip summary for your drive with ${rider.personal_info.first_name} ${rider.personal_info.last_name}</p>\n` +
                `<p><strong>Date:</strong> ${ride.ride_data.date} </p>\n` +
                `<p><strong>Pickup Address:</strong> ${ride.locations.pickup.address}</p>\n` +
                `<p><strong>Pickup Time:</strong> ${ride.locations.pickup.time}</p>\n` +
                `<p><strong>Drop off Address:</strong> ${ride.locations.dropoff.address}</p>\n` +
                `<p><strong>Drop off Time: ${ride.locations.dropoff.time}</strong></p>\n` +
                `<p><strong>Total Trip Duration:  ${ride.ride_data.time_total.rider}</strong></p>\n` +
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

