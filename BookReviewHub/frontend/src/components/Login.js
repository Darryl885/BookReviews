import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 Import pour la redirection
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); //  Hook pour rediriger


const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await loginUser(credentials);

    if (userData.error) {
        setMessage(userData.error);
    } else {
        login(userData.user); // Stocke l'utilisateur en mémoire
        setMessage("Connexion réussie !");
        setTimeout(() => {
            navigate("/");
        }, 1000);
    }
};

    return (
        <div className="container text-center mt-5">
            <div className="card shadow-sm p-4 bg-light">
                <h2 className="mb-4">Connexion à votre compte</h2>
            {message && <div className={`alert ${message === "Connexion réussie !" ? "alert-success" : "alert-danger"}`}>{message}</div>}
                <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                    <input type="email" className="form-control w-75 mb-2" placeholder="Email" onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                    <input type="password" className="form-control w-75 mb-3" placeholder="Mot de passe" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                    <button type="submit" className="btn btn-primary w-50">Se connecter</button>
                </form>
                <p className="mt-3">Pas encore inscrit ? <Link to="/register" className="text-primary fw-bold">Créer un compte</Link></p>
            </div>
        </div>
    );
};

export default Login;
