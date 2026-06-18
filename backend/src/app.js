const express = require("express");

const consumerRoutes = require("./routes/consumer.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(express.json());

app.use("/api/consumers", consumerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;