import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import person from './img/person.png';
import WeightChart from './WeightChart';
import WaterTracker from './WaterTracker';
import SleepTracker from './SleepTracker';
import ExerciseTracker from './ExerciseTracker';
import { useSelector } from 'react-redux';
import { getFit } from '../join/ApiService';

function Profile({ onEdit }) {
  const [profile, setProfile] = useState(null);
  const [weightChangeMessage, setWeightChangeMessage] = useState('');
  const [goalWeightMessage, setGoalWeightMessage] = useState('');
  const { uIdx } = useSelector((state) => state);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const resDTO = await getFit(uIdx);
        setProfile(resDTO);

        // Compute initial messages
        computeMessages(resDTO);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [uIdx]);

  useEffect(() => {
    if (profile) {
      computeMessages(profile);
    }
  }, [profile]);

  const computeMessages = (profile) => {
    const weights = [
      profile.january || 0,
      profile.february || 0,
      profile.march || 0,
      profile.april || 0,
      profile.may || 0,
      profile.june || 0,
      profile.july || 0,
      profile.august || 0,
      profile.september || 0,
      profile.october || 0,
      profile.november || 0,
      profile.december || 0,
    ];

    const filteredWeights = weights.filter(weight => weight !== 0);
    const latestWeight = filteredWeights.pop() || 0;
    const previousWeight = filteredWeights.pop() || 0;

    const weightChange = latestWeight - previousWeight;
    setWeightChangeMessage(` ${weightChange >= 0 ? '+' : ''}${weightChange.toFixed(1)} kg`);

    const goalWeight = profile.finweight || 0;
    const weightToGoal = goalWeight - latestWeight;
    setGoalWeightMessage(`목표 체중까지 ${weightToGoal.toFixed(1)} kg!`);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  const weights = [
    profile.january || 0,
    profile.february || 0,
    profile.march || 0,
    profile.april || 0,
    profile.may || 0,
    profile.june || 0,
    profile.july || 0,
    profile.august || 0,
    profile.september || 0,
    profile.october || 0,
    profile.november || 0,
    profile.december || 0,
  ];

  const latestWeight = weights.filter(weight => weight !== 0).pop() || 0;
  const heightInMeters = profile.height / 100;
  const bmi = heightInMeters > 0 ? (latestWeight / (heightInMeters * heightInMeters)).toFixed(1) : 'N/A';

  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return '저체중';
    if (bmi < 24.9) return '정상';
    if (bmi < 29.9) return '과체중';
    return '비만';
  };

  const bmiStatus = getBMIStatus(bmi);

  return (
    <Card sx={{ backgroundColor: '#DAE4E8', borderRadius: '30px', height: '100vh' }}>
      <CardContent style={{ display: 'flex', height: '100%', overflowY: 'auto' }}>
        <Grid container spacing={2} style={{ height: '100%', flexGrow: 1 }}>
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
                {profile.name}님의 건강 정보
              </Typography>
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={2} style={{ flex: '1', alignItems: 'flex-start' }}>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={6} style={{ padding: '0', height: '70%' }}>
                      <img
                        src={person}
                        alt="Person"
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
                      <Typography>{profile.gender}</Typography>
                      <Typography variant="caption" color="textSecondary" style={{ marginBottom: '15px' }}>성별</Typography>
                      
                      <Typography>{profile.age}세</Typography>
                      <Typography variant="caption" color="textSecondary" style={{ marginBottom: '15px' }}>나이</Typography>
                      
                      <Typography>{profile.height} cm</Typography>
                      <Typography variant="caption" color="textSecondary" style={{ marginBottom: '15px' }}>키</Typography>
                      
                      <Typography>{latestWeight} kg</Typography>
                      <Typography variant="caption" color="textSecondary" style={{ marginBottom: '15px' }}>체중</Typography>
                      
                      <Typography>
                        {bmi} ({bmiStatus})
                        <Tooltip title={
                              "BMI 기준: 저체중 < 18.5 | 정상 18.5~24.9 | 과체중 25~29.9 | 비만 ≥ 30"
                            } arrow>
                          <IconButton style={{ marginLeft: '3px', padding: '0' }}>
                            <InfoIcon style={{ fontSize: 18 }} />
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
                  <Typography variant="h6">{profile.finweight} kg</Typography>
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
