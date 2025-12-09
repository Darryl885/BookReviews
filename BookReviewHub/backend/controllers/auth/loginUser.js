const Joi = require("joi");
const authService = require("../../services/authService/login");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { email, password } = req.body;
        const user = await authService.loginUser(email, password);

        if (!user) return res.status(400).json({ message: "Email ou mot de passe incorrect" });

        req.session.user = user; //  Stocke l'utilisateur en session
        res.status(200).json({ message: "Connexion réussie", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { login };
