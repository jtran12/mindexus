'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EntrySchema = new Schema({
  email: String,
  name: String,
  category: { type: String, default: "none"},
  keywords: String,
  rating: {type: Number, min: 0, max: 5, default: 0},
  date: { type: Date, default: Date.now },
  seenIt: Boolean,
  //Premade stuff
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Entry', EntrySchema);