const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); //  Vérifie que l'export est correct

const BlacklistToken = sequelize.define('BlacklistToken', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = BlacklistToken;
