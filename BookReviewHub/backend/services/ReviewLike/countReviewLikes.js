const ReviewLike = require("../../models/ReviewLike");

//  Compter le nombre de likes pour une critique
const countReviewLikes = async (reviewId) => {
    return await ReviewLike.count({ where: { reviewId } });
};

module.exports = { countReviewLikes };
