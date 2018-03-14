var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to DB 
mongoose.connect('mongodb://test:test@ds113799.mlab.com:13799/todo-olly');

// Create a schema - this is like a blueprint 
var todoSchema = new mongoose.Schema({
  task: String
});

// Doing model 
var Todo = mongoose.model('Todo', todoSchema); //model name
var taskOne = Todo({task: 'get flowers'}).save(function(err) {
  if(err) throw err;
  console.log('task saved');
});

var data = [{item: 'get milk'},{item: 'cook dinner'},{item: 'watch UCL'}];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

  // To view app whenever user enters
  app.get('/todo', function(req, res) {
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo/:item', function(req, res) {
    data = data.filter(function(todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
  });
};