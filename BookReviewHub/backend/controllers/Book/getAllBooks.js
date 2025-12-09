const Joi = require("joi");
const bookService = require("../../services/Book/getAllBooks");

const getAllBooksSchema = Joi.object({
    userId: Joi.number().integer().optional(), //  Filtrage possible par `userId`
});

// Filtre les livres par userId si fourni, sinon récupère tous les livres. 
//  Gère les erreurs avec try/catch
const getAllBooks = async (req, res) => {
    try {
        const { error } = getAllBooksSchema.validate(req.query);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { userId } = req.query; //  Permet de filtrer les livres par utilisateur
        const books = userId ? await bookService.getAllBooksByUser(userId) : await bookService.getAllBooks();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllBooks };
