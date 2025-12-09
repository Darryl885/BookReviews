import React, { useState, useEffect,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"; //  Utilise `useParams` pour récupérer l'ID
import Container from "react-bootstrap/Container";
import { getBooks } from "../services/BookServices"; //  Ajoute l'import manquant
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getBookById, updateBook } from "../services/BookServices";
import { BookContext } from "../context/BookContext";


//Récupère l'ID du livre avec useParams().
//   Charge les détails du livre existant via getBookById(). 
//  Gère la mise à jour avec updateBook()
const UpdateBook = () => {
    const { id } = useParams(); //  Récupère l'ID du livre à modifier
    const navigate = useNavigate();
     const { setBooks } = useContext(BookContext);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        coverImage: "",
    });
    const [message, setMessage] = useState(""); //  Message de confirmation

    //  Charge les données du livre à éditer
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const book = await getBookById(id);
                if (book) setFormData(book);
            } catch (error) {
                console.error("Erreur de chargement :", error);
            }
        };
        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const updatedBook = await updateBook(id, formData);
        console.log("✅ Livre mis à jour :", updatedBook);

        setMessage(`✅ Livre "${updatedBook.title}" mis à jour avec succès !`);

        // ✅ Recharger les livres après modification
        const refreshedBooks = await getBooks();
        setBooks(refreshedBooks);

        setTimeout(() => navigate("/"), 2000);
    } catch (error) {
        console.error("❌ Erreur lors de la mise à jour :", error);
        setMessage("❌ Échec de la mise à jour.");
    }
};




    return (

        <> 
            <NavigationBar/>
        <Container className="mt-4 d-flex justify-content-center">
            <div className="w-50">
                <h2 className="text-center">Modifier un Livre</h2>
                {message && <p className="text-success text-center">{message}</p>}
                
                <Form onSubmit={handleSubmit} className="bg-dark text-light p-4 rounded">
                    <Form.Group controlId="title">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="author" className="mt-3">
                        <Form.Label>Auteur</Form.Label>
                        <Form.Control type="text" name="author" value={formData.author} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="description" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="coverImage" className="mt-3">
                        <Form.Label>Image de couverture (URL)</Form.Label>
                        <Form.Control type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} />
                    </Form.Group>

                    <div className="text-center mt-4">
                        <Button variant="light" type="submit">
                            Modifier le livre
                        </Button>
                    </div>
                    <div className="text-center mt-4">
    <Button variant="light" type="submit">
        Modifier le livre
    </Button>
    <Button variant="secondary" className="ms-3" onClick={() => navigate("/")}> {/*  Ajoute Annuler */}
        Annuler
    </Button>
</div>

                </Form>
            </div>
        </Container>
        <Footer/>
        </>
    );
};

export default UpdateBook;
