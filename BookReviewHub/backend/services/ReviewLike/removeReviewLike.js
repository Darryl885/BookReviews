const ReviewLike = require("../../models/ReviewLike");

//  Supprimer un like
const removeReviewLike = async (userId, reviewId) => {
    const like = await ReviewLike.findOne({ where: { userId, reviewId } });
    if (!like) return null;
    
    await like.destroy();
    return like;
};

module.exports = { removeReviewLike };
