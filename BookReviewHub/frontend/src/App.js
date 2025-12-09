import { AuthProvider } from "./context/AuthContext";
import { BookContext } from "./context/BookContext";
import { ReviewContext } from "./context/ReviewContext"; //  Vérifie l'import du contexte des critiques
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./pages/Profile";
import AddBook from "./pages/AddBook";
import AddReviewPage from "./pages/AddReview"; //  Mise à jour pour `AddReviewPage`
import UpdateBook from "./pages/UpdateBook";
import { useState } from "react";
import { addReview } from "./services/reviewService";

function App() {
    const [books, setBooks] = useState([]); //  Stocke la liste des livres
    const [reviews, setReviews] = useState([]); //  Stocke la liste des critiques

    //  Fonction d'ajout d'une critique pour le contexte
   const handleAddReview = async (bookId, reviewData) => {
    try {
        const response = await addReview(bookId, reviewData);
        setReviews([...reviews, response.review]); //  Ajoute la critique sans rechargement
    } catch (error) {
        console.error(" Erreur lors de l'ajout de la critique :", error);
    }
};


    return (
        <BrowserRouter>
            <AuthProvider>
                <BookContext.Provider value={{ books, setBooks }}>
                    <ReviewContext.Provider value={{ reviews, setReviews, handleAddReview }}> {/* ✅ Ajout `handleAddReview` */}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} /> {/* ✅ Ajout de la route `/register` */}
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Ajout de la route Dashboard */}
                            <Route path="/add-book" element={<AddBook />} />
                            <Route path="/add-review/:bookId" element={<AddReviewPage />} /> {/* ✅ Passe `bookId` dynamiquement */}
                            <Route path="/update-book/:id" element={<UpdateBook />} />
                        </Routes>
                    </ReviewContext.Provider>
                </BookContext.Provider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
