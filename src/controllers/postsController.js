const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const Posts = prisma.post;

// CREATE Post
exports.createPostById =  async (req, res) => {
  const {content, userId} = req.body;
  // const data = req.body;
  try {
    const result = await Posts.create({
      data:{
        content: content,
        userId: userId
      }
    });
    res.status(201).send({
      data: result,
      message: `post successfuly`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error get post",
      error: error.message,
    });
  }
};

// GET Post
exports.getPost =  async (req, res) => {
  try {
    console.log(req.body);
    const result = await Posts.findMany({
      select: {
        id: true,
        // userId: true,
        content: true,
      },
    });
    res.status(201).send({
      data: result,
      message: "Get all post Succceess",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

