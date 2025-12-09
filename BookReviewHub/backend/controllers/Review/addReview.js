const Joi = require("joi");
const reviewService = require("../../services/Review/addReview");

// ✅ Schéma de validation avec Joi
const reviewSchema = Joi.object({
    content: Joi.string().min(10).required(),
    rating: Joi.number().integer().min(1).max(5).required(),
});

// ✅ Ajouter une critique
const addReview = async (req, res) => {
    try {
        // ✅ Vérification de la session utilisateur
        if (!req.session.user) {
            return res.status(401).json({ message: "Authentification requise." });
        }

        // Vérification du `bookId` dans l'URL
        const bookId = req.params.bookId;
        if (!bookId) {
            return res.status(400).json({ message: "ID du livre requis." });
        }

        //  Validation des données de la critique
        const { error } = reviewSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        //  Récupération des informations utilisateur et critique
        const userId = req.session.user.id; //  Utilisation de `req.session.user.id`
        const { content, rating } = req.body;

        //  Ajout de la critique via le service
        const review = await reviewService.addReview(userId, bookId, content, rating);
        res.status(201).json({ message: "Critique ajoutée avec succès", review });
    } catch (error) {
        console.error("❌ Erreur lors de l'ajout de la critique :", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addReview };
