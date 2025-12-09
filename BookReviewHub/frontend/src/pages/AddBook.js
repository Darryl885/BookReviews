import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import NavigationBar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext"; //  Ajoute le contexte d'authentification

const AddBook = () => {
    const [message, setMessage] = useState(""); //  Gère le message de succès
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); //  Récupère l'utilisateur connecté

    const handleBookSubmit = async (bookData) => {
        try {
            if (!user?.id) {
                console.error(" Aucun utilisateur connecté. Impossible d'ajouter un livre.");
                setMessage(" Vous devez être connecté pour ajouter un livre.");
                return;
            }

            const bookToSend = { ...bookData, userId: user.id }; //  Ajoute `userId` aux données

            const response = await fetch("http://localhost:5000/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookToSend),
                credentials: "include",
            });

            const responseText = await response.text();
            console.log("🔍 Réponse brute du serveur :", responseText);

            if (!response.ok) throw new Error(`Erreur HTTP ${response.status}: ${responseText}`);

            const newBook = JSON.parse(responseText);
            console.log(" Livre ajouté en BD :", newBook);

            setMessage(" Livre ajouté avec succès !");
            
            setTimeout(() => {
                navigate("/"); //  Redirige après 2s
            }, 2000);
        } catch (error) {
            console.error("❌ Erreur d'ajout :", error);
            setMessage("❌ Échec de l'ajout du livre.");
        }
    };

    return (
        <>
            <NavigationBar /> {/*  Ajout de la barre de navigation */}
            <div className="text-center">
                <h1>Ajout d'un Livre</h1>
                {message && <p className="text-success">{message}</p>} {/*  Affichage du message de succès */}
                <BookForm onSubmit={handleBookSubmit} />
            </div>
        </>
    );
};

export default AddBook;
