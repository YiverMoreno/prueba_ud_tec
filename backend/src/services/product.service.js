const prisma = require("../config/prisma");
const { Prisma } = require("@prisma/client");

const getAll = () => prisma.product.findMany();

const getById = (id) =>
  prisma.product.findUnique({
    where: { id: Number(id) }
  });

const create = (data) =>
  prisma.product.create({
    data
  });

const update = (id, data) =>
  prisma.product.update({
    where: { id: Number(id) },
    data
  });

const remove = async (id) => {
  try {
    return await prisma.product.delete({
      where: { id: Number(id) }
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        const err = new Error(
          "Cannot delete consumer because it has related records"
        );
        err.status = 409;
        throw err;
      }
    }

    const err = new Error("Error deleting consumer");
    err.status = 500;
    throw err;
  }

};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};