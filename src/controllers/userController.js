// Layer untuk handle request dan response
// Sering buat handle validasi body
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const user = prisma.user;


//CreateUser
exports.createUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!password || !email) {
      return res.status(404).json({
        message: "password and email can't be empty",
      });
    }
    const result = await user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).send({
      data: result,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating user",
      error: error.message,
    });
  }
};

//Get UserById
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await user.findUnique({
      select: {
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: userId,
      },
    });
    res.status(201).send({
      status: 201,
      message: "Get user ById successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting user ById",
      error: error.message,
    });
  }
};

//GetAllUser
exports.getAllUsers = async (req, res) => {
  try {
    const result = await user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(201).send({
      message: "Get users successfully",
      status: 201,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting users",
      error: error.message,
    });
  }
};
