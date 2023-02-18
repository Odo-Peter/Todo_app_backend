require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to ...', url);

mongoose
  .connect(url)
  .then(() => console.log('connected to MONGGODB sucessfully'))
  .catch((err) => console.log('Error connecting to MONGODB', err));

const todoSchema = new mongoose.Schema({
  name: String,
});

todoSchema.set('toJSON', {
  transform: (document, returnedTodo) => {
    returnedTodo.id = returnedTodo._id.toString();
    delete returnedTodo._id;
    delete returnedTodo.__v;
  },
});

module.exports = mongoose.model('Todo', todoSchema);
