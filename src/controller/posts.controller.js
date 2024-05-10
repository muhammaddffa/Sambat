const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// CREATE Post
router.post("/", async (req, res) => {
  const {content, userId} = req.body;
  // const data = req.body;
  try {
    const result = await prisma.post.create({
      data:{
        content: content,
        userId: userId
      }
    });
    res.status(201).send({
      data: result,
      message: `post successfuly`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error get post",
      error: error.message,
    });
  }
});

// GET Post
router.get("/", async (req, res) => {
  try {
    const result = await prisma.post.findMany({
      select: {
        id: true,
        // userId: true,
        content: true,
      },
    });
    res.status(201).send({
      data: result,
      message: "Get all post Succceess",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

module.exports = router;
