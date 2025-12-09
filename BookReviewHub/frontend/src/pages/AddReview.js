import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ajout pour la redirection
import ReviewForm from "../components/ReviewForm";
import NavigationBar from "../components/Navbar";

const AddReviewPage = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate(); //  Hook de navigation

    //  Fonction appelée après l'ajout de la critique
    const handleReviewSuccess = () => {
        setSuccessMessage("Votre critique a été ajoutée avec succès !");
        setTimeout(() => {
            navigate("/"); //  Redirection automatique après 2 secondes
        }, 2000);
    };

    return (
        <div>
            <NavigationBar /> {/*  Ajout de la barre de navigation */}
            <div className="container mt-5">
                <div className="card shadow p-4">
                   

                    {/*  Affichage du message de succès */}
                    {successMessage && (
                        <div className="alert alert-success text-center" role="alert">
                            {successMessage}
                        </div>
                    )}

                    {/*  Passe `handleReviewSuccess` à `ReviewForm` */}
                    <ReviewForm onSuccess={handleReviewSuccess} />
                </div>
            </div>
        </div>
    );
};

export default AddReviewPage;
