// src/components/TaskList.jsx
import React from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, IconButton, Box, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const TaskList = ({ tasks, onEdit, onDelete, onStatusChange }) => {
  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    try {
      await apiClient.put(`/tasks/${task._id}`, { ...task, status: newStatus });
      onStatusChange(); // Refresh list
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '70vh', overflowY: 'auto', pr: 1 }}>
      {tasks.length === 0 ? (
        <Typography>No tasks yet. Add one to get started! ✅</Typography>
      ) : (
        tasks.map((task) => (
          <Card key={task._id} variant="outlined" sx={{ bgcolor: task.status === 'Completed' ? '#e8f5e9' : 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{task.title}</Typography>
                <Box>
                  <IconButton onClick={() => onEdit(task)} color="primary"><EditIcon /></IconButton>
                  <IconButton onClick={() => onDelete(task._id)} color="error"><DeleteIcon /></IconButton>
                </Box>
              </Box>
              <Typography color="text.secondary" sx={{ mt: 1 }}>{task.description}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Chip label={task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'} size="small" />
                <IconButton onClick={() => handleToggleStatus(task)} color={task.status === 'Completed' ? 'success' : 'default'}>
                  {task.status === 'Completed' ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default TaskList;
