const express = require("express");
const {
  getAllUsers,
  createUser,
  getUserById,
} = require("../controllers/userController");

const { accessValidation } = require("../middleware/authMiddleware");

const router = express.Router();

//CreateUser
router.post("/", createUser);

//GetUserById
router.get("/:id", getUserById);

//GetAllUsers
router.get("/", accessValidation, getAllUsers);

module.exports = router;
