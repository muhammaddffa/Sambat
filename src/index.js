const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

const productConttroller = require("./controller/user.controller");
const postsController = require("./controller/posts.controller");
const commentController = require("./controller/comment.controller");
const commentCountController = require("./controller/commentCount.controller");
const register = require("./controller/register.Controller");
const login = require("./controller/login.Controller");

app.get("/", async (req, res) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/api/users", productConttroller);
app.use("/api/posts", postsController);
app.use("/api/comment", commentController);
app.use("/api/count/comment", commentCountController);
app.use("/api/register", register);
app.use("/api/login", login);

app.listen(PORT, () => {
  console.log("Express running in port: " + PORT);
});
