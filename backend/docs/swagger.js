const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Consumer Orders API",
    version: "1.0.0",
    description: "API documentation for Consumers, Products and Orders",
  },
  servers: [
    {
      url: "http://localhost:4000/api",
      description: "Local server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;