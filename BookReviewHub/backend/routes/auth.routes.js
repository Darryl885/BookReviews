const express = require('express');
const loginUser = require('../controllers/auth/loginUser');
const  getProfile  = require("../controllers/auth/getProfile");
const registerUser = require('../controllers/auth/registerUser');
const verifySession = require('../middleware/auth.middleware');
const logout  = require('../controllers/auth/logout');






const router = express.Router();

router.post('/register', registerUser.register);
router.post('/login', loginUser.login);
router.post('/logout', verifySession, logout.logout);
router.get("/me", verifySession, getProfile.getProfile);


// router.get('/profile', verifyToken, authController.getProfile); // Route protégée

module.exports = router;
