const prisma = require("../config/prisma");

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

const remove = (id) =>
  prisma.product.delete({
    where: { id: Number(id) }
  });

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};