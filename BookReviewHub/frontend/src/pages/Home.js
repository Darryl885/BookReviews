import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getBooks, getBookById } from "../services/BookServices"; //  Ajout de `getBookById`
import { loginUser } from "../services/authService";
import BookReviews from "../components/BookReviews";
import { Link } from "react-router-dom";
import NavigationBar from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    const { user, login, logout } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null); //  État pour le livre sélectionné

    // Ajoute un état books pour stocker la liste des livres.
    //   Charge tous les livres au démarrage (useEffect).
    //  Affiche les livres sous forme de list-group-item
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (error) {
                console.error("Erreur de chargement des livres :", error);
            }
        };
        fetchBooks();
    }, []);
//  Si on clique sur un livre déjà sélectionné, il redevient null. 
// Sinon, il charge les détails normalement.
    const handleBookClick = async (id) => {
    if (selectedBook?.id === id) {
        setSelectedBook(null); //  Annule la sélection si le même livre est recliqué
        return;
    }

    try {
        const bookDetails = await getBookById(id);
        setSelectedBook(bookDetails);
    } catch (error) {
        console.error("Erreur de récupération du livre :", error);
    }
};


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser(credentials);
        if (response.id) {
            login(response);
        }
    };

    return (
        <>
            <NavigationBar user={user} onLogout={logout} />

            <Container className="mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Bienvenue sur BookReviewHub</h2>
                                {user ? (
                                    <>
                                        <p className="text-center">Connecté en tant que {user.name}</p>
                                        <h3 className="mt-4">📚 Liste des livres</h3>
                                        <ul className="list-group">
                                            {books.map((book) => (
                                                <li
                                                    key={book.id}
                                                    className="list-group-item"
                                                    onClick={() => handleBookClick(book.id)} //  Ajout du clic sur un livre
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <strong>{book.title}</strong> — {book.author}
                                                </li>
                                            ))}
                                        </ul>

                                        {/*  Affichage des détails du livre sélectionné */}
{selectedBook && (
    <div className="mt-4 p-4 border text-center bg-light rounded shadow">
        <h3 className="text-primary">{selectedBook.title}</h3>
        <p className="fw-bold">Auteur : {selectedBook.author}</p>
        <p className="text-muted">{selectedBook.description || "Aucune description disponible."}</p>

        {selectedBook.coverImage ? (
            <a href={selectedBook.coverImage.startsWith("http") ? selectedBook.coverImage : "#"} target="_blank" rel="noopener noreferrer">
                <img
                    src={selectedBook.coverImage}
                    alt={selectedBook.title}
                    className="img-fluid mt-3 rounded shadow"
                    style={{ maxWidth: "200px", maxHeight: "300px", objectFit: "cover" }} //  Assure une bonne mise en page
                />
            </a>
        ) : (
            <p className="text-danger">Aucune image disponible.</p>
        )}
      
         {/*  Intégration des critiques sous le livre */}
        <BookReviews bookId={selectedBook.id} />
        
    </div>
)}

                                    </>
                                ) : (
                                    <div>
                                        <p className="text-center">Veuillez vous connecter.</p>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Mot de passe"
                                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100">Se connecter</button>
                                        </form>
                                        <p className="text-center mt-3">
                                            Pas encore inscrit ? <Link to="/register">Créer un compte</Link>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Footer />
        </>
    );
};

export default Home;
