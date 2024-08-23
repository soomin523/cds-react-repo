import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileForm = ({ onSave, initialData, onClose, weightOnly = false, setWeight, children }) => {
  const [age, setAge] = useState(initialData?.age || '');
  const [gender, setGender] = useState(initialData?.gender || '남');
  const [height, setHeight] = useState(initialData?.height || '');
  const [weight, setWeightInternal] = useState(initialData?.weight || '');
  const [goalWeight, setGoalWeight] = useState(initialData?.goalWeight || '');

  const handleSave = () => {
    if (weightOnly) {
      setWeight(weight);
      onSave();
    } else {
      onSave({ age, gender, height, weight, goalWeight });
    }
    onClose();
  };

  return (
    <>
      <DialogTitle>{weightOnly ? '체중 입력' : '정보 입력'}</DialogTitle>
      <DialogContent>
        <FormContainer>
          {!weightOnly && (
            <>
              <TextField
                label="성별"
                select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="남">남</MenuItem>
                <MenuItem value="여">여</MenuItem>
              </TextField>
              <TextField
                label="나이"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <TextField
                label="키 (cm)"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <TextField
                label="현재 체중 (kg)"
                type="number"
                value={weight}
                onChange={(e) => setWeightInternal(e.target.value)}
              />
              <TextField
                label="목표 체중 (kg)"
                type="number"
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
              />
            </>
          )}
          {weightOnly && (
            <>
              <TextField
                label="체중 (kg)"
                type="number"
                value={weight}
                onChange={(e) => setWeightInternal(e.target.value)}
              />
              {children} {/* 월 선택 드롭다운 추가 */}
            </>
          )}
        </FormContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} variant="contained">저장</Button>
        <Button onClick={onClose} color="secondary">닫기</Button>
      </DialogActions>
    </>
  );
};

export default ProfileForm;
