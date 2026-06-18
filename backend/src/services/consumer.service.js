const prisma = require("../config/prisma");

const getAll = () => {
  return prisma.consumer.findMany();
};

const getById = (id) => {
  return prisma.consumer.findUnique({
    where: { id: Number(id) }
  });
};

const create = (data) => {
  return prisma.consumer.create({
    data
  });
};

const update = (id, data) => {
  return prisma.consumer.update({
    where: { id: Number(id) },
    data
  });
};

const remove = (id) => {
  return prisma.consumer.delete({
    where: { id: Number(id) }
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};