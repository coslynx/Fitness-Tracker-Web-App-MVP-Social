import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LineController, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ProgressData } from '../utils/types';
import { useFetch } from '../hooks/useFetch';
import { API_URL } from '../utils/constants';
import { useAuthContext } from '../hooks/useAuthContext';

// Register ChartJS components
ChartJS.register(CategoryScale, LineController, PointElement, LineElement, Title, Tooltip, Legend);

interface ProgressChartProps {
  goalId: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId }) => {
  const [chartData, setChartData] = useState<ProgressData[]>([]);

  const { user } = useAuthContext(); 
  const { data, isLoading, error } = useFetch<ProgressData[]>(
    `${API_URL}/goals/${goalId}/progress`,
    user?.token
  );

  useEffect(() => {
    if (data) {
      setChartData(data); 
    }
  }, [data]);

  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Progress Chart' // Customize the title as needed
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day' // Adjust time unit (day, week, month) based on data
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Metric Value'
        }
      }
    }
  };

  if (isLoading) {
    // Render a loading indicator
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle errors gracefully
    console.error('Error fetching progress data:', error);
    return <div>Error: Could not load progress data.</div>;
  }

  return (
    <div className="chart-container">
      <Line data={{
        labels: chartData.map(dataPoint => new Date(dataPoint.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Progress',
            data: chartData.map(dataPoint => dataPoint.value),
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: false
          }
        ]
      }} 
      options={options}
      />
    </div>
  );
};

export default ProgressChart;