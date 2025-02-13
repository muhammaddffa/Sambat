const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

dotenv.config();

const prisma = new PrismaClient();
const User = prisma.user;



// Register
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validasi Input
    if (!email || !password) {
        return res.status(400).json({
            message: "email, and password are required",
        });
    }

    try {
        // Checking apakah email sudah terdaftar
        const existingUser = await User.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered",
            });
        }

        // Hashing Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat User Baru
        const result = await User.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });
        res.status(201).send({
            data: result,
            message: `User succesfully for register`,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error creating user",
            error: error.message,
        });
    }
};

// Login
exports.loginUser = async (req, res) => {
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
        if (!isPasswordValid) {
            return res.status(403).json({
                message: "Wrong password",
            });
        };

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        const secret = process.env.JWT_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET

        const expiresIn = 60 * 60;
        const expiresRefresh = 60 * 60 * 24 * 7

        const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
        const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: expiresRefresh, algorithm: "HS256"})

        
        // Untuk Nyimpan Refresh Token 
        await User.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken: refreshToken
            }
        })

        return res.json({
            data: {
                id: user.id,
                email: user.email,
                address: user.address,
            },
            token: token,
            refreshToken: refreshToken
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


