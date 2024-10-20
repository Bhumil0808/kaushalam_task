import React from 'react';

function TaskItem({ task, deleteTask, toggleComplete, editTask, editingTaskId, setEditingTaskId, editingText, setEditingText }) {
  
  const handleEditClick = () => {
    setEditingTaskId(task._id);
    setEditingText(task.text);
  };

  const handleSaveClick = () => {
    editTask(task._id, editingText);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {editingTaskId === task._id ? (
        <>
          <input 
            type="text" 
            value={editingText} 
            onChange={(e) => setEditingText(e.target.value)} 
          />
          <button className='savebtn' onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <span onClick={() => toggleComplete(task._id)}>{task.text}</span>
          <button className='editbtn' onClick={handleEditClick}>Edit</button>
        </>
      )}
      <button className='deletebtn' onClick={() => deleteTask(task._id)}>Delete</button>
    </li>
  );
}

export default TaskItem;
