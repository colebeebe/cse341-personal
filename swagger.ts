import swaggerAutogenFactory from 'swagger-autogen';

const swaggerAutogen = swaggerAutogenFactory();

const doc = {
  info: {
    title: 'CSE 341 Personal API',
    description: 'API for personal CSE 341 app',
  },
  host: 'cse341-personal-606w.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./controllers/routes.js'];

swaggerAutogen(outputFile, endpointFiles, doc);
