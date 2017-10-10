var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email: { type: String, require: true } ,
    subject: { type: String, require: true } ,
    name: { type: String, require: true } ,
    message: { type: String, require: true } 
});


module.exports = mongoose.model('Question', schema);