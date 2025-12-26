import React, { useState } from 'react';
import './CreateTask.css';

function CreateTask({ onCreateTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onCreateTask({ title, description });
    setTitle('');
    setDescription('');
    setShowForm(false);
  };

  return (
    <div className="create-task">
      {!showForm ? (
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          + New Task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="form-actions">
            <button type="submit" className="btn-primary">Create</button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateTask;
