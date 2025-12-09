import axios from "axios";

const API_URL = "http://localhost:5000/api/reviews";

//  Ajouter une critique (sans `userId` et `bookId`)
export const addReview = async (bookId, reviewData) => {
    try {
        const response = await axios.post(`${API_URL}/${bookId}`, reviewData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout de la critique :", error);
        throw error.response ? error.response.data : error;
    }
};

//Ajoute withCredentials: true pour envoyer automatiquement les cookies de session. 
//  Modifie l'URL pour inclure bookId (POST /api/reviews/:bookId)



//  Récupérer toutes les critiques d'un utilisateur
export const getReviewsByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`, { withCredentials: true });
        return response.data.reviews;
    } catch (error) {
        console.error(" Erreur lors de la récupération des critiques :", error);
        throw error.response ? error.response.data : error;
    }
};

//  Récupérer toutes les critiques d'un livre
export const getReviewsByBook = async (bookId) => {
    try {
        const response = await axios.get(`${API_URL}/book/${bookId}`, { withCredentials: true });
        return response.data.reviews;
    } catch (error) {
        console.error(" Erreur lors de la récupération des critiques :", error);
        throw error.response ? error.response.data : error;
    }
};

// Ajoute withCredentials: true pour envoyer automatiquement le cookie de session. 
//  Appelle GET /api/reviews/user/:userId comme défini dans ton backend.
//   Retourne reviews extraites de la réponse API