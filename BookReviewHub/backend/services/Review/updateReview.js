const Review = require("../../models/Review");

//  Mettre à jour une critique
const updateReview = async (id, data) => {
    const review = await Review.findByPk(id);
    if (!review) return null;
    
    await review.update(data);
    return review;
};

module.exports = { updateReview };

//Vérifie que la critique existe avant de la modifier (findByPk(id)). 
//  Met à jour uniquement les champs envoyés (review.update(data)).