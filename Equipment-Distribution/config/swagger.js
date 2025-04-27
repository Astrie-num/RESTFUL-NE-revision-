const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Equipment Distribution API",
      version: "1.0.0",
      description: "API documentation for Equipment Distribution system",
      contact: {
        name: "Uwumviyimana Asterie",
        email : "uwasterie07@gmail.com"
      }
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/userRoutes.js"] 
};

module.exports = swaggerOptions;
