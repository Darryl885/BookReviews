const Joi = require("joi");
const bookService = require("../../services/Book/deleteBook");

const deleteBookParamsSchema = Joi.object({
    id: Joi.number().integer().required(), //  Vérifie que `id` est un entier valide
});

const deleteBook = async (req, res) => {
    try {
        //  Validation des paramètres
        const { error } = deleteBookParamsSchema.validate(req.params);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { id } = req.params;
        const deletedBook = await bookService.deleteBook(id);

        if (!deletedBook) return res.status(404).json({ message: "Livre non trouvé" });

        res.status(200).json({ message: "Livre supprimé avec succès", deletedBook });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { deleteBook };
