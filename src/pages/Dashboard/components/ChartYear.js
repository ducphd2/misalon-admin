import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

function getLast20Years() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 21 }, (_, index) => currentYear - 20 + index);
}

function genMonths(limit = 12) {
  return Array.from({ length: limit }, (value, index) => `Tháng ${index + 1}`);
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function Chart() {
  const labels = genMonths();
  const data = {
    labels,
    datasets: [
      {
        label: 'Lịch hẹn',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dịch vụ',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Biểu đồ doanh thu theo tháng',
      },
    },
  };
  return <Bar options={options} data={data} />;
}
