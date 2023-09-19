const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "This is a Blog API with posts and comments",
    },
  },
  // Specify API routes for documentation
  apis: ["index.js"], // You can specify multiple files or patterns here
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
