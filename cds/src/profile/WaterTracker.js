import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import waterImage from './water.png'; // 물 이미지 파일
import checkImage from './check.png'; // 체크 이미지 파일
import IconButton from '@mui/material/IconButton'; // IconButton 추가
import ControlPointIcon from '@mui/icons-material/ControlPoint'; // ControlPoint 아이콘 추가

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const WaterTracker = () => {
  const [consumed, setConsumed] = useState(0); // 초기 섭취량 설정
  const goal = 2000; // 목표량 설정

  const handleAddWater = () => {
    setConsumed(prevConsumed => prevConsumed + 250); // 목표를 초과해도 계속 증가하도록 설정
  };

  const data = {
    datasets: [
      {
        data: [consumed, Math.max(goal - consumed, 0)], // 목표를 초과해도 표시하도록
        backgroundColor: ['#90ACC7', '#e0e0e0'], // 색상 변경
        borderWidth: 0, // 테두리 두께를 0으로 설정하여 숨김
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        enabled: false, // 툴팁 숨기기
      },
      title: {
        display: false, // 제목 숨기기
      },
      datalabels: {
        display: false, // 데이터 레이블 숨기기
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      arc: {
        borderWidth: 0, // 차트의 테두리 두께를 0으로 설정
      },
    },
    cutout: '80%', // 도넛의 두께 조정 (0%이면 원형 차트, 100%이면 빈 원)
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '200px', backgroundColor: 'white', borderRadius: '20px', padding: '10px' }}>
      <div style={{ position: 'relative', width: '150px', height: '150px', marginRight: '20px' }}>
        <Doughnut data={data} options={options} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
        <img
          src={waterImage}
          alt="water"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '65px',
            height: 'auto',
            opacity: '0.4', // 물 이미지 투명도
            zIndex: 1, // zIndex를 낮게 설정하여 체크 이미지 뒤에 위치하도록
          }}
        />
        {consumed >= goal && (
          <img
            src={checkImage}
            alt="check"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90px',
              height: 'auto',
              opacity: '0.6', // 체크 이미지 투명도
              zIndex: 2, // zIndex를 높게 설정하여 체크 이미지가 위에 표시되도록
            }}
          />
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'absolute', bottom: '-25px' }}>
          <div style={{
            fontSize: '16px',
            textAlign: 'center', // 중앙 정렬
            color: '#333', // 글자 색상
            backgroundColor: '#D3DEE9',
            borderRadius: '8px',
            padding: '0px 15px',
            whiteSpace: 'nowrap', // 텍스트가 한 줄로 표시되도록 설정
            
          }}>
            {consumed}ml/{goal}ml
          </div>
        </div>
        <div style={{ position: 'absolute', right: '-30px', bottom: '-29px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#333' }}>+250ml</span>
          <IconButton onClick={handleAddWater} style={{ padding: '0px' }}>
            <ControlPointIcon style={{ fontSize: '30px', color: '#90ACC7' }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
