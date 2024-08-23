import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const WeightChart = ({ weights }) => {
  const data = {
    labels: weights.map((_, index) => `${index + 1}월`),
    datasets: [
      {
        label: '체중 기록',
        data: weights,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderWidth: 1,
        fill: true,
        spanGaps: true
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      title: {
        display: false, // 제목 숨기기
      },
      datalabels: {
        display: false, // 데이터 레이블 숨기기
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
        
        }
      },
      y: {
        title: {
          display: true,
          text: 'kg'
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...weights) + 10, // 데이터의 최대값에 여유를 두고 설정
        ticks: {
          stepSize: 10,
          callback: (value) => value
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeightChart;
