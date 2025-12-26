import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const updated = await updateTask(taskId, taskData);
      setTasks(tasks.map(t => t.id === taskId ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>
      
      <div className="app-content">
        <CreateTask onCreateTask={handleCreateTask} />
        
        {error && <div className="error">{error}</div>}
        
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onRefresh={loadTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
