import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  Tooltip,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  plugins,
  scales,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  ORANGE_COLOR,
  PURPLE_BLUE,
  ROYAL_BLUE,
  TRANSPARENT_TEAL,
  WHITE_COLOR,
} from '../../constants/color';
import { getLast7Days } from '../../lib/features';

ChartJS.register(
  CategoryScale,
  Filler,
  Tooltip,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  plugins,
  scales
);

const labels = getLast7Days();

const LineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: { display: false },
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false } },
  },
};
const LineChart = ({ value = [] }) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: value,
        label: 'Revenue',
        fill: true,
        backgroundColor: TRANSPARENT_TEAL,
        borderColor: ROYAL_BLUE,
      },
    ],
  };
  return <Line data={data} options={LineChartOptions} />;
};
const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: 'Total Chats Vs Group Chats',
        fill: true,
        backgroundColor: ['#7f4f24', '#84a98c'],
        borderColor: ['#c8b6ff', ORANGE_COLOR],
      },
    ],
  };
  return <Doughnut data={data} />;
};

export { LineChart, DoughnutChart };
