const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const bookroutes = require('./routes/book.routes');
const reviewroutes = require('./routes/review.routes');
const reviewLikeroutes = require('./routes/reviewLike.routes');
const getUserDashboardroutes = require('./routes/getUserDashboard.routes')
const session = require("express-session");

dotenv.config(); // Chargement des variables d’environnement

const app = express();

// Middleware
app.use(cors({ 
    origin: "http://localhost:3000", //  Autorise uniquement le frontend local
    credentials: true //  Nécessaire pour gérer les sessions
}));
app.use(express.json()); // Parsing JSON

app.use(session({
    secret: process.env.SESSION_SECRET || "une_clé_sécurisée", //  Clé sécurisée pour signer les sessions
    resave: false,
    saveUninitialized: true, //  Permet d'initialiser `req.session`
    cookie: { secure: false, maxAge: 3600000 } //  Durée : 1h
}));

app.use('/api/auth', authRoutes); // Routes d’authentification
app.use("/api", userRoutes);
app.use("/api", bookroutes);
app.use("/api", reviewroutes);
app.use("/api", reviewLikeroutes);
app.use ("/api", getUserDashboardroutes)

app
// Connexion à la base de données
connectDB();

module.exports = app;
