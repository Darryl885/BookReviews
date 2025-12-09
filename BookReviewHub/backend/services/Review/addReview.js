const Review = require("../../models/Review");

//  Ajouter une critique
const addReview = async (userId, bookId, content, rating) => {
    return await Review.create({ userId, bookId, content, rating });
};

module.exports = {addReview};