'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EntrySchema = new Schema({
  email: String,
  name: String,
  category: String,
  keywords: [String],
  rating: Number,
  date: { type: Date, default: Date.now },
  seenIt: Boolean,
  //Premade stuff
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Entry', EntrySchema);