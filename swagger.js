//**********************
//  Require Statements
//**********************
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Games and Players API',
        description: 'API for managing games and players'
    },
    host: process.env.HOST ? `${process.env.HOST}:${process.env.PORT || 3000}` : 'localhost:3000',
    schemes: [process.env.NODE_ENV === 'production' ? 'https' : 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);