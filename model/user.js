var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    userName: String,
    password: String,
    email: String
});

module.exports = mongoose.model('User',user);