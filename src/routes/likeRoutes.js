const express = require("express");
const { addLikePostingan, removeLike } = require("../controllers/likeController");



const router = express.Router();


router.post("/", addLikePostingan);
router.delete("/:id", removeLike)

module.exports = router;