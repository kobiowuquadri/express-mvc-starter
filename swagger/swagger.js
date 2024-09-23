import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Express MVC Starter',
    description: 'This is a starter template for building MVC (Model-View-Controller) applications using Express.js.'
  },
  host: 'http://localhost:5000/api-docs'
};

const outputFile = './swagger-output.json';
const routes = ['../routes/auth-routes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);