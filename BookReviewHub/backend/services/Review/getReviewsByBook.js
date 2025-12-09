const Review = require("../../models/Review");
const User = require("../../models/user.model");

//  Récupérer toutes les critiques d'un livre
const getReviewsByBook = async (bookId) => {
    return await Review.findAll({
        where: { bookId },
        include: [{ model: User, attributes: ["id", "name"] }], //  Ajoute les infos de l'utilisateur
        order: [["createdAt", "DESC"]] //  Trie par date décroissante
    });
};

module.exports = { getReviewsByBook };
