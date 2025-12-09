const express = require("express");
const  getAllUsers  = require("../controllers/auth/getAllUsers");
const getUserDashboard = require("../controllers/auth/getUserDashboard")

const router = express.Router();

router.get("/users", getAllUsers.getAllUsers);
router.get("/users/:userId", getUserDashboard.getUserDashboard);


module.exports = router;