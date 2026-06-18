const service = require("../services/consumer.service");
const response = require("../utils/httpResponse");

exports.getAll = async (_, res) => {
  try {
    const consumers = await service.getAll();

    response.success(
      res,
      200,
      "Consumers retrieved successfully",
      consumers
    );
  } catch {
    response.error(
      res,
      500,
      "Failed to retrieve consumers"
    );
  }
};

exports.getById = async (
  req,
  res
) => {
  try {
    const consumer =
      await service.getById(
        req.params.id
      );

    if (!consumer) {
      return response.error(
        res,
        404,
        "Consumer not found"
      );
    }

    response.success(
      res,
      200,
      "Consumer retrieved successfully",
      consumer
    );
  } catch {
    response.error(
      res,
      500,
      "Failed to retrieve consumer"
    );
  }
};

exports.create = async (req, res) => {
  try {
    const consumer = await service.create(req.body);

    return response.success(
      res,
      201,
      "Consumer created successfully",
      consumer
    );
  } catch (error) {
    return response.error(
      res,
      error.statusCode || 500,
      error.message || "Failed to create consumer"
    );
  }
};

exports.update = async (
  req,
  res
) => {
  try {
    const consumer =
      await service.update(
        req.params.id,
        req.body
      );

    response.success(
      res,
      200,
      "Consumer updated successfully",
      consumer
    );
  } catch {
    response.error(
      res,
      400,
      "Failed to update consumer"
    );
  }
};

exports.remove  = async (req, res) => {
  try {
    await service.remove(req.params.id);

    return res.status(200).json({
      message: "Consumer deleted successfully"
    });

  } catch (error) {
    console.error("CONTROLLER ERROR:", error); 

    return res.status(error.status || 500).json({
      message: error.message || "Internal server error"
    });
  }
};