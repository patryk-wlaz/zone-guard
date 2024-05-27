import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./../index.ts'];

swaggerAutogen()(outputFile, routes, doc);
// swaggerAutogen()(outputFile, routes, doc).then(async () => {
//   await import('./index.js'); // Your project's root file
// });