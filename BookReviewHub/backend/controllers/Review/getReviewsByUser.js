const Joi = require("joi");
const reviewService = require("../../services/Review/getReviewsByUser");

//  Schéma de validation avec Joi
const userIdSchema = Joi.object({
    userId: Joi.number().integer().required(),
});

//  Récupérer les critiques d'un utilisateur
const getReviewsByUser = async (req, res) => {
    try {
        //  Validation du `userId`
        const { error } = userIdSchema.validate(req.params);
        if (error) return res.status(400).json({ message: error.details[0].message });

        //  Recherche des critiques
        const { userId } = req.params;
        const reviews = await reviewService.getReviewsByUser(userId);

        if (reviews.length === 0) return res.status(404).json({ message: "Aucune critique trouvée." });

        res.status(200).json({ message: "Critiques récupérées avec succès", reviews });
    } catch (error) {
        console.error(" Erreur lors de la récupération des critiques :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

module.exports = { getReviewsByUser };
