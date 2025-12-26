import React, { useState } from 'react';
import CommentList from './CommentList';
import './TaskItem.css';

function TaskItem({ task, onRefresh, onUpdate, onDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    
    await onUpdate(task.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this task and all its comments?')) {
      await onDelete(task.id);
    }
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <form onSubmit={handleUpdate} className="edit-task-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
            required
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description"
          />
          <div className="task-actions">
            <button type="submit" className="btn-primary btn-small">Save</button>
            <button 
              type="button" 
              className="btn-secondary btn-small"
              onClick={() => {
                setEditTitle(task.title);
                setEditDescription(task.description || '');
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="task-item">
      <div className="task-header">
        <div className="task-info">
          <h3>{task.title}</h3>
          {task.description && <p className="task-description">{task.description}</p>}
        </div>
        <div className="task-actions">
          <button 
            className="btn-secondary btn-small"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button 
            className="btn-danger btn-small"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button 
            className="btn-secondary btn-small"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? 'Hide' : 'Show'} Comments
          </button>
        </div>
      </div>
      
      {showComments && (
        <CommentList taskId={task.id} onRefresh={onRefresh} />
      )}
    </div>
  );
}

export default TaskItem;
