// src/components/TaskChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const pendingTasks = tasks.length - completedTasks;

  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: '# of Tasks',
        data: [completedTasks, pendingTasks],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', bgcolor: 'white' }}>
      {tasks.length > 0 ? (
        <Pie data={data} />
      ) : (
        <Typography align="center" color="text.secondary">No data to display chart</Typography>
      )}
    </Box>
  );
};

export default TaskChart;
