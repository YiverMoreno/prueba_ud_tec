const express = require("express");
const controller = require("../controllers/consumer.controller");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Consumers
 *   description: Consumer management
 */

/**
 * @swagger
 * /consumers:
 *   get:
 *     summary: Get all consumers
 *     tags: [Consumers]
 *     responses:
 *       200:
 *         description: List of consumers
 */
router.get("/", controller.getAll);

router.get("/:id", controller.getById);

/**
 * @swagger
 * /consumers:
 *   post:
 *     summary: Create consumer
 *     tags: [Consumers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: Juan Perez
 *               email: test@test.com
 *               phone: "3001234567"
 *     responses:
 *       201:
 *         description: Consumer created
 *       409:
 *         description: Email already exists
 */
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;