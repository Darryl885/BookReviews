const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return response.json();
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Error Response:", errorData); // Log de la réponse d'erreur
            throw new Error(`Erreur HTTP ${response.status}: ${errorData.message}`);
        }

        const data = await response.json();
        console.log("Success Response:", data); // Log de la réponse de succès
        console.log("Cookies:", document.cookie); // Log des cookies
        return data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        return { error: error.message };
    }
};



