const service = require("../services/consumer.service");

exports.getAll = async (_, res) => {
  const consumers = await service.getAll();
  res.json(consumers);
};

exports.getById = async (req, res) => {
  const consumer = await service.getById(req.params.id);

  if (!consumer) {
    return res.status(404).json({
      message: "Consumer not found"
    });
  }

  res.json(consumer);
};

exports.create = async (req, res) => {
  const consumer = await service.create(req.body);
  res.status(201).json(consumer);
};

exports.update = async (req, res) => {
  const consumer = await service.update(
    req.params.id,
    req.body
  );

  res.json(consumer);
};

exports.remove = async (req, res) => {
  await service.remove(req.params.id);

  res.status(204).send();
};