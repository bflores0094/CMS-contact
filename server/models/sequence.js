var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    maxMessageid: {type: Number, required: true},
    maxContactId: {type: Number, required: true},
    maxDocumentId: {type: Number, required: true}
})

module.exports = mongoose.model('Contact', schema);
