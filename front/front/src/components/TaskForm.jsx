// src/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const TaskForm = ({ onTaskAddedOrUpdated, editingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setDueDate(editingTask.dueDate ? editingTask.dueDate.substring(0, 10) : '');
      setStatus(editingTask.status);
    } else {
      // Reset form when not editing
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('Pending');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, dueDate, status };
    
    try {
        if (editingTask) {
            await apiClient.put(`/tasks/${editingTask._id}`, taskData);
        } else {
            await apiClient.post('/tasks', taskData);
        }
        onTaskAddedOrUpdated(); // Callback to refresh task list
        setTitle('');
        setDescription('');
        setDueDate('');
        setStatus('Pending');
    } catch (error) {
        console.error("Error saving task:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, border: '1px solid #ddd', borderRadius: '8px', bgcolor: 'white' }}>
      <TextField label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <TextField label="Description" variant="outlined" multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField label="Due Date" type="date" variant="outlined" value={dueDate} onChange={(e) => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} />
      {editingTask && (
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
      )}
      <Button type="submit" variant="contained" color="primary">{editingTask ? 'Update Task' : 'Add Task'}</Button>
    </Box>
  );
};

export default TaskForm;
