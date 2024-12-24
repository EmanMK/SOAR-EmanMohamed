const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SOAR, Eman Mohamed TASK',
      version: '1.0.0',
      description: 'This is the API documentation for Eman Mohamed Soar task', 
    },
  },
  apis: ['./managers/entities/**/*.swagger.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
