const { PrismaClient } = require("@prisma/client");

const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const User = prisma.user;

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({
            message: "Refresh token is required",
        });
    }

    try {
        const refreshSecret = process.env.JWT_REFRESH_SECRET;

        // Verifikasi Refresh Token
        const decoded = jwt.verify(refreshToken, refreshSecret);

        // Check Refresh Token exists in Database
        const user = await User.findUnique({
            where: { id: decoded.id },
        });

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({
                message: "Invalid refresh token",
            });
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        const secret = process.env.JWT_SECRET;
        const newAccessToken = jwt.sign(payload, secret, { expiresIn: "1h" });

        return res.json({
            accessToken: newAccessToken,
        });
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Invalid or expired refresh token",
        });
    }
}

exports.logoutUser = async (req, res) => {
    const { id } = req.userData;

    try {
        await User.update({
            where: { id: id },
            data: { refreshToken: null },
        });

        return res.json({
            message: "Logout successful",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};