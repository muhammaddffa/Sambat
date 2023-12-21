const express = require('express');
const prisma = require("../db");

const router = express.Router(); 
 
 // Count comment based on post id
  router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    try {
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
        message: "Error fetching users",
        error: error.message,
      });
    }
  });

  module.exports = router;