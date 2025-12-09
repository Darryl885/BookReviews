const bcrypt = require("bcrypt");
const User = require("../../models/user.model");

const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Utilisateur non trouvé");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Mot de passe incorrect");

    return { id: user.id, name: user.name, email: user.email, role: user.role }; //  Retourne l'utilisateur sans JWT
};

module.exports = { loginUser };
