//Gère POST, GET, DELETE avec fetch().
//  Ajout credentials: "include" pour gérer l’authentification via session.

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/books";

//  Créer un livre
export const createBook = async (bookData) => {
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
        credentials: "include",
    });

    if (!response.ok) throw new Error("Erreur lors de l'ajout du livre.");
    return response.json();
};

//  Récupérer tous les livres
export const getBooks = async () => {
    const response = await fetch(`${API_URL}`, { credentials: "include" });
    if (!response.ok) throw new Error("Erreur lors du chargement des livres.");
    return response.json();
};

//  Récupérer un livre par ID
export const getBookById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { credentials: "include" });
    if (!response.ok) throw new Error("Livre non trouvé.");
    return response.json();
};

//  Supprimer un livre
export const deleteBook = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) throw new Error("Erreur lors de la suppression.");
    return response.json();
};

// Mettre à jour un livre
export const updateBook = async (id, bookData) => {
    console.log("🛠 Envoi vers l'API avec ID :", id, "et données :", bookData); // ✅ Vérification

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
        credentials: "include",
    });

    if (!response.ok) throw new Error("Erreur lors de la mise à jour du livre.");
    return response.json();
};

