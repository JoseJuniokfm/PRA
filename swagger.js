const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Documentação da API do PRA',
      version: '1.0.0',
      description: 'A PRA ajuda você a reclamar sobre problemas em um ambiente escolar, com intuito de manter um ambiente saúdavel para todos',
    },
  },
  apis: [
    './controllers/authController.js',
    './controllers/processoControllers.js',
    './controllers/reclamacaoControllers.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
