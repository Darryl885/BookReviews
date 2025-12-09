import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); //  Stocke l'utilisateur
    const navigate = useNavigate();

    //  Récupérer la session au chargement
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch("http://localhost:5000/api/auth/me",
                 { method: "GET",
                     credentials: "include" });
            const userData = await response.json();
            if (userData.id) setUser(userData); //  Mettre à jour l'utilisateur si session existante
        };

        fetchUser();
    }, []);

    const login = (userData) => {
        setUser(userData); // Stocke l'utilisateur en mémoire après connexion
    };

    const logout = async () => {
        await fetch("http://localhost:5000/api/auth/logout",
             { method: "POST",
              credentials: "include" });
        setUser(null); //  Supprime l'utilisateur en mémoire
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
