const express = require("express");
const { getPost, createPostById } = require("../controllers/postsController");



const router = express.Router();

//Create Post
router.post("/", createPostById);

//getAllPost
router.get("/", getPost);


module.exports = router;