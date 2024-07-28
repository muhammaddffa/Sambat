const express = require("express");
const { createCommentByPostId, getAllComment, commentByPostId, getPaginationComment } = require("../controllers/commentController");

const router = express.Router();


router.post("/:id", createCommentByPostId);

router.get('/pagination/:skip/:take', getPaginationComment)

router.get("/", getAllComment);

router.get("/:postId", commentByPostId);

module.exports = router;