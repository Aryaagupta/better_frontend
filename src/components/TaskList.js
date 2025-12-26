import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onRefresh, onUpdateTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <div className="empty-state">No tasks yet. Create one to get started!</div>;
  }

  return (
    <div className="task-list">
      <h2>Tasks ({tasks.length})</h2>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onRefresh={onRefresh}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
