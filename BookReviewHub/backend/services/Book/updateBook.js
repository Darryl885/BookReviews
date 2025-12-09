const Book = require("../../models/Book");

//book.update(data) met à jour directement l'objet book.
const updateBook = async (id, data) => {
    const book = await Book.findByPk(id);
    if (!book) return null; //  Vérifie si le livre existe avant de tenter la mise à jour

    await book.update(data); //  Utilise `update()` directement sur l'objet `book`
    return book;
};


module.exports = { updateBook };
