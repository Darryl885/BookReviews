const BlacklistToken = require('../../models/BlacklistToken');

const logoutUser = async (req) => {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) {
                reject(new Error("Erreur lors de la déconnexion."));
            } else {
                resolve({ message: "Déconnexion réussie." });
            }
        });
    });
};

module.exports = { logoutUser };
