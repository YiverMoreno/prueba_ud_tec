const prisma = require("../config/prisma");

const createOrder = async (consumerId, items) => {

  const consumer = await prisma.consumer.findUnique({
    where: { id: consumerId }
  });

  if (!consumer) {
    throw new Error("Consumer not found");
  }

  let total = 0;

  const orderItems = [];

  for (const item of items) {

    const product = await prisma.product.findUnique({
      where: { id: item.productId }
    });

    if (!product) {
      throw new Error(
        `Product ${item.productId} not found`
      );
    }

    if (product.stock < item.quantity) {
      throw new Error(
        `Insufficient stock for ${product.name}`
      );
    }

    total += Number(product.price) * item.quantity;

    orderItems.push({
      productId: product.id,
      quantity: item.quantity,
      unitPrice: product.price
    });
  }

  return prisma.$transaction(async (tx) => {

    const order = await tx.order.create({
      data: {
        consumerId,
        total
      }
    });

    for (const item of orderItems) {

      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        }
      });

      await tx.product.update({
        where: {
          id: item.productId
        },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    return order;
  });
};

const getAllOrders = () =>
  prisma.order.findMany({
    include: {
      consumer: true,
      items: {
        include: {
          product: true
        }
      }
    }
  });

module.exports = {
  createOrder,
  getAllOrders
};