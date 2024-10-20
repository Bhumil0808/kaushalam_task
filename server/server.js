const express = require('express');
const mongoose = require('mongoose');
const Task = require('./Task');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/todoapp');

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add new task
app.post('/api/tasks', async (req, res) => {
  const newTask = new Task({ text: req.body.text });
  await newTask.save();
  res.json(newTask);
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
    const { text, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { 
      ...(text && { text }),  // Only update text if it's provided
      ...(completed !== undefined && { completed })  // Only update completed if it's provided
    }, { new: true });
    res.json(updatedTask);
  });
  

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
