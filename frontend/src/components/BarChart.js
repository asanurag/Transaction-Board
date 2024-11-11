import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.range),
    datasets: [
      {
        label: 'Number of Items',
        data: data.map(d => d.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          boxWidth: 20,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          font: {
            size: 12
          }
        },
        grid: {
          display: true,
          drawBorder: false
        }
      },
      x: {
        ticks: {
          font: {
            size: 11
          },
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Range Distribution</h2>
      <div className="h-[400px] w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;