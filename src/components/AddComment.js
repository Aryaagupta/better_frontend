import React, { useState } from 'react';
import './AddComment.css';

function AddComment({ onAdd }) {
  const [content, setContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    await onAdd(content);
    setContent('');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button 
        className="btn-secondary btn-small"
        onClick={() => setIsAdding(true)}
      >
        + Add Comment
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="add-comment-form">
      <textarea
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoFocus
      />
      <div className="form-actions">
        <button type="submit" className="btn-primary btn-small">Add</button>
        <button 
          type="button" 
          className="btn-secondary btn-small"
          onClick={() => {
            setContent('');
            setIsAdding(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddComment;
