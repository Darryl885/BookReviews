const ReviewLike = require("../../models/ReviewLike");

//  Ajouter un like
const addReviewLike = async (userId, reviewId) => {
    return await ReviewLike.create({ userId, reviewId });
};

module.exports = { addReviewLike };
