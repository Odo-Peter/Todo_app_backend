require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const Todo = require('./models/todo');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('build'));

app.get('/personal/todos', (req, res) => {
  Todo.find({}).then((todos) => {
    res.json(todos);
  });
});

app.get('/personal/todos/:id', (req, res, next) => {
  const id = req.params.id;
  Todo.findById(id)
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => next(err));
});

app.post('/personal/todos', (req, res, next) => {
  const body = req.body;

  const todo = new Todo({
    name: body.name,
  });

  todo
    .save()
    .then((savedTodo) => {
      res.json(savedTodo);
    })
    .catch((err) => next(err));
});

app.delete('/personal/todos/:id', (req, res, next) => {
  const id = req.params.id;
  Todo.findById(id)
    .then((todo) => Todo.deleteOne(todo))
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
