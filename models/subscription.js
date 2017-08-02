var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    email: { type: String, require: true ,  unique: true}  
});

module.exports = mongoose.model('Subscription', schema);
