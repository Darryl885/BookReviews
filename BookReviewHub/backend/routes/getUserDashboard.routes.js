const express = require('express');

const getUserDashboard = require('../controllers/auth/getUserDashboard')



const router = express.Router();

router.get("/dashboard/:userId",getUserDashboard.getUserDashboard )


module.exports = router;