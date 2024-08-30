const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient
const Like = prisma.like

//Create And Check like a postingan 
exports.addLikePostingan = async (req, res) => {
    try {
        const { postId, userId } = req.body

        const existingLike = await prisma.like.findFirst({
            where: {
                postId: postId,
                userId: userId
            },
        });

        if(existingLike) {
            return res.status(400).send({
                message: "user doesn't like postingan"
            })
        };

        const newLike = await prisma.like.create({
            data: {
                postId: postId,
                userId: userId 
            }
        });

        res.status(201).send({
            like: newLike,
            message: "Succesfully add like"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message,
        });
    }
}