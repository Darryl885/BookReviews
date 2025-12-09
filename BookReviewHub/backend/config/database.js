const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Désactive les logs Sequelize (optionnel)
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(' Connexion à la base de données réussie.');

        await sequelize.sync({ force: false}); //  Création automatique des tables
        console.log(' Tables synchronisées.');
    } catch (error) {
        console.error(' Échec de la connexion à la base de données :', error);
    }
};


module.exports = { sequelize, connectDB };
