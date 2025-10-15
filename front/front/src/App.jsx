// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, AppBar, Toolbar, Box } from '@mui/material';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskChart from './components/TaskChart';

// Set the base URL for all axios requests
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await apiClient.get('/tasks');
      setTasks(response.data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAddedOrUpdated = () => {
    fetchTasks();
    setEditingTask(null); // Clear editing state
  };
  
  const handleEdit = (task) => {
    setEditingTask(task);
  };
  
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/tasks/${id}`);
      fetchTasks(); // Refresh the list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Task Manager 📝
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Box>
            <Typography variant="h5" gutterBottom>Add or Edit Task</Typography>
            <TaskForm 
              onTaskAddedOrUpdated={handleTaskAddedOrUpdated}
              editingTask={editingTask}
            />
            <Typography variant="h5" gutterBottom sx={{mt: 4}}>Task Statistics</Typography>
            <TaskChart tasks={tasks} />
          </Box>
          <Box>
            <Typography variant="h5" gutterBottom>My Tasks</Typography>
            <TaskList 
              tasks={tasks} 
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleTaskAddedOrUpdated} // Re-fetch tasks on status change
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;