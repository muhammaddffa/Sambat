const express = require('express');
const prisma = require("../db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();



const { accessValidation } = require("../middleware/authMiddleware");

  // REGISTER
  router.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });
      res.status(201).send({
        data: result,
        message: `User Created`,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error creating user",
        error: error.message,
      });
    }
  });
  


  module.exports = router;