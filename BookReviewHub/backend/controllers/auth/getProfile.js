const authService = require("../../services/authService/getUserProfile");

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // ✅ Récupère l'ID de l'utilisateur depuis le token
        const user = await authService.getUserProfile(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getProfile };
