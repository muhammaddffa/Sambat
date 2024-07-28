const express = require("express");
const { getPost, createPostById, softDeletePost, getPostDetail } = require("../controllers/postsController");



const router = express.Router();

//Create Post
router.post("/", createPostById);

//getAllPost
router.get("/", getPost);


router.put('/:postId/soft-delete', softDeletePost);

router.get('/:postId/detail', getPostDetail);




module.exports = router;