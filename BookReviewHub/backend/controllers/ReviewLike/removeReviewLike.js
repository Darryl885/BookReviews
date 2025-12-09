const Joi = require("joi");
const reviewLikeService = require("../../services/ReviewLike/removeReviewLike");

//  Schéma de validation avec Joi
const reviewLikeSchema = Joi.object({
    userId: Joi.number().integer().required(),
    reviewId: Joi.number().integer().required(),
});

//  Supprimer un like d'une critique
const removeReviewLike = async (req, res) => {
    try {
        //  Validation des données
        const { error } = reviewLikeSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        //  Suppression du like
        const { userId, reviewId } = req.body;
        const removedLike = await reviewLikeService.removeReviewLike(userId, reviewId);

        if (!removedLike) return res.status(404).json({ message: "Like introuvable." });

        res.status(200).json({ message: "Like supprimé avec succès" });
    } catch (error) {
        console.error(" Erreur lors de la suppression du like :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

module.exports = { removeReviewLike };
