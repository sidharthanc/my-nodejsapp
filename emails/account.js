const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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');

const sendWelcomeEmail = (email, name) => {
    console.log('sendgrid started'+email);
    sgMail.send({
        to: email,
        from: 'rbalajives@gmail.com',
        subject: 'Thanks for Joining Us',
        text: `Hi, ${name}, Welcome Your home page`
    })
}

// Send Email after Account Cancellation
const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rbalajives@gmail.com',
        subject: 'Sorry to See you Go!',
        text: `Hi ${name}, May we know why you have left us?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
