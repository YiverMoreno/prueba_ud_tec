const express = require("express");
const prisma = require("../config/prisma");

const router = express.Router();

router.get("/health", async (req, res) => {
  const consumers = await prisma.consumer.count();

  res.json({
    status: "ok",
    consumers
  });
});

module.exports = router;