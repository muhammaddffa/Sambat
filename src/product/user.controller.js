// Layer untuk handle request dan response
// Sering buat handle validasi body

const express = require('express');
const prisma = require("../db");

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const { accessValidation } = require("../middleware/authMiddleware");


const router = express.Router();

  // CREATE User
  router.post("/", async (req, res) => {
    const { name, password, email } = req.body;
    try {
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
        message: "Error creating user",
        error: error.message,
      });
    }
  });
  
  // Get User Id
  router.get("/:id", async (req, res) => {
    const userId = req.params.id
    try {
      const result = await prisma.user.findUnique({
        where:{
          id: userId,
        }
      });
      res.status(201).send({
        data: result,
        message: "Create comment succesfuly"
      })
    } catch (error) {
      res.status(500).json({
        message: "Error fetching users",
        error: error.message,
      });
    }
  })
  
  // GetAll User
  router.get("/", accessValidation , async (req, res) => {
    try {
      const result = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true
        },
      });
      res.status(201).send({
        data: result,
        message: `Get user Succesfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching users",
        error: error.message,
      });
    }
  });
  
 

  module.exports = router;