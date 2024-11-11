import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {

  const colors = [
    'rgba(255, 99, 132, 0.8)',   
    'rgba(54, 162, 235, 0.8)',   
    'rgba(255, 206, 86, 0.8)',   
    'rgba(75, 192, 192, 0.8)',   
    'rgba(153, 102, 255, 0.8)',  
    'rgba(255, 159, 64, 0.8)',   
    'rgba(199, 199, 199, 0.8)',  
    'rgba(83, 102, 255, 0.8)',   
    'rgba(255, 99, 255, 0.8)',   
    'rgba(159, 159, 64, 0.8)',  
  ];

  const borderColors = colors.map(color => color.replace('0.8', '1'));

  const chartData = {
    labels: data.map(d => d._id),
    datasets: [
      {
        data: data.map(d => d.count),
        backgroundColor: colors.slice(0, data.length),
        borderColor: borderColors.slice(0, data.length),
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
        labels: {
          boxWidth: 15,
          padding: 15,
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
        },
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Category Distribution</h2>
      <div className="h-[400px] w-full">
        <div className="flex items-center justify-center h-full">
          <div className="w-4/5 h-full">
            <Pie data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;