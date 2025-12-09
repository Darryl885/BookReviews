import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await registerUser(formData);
        if (response.success) {
            setMessage("Inscription réussie !");
        } else {
            setMessage("Une erreur est survenue, veuillez réessayer.");
        }
    };

    return (
        <div className="container text-center mt-5">
            <div className="card shadow-sm p-4 bg-light">
                <h2 className="mb-4">Créer un compte</h2>
                {message && <div className="alert alert-success">{message}</div>}
                <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                    <input type="text" className="form-control w-75 mb-2" placeholder="Nom" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <input type="email" className="form-control w-75 mb-2" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <input type="password" className="form-control w-75 mb-3" placeholder="Mot de passe" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    <button type="submit" className="btn btn-success w-50">S'inscrire</button>
                </form>
                <p className="mt-3">Déjà inscrit ? <Link to="/login" className="text-primary fw-bold">Se connecter</Link></p>
            </div>
        </div>
    );
};

export default Register;
