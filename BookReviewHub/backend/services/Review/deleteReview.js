const Review = require("../../models/Review");

//  Supprimer une critique
const deleteReview = async (id) => {
    const review = await Review.findByPk(id);
    if (!review) return null;
    
    await review.destroy();
    return review;
};

module.exports = { deleteReview };
