const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API de Museo Papalote',
      version: '1.0.0',
      description: 'API de autenticación y manejo de usuarios para el Museo Papalote',
    },
    components: {
        securitySchemes: {
            BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            },
        },
    },
};
  
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};
  
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

