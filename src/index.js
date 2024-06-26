const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const post = require("./routes/postsRoutes");
const comment = require("./routes/commentRoutes");
const countCommentBasedOnPostId = require("./routes/commentCountRoutes");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", async (req, res) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/auth/register", registerRoutes);
app.use("/api/users", userRoutes);
app.use("/auth/login", loginRoutes);
app.use("/api/posts", post);
app.use("/api/comment", comment);
app.use("/api/count", countCommentBasedOnPostId);

app.listen(PORT, () => {
  console.log("Express running in port: " + PORT);
});
