import React, { createContext, useState } from "react";
import { addReview } from "../services/reviewService";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);

    const handleAddReview = async (bookId, reviewData) => {
        try {
            const newReview = await addReview(bookId, reviewData);
            setReviews([...reviews, newReview.review]);
        } catch (error) {
            console.error(" Erreur lors de l'ajout de la critique :", error);
        }
    };

    return (
        <ReviewContext.Provider value={{ reviews, handleAddReview }}>
            {children}
        </ReviewContext.Provider>
    );
};
