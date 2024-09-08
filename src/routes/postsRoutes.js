const express = require("express");
const { getPost, createPostById, softDeletePost, getPostDetail, getPostByCategory } = require("../controllers/postsController");



const router = express.Router();

//Create Post
router.post("/", createPostById);

//getAllPost
router.get("/", getPost);


router.put('/:postId/soft-delete', softDeletePost);

router.get('/:postId/detail', getPostDetail);

router.get('/category/:categoryId', getPostByCategory);




module.exports = router;