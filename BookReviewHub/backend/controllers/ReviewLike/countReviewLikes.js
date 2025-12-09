const Joi = require("joi");
const reviewLikeService = require("../../services/ReviewLike/countReviewLikes");

//  Schéma de validation avec Joi
const reviewIdSchema = Joi.object({
    reviewId: Joi.number().integer().required(),
});

//  Compter le nombre de likes d'une critique
const countReviewLikes = async (req, res) => {
    try {
        //  Validation du `reviewId`
        const { error } = reviewIdSchema.validate(req.params);
        if (error) return res.status(400).json({ message: error.message });

        //  Récupération du nombre de likes
        const { reviewId } = req.params;
        const likeCount = await reviewLikeService.countReviewLikes(reviewId);

        res.status(200).json({ message: "Nombre de likes récupéré avec succès", count: likeCount });
    } catch (error) {
        console.error(" Erreur lors de la récupération des likes :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

module.exports = { countReviewLikes };
