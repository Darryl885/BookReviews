const Review = require("../../models/Review");
const Book = require("../../models/Book");

//  Récupérer toutes les critiques d'un utilisateur
const getReviewsByUser = async (userId) => {
    return await Review.findAll({
        //include: [{ model: Book, attributes: ["id", "title", "author"] }] 
        // pour récupérer les infos du livre associé à la critique.
        where: { userId },
        include: [{ model: Book, attributes: ["id", "title", "author"] }], //  Ajoute les infos du livre
        //Trie les critiques par date (order: [["createdAt", "DESC"]]) 
        // pour afficher les plus récentes en premier
        order: [["createdAt", "DESC"]] //  Trie par date décroissante
    });
};

module.exports = { getReviewsByUser };
