const API_BASE = '/tasks';

export const fetchTasks = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

export const createTask = async (taskData) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
};

export const updateTask = async (taskId, taskData) => {
  const response = await fetch(`${API_BASE}/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_BASE}/${taskId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete task');
};

export const fetchComments = async (taskId) => {
  const response = await fetch(`${API_BASE}/${taskId}/comments`);
  if (!response.ok) throw new Error('Failed to fetch comments');
  return response.json();
};

export const createComment = async (taskId, content) => {
  const response = await fetch(`${API_BASE}/${taskId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
  if (!response.ok) throw new Error('Failed to create comment');
  return response.json();
};

export const updateComment = async (commentId, content) => {
  const response = await fetch(`/comments/${commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
  if (!response.ok) throw new Error('Failed to update comment');
  return response.json();
};

export const deleteComment = async (commentId) => {
  const response = await fetch(`/comments/${commentId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete comment');
};
