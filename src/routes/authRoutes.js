const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { refreshToken, logoutUser } = require("../controllers/tokenContoller");
const { accessValidation } = require("../middleware/authMiddleware");

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

router.post("/refresh-token", refreshToken)
router.post("/logout",accessValidation, logoutUser)

module.exports = router;
