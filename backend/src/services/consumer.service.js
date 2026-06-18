const prisma = require("../config/prisma");
const { Prisma } = require("@prisma/client");

const getAll = () => {
  return prisma.consumer.findMany();
};

const getById = (id) => {
  return prisma.consumer.findUnique({
    where: { id: Number(id) }
  });
};

const create = async (data) => {
  try {
    return await prisma.consumer.create({
      data,
    });
  } catch (error) {    
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      const customError = new Error(
        "Email already exists. Duplicate emails are not allowed."
      );
      customError.statusCode = 409;
      throw customError;
    }
    throw error;
  }
};

const update = (id, data) => {
  return prisma.consumer.update({
    where: { id: Number(id) },
    data
  });
};

const remove = async (id) => {
  try {
    return await prisma.consumer.delete({
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