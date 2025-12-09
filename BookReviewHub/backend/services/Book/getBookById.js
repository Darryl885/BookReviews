const Book = require("../../models/Book");
const User = require("../../models/user.model");


// Utilise findByPk(id) pour récupérer un livre spécifique.
//   Inclut User pour afficher les informations sur l’auteur du livre (name, email).
const getBookById = async (id) => {
    return await Book.findByPk
    (id, { include: [{ model: User, attributes: ["id", "name", "email"] }] });
     console.log("🔍 Livre récupéré :", book);
};

module.exports = { getBookById };
