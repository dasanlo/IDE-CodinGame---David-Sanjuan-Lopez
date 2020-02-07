'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke tasks Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: 'guest',
    allows: [{
      resources: '/api/task',
      permissions: '*'
    }, {
      resources: '/api/task/:taskId',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If tasks Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var user = req.user;
  var roles = user ? user.roles : 'guest';

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    }

    if (isAllowed) {
      // Access granted! Invoke next middleware
      return next();
    }

    return res.status(403).json({
      response: 'User is not authorized'
    });
  });
};
