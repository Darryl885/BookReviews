const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Choisir le service (ex: Gmail, Outlook, SMTP personnalisé)
    auth: {
        user: process.env.EMAIL_USER, // Ton email
        pass: process.env.EMAIL_PASSWORD // Ton mot de passe ou App Password
    },
    tls: {
        rejectUnauthorized: false //  Ignore les certificats auto-signés
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });
        console.log('✅ Email envoyé à', to);
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    }
};

module.exports = sendEmail;
