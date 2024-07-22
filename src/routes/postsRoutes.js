const express = require("express");
const { getPost, createPostById, softDeletePost } = require("../controllers/postsController");



const router = express.Router();

//Create Post
router.post("/", createPostById);

//getAllPost
router.get("/", getPost);


router.put('/:postId/soft-delete', softDeletePost);



module.exports = router;