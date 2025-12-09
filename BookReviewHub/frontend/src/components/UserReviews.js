import React, { useEffect, useState, useContext } from "react";
import { getReviewsByUser } from "../services/reviewService";
import { AuthContext } from "../context/AuthContext";

const UserReviews = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true); //  Ajout d’un état de chargement

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (user) {
                    setLoading(true); //  Active le chargement
                    const data = await getReviewsByUser(user.id);
                    setReviews(data);
                }
            } catch (error) {
                console.error(" Erreur de chargement des critiques :", error);
            } finally {
                setLoading(false); //  Désactive le chargement après récupération des données
            }
        };

        fetchReviews();
    }, [user]); //  Dépendance dynamique pour recharger les critiques

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-3">📝 Mes critiques</h2>

            {loading ? (
                <p className="text-center text-muted">Chargement des critiques...</p>
            ) : reviews.length > 0 ? (
                <ul className="list-group">
                    {reviews.map((review) => (
                        <li key={review.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{review.Book?.title || "Livre inconnu"}</strong>
 — {review.content}
                            </div>
                            <span className="badge bg-primary">⭐ {review.rating}/5</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-muted">Aucune critique trouvée.</p>
            )}
        </div>
    );
};

export default UserReviews;
