const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const swaggerRouter = require('express').Router();

swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerDocument));

module.exports = swaggerRouter;
