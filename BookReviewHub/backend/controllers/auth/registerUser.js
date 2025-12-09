const Joi = require("joi");
const authService = require("../../services/authService/register");
const sendEmail = require('../../services/authService/email');
const User = require("../../models/user.model"); // Assure-toi que le modèle User est bien importé

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
const register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Cet email est déjà utilisé. Veuillez essayer un autre." });
        }

        const user = await authService.registerUser(name, email, password);

        //  Ajoute l'utilisateur en session après inscription
        req.session.user = user;

        await sendEmail(email, 'Bienvenue sur BookReviewHub', `Bonjour ${name}, votre compte a été créé avec succès !`);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { register };
