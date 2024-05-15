const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes"); 
const registerRoutes = require("./routes/registerRoutes")
const loginRoutes = require("./routes/loginRoutes");
const post = require("./routes/postsRoutes");
const comment = require("./routes/commentRoutes");
const countCommentBasedOnPostId = require("./routes/commentCountRoutes")

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

// const productConttroller = require("./controllers/userController");
// const postsController = require("./controllers/postsController");
// const commentController = require("./controllers/commentController");
// const commentCountController = require("./controllers/commentCountController");
// const register = require("./controllers/registerController");
// const login = require("./controllers/loginController");

app.get("/", async (req, res) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/auth/register", registerRoutes);
app.use("/api/users",userRoutes);
app.use("/auth/login", loginRoutes)
app.use("/api/posts", post);
app.use("/api/comment", comment);
app.use("/api/count", countCommentBasedOnPostId);
// app.use("/api/posts", postsController);
// app.use("/api/comment", commentController);
// app.use("/api/count/comment", commentCountController);
// app.use("/api/register", register);
// app.use("/api/login", login);

app.listen(PORT, () => {
  console.log("Express running in port: " + PORT);
});
