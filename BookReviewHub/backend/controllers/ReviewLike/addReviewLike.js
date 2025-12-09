const Joi = require("joi");
const reviewLikeService = require("../../services/ReviewLike/addReviewLike");

//  Schéma de validation avec Joi
const reviewLikeSchema = Joi.object({
    userId: Joi.number().integer().required(),
    reviewId: Joi.number().integer().required(),
});

//  Ajouter un like à une critique
const addReviewLike = async (req, res) => {
    try {
        //  Validation des données
        const { error } = reviewLikeSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        //  Ajout du like
        const { userId, reviewId } = req.body;
        const newLike = await reviewLikeService.addReviewLike(userId, reviewId);

        res.status(201).json({ message: "Like ajouté avec succès", like: newLike });
    } catch (error) {
        console.error(" Erreur lors de l'ajout du like :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

module.exports = { addReviewLike };
