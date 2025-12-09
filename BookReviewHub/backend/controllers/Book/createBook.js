const Joi = require("joi");
const bookService = require("../../services/Book/createBook");

//Ajoute une validation avec Joi (title, author obligatoires). 
const bookSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    author: Joi.string().min(3).max(50).required(),
    description: Joi.string().optional(),
    coverImage: Joi.string().optional(),
    userId: Joi.number().integer().required() // Ajoute `userId` à la validation
});



//  Utilise req.session.user.id pour lier le livre à l'utilisateur connecté. 
//  Retourne 401 Unauthorized si l’utilisateur n’est pas connecté.

const createBook = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: "Authentification requise." });
        }

        const { error } = bookSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { title, author, description, coverImage } = req.body;
        const userId = req.session.user?.id; // Récupère l'ID de l'utilisateur connecté

        const book = await bookService.createBook(userId, title, author, description, coverImage);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createBook };
