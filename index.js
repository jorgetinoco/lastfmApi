import express from 'express';
import swagger from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

require('dotenv').config({ path: `${__dirname}/config/.env` });

const app = express();

app.use(cors());

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
  apis: ['./routes/swagger-docs.js'],
};

const swaggerSpec = swagger(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require('./routes/routes.js')(app);

const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;

  console.log(`LastfmApi listening at port ${port}`);
});
