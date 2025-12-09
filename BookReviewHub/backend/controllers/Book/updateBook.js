const Joi = require("joi");
const bookService = require("../../services/Book/updateBook");

const updateBookSchema = Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    author: Joi.string().min(3).max(50).optional(),
    description: Joi.string().optional(),
    coverImage: Joi.string().optional(),
});

const updateBookParamsSchema = Joi.object({
    id: Joi.number().integer().required(), //  Vérifie que `id` est un entier valide
});

const updateBook = async (req, res) => {
    try {
        //  Validation des paramètres
        const { error: paramsError } = updateBookParamsSchema.validate(req.params);
        if (paramsError) return res.status(400).json({ message: paramsError.details[0].message });

        //  Validation du corps de la requête
        const { error: bodyError } = updateBookSchema.validate(req.body);
        if (bodyError) return res.status(400).json({ message: bodyError.details[0].message });

        const { id } = req.params;
        const updatedBook = await bookService.updateBook(id, req.body);

        if (!updatedBook) return res.status(404).json({ message: "Livre non trouvé" });

        res.status(200).json({ message: "Livre mis à jour avec succès", updatedBook });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { updateBook };
