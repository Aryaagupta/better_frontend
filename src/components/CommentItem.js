import React, { useState } from 'react';
import './CommentItem.css';

function CommentItem({ comment, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    await onUpdate(comment.id, editContent);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this comment?')) {
      await onDelete(comment.id);
    }
  };

  if (isEditing) {
    return (
      <div className="comment-item editing">
        <form onSubmit={handleUpdate}>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            autoFocus
          />
          <div className="comment-actions">
            <button type="submit" className="btn-primary btn-small">Save</button>
            <button 
              type="button" 
              className="btn-secondary btn-small"
              onClick={() => {
                setEditContent(comment.content);
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
    <div className="comment-item">
      <div className="comment-content">
        <p>{comment.content}</p>
        <span className="comment-date">
          {new Date(comment.created_at).toLocaleString()}
        </span>
      </div>
      <div className="comment-actions">
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
      </div>
    </div>
  );
}

export default CommentItem;
