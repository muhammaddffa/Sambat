const express = require("express");
const { addLikePostingan, removeLike, countLike } = require("../controllers/likeController");



const router = express.Router();


router.post("/", addLikePostingan);
router.delete("/:id", removeLike)
router.get("/:postId", countLike)

module.exports = router;