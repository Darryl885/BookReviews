const Joi = require("joi");
const reviewService = require("../../services/Review/getReviewsByBook");

//  Schéma de validation avec Joi
const bookIdSchema = Joi.object({
    bookId: Joi.number().integer().required(),
});

//  Récupérer les critiques d'un livre
const getReviewsByBook = async (req, res) => {
    try {
        //  Validation du `bookId`
        const { error } = bookIdSchema.validate(req.params);
        if (error) return res.status(400).json({ message: error.details[0].message });

        //  Recherche des critiques
        const { bookId } = req.params;
        const reviews = await reviewService.getReviewsByBook(bookId);

        if (reviews.length === 0) return res.status(404).json({ message: "Aucune critique trouvée." });

        res.status(200).json({ message: "Critiques récupérées avec succès", reviews });
    } catch (error) {
        console.error(" Erreur lors de la récupération des critiques :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

module.exports = { getReviewsByBook };
