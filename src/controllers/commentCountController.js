const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const Comment = prisma.comment;

// Count comment based on post id
exports.countCommentByOnPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentCount = await Comment.count({
      where: {
        postId: postId,
      },
    });
    res.status(201).send({
      count: commentCount,
      message: "Count Comment",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error count users",
      error: error.message,
    });
  }
};
