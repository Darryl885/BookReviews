const Joi = require("joi");
const reviewService = require("../../services/Review/deleteReview");

//  Schéma de validation avec Joi
const reviewIdSchema = Joi.object({
    id: Joi.number().integer().required(),
});

//  Supprimer une critique
const deleteReview = async (req, res) => {
    try {
     //Remplace error.details[0].message par error.message pour éviter les erreurs liées à undefined. 
     //  Ajoute { abortEarly: false } pour que Joi retourne toutes les erreurs de validation au lieu d'une seule
       const { error } = reviewIdSchema.validate(req.params, { abortEarly: false });
if (error) return res.status(400).json({ message: error.message });

        //  Vérification de l'existence de la critique
        const { id } = req.params;
        const deletedReview = await reviewService.deleteReview(id);

        if (!deletedReview) 
            return res.status(404).json({ message: "Critique introuvable." });

        res.status(200).json({ message: "Critique supprimée avec succès" });
    } catch (error) {
        console.error(" Erreur lors de la suppression de la critique :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

module.exports = { deleteReview };
