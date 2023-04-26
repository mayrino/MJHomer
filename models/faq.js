var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locals = ['zh','en'];

var schema = new Schema({
    title: { type: String, require: true } ,
    para:  { type: String, require: true } ,
    local: { type: String, require: true, enum:locals, trim:true }
});


module.exports = mongoose.model('FAQ', schema);