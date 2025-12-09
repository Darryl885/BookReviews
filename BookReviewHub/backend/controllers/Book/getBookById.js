const Joi = require("joi");
const bookService = require("../../services/Book/getBookById");

const getBookByIdSchema = Joi.object({
    id: Joi.number().integer().required(), //  Vérifie que `id` est un nombre entier
});



const getBookById = async (req, res) => {
    // Gère les erreurs avec try/catch pour éviter les crashs.
    try {
        const { error } = getBookByIdSchema.validate(req.params);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { id } = req.params;
        const book = await bookService.getBookById(id);

        if (!book) return res.status(404).json({ message: "Livre non trouvé" });

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getBookById };
