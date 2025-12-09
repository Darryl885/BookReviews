import React, { useState, useContext } from "react";
import { ReviewContext } from "../context/ReviewContext";
import { useParams } from "react-router-dom"; //  Récupère `bookId` dynamiquement depuis l'URL

const ReviewForm = () => {
    const { handleAddReview } = useContext(ReviewContext);
    const { bookId } = useParams(); //  Obtient `bookId` dynamiquement depuis l'URL

    const [reviewData, setReviewData] = useState({ content: "", rating: "" });
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleAddReview(bookId, reviewData); //  Passe `bookId` récupéré automatiquement
        setReviewData({ content: "", rating: "" });
        setSuccessMessage("Votre critique a été ajoutée avec succès !");

        //  Redirection après succès
        setTimeout(() => {
            window.location.href = "/"; //  Redirige vers la page d’accueil
        }, 2000);
    };

    return (
        <div className="container mt-4 d-flex justify-content-center"> {/* ✅ Centrage dynamique */}
            <div className="card p-4 shadow w-75"> {/* ✅ Largeur adaptative */}
                <h2 className="text-center">Ajouter une critique</h2>

                {/* ✅ Message de succès */}
                {successMessage && (
                    <div className="alert alert-success text-center" role="alert">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Contenu</label>
                        <textarea
                            name="content"
                            className="form-control"
                            rows="3"
                            value={reviewData.content}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Note (1 à 5)</label>
                        <select
                            name="rating"
                            className="form-select"
                            value={reviewData.rating}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choisir une note</option>
                            <option value="1">1 - Mauvais</option>
                            <option value="2">2 - Passable</option>
                            <option value="3">3 - Moyen</option>
                            <option value="4">4 - Bon</option>
                            <option value="5">5 - Excellent</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Envoyer</button>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;
