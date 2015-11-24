'use strict';

var _ = require('lodash');
var Customindex = require('./customindex.model');

// Get list of customindexs
exports.index = function(req, res) {
  Customindex.find(function (err, customindexs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(customindexs);
  });
};

// Get a single customindex
exports.show = function(req, res) {
  Customindex.findById(req.params.id, function (err, customindex) {
    if(err) { return handleError(res, err); }
    if(!customindex) { return res.status(404).send('Not Found'); }
    return res.json(customindex);
  });
};

// Creates a new customindex in the DB.
exports.create = function(req, res) {
  Customindex.create(req.body, function(err, customindex) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(customindex);
  });
};

// Updates an existing customindex in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Customindex.findById(req.params.id, function (err, customindex) {
    if (err) { return handleError(res, err); }
    if(!customindex) { return res.status(404).send('Not Found'); }
    var updated = _.merge(customindex, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(customindex);
    });
  });
};

exports.customUpdate = function(req, res){
  if(req.body._id) { delete req.body._id; }
  Customindex.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true}, function (err, customindex) {
    if (err) { return handleError(res, err); }
    if(!customindex) { return res.status(404).send('Not Found'); }
    return res.status(200).json(customindex);
  });

}

// Deletes a customindex from the DB.
exports.destroy = function(req, res) {
  Customindex.findById(req.params.id, function (err, customindex) {
    if(err) { return handleError(res, err); }
    if(!customindex) { return res.status(404).send('Not Found'); }
    customindex.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}