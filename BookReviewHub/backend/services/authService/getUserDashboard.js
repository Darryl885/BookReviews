const Book = require("../../models/Book");
const Review = require("../../models/Review");
const ReviewLike = require("../../models/ReviewLike");

//  Récupérer le tableau de bord utilisateur
const getUserDashboard = async (userId) => {
    const booksAdded = await Book.findAll({ where: { userId } });
    const reviewsPublished = await Review.findAll({ where: { userId } });
    const likesReceived = await ReviewLike.count({
        where: { reviewId: reviewsPublished.map(review => review.id) }
    });

    return { booksAdded, reviewsPublished, likesReceived };
};

module.exports = { getUserDashboard };
