const express = require("express");
const { addLikePostingan } = require("../controllers/likeController");
 


const router = express.Router();


router.post("/", addLikePostingan);

module.exports = router;