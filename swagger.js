//**********************
//  Require Statements
//**********************
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Games and Players API',
        description: 'API for managing games and players'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);