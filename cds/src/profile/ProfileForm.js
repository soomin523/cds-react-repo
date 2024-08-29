import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Grid, Card, CardContent, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useSelector } from 'react-redux';
import { getFit, weightin } from '../join/ApiService';
import '../Section/excSection.css'

function ProfileForm({ onClose }) {
  const { uIdx } = useSelector((state) => state);
  const [formValues, setFormValues] = useState({
    age: '',
    gender: '남',
    height: '',
    january: '',
    february: '',
    march: '',
    april: '',
    may: '',
    june: '',
    july: '',
    august: '',
    september: '',
    october: '',
    november: '',
    december: '',
    finweight: ''
  });
  const [selectedMonth, setSelectedMonth] = useState('august'); // 기본 월을 1월로 설정

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const resDTO = await getFit(uIdx);
        setFormValues({
          age: resDTO.age || '',
          gender: resDTO.gender || '',
          height: resDTO.height || '',
          january: resDTO.january || '',
          february: resDTO.february || '',
          march: resDTO.march || '',
          april: resDTO.april || '',
          may: resDTO.may || '',
          june: resDTO.june || '',
          july: resDTO.july || '',
          august: resDTO.august || '',
          september: resDTO.september || '',
          october: resDTO.october || '',
          november: resDTO.november || '',
          december: resDTO.december || '',
          finweight: resDTO.finweight || ''
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [uIdx]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // FitDTO에 맞는 형식으로 데이터를 구성합니다.
      const updatedValues = {
        ...formValues,
        uIdx // uIdx를 FitDTO에 추가
      };
  
      // 서버에 데이터 전송
      await weightin(updatedValues);
      alert("정보가 성공적으로 업데이트되었습니다.");
      onClose();
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  return (
    <div className='mybox'>
    <Card sx={{ backgroundColor: '#f4f4f4',
       borderRadius: '30px',
        height: 'max-content',
         width:'max-content',
         border: '2px solid #B0BEC5', 
         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
         >
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', 
        justifyContent: 'center', height: '100%' }}>
        <Typography variant="h6" style={{ marginBottom: '20px' }}>
          정보 입력
        </Typography>
        <Grid container spacing={2} style={{ width: '100%', maxWidth: '600px' }}>
          {/* 나이, 성별, 키, 목표체중 입력 필드 */}
          <Grid item xs={12} style={{ display: 'block' }}>
            <TextField
              fullWidth
              label="나이"
              name="age"
              value={formValues.age}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="성별"
              name="gender"
              select
              value={formValues.gender}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="남">남</MenuItem>
              <MenuItem value="여">여</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="키 (cm)"
              name="height"
              value={formValues.height}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="목표 체중 (kg)"
              name="finweight"
              value={formValues.finweight}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* 월 선택 드롭다운 */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>월 선택</InputLabel>
              <Select
                value={selectedMonth}
                onChange={handleMonthChange}
                label="월 선택"
              >
                <MenuItem value="january">1월</MenuItem>
                <MenuItem value="february">2월</MenuItem>
                <MenuItem value="march">3월</MenuItem>
                <MenuItem value="april">4월</MenuItem>
                <MenuItem value="may">5월</MenuItem>
                <MenuItem value="june">6월</MenuItem>
                <MenuItem value="july">7월</MenuItem>
                <MenuItem value="august">8월</MenuItem>
                <MenuItem value="september">9월</MenuItem>
                <MenuItem value="october">10월</MenuItem>
                <MenuItem value="november">11월</MenuItem>
                <MenuItem value="december">12월</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* 선택된 월의 체중 입력 필드 */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={`${selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)} 체중`}
              name={selectedMonth}
              value={formValues[selectedMonth]}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* 제출 및 취소 버튼 */}
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              제출
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              취소
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </div>
  );
}

export default ProfileForm;
