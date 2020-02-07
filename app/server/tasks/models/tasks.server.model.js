'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Task Schema
 */
var TaskSchema = new Schema({
  state: { /* estado del procesador de la tarea*/
    type: String,
    enum: ['new', 'processing', 'finished'],
  },
  imageInputPath: { /* dirección de la imagen */
    type: String,
    required: true
  },
  imageOutputPath: { /* dirección de la imagen */
    type: String
  },
  imageCreated: { /* dirección de la imagen */
    type: String
  },
  imageMD5: { /* dirección de la imagen */
    type: String
  },
  imageResolution: { /* dirección de la imagen */
    type: String
  },
  imageBinary: { /* dirección de la imagen */
    type: Buffer
  },
  created: { /* fecha y hora de la creación de la tarea */
  	type: Date,
    default: Date.now
  }
});

module.exports = TaskSchema;