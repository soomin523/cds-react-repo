import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import person from './person.png';
import WeightChart from './WeightChart';
import WaterTracker from './WaterTracker';
import SleepTracker from './SleepTracker';
import ExerciseTracker from './ExerciseTracker';

function Profile({ profile, onEdit, onAddWeight }) {
  const [weightChangeMessage, setWeightChangeMessage] = useState('');
  const [goalWeightMessage, setGoalWeightMessage] = useState('');

  const { age, gender, height, goalWeight, weights } = profile;

  // 최신 체중값 계산
  const latestWeight = weights.filter(weight => weight !== null).pop();

  // BMI 계산 함수
  const calculateBMI = (weight, height) => {
    if (height > 0) {
      const heightInMeters = height / 100; // cm to meters
      return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return 'N/A';
  };

  // BMI 상태 설명
  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return '저체중';
    if (bmi < 24.9) return '정상';
    if (bmi < 29.9) return '과체중';
    return '비만';
  };

  const bmi = calculateBMI(latestWeight, height);
  const bmiStatus = getBMIStatus(bmi);

  // 체중 변화 및 목표 체중까지의 거리 메시지 업데이트
  useEffect(() => {
    let lastWeight = null;
    let secondLastWeight = null;

    for (let i = weights.length - 1; i >= 0; i--) {
      if (weights[i] !== null) {
        if (lastWeight === null) {
          lastWeight = weights[i];
        } else {
          secondLastWeight = weights[i];
          break;
        }
      }
    }

    let weightChange = '';
    if (lastWeight !== null && secondLastWeight !== null) {
      const change = lastWeight - secondLastWeight;
      weightChange = `${change > 0 ? `+${change.toFixed(1)} kg` : `-${Math.abs(change).toFixed(1)} kg `}`;
    } else {
      weightChange = '0kg';
    }

    setWeightChangeMessage(weightChange);

    const weightToGoal = lastWeight !== null && goalWeight ? (lastWeight - goalWeight).toFixed(1) : null;
    let goalMessage = '';
    if (weightToGoal !== null) {
      goalMessage = weightToGoal > 0
        ? `목표 체중까지 ${Math.abs(weightToGoal)} kg`
        : weightToGoal < 0
          ? `목표 체중 초과 ${Math.abs(weightToGoal)} kg`
          : `목표 체중 도달`;
    }

    setGoalWeightMessage(goalMessage);
  }, [weights, goalWeight]);

  return (
    <Card sx={{ backgroundColor: '#DAE4E8', borderRadius: '30px', height: '100vh' }}>
      <CardContent style={{ display: 'flex', height: '100%', overflowY: 'auto' }}>
        <Grid container spacing={2} style={{ height: '100%', flexGrow: 1, flexWrap: 'wrap' }}>
          <Grid item xs={12} md={4} style={{ height: '90%' }}>
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '20px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6" align="left" fontSize={'20pt'} style={{ marginBottom: '20px' }}>
                OOO님의 건강 정보
              </Typography>
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={2} style={{ flex: '1', alignItems: 'flex-start' }}>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={6} style={{ padding: '0', height: '70%' }}>
                      <img
                        src={person}
                        alt="person"
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '20px',
                          maxHeight: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} style={{ padding: '0', marginLeft: '20px', height: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Typography>{gender}</Typography>
                      <Typography variant="caption" color="textSecondary" style={{ marginBottom: '15px' }}>성별</Typography>
                      
                      <Typography>{age}세</Typography>
                      <Typography variant="caption" color="textSecondary" style={{ marginBottom: '15px' }}>나이</Typography>
                      
                      <Typography>{height} cm</Typography>
                      <Typography variant="caption" color="textSecondary" style={{ marginBottom: '15px' }}>키</Typography>
                      
                      <Typography>{latestWeight} kg</Typography>
                      <Typography variant="caption" color="textSecondary" style={{ marginBottom: '15px' }}>체중</Typography>
                      
                      <Typography>{bmi} ({bmiStatus})
                        <Tooltip title={
                              "BMI 기준: 저체중 < 18.5 | 정상 18.5~22.9 | 과체중 23~24.9 | 비만 ≥ 25"
                            } arrow>
                          <IconButton style={{ marginLeft: '3px', padding: '0' }}>
                            <InfoIcon style={{ fontSize: 18 }} /> {/* 직접적인 크기 설정 */}
                          </IconButton>
                        </Tooltip>
                      </Typography>
                      
                      <Typography variant="caption" color="textSecondary" style={{ marginBottom: '15px' }}>BMI</Typography>
                    </Grid>

                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <Button
                    sx={{
                      height: '30px',
                      padding: '0 10px',
                      fontSize: '12px',
                      marginRight: '10px',
                      backgroundColor: '#D0E4F3',
                      color: '#50565D',
                      border: '2px solid #B0C4DE',
                      borderRadius: '30px',
                      '&:hover': {
                        backgroundColor: '#C1D9F5',
                        border: '2px solid #A0B8E3',
                      },
                    }}
                    onClick={onEdit}
                  >
                    정보 수정
                  </Button>
                  <Button
                    sx={{
                      height: '30px',
                      padding: '0 10px',
                      fontSize: '12px',
                      backgroundColor: '#D0E4F3',
                      color: '#50565D',
                      border: '2px solid #B0C4DE',
                      borderRadius: '30px',
                      '&:hover': {
                        backgroundColor: '#C1D9F5',
                        border: '2px solid #A0B8E3',
                      },
                    }}
                    onClick={onAddWeight}
                  >
                    월별 체중 입력
                  </Button>

                </Grid>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={8} style={{ height: '90%', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              marginBottom: '20px',
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '10px',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
              <WaterTracker />
              <SleepTracker />
              <ExerciseTracker />
            </div>

            <div style={{ flex: '1', backgroundColor: 'white', borderRadius: '20px', padding: '10px', textAlign: 'left' }}>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ textAlign: 'center' }}>
                  <Typography variant="h6">{latestWeight} kg</Typography>
                  <Typography variant="caption" color="textSecondary">현재 체중</Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Typography variant="h6">{goalWeight} kg</Typography>
                  <Typography variant="caption" color="textSecondary">목표 체중</Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Typography variant="h6">{weightChangeMessage}</Typography>
                  <Typography variant="caption" color="textSecondary">체중 변화</Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Typography
                          variant="h6"
                          align="left"
                          fontSize={'20pt'}
                          style={{
                            marginBottom: '10px',
                            fontFamily: 'Nanum Pen Script, cursive',
                            color: 'red',
                            transform: 'rotate(15deg)',
                            transformOrigin: 'left bottom',
                          }}
                        >
                          {goalWeightMessage}
                    </Typography>
                </div>
              </div>
              <WeightChart weights={weights} />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Profile;
