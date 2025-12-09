import React from "react";
import Container from "react-bootstrap/Container";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-3 mt-5">
            <Container className="text-center">
                <p>&copy; {new Date().getFullYear()} BookReviewHub. Tous droits réservés.</p>

                {/*  Ajout des liens sociaux */}
                <div className="d-flex justify-content-center gap-3">
                    <a href="https://twitter.com/BookReviewHub" className="text-light" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={20} /> Twitter
                    </a>
                    <a href="https://linkedin.com/company/BookReviewHub" className="text-light" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={20} /> LinkedIn
                    </a>
                    <a href="mailto:contact@bookreviewhub.com" className="text-light">
                        <FaEnvelope size={20} /> Contact
                    </a>
                </div>

                <p className="mt-2">
                    <a href="/about" className="text-light">À propos</a> | 
                    <a href="/privacy" className="text-light"> Confidentialité</a> | 
                    <a href="/terms" className="text-light"> Conditions</a>
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
