const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient
const Like = prisma.like

//Create And Check like a postingan 
exports.addLikePostingan = async (req, res) => {
    try {
        const { postId, userId } = req.body

        // Mengecek apakah pengguna sudah menyukai postingan
        const existingLike = await prisma.like.findFirst({
            where: {
                postId: postId,
                userId: userId
            },
        });

        if (existingLike) {
            return res.status(400).send({
                message: "Users have liked this post"
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
            message: "Like successfully added"
        })
    } catch (error) {
        res.status(500).send({
            message: "Error fetching like",
            error: error.message,
        });
    }
}

exports.removeLike = async (req, res) => {
    try {
        const {postId, userId} = req.body

        // Mengecek apakah pengguna sudah menyukai postingan
        const existingLike = await prisma.like.findFirst({
            where: {
                postId: postId,
                userId: userId
            }
        })

        if(existingLike) {
            return res.status(400).send({
                message: "Users have liked this post"
            })
        };

        const removeLike = await prisma.like.delete({
            where: {
                id: existingLike.id
            }
        });
        res.status(201).send({
            like: removeLike,
            message: "Like successfully deleted"
        });
    } catch (error) {
        res.status(500).send({
            message: "Error Removing like",
            error: error.message,
        });
    }
}