const Book = require("../../models/Book");


//Cette fonction crée un livre en base de données.
//  Elle prend userId, title, author, description et coverImage comme paramètres
const createBook = async (userId, title, author, description, coverImage) => {
return await Book.create({ userId, title, author, description, coverImage });
};

module.exports = { createBook };
