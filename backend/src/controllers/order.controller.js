const service = require("../services/order.service");
const response = require("../utils/httpResponse");

exports.getAll = async (_, res) => {
  try {
    const orders = await service.getAllOrders();

    return response.success(
      res,
      200,
      "Orders retrieved successfully",
      orders
    );
  } catch (error) {
    return response.error(
      res,
      500,
      "Failed to retrieve orders"
    );
  }
};

exports.create = async (req, res) => {
  try {
    const { consumerId, items } = req.body;

    const order = await service.createOrder(
      consumerId,
      items
    );

    return response.success(
      res,
      201,
      "Order created successfully",
      order
    );
  } catch (error) {
    return response.error(
      res,
      error.statusCode || 500,
      error.message || "Failed to create order"
    );
  }
};