# Task Manager Frontend

React frontend for the Task Management API.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure the Flask backend is running on port 5000

3. Start the React development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Features

- View all tasks
- Create new tasks
- View comments for each task
- Add comments to tasks
- Edit existing comments
- Delete comments

## Project Structure

```
src/
├── components/
│   ├── TaskList.js       # List of all tasks
│   ├── TaskItem.js       # Single task display
│   ├── CreateTask.js     # Task creation form
│   ├── CommentList.js    # Comments for a task
│   ├── CommentItem.js    # Single comment display
│   └── AddComment.js     # Comment creation form
├── api.js                # API integration
├── App.js                # Main app component
└── index.js              # Entry point
```

## API Integration

The app connects to the Flask backend running on `http://localhost:5000`.

All API calls are handled through the `api.js` module.
