'use strict';

/**
 * Module dependencies
 */
const path = require('path'),
  mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  _ = require('lodash'),
  sharp = require('sharp'),
  crypto = require('crypto'),
  fs = require('fs'),
  sizeOf = require('buffer-image-size');

/**
 * Create a task
 */
exports.create = function (req, res) {
  var task = new Task(req.body);
  task.state = 'new'

  task.save(function (err) {
    if (err) {
      return res.status(422).send({ response: err });
    }

    var fileInputPath = task.imageInputPath;
    var fileOutDirectoryPath = path.resolve('./output/' + path.basename(fileInputPath, path.extname(path.basename(fileInputPath))));

    if (fs.existsSync(fileOutDirectoryPath)){
      return res.status(422).send({ response: 'image processed' });
    }

    fs.mkdir(fileOutDirectoryPath, function(err) {
      if (err){
        return res.status(422).send({ response: err });
      }

      sharp(fileInputPath).resize(1024, 800, { fit: sharp.fit.inside, withoutEnlargement: true }).toBuffer().then(buffer => {
        let width = sizeOf(buffer).width;
        let height = sizeOf(buffer).height;

        if (err) {
          return res.status(422).send({ response: err });
        }

        task.state = 'processing'
        task.save(function (err) {
          if (err) {
            return res.status(422).send({ response: err });
          }

          let md5 = crypto.createHash('md5').update(path.basename(fileInputPath)).digest("hex");
          let fileOutDirectoryPathWihSize = path.resolve('./output/' + path.basename(fileInputPath, path.extname(path.basename(fileInputPath))) + '/' + width + '/');
          let fileOutputPath = path.resolve('./output/' + path.basename(fileInputPath, path.extname(path.basename(fileInputPath))) + '/' + width + '/' + md5 + path.extname(path.basename(fileInputPath)));

          fs.mkdir(fileOutDirectoryPathWihSize, function(err) {
            if (err){
              return res.status(422).send({ response: err });
          }

            fs.writeFile(fileOutputPath, buffer, (err) => {
              if (err) {
                return res.status(422).send({ response: err });
              }

              task.state = 'finished'
              task.imageOutputPath = fileOutputPath;
              task.imageCreated = new Date();
              task.imageMD5 = md5;
              task.imageResolution = height + ' x ' + width;
              task.imageBinary = buffer;

              task.save(function (err) {
                if (err) {
                  return res.status(422).send({ response: err });
                }
                
                res.json(task);
              });
            });
          });
        });
      });
    }); 
  });
};

/**
 * Show the current task
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  let task = req.task ? req.task.toJSON() : {};

  res.json(task);
};

/**
 * Update a task
 */
exports.update = function (req, res) {
  let task = req.task;

  task.save(function (err) {
    if (err) {
      return res.status(422).send({ response: errorHandler.getErrorMessage(err) });
    }
     
    res.json(task);
  });
};

/**
 * Delete a task
 */
exports.delete = function (req, res) {
  let task = req.task;

  task.remove(function (err) {
    if (err) {
      return res.status(422).send({ response: errorHandler.getErrorMessage(err) });
    }
     
    res.json(task);
  });
};

/**
 * List of task
 */
exports.list = function (req, res) {
  Task.find().exec(function (err, tasks) {
    if (err) {
      return res.status(422).send({ response: errorHandler.getErrorMessage(err) });
    }
    
    res.json(tasks);
  });
};

/**
 * Task middleware
 */
exports.taskByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ task: 'Task is invalid' });
  }

  Task.findById(id).select('-_id state').exec(function (err, task) {
    if (err) {
      return next(err);
    } else if (!task) {
      return res.status(404).send({ task: 'No task with that identifier has been found' });
    }

    req.task = task;
    next();
  });
};
