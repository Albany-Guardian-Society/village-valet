


// Message object
let message = {
    // Comma separated list of recipients
    to: '${riderFirstName} ${riderLastName} <${riderEmail}>, ${driverFirstName} ${driverLastName} <${driverEmail}> ',

    // Subject of the message
    subject: 'AGS Village Valet Ride Confirmation' + Date.now(),

    // plaintext body
    text: 'Below is the information about the Scheduled Rider',

    // HTML body
    html: "<b>AGS Village Valet Ride Information</b>",


};