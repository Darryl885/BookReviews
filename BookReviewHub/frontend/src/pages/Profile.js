import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/Navbar";
import UserReviews from "../components/UserReviews"; //  Ajout du composant

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
            logout();
            navigate("/login");
        }
    };

    return (
        <div>
            <NavigationBar />
            <div className="container mt-5">
                <h2>Mon Profil</h2>

                {user ? (
                    <div className="card shadow-sm p-4 bg-light">
                        <p><strong>Nom:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <button onClick={handleLogout} className="btn btn-danger">Se déconnecter</button>
                    </div>
                ) : (
                    <div className="alert alert-warning text-center p-3">
                        <p>Veuillez vous connecter.</p>
                        <button className="btn btn-primary" onClick={() => navigate("/login")}>Aller à la connexion</button>
                    </div>
                )}

                {/* ✅ Ajout de l'espace critiques sous le profil */}
                {user && <UserReviews />} 
            </div>
        </div>
    );
};

export default Profile;
