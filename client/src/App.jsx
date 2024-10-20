import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    // Fetch tasks from backend
    axios.get('http://localhost:5000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (text) => {
    axios.post('http://localhost:5000/api/tasks', { text })
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task:', error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const toggleComplete = (id) => {
    const task = tasks.find(task => task._id === id);
    axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !task.completed })
      .then(response => setTasks(tasks.map(t => t._id === id ? response.data : t)))
      .catch(error => console.error('Error updating task:', error));
  };

  // Edit Task Functionality
  const editTask = (id, text) => {
    axios.put(`http://localhost:5000/api/tasks/${id}`, { text })
      .then(response => {
        setTasks(tasks.map(task => (task._id === id ? response.data : task)));
        setEditingTaskId(null);  // Exit editing mode
      })
      .catch(error => console.error('Error editing task:', error));
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskInput addTask={addTask} />
      <TaskList 
        tasks={tasks} 
        deleteTask={deleteTask} 
        toggleComplete={toggleComplete} 
        editTask={editTask} 
        editingTaskId={editingTaskId}
        setEditingTaskId={setEditingTaskId}
        editingText={editingText}
        setEditingText={setEditingText}
      />
    </div>
  );
}

export default App;
