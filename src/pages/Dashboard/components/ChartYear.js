import { faker } from '@faker-js/faker';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
        text: 'Biểu đồ thống kê tổng hợp theo tháng',
      },
    },
  };
  return <Bar options={options} data={data} />;
}
