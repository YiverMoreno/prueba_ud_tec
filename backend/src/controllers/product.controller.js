const service = require("../services/product.service");
const response = require("../utils/httpResponse");

exports.getAll = async (_, res) => {
  try {
    const products = await service.getAll();

    return response.success(
      res,
      200,
      "Products retrieved successfully",
      products
    );
  } catch (error) {
    return response.error(
      res,
      500,
      "Failed to retrieve products"
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await service.getById(
      req.params.id
    );

    if (!product) {
      return response.error(
        res,
        404,
        "Product not found"
      );
    }

    return response.success(
      res,
      200,
      "Product retrieved successfully",
      product
    );
  } catch (error) {
    return response.error(
      res,
      500,
      "Failed to retrieve product"
    );
  }
};

exports.create = async (req, res) => {
  try {
    const product = await service.create(
      req.body
    );

    return response.success(
      res,
      201,
      "Product created successfully",
      product
    );
  } catch (error) {
    return response.error(
      res,
      400,
      error.message || "Failed to create product"
    );
  }
};

exports.update = async (req, res) => {
  try {
    const existingProduct =
      await service.getById(req.params.id);

    if (!existingProduct) {
      return response.error(
        res,
        404,
        "Product not found"
      );
    }

    const updatedProduct =
      await service.update(
        req.params.id,
        req.body
      );

    return response.success(
      res,
      200,
      "Product updated successfully",
      updatedProduct
    );
  } catch (error) {
    return response.error(
      res,
      400,
      error.message || "Failed to update product"
    );
  }
};

exports.remove = async (req, res) => {
  try {
    const existingProduct = await service.getById(req.params.id);

    if (!existingProduct) {
      return response.error(res, 404, "Product not found");
    }

    await service.remove(req.params.id);

    return response.success(
      res,
      200,
      "Product deleted successfully"
    );

  } catch (error) {
    const status = error.statusCode || 500;

    return response.error(
      res,
      status,
      error.message || "Failed to delete product"
    );
  }
};