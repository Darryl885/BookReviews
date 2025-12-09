const { logoutUser } = require('../../services/authService/logout');
const logout = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: "Utilisateur non connecté." });
        }

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: "Erreur lors de la déconnexion." });
            }
            res.status(200).json({ message: "Déconnexion réussie." });
        });
    } catch (error) {
        res.status(500).json({ error: "Erreur inattendue lors de la déconnexion." });
    }
};


module.exports = { logout };
