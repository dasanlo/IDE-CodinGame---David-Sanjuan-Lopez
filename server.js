const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  flash = require('connect-flash'),
  Schema = mongoose.Schema,
  app = express(),
  port = process.env.PORT || 8080,
  TaskSchema = require('./app/server/tasks/models/tasks.server.model'),
  http = require('http'),
  fs = require('fs'),
  path = require('path');
  
// Request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

mongoose.set('useFindAndModify', false);
mongoose.model('Task', TaskSchema)
mongoose.connect('mongodb://localhost:27017/tasks', { useUnifiedTopology: true, useNewUrlParser: true });

require('./app/server/tasks/policies/tasks.server.policy').invokeRolesPolicies();
require('./app/server/tasks/routes/tasks.server.routes')(app);

app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});