const express = require("express");
const { loginUser } = require("../controllers/loginController");
const { route } = require("./userRoutes");


const router = express.Router();


router.post("/", loginUser)

module.exports = router;