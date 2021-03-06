var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    messageId: {type: String, required: true},
    subject: {type: String, required: false},
    msgText: {type: String, required: true},
    sender: {type: String, required: true}
})

module.exports = mongoose.model('Message', schema);
