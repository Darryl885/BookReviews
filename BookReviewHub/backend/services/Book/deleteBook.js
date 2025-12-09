const Book = require("../../models/Book");

const deleteBook = async (id) => {
    const book = await Book.findByPk(id);
    if (!book) return null; //  Vérifie si le livre existe avant de le supprimer

    await book.destroy(); //  Supprime le livre
    return book;
};

module.exports = { deleteBook };
