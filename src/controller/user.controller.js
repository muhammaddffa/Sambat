// Layer untuk handle request dan response
// Sering buat handle validasi body

const express = require("express");

const { PrismaClient } = require("@prisma/client");

const { accessValidation } = require("../middleware/authMiddleware");

const prisma = new PrismaClient();
const router = express.Router();

// CREATE User
router.post("/", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!password || !email) {
      return res.status(404).json({
        message: `password and email can't empty`
      })
    }
    const result = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    res.status(201).send({
      data: result,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error created user",
      error: error.message,
    });
  }
});

// Get User Id
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    res.status(201).send({
      status: 201,
      message: "Get user byId succesfuly",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error get by id users",
      error: error.message,
    });
  }
});

// GetAll User
router.get("/", accessValidation, async (req, res) => {
  try {
    const result = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(201).send({
      message: `Get user Succesfully`,
      status: 201,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error get users",
      error: error.message,
    });
  }
});

module.exports = router;
