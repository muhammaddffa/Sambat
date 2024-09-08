const { PrismaClient } = require("@prisma/client");
const { HTTP_STATUS } = require("../constants/http.status");
const { SUCCESS, ERROR } = require("../constants/message");

const prisma = new PrismaClient();
const Posts = prisma.post;

// CREATE Post
exports.createPostById = async (req, res) => {
  const { content, userId } = req.body;
  // const data = req.body;
  try {
    const result = await Posts.create({
      data: {
        content: content,
        userId: userId,

      },
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
exports.getPost = async (req, res) => {
  try {
    // console.log(req.body);
    const result = await Posts.findMany({
      select: {
        id: true,
        userId: true,
        content: true,
      },
    });
    res.status(201).send({
      data: result,
      message: SUCCESS.GET_POSTINGAN_SUCCESS,
      Response: HTTP_STATUS.STATUS_OK,
    });
  } catch (error) {
    res.status(500).json({
      message: ERROR.ERROR_GET_POSTINGAN,
      error: HTTP_STATUS.STATUS_BAD_REQUEST,
    });
  }
};

exports.softDeletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const softDeletedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.status(200).send({
      message: "Postingan dengan ID telah dihapus sementara",
      data: softDeletedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error when soft delete",
      error: error.message,
    });
  }
};

// category postingan
exports.getPostByCategory = async (req, res) => {
  const { categoryId } = req.params
  try {
      const posts = await prisma.post.findMany({
          where: {
              categoryId,
          },
          include: {
              category: true,
              user: true
          }
      })
      res.status(200).send({
          posts: posts,
          message: "Daftar postingan berdasarkan kategori berhasil diambil.",
      });
  } catch (error) {
      res.status(500).json({
          message: "Error fecthing posts by category",
          error: error.message,
      });
  }
}

// Get list post detail
exports.getPostDetail = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        isDeleted: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: {
          select: {
            id: true,
            comment: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        message: `Post with ID post not found.`,
      });
    }

    res.status(200).send({
      data: post,
      message: "Get post detail success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching post detail",
      error: error.message,
    });
  }
};
