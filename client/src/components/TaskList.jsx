import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, deleteTask, toggleComplete, editTask, editingTaskId, setEditingTaskId, editingText, setEditingText }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task._id} 
          task={task} 
          deleteTask={deleteTask} 
          toggleComplete={toggleComplete} 
          editTask={editTask}
          editingTaskId={editingTaskId}
          setEditingTaskId={setEditingTaskId}
          editingText={editingText}
          setEditingText={setEditingText}
        />
      ))}
    </ul>
  );
}

export default TaskList;
