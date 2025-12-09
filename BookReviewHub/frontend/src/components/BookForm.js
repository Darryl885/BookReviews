import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //  Ajout de `useNavigate`
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const BookForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        coverImage: "",
    });

    const [message, setMessage] = useState(""); //  État pour gérer le message de succès
    const navigate = useNavigate(); //  Hook pour rediriger l'utilisateur

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = await onSubmit(formData); //  Récupère la réponse de l'API

    if (newBook) {
        setMessage(" Livre ajouté avec succès !");
        
        setTimeout(() => {
            navigate("/"); //  Redirige après 2s
        }, 2000);
    }
};


    return (
        <Container className="mt-4 d-flex justify-content-center">
            <div className="w-50"> {/*  Définit une largeur normale et centrée */}
              

                {message && <p className="text-success text-center">{message}</p>} {/*  Affichage du message de succès */}

                <Form onSubmit={handleSubmit} className="bg-dark text-light p-4 rounded">
                    <Form.Group controlId="title">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" name="title" placeholder="Titre du livre" onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="author" className="mt-3">
                        <Form.Label>Auteur</Form.Label>
                        <Form.Control type="text" name="author" placeholder="Auteur du livre" onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="description" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" placeholder="Résumé du livre" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="coverImage" className="mt-3">
                        <Form.Label>Image de couverture (URL)</Form.Label>
                        <Form.Control type="text" name="coverImage" placeholder="Lien vers l'image de couverture" onChange={handleChange} />
                    </Form.Group>

                    <div className="text-center mt-4">
                        <Button variant="light" type="submit">
                            Ajouter le livre
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default BookForm;
