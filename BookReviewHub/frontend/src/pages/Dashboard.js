import React, { useEffect, useState, useContext } from "react";
import { getUserDashboard } from "../services/dashboardService";
import NavigationBar from "../components/Navbar"; // ✅ Vérifie l'import correct
import Footer from "../components/Footer"; // ✅ Ajout du footer
import { AuthContext } from "../context/AuthContext";
import { FaStar, FaBook, FaPen } from "react-icons/fa"; // Icônes

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                if (user?.id) {
                    setLoading(true);
                    const data = await getUserDashboard(user.id);
                    setDashboardData(data);
                }
            } catch (error) {
                console.error("❌ Erreur de chargement du tableau de bord :", error);
                setError("Impossible de charger les données du tableau de bord.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [user?.id]);

    return (
        <>
            <NavigationBar /> {/* ✅ Intégration de la barre de navigation */}

            <div className="container mt-5">
                <h2 className="text-center mb-4">📊 Mon tableau de bord</h2>

                {loading ? (
                    <div className="text-center text-muted">Chargement des données...</div>
                ) : error ? (
                    <div className="alert alert-danger text-center">{error}</div>
                ) : dashboardData ? (
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card text-white bg-primary h-100">
                                <div className="card-body d-flex align-items-center">
                                    <FaPen size={30} className="me-3" />
                                    <div>
                                        <h5 className="card-title">Critiques publiées</h5>
                                        <p className="card-text fs-4">{dashboardData.reviewsPublished?.length || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card text-white bg-success h-100">
                                <div className="card-body d-flex align-items-center">
                                    <FaBook size={30} className="me-3" />
                                    <div>
                                        <h5 className="card-title">Livres ajoutés</h5>
                                        <p className="card-text fs-4">{dashboardData.booksAdded?.length || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card text-white bg-warning h-100">
                                <div className="card-body d-flex align-items-center">
                                    <FaStar size={30} className="me-3" />
                                    <div>
                                        <h5 className="card-title">Likes reçus</h5>
                                        <p className="card-text fs-4">{dashboardData.likesReceived || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="alert alert-info text-center">Aucune donnée disponible.</div>
                )}
            </div>

            <Footer /> {/* ✅ Ajout du footer */}
        </>
    );
};

export default Dashboard;
