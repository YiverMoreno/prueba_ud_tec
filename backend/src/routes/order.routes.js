const express = require("express");
const controller = require("../controllers/order.controller");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */



router.get("/", controller.getAll);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             consumerId: 1
 *             items:
 *               - productId: 1
 *                 quantity: 2
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Invalid request
 *       409:
 *         description: Insufficient stock
 */
router.post("/", controller.create);

module.exports = router;