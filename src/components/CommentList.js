import React, { useState, useEffect, useCallback } from 'react';
import CommentItem from './CommentItem';
import AddComment from './AddComment';
import { fetchComments, createComment, updateComment, deleteComment } from '../api';
import './CommentList.css';

function CommentList({ taskId, onRefresh }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchComments(taskId);
      setComments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleAddComment = async (content) => {
    try {
      const newComment = await createComment(taskId, content);
      setComments([...comments, newComment]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateComment = async (commentId, content) => {
    try {
      const updated = await updateComment(commentId, content);
      setComments(comments.map(c => c.id === commentId ? updated : c));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c.id !== commentId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="comment-section">
      <div className="comment-header">
        <h4>Comments ({comments.length})</h4>
      </div>

      <AddComment onAdd={handleAddComment} />

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="no-comments">No comments yet</div>
      ) : (
        <div className="comments-list">
          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentList;
