const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const User = prisma.user;

// Login
exports.loginUser =  async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.password) {
      return res.status(404).json({
        message: "Password not set",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const payload = {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };

      const secret = process.env.JWT_SECRET;

      const expiresIn = 60 * 60 * 1;

      const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
      return res.json({
        data: {
          id: user.id,
          email: user.email,
          address: user.address,
        },
        token: token,
      });
    } else {
      return res.status(403).json({
        message: "Wrong password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
