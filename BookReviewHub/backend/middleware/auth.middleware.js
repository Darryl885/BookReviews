const verifySession = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Accès refusé. Veuillez vous connecter." });
    }
    
    req.user = req.session.user; //  Ajoute l'utilisateur à la requête pour les contrôleurs suivants
    next();
};

module.exports = verifySession;
