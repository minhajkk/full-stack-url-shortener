/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Redirect = require('./redirect.model');

exports.register = function(socket) {
  Redirect.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Redirect.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('redirect:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('redirect:remove', doc);
}