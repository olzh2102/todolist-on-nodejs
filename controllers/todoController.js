var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to DB 
mongoose.connect('mongodb://test:test@ds113799.mlab.com:13799/todo-olly');

// Create a schema - this is like a blueprint 
var todoSchema = new mongoose.Schema({
  item: String
});

// Doing model - collection
var Todo = mongoose.model('Todo', todoSchema); //model name

// ----- DUMMY DATA to TEST -----
// var taskOne = Todo({task: 'get flowers'}).save(function(err) {
//   if(err) throw err;
//   console.log('task saved');
// });

//var data = [{item: 'get milk'},{item: 'cook dinner'},{item: 'watch UCL'}];
//var data = [];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

  // To view app whenever user enters
  app.get('/todo', function(req, res) {
    // Get data from mongoDB and pass it to view 
    Todo.find({}, function(err, data) {
      if(err) throw err;
      res.render('todo', {todos: data});
    }); // Retrieve all the tasks   
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    // Get data from the view and add it to mongoDB 
    var newTodo = Todo(req.body).save(function(err,data) {
      if(err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', function(req, res) {
    // Delete requested task from mongoDB
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if(err) throw err;
      res.json(data);
    });
  });
};