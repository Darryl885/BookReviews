const Joi = require("joi");
const userDashboardService = require("../../services/authService/getUserDashboard");

//  Schéma de validation avec Joi
const userIdSchema = Joi.object({
    userId: Joi.number().integer().required(),
});

//  Récupérer le tableau de bord utilisateur
const getUserDashboard = async (req, res) => {
    try {
        //  Validation du `userId`
        const { error } = userIdSchema.validate(req.params);
        if (error) return res.status(400).json({ message: error.message });

        //  Récupération des données du tableau de bord
        const { userId } = req.params;
        const dashboardData = await userDashboardService.getUserDashboard(userId);

        res.status(200).json({ message: "Tableau de bord récupéré avec succès", data: dashboardData });
    } catch (error) {
        console.error(" Erreur lors de la récupération du tableau de bord :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

module.exports = { getUserDashboard };
