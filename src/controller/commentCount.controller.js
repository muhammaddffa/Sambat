const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Count comment based on post id
router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentCount = await prisma.comment.count({
      where: {
        postId: postId,
      },
    });
    res.status(201).send({
      count: commentCount,
      message: "Count Comment",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error count users",
      error: error.message,
    });
  }
});

module.exports = router;
