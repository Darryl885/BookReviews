const User = require("../../models/user.model");

const getUserProfile = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: ["id", "name", "email"] // ✅ Sélectionne les infos essentielles
    });

    if (!user) throw new Error("Utilisateur non trouvé");
    return user;
};

module.exports = { getUserProfile };
