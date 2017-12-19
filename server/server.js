// Initialisation
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var apiKeyMiddleware = require('./middleware/authentication');
var log = require('simple-node-logger').createSimpleLogger();

var route = require('./routes');

var PORT = 8080;

var app = express();

// application middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiKeyMiddleware); // require X-Api-Key header to be set


// override HTTP verbs (GET, PUT, POST) with different headers
// if the client doesn't support them
app.use(methodOverride('X-HTTP-Method')); // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override')); // IBM

route(app);

app.listen(PORT, function() {
    log.info('API running on http://localhost:' + PORT);
});