import React, { useEffect, useState, useContext } from "react";
import { getReviewsByBook } from "../services/reviewService";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/AuthContext"; //  Importer `AuthContext`

const BookReviews = ({ bookId }) => {
    const { user } = useContext(AuthContext); //  Récupérer `user`
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const data = await getReviewsByBook(bookId);
                setReviews(data);
            } catch (error) {
                console.error(" Erreur de chargement des critiques :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [bookId]);

    return (
        <div className="mt-3">
            <h4>💬 Avis des lecteurs</h4>

            {loading ? (
                <p className="text-muted">Chargement des critiques...</p>
            ) : reviews.length > 0 ? (
                <ul className="list-group">
                    {reviews.map((review) => (
                        <li key={review.id} className="list-group-item">
                            <p>
                                <strong>{review.User ? review.User.name : "Utilisateur inconnu"}</strong> : {review.content}
                            </p>
                            <span className="badge bg-primary">⭐ {review.rating}/5</span>
{/* ✅ Ajoute le bouton "J'aime" et le compteur sous chaque critique */}
        <LikeButton userId={user?.id} reviewId={review.id} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted">Aucune critique trouvée.</p>
            )}
        </div>
    );
};

export default BookReviews;

//Ajoute import { AuthContext } from "../context/AuthContext"; 
// Utilise const { user } = useContext(AuthContext); pour récupérer l’utilisateur connecté. 
//  Corrige l’erreur user is not defined en le passant correctement à LikeButton.js