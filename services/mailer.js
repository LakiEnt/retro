const nodemailer = require('nodemailer');

async function sendEmail (email, subject, text) {
    let success = false;

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        })

        console.log('Email успешно отправлен');
        success = true;
    } catch (err) {
        console.log('ошибка при отправке email`а');
        console.error(err.message, err.stack);
    }

    return success;
} 

module.exports = {
    sendEmail: sendEmail
}