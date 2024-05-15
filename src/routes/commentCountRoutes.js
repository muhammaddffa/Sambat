const express = require("express");
const { countCommentByOnPostId } = require("../controllers/commentCountController");

const router = express.Router();


router.get("/:postId", countCommentByOnPostId);


module.exports = router;