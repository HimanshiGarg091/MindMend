import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const [quote, setQuote] = useState('');
  const [advice, setAdvice] = useState('');
  const [activity, setActivity] = useState('');

  // Dummy mood scores
  const moodScores = [2, 3, 4, 3, 5];

  // Fetch Zen Quote
  useEffect(() => {
    fetch('https://zenquotes.io/api/random')
      .then(res => res.json())
      .then(data => setQuote(`${data[0].q} — ${data[0].a}`))
      .catch(() => setQuote("Stay calm and keep building!"));
  }, []);

  // Fetch Advice
  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(data => setAdvice(data.slip.advice))
      .catch(() => setAdvice("Take it easy."));
  }, []);

  // Fetch Random Activity
  useEffect(() => {
    fetch('https://www.boredapi.com/api/activity')
      .then(res => res.json())
      .then(data => setActivity(data.activity))
      .catch(() => setActivity("Go for a short walk."));
  }, []);

  const moodChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Mood Score',
        data: moodScores,
        borderColor: 'blue',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Mood Dashboard (Practice)</Typography>

      <Grid container spacing={4}>
        {/* Mood Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Mood Score Over Time</Typography>
            <Line data={moodChartData} />
          </Paper>
        </Grid>

        {/* Quote */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>🧘 Motivational Quote</Typography>
            <Typography variant="body1">{quote}</Typography>
          </Paper>
        </Grid>

        {/* Advice */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>💡 Life Advice</Typography>
            <Typography variant="body1">{advice}</Typography>
          </Paper>
        </Grid>

        {/* Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>🎯 Suggested Activity</Typography>
            <Typography variant="body1">{activity}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
