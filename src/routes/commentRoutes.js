const express = require("express");
const { createCommentByPostId, getAllComment, commentByPostId } = require("../controllers/commentController");

const router = express.Router();


router.post("/:id", createCommentByPostId);
router.get("/", getAllComment);

router.get("/:postId", commentByPostId);

module.exports = router;