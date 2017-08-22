'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _swaggerJsdoc = require('swagger-jsdoc');

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config({ path: __dirname + '/config/.env' });

var app = (0, _express2.default)();

app.use((0, _cors2.default)());

var swaggerDefinition = {
  info: {
    title: 'LastFm API',
    version: '1.0.0',
    description: 'LastFm API wrapper'
  },
  host: process.env.hostname,
  basePath: '/'
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js']
};

var swaggerSpec = (0, _swaggerJsdoc2.default)(options);

app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(swaggerSpec));

require('./routes/routes.js')(app);

var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;

  console.log('LastfmApi listening at port ' + port);
});