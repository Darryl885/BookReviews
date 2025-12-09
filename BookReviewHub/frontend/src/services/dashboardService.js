import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

// ✅ Correction de l'URL
export const getUserDashboard = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`, { withCredentials: true }); // ✅ Supprime `:userId` de l'URL
        return response.data.data;
    } catch (error) {
        console.error("❌ Erreur lors de la récupération du tableau de bord :", error);
        throw error.response ? error.response.data : error;
    }
};
