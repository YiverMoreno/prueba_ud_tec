const service = require("../services/product.service");

exports.getAll = async (_, res) => {
  const products = await service.getAll();
  res.json(products);
};

exports.getById = async (req, res) => {
  const product = await service.getById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
};

exports.create = async (req, res) => {
  const product = await service.create(req.body);
  res.status(201).json(product);
};

exports.update = async (req, res) => {
  const product = await service.update(
    req.params.id,
    req.body
  );

  res.json(product);
};

exports.remove = async (req, res) => {
  await service.remove(req.params.id);

  res.status(204).send();
};