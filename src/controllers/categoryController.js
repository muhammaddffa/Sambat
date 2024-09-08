const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient
const Category = prisma.category


exports.addCategory = async (req, res) => {
    const { name } = req.body;
    try {
      const existingCategory = await Category.findUnique({
        where: {
          name: name,
        },
      });
  
      if (existingCategory) {
        return res.status(400).json({
          message: "Kategori sudah ada.",
        });
      }
      const newCategory = await Category.create({
        data: {
          name: name,
        },
      });
  
      res.status(201).send({
        category: newCategory,
        message: "Kategori berhasil ditambahkan.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error added category",
        error: error.message,
      });
    }
  };
