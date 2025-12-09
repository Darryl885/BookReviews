import axios from "axios";

const API_URL = "http://localhost:5000/api/reviewlikes";

//  Ajouter un like à une critique
export const addReviewLike = async (userId, reviewId) => {
    try {
        const response = await axios.post(API_URL, { userId, reviewId }, { withCredentials: true });
        return response.data.like;
    } catch (error) {
        console.error(" Erreur lors de l'ajout du like :", error);
        throw error.response ? error.response.data : error;
    }
};

//  Récupérer le nombre de likes d'une critique
export const countReviewLikes = async (reviewId) => {
    try {
        const response = await axios.get(`${API_URL}/${reviewId}`, { withCredentials: true });
        return response.data.count;
    } catch (error) {
        console.error("❌ Erreur lors de la récupération du nombre de likes :", error);
        throw error.response ? error.response.data : error;
    }
};