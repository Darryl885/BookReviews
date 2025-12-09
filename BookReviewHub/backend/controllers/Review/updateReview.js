const Joi = require("joi");
const reviewService = require("../../services/Review/updateReview");

//  Schéma de validation avec Joi
const updateReviewSchema = Joi.object({
    content: Joi.string().min(10).optional(),
    rating: Joi.number().integer().min(1).max(5).optional(),
});

//  Mettre à jour une critique
const updateReview = async (req, res) => {
    try {
        //  Validation des données
        const { error } = updateReviewSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        //  Vérification de l'existence de la critique
        const { id } = req.params;
        const updatedReview = await reviewService.updateReview(id, req.body);

        if (!updatedReview) 
            return 
        res.status(404).json({ message: "Critique introuvable." });

        res.status(200).json({ message: "Critique mise à jour avec succès", review: updatedReview });
    } catch (error) {
        console.error(" Erreur lors de la mise à jour de la critique :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

module.exports = { updateReview };
