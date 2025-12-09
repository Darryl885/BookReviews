import React, { useState, useEffect } from "react";
import { addReviewLike, countReviewLikes } from "../services/reviewLikeService";

const LikeButton = ({ userId, reviewId }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const count = await countReviewLikes(reviewId);
                setLikeCount(count);
            } catch (error) {
                console.error("❌ Erreur de chargement des likes :", error);
            }
        };

        fetchLikes();
    }, [reviewId]);

    const handleLike = async () => {
        try {
            await addReviewLike(userId, reviewId);
            setLiked(true);
            setLikeCount(likeCount + 1); // ✅ Augmente dynamiquement le compteur
        } catch (error) {
            console.error("❌ Erreur lors du like :", error);
        }
    };

    return (
        <div className="d-flex align-items-center">
            <button 
                className={`btn ${liked ? "btn-success" : "btn-outline-success"}`} 
                onClick={handleLike} 
                disabled={liked}
            >
                {liked ? "✅ Aimé" : "👍 J'aime"}
            </button>
            <span className="ms-2">❤️ {likeCount}</span> {/* ✅ Affiche le nombre de likes */}
        </div>
    );
};

export default LikeButton;

//Ajoute withCredentials: true pour gérer l’authentification via session. 
// ✅ Appelle GET /api/review-like/:reviewId pour récupérer le nombre de likes.

//Ajoute countReviewLikes(reviewId) pour récupérer le nombre de likes. 
//  Affiche le compteur avec ❤️ {likeCount} sous chaque critique. 
//  Mets à jour dynamiquement likeCount + 1 après un like/