'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomindexSchema = new Schema({
  name: String,
  keywords: [String],
  public_rating: {type: Number, min: 0, max: 5, default: 0},
  description: String,
  active: Boolean,
  email: String
});

module.exports = mongoose.model('Customindex', CustomindexSchema);