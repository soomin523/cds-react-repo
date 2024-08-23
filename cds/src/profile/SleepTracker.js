import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, MenuItem, Select, FormControl, Grid, Typography, IconButton } from '@mui/material';
import checkOff from './checkoff.png'; // 체크 오프 이미지
import checkOn from './checkon.png'; // 체크 온 이미지
import sleepImage from './sleep.png'; // 수면 이미지 파일

const SleepTracker = () => {
  const [sleepTime, setSleepTime] = useState(''); // 설정된 수면시간
  const [openDialog, setOpenDialog] = useState(false); // 팝업창 열기/닫기 상태
  const [startHour, setStartHour] = useState(23); // 시작 시간
  const [startMinute, setStartMinute] = useState(0); // 시작 분
  const [endHour, setEndHour] = useState(7); // 종료 시간
  const [endMinute, setEndMinute] = useState(0); // 종료 분
  const [isChecked, setIsChecked] = useState(false); // 체크 상태

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    const formattedStartHour = String(startHour).padStart(2, '0');
    const formattedStartMinute = String(startMinute).padStart(2, '0');
    const formattedEndHour = String(endHour).padStart(2, '0');
    const formattedEndMinute = String(endMinute).padStart(2, '0');
    const formattedSleepTime = `${formattedStartHour}:${formattedStartMinute} ~ ${formattedEndHour}:${formattedEndMinute}`;
    setSleepTime(formattedSleepTime);
    setOpenDialog(false);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleCheckClick = () => {
    setIsChecked(prev => !prev); // 체크 상태 토글
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '200px', backgroundColor: 'white', borderRadius: '20px', padding: '10px' }}>
      <div style={{ position: 'relative', width: '150px', height: '150px', marginRight: '20px' }}>
        <img
          src={sleepImage}
          alt="sleep"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '20px',
            objectFit: 'cover',
          }}
        />
        <div
          onClick={handleClickOpen} // 클릭 시 팝업 열리도록 설정
          style={{
            position: 'absolute',
            bottom: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '16px',
            textAlign: 'center',
            color: '#7C7C7C',
            backgroundColor: '#D3DEE9',
            borderRadius: '8px',
            padding: '0px 20px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'pointer', // 클릭할 수 있는 느낌을 주기 위해 커서 변경
          }}
        >
          {sleepTime || '수면 시간 계획하기'}
        </div>
        <div style={{ position: 'absolute', right: '-10px', top: '-5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <IconButton onClick={handleCheckClick} style={{ padding: '0', position: 'relative' }}>
    <img
      src={isChecked ? checkOn : checkOff} // 체크 상태에 따라 이미지 변경
      alt="check"
      style={{ width: '40px', height: '40px' }} // 아이콘 크기 조절
    />
    <span style={{
      position: 'absolute',
      top: '70%', // 이미지 바로 아래에 위치
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '10px', // 텍스트 크기 조절
      color: '#000',
      pointerEvents: 'none', // 텍스트 클릭 이벤트 방지
      marginTop: '5px' // 이미지와 텍스트 사이의 간격 조절
    }}>
      check!
    </span>
  </IconButton>
</div>
      </div>

      {/* 수면 시간 설정 팝업창 */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: '15px' }, // 팝업창에 borderRadius 추가
        }}
      >
        <DialogTitle>수면 시간 설정</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <FormControl>
                <Select
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  sx={{ minWidth: 70, height: 30 }}
                >
                  {hours.map((hour) => (
                    <MenuItem key={hour} value={hour}>
                      {String(hour).padStart(2, '0')}시
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <Select
                  value={startMinute}
                  onChange={(e) => setStartMinute(e.target.value)}
                  sx={{ minWidth: 70, height: 30 }}
                >
                  {minutes.map((minute) => (
                    <MenuItem key={minute} value={minute}>
                      {String(minute).padStart(2, '0')}분
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Typography>부터</Typography>
            </Grid>
            <Grid item>
              <FormControl>
                <Select
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                  sx={{ minWidth: 70, height: 30 }}
                >
                  {hours.map((hour) => (
                    <MenuItem key={hour} value={hour}>
                      {String(hour).padStart(2, '0')}시
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <Select
                  value={endMinute}
                  onChange={(e) => setEndMinute(e.target.value)}
                  sx={{ minWidth: 70, height: 30 }}
                >
                  {minutes.map((minute) => (
                    <MenuItem key={minute} value={minute}>
                      {String(minute).padStart(2, '0')}분
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Typography>까지</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>저장</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SleepTracker;
