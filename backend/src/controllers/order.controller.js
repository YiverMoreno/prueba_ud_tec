const service = require("../services/order.service");

exports.create = async (req, res) => {

  try {

    const order = await service.createOrder(
      req.body.consumerId,
      req.body.items
    );

    res.status(201).json(order);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }
};

exports.getAll = async (_, res) => {

  const orders = await service.getAllOrders();

  res.json(orders);
};