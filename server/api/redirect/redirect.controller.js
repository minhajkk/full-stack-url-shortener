'use strict';

var _ = require('lodash');
var randomstring = require("randomstring");
var ip = require('ip');

var Redirect = require('./redirect.model');

// Get list of redirects
exports.index = function(req, res) {
    Redirect.find(function (err, redirects) {
        if(err) { return handleError(res, err); }
        return res.json(200, redirects);
    });
};

// Get a single redirect by slug
exports.show = function(req, res) {
    Redirect.findOne({'slug': req.params.slug}, function (err, redirect) {
        if(err) { return handleError(res, err); }
        if(!redirect) { return res.send(404); }
        return res.json(redirect);
    });
};


// Creates a new redirect in the DB.
exports.create = function(req, res) {
    var _redirect = new Redirect({
        url: req.body.url,
        slug: randomstring.generate(5),
        ip: ip.address()
    });

    _redirect.save(function (err, _redirect) {
        if(err) { return handleError(res, err); }
        return res.json(201, _redirect);
    });

    console.log("Redirect created from IP " + ip.address());
};

// Updates an existing redirect in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    Redirect.findById(req.params.id, function (err, redirect) {
        if (err) { return handleError(res, err); }
        if(!redirect) { return res.send(404); }
        var updated = _.merge(redirect, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, redirect);
        });
    });
};

// Deletes a redirect from the DB.
exports.destroy = function(req, res) {
    Redirect.findById(req.params.id, function (err, redirect) {
        if(err) { return handleError(res, err); }
        if(!redirect) { return res.send(404); }
        redirect.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};


function handleError(res, err) {
    return res.send(500, err);
}