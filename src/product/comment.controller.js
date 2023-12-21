const express = require('express');
const prisma = require("../db");

const router = express.Router();
 
 
 // Create Comment
 router.post("/:id", async (req, res) => {
    const {name, password, comment} = req.body;
    const postId = req.params.id
    try {
      const result = await prisma.comment.create({
        data:{
          postId,
          comment,
        }
      })
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
  });
  
  // GET Comment
  // postId di tambahin
  router.get("/", async (req, res) => {
    try {
      const result = await prisma.comment.findMany({
        select: {
          id: true,
          comment: true,
        },
      });
      res.status(201).send({
        comment: result,
        message: "Get all comment succesfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching users",
        error: error.message,
      });
    }
  });
  
  router.get("/:postId", async (req, res) => {
    const { postId } = req.params;
    try {
      const result = await prisma.comment.findMany({
        where: {
          postId: postId,
        },
        select:{
          id: true,
          comment: true,
        }
      })
      res.status(201).send({
        comments: result,
        message: "Comment postId successfully" 
      })
    } catch (error) {
      res.status(500).json({
        message: "Error fetching users",
        error: error.message,
      });
    }
  })

  module.exports = router;