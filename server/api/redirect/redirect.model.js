'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RedirectSchema = new Schema({
    slug:String,
    ip: String,
    url: String,
    date_created: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Redirect', RedirectSchema);