const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const Comment = prisma.comment;

// Create Comment
exports.createCommentByPostId = async (req, res) => {
  const { comment } = req.body;
  const postId = req.params.id;
  try {
    const result = await Comment.create({
      data: {
        postId,
        comment,
      },
    });
    res
      .status(201)
      .send({ data: result, message: "Create comment succesfuly" });
  } catch (error) {
    res.status(500).json({
      message: "Error post users",
      error: error.message,
    });
  }
};

// GET Comment
// postId di tambahin
exports.getAllComment = async (req, res) => {
  try {
    const result = await Comment.findMany({
      select: {
        id: true,
        comment: true,
      },
    });
    res.status(201).send({
      status: 200,
      message: "Get all comment succesfully",
      comment: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

//GetCommentById
exports.commentByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await Comment.findMany({
      where: {
        postId: postId,
      },
      select: {
        id: true,
        comment: true,
      },
    });
    res.status(201).send({
      comments: result,
      message: "Comment postId successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

exports.getPaginationComment = async (req, res) => {
  try {
    const { skip, take } = req.params;

    // Konversi params menjadi angka
    const skipNum = parseInt(skip);
    const takeNum = parseInt(take);

    const result = await Comment.findMany({
      skip: skipNum,
      take: takeNum,
    });
    res.status(200).send({
      message: "get try pagination",
      data: result,
    });
  } catch (e) {
    console.log;
  }
};
