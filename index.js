import express from 'express';
import swagger from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

require('dotenv').config({ path: `${__dirname}/config/.env` });

const app = express();

const swaggerDefinition = {
  info: {
    title: 'LastFm API',
    version: '1.0.0',
    description: 'LastFm API wrapper',
  },
  host: process.env.hostname,
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swagger(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require('./routes/routes.js')(app);

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
