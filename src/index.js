const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT;

dotenv.config();

app.use(express.json());

  const accessValidation = (req, res, next) => {
  const {authorization} = req.headers;

  if(!authorization){
    return res.status(401).json({
      message: 'tokens are required'
    })
  }

  const token = authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  try {
    const jwtDecode = jwt.verify(token, secret);

    req.userData = jwtDecode
  } catch (error) {
    return req.status(401).json({
      message: 'Unauthorized'
    })
  }
  next()

}

// REGISTER
app.use("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    res.status(201).send({
      data: result,
      message: `User Created`,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating user",
      error: error.message,
    });
  }
});

// Login
app.use('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (!user.password) {
      return res.status(404).json({
        message: "Password not set"
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
      }

    const secret = process.env.JWT_SECRET;
    
    const expiresIn = 60 * 60 * 1

    const token = jwt.sign(payload, secret, {expiresIn: expiresIn})
    return res.json({
        data:{
          id: user.id,
          email: user.email,
          address: user.address
        },
        token: token
    })
    } else {
      return res.status(403).json({
        message: "Wrong password"
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

app.get("/", async (req, res,) => {
  res.send({ message: "Awesome it works 🐻" });
});

// CREATE User
app.post("/users", async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
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
});

// CREATE User Id
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id
  try {
    const result = await prisma.user.findUnique({
      where:{
        id: userId,
      }
    });
    res.status(201).send({
      data: result,
      message: "Create comment succesfuly"
    })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
})


// Get User
app.get("/api/users", accessValidation, async (req, res) => {
  try {
    const result = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      },
    });
    res.status(201).send({
      data: result,
      message: `Get user Succesfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

// CREATE Post
app.post("/api/posts", async (req, res) => {
  // const {content, userId} = req.body;
  const data = req.body;
  try {
    const result = await prisma.post.create({
      data,
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
});

// GET Post
app.get("/api/posts", async (req, res) => {
  try {
    const result = await prisma.post.findMany({
      select: {
        id: true,
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
});

// Create Comment
app.post("/api/comment/:id", async (req, res) => {
  const {name, password, comment} = req.body;
  const postId = req.params.id
  try {
    const result = await prisma.comment.create({
      data:{
        postId,
        comment,
      }
    })
    res.status(201).send({
      data: result,
      message: "Create comment succesfuly"
    })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

// GET Comment
// postId di tambahin
app.get("/api/comment", async (req, res) => {
  try {
    const result = await prisma.comment.findMany({
      select: {
        id: true,
        comment: true,
      },
    });
    res.status(201).send({
      comment: result,
      message: "Get all comment succesfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

app.get("/api/comment/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      select:{
        id: true,
        comment: true,
      }
    })
    res.status(201).send({
      comments: result,
      message: "Comment postId successfully" 
    })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
})

// Count comment based on post id
app.get("/api/comment/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const commentCount = await prisma.comment.count({
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
      message: "Error fetching users",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("Express running in port: " + PORT);
});
