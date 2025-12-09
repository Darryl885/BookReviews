import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Ajout du hook pour la redirection
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { FaHome, FaUser, FaSignOutAlt, FaBook, FaPenFancy, FaChartBar } from 'react-icons/fa'; // ✅ Ajout de l'icône pour le tableau de bord

const NavigationBar = ({ user, onLogout }) => {
    const navigate = useNavigate(); // ✅ Hook de navigation

    const handleLogout = () => {
        onLogout(); // ✅ Appelle la fonction `onLogout`
        navigate("/login"); // ✅ Redirige vers la page de connexion
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">BookReviewHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">
                            <FaHome className="me-1" /> Accueil
                        </Nav.Link>
                        <Nav.Link href="/profile">
                            <FaUser className="me-1" /> Profil
                        </Nav.Link>
                        <Nav.Link href="/dashboard"> {/* ✅ Ajout du lien vers le tableau de bord */}
                            <FaChartBar className="me-1" /> Tableau de bord
                        </Nav.Link>
                        <Nav.Link href="/add-book">
                            <FaBook className="me-1" /> Ajouter un livre
                        </Nav.Link>
                        <Nav.Link href="/add-review/:bookId">
                            <FaPenFancy className="me-1" /> Ajouter une critique
                        </Nav.Link>
                    </Nav>
                    {user && (
                        <Nav>
                            <Nav.Link onClick={handleLogout}>
                                <FaSignOutAlt className="me-1" /> Déconnexion
                            </Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
