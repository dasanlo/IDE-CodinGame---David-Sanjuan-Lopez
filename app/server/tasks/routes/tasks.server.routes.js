'use strict';

/**
 * Module dependencies
 */
var tasksPolicy = require('../policies/tasks.server.policy'),
  tasks = require('../controllers/tasks.server.controller');

module.exports = function (app) {
  // tasks collection routes
  app.route('/api/task').all(tasksPolicy.isAllowed)
    .get(tasks.list)
    .post(tasks.create);

  // Single task routes
  app.route('/api/task/:taskId').all(tasksPolicy.isAllowed)
    .get(tasks.read)
    .put(tasks.update)
    .delete(tasks.delete);

  // Finish by binding the task middleware
  app.param('taskId', tasks.taskByID);
};

