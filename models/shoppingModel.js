var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new mongoose.Schema ({
    name: String
});


var todo = mongoose.model('todo', todoSchema);

module.exports = todo;
