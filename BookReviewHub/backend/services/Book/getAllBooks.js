const Book = require("../../models/Book");
const User = require("../../models/user.model");

const getAllBooks = async () => {
    return await Book.findAll({
        include: [{ model: User, attributes: ["id", "name", "email"] }] 
        });
};

module.exports = { getAllBooks };
