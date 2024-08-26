import React, { useState } from 'react';
import ProfileForm from './ProfileForm';
import Profile from './Profile';
import {
  Container,
  Button,
  Dialog,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import profileImage from './profilesample.png'; // 이미지 import
import Header from '../header/Header';
import Footer from '../footer/Footer';

function ProfileApp() {
  const [profile, setProfile] = useState(null);
  const [weights, setWeights] = useState(Array(12).fill(null));
  const [showForm, setShowForm] = useState(false);
  const [showWeightForm, setShowWeightForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() - 1);
  const [previousMonthWeight, setPreviousMonthWeight] = useState('');
  const [showImage, setShowImage] = useState(true);

  const handleProfileSave = (profileData) => {
    const month = new Date().getMonth();
    const updatedWeights = [...weights];
    updatedWeights[month] = parseFloat(profileData.weight);

    setProfile({
      ...profileData,
      weights: updatedWeights,
      weight: parseFloat(profileData.weight), // 현재 체중 업데이트
    });

    setWeights(updatedWeights);
    setShowForm(false);
    setShowImage(false);
  };

  const handleWeightSave = () => {
    const updatedWeights = [...weights];
    updatedWeights[selectedMonth] = parseFloat(previousMonthWeight);

    // Update the current weight to match the new weight input
    const newWeight = parseFloat(previousMonthWeight);
    setProfile((prevProfile) => ({
      ...prevProfile,
      weight: newWeight, // Update the current weight
      weights: updatedWeights
    }));

    setWeights(updatedWeights);
    setShowWeightForm(false);
    setPreviousMonthWeight('');
  };

  const handleShowForm = (editMode = false) => {
    setIsEdit(editMode);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowWeightForm(false);
  };

  return (
    <div>
      <Header />
      <Container style={{ position: 'relative', marginTop: '20px', height: '100vh' }}>
        <Dialog open={showForm} onClose={handleCloseForm}>
          <ProfileForm
            onSave={handleProfileSave}
            initialData={isEdit ? profile : null}
            onClose={handleCloseForm}
          />
        </Dialog>

        <Dialog open={showWeightForm} onClose={handleCloseForm}>
          <div style={{ padding: '20px' }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>월 선택</InputLabel>
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {i + 1}월
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="체중 (kg)"
              type="number"
              value={previousMonthWeight}
              onChange={(e) => setPreviousMonthWeight(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleWeightSave}
            >
              저장
            </Button>
          </div>
        </Dialog>

        {showImage && (
          <img
            src={profileImage}
            alt="Profile"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0
            }}
          />
        )}

        {!profile && (
          <Card sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            width: '200px',
            height: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#D3DEE9',
            borderRadius: '10px'
          }}>
            <CardContent style={{ textAlign: 'center' }}>
              <Typography variant="body2" style={{ marginBottom: '10px', color: '#50565D' }}>
                내 정보를 기록하고 <br /> 건강 상태를 확인해보세요!
              </Typography>
              <Button
                style={{ width: '100%', borderRadius: '8px', backgroundColor: '#90ACC7' }}
                variant="contained"
                onClick={() => handleShowForm(false)}
              >
                내 정보 입력
              </Button>
            </CardContent>
          </Card>
        )}

        {profile && (
          <Profile
            profile={{ ...profile, weights }}
            onEdit={() => handleShowForm(true)}
            onAddWeight={() => setShowWeightForm(true)}
          />
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default ProfileApp;
