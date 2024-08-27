import React, { useEffect, useState } from 'react';
import {
    Box,
    Avatar,
    Typography,
    Button,
    IconButton,
    Divider,
    BottomNavigation,
    BottomNavigationAction,
    Grid,
    TextField,
} from '@mui/material';
import { Edit, Home } from '@mui/icons-material';
import { deleteFit, getFit, update } from '../join/ApiService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function Mypage() {
    const [fitDTO, setFitDTO] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch;
    
    // 회원정보 불러오기
    const uIdx = useSelector((state) => state.uIdx); 
    useEffect(() => {
        getFit(uIdx).then((resDTO) => setFitDTO(resDTO));
    }, []);

    const onPwChange = (e) => setFitDTO({ ...fitDTO, pw: e.target.value });
    const onBirthdayChange = (e) => setFitDTO({ ...fitDTO, birthday: e.target.value });
    const onTelChange = (e) => setFitDTO({ ...fitDTO, tel: e.target.value });

    // 회원정보 변경 submit 이벤트 처리
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const newDTO = {
            uIdx: uIdx,
            name: data.get("name"),
            pw: data.get("pw"),
            birthday: data.get("birthday"),
            tel: data.get("tel"),
        };

        update(newDTO).then((response) => {
            console.log(newDTO);
            console.log(response);
            if (response.result === "OK") {
                alert("회원정보변경성공");
            } else {
                alert("회원정보변경실패");
            }
        });
    };

    const onDelete = () => {
        deleteFit(uIdx).then(
            (response) => {
                console.log(response);
                if (response.result === "OK") {
                    alert("회원정보가 삭제되었습니다.")
                    onLogout();
                } else {
                    alert("삭제에 실패하셨습니다.")
                }
            })
    }

    const onLogout = () => {
        //sessionStorage.removeItem('state'); //새션 스토리지에서 state를 삭제함
        sessionStorage.clear();//세션 스토리지를 모든 데이터를 삭제함
        navigate('/');
        window.location.reload();
    }

    const gomainpage = () => {
        navigate('/');
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                backgroundColor: '#f9fafb',
                height: '100vh',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ textAlign: 'center', position: 'relative', mb: 3 }}>
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                        margin: '0 auto',
                        border: '2px solid #007aff',
                    }}
                    src="https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800"
                />
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 'calc(50% - 45px)', // 위치를 조금 더 중앙으로 조정
                        backgroundColor: '#007aff',
                        color: 'white',
                        width: 25, // 너비 조정
                        height: 25, // 높이 조정
                        padding: 1, // 패딩 조정
                        '&:hover': {
                            backgroundColor: '#005bb5',
                        },
                    }}
                >
                    <Edit />
                </IconButton>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#333' }}>
                    성함
                </Typography>
                <Typography color="text.secondary">{fitDTO.name}님</Typography>
            </Box>

            <Divider sx={{ width: '100%', mb: 3 }} />

            {/* 회원정보 변경 폼 */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ width: '100%', maxWidth: 360 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="이름"
                            name="name"
                            value={fitDTO.name}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="생년월일(8자리)"
                            name="birthday"
                            value={fitDTO.birthday}
                            onChange={onBirthdayChange}
                            InputLabelProps={{
                                shrink: Boolean(fitDTO.birthday),
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="핸드폰 번호"
                            name="tel"
                            value={fitDTO.tel}
                            onChange={onTelChange}
                            InputLabelProps={{
                                shrink: Boolean(fitDTO.tel),
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="비밀번호"
                            name="pw"
                            value={fitDTO.pw}
                            onChange={onPwChange}
                            InputLabelProps={{
                                shrink: Boolean(fitDTO.pw),
                            }}
                            type="password"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                {/* 회원정보 변경 버튼 */}
                <Box sx={{ width: '100%', maxWidth: 328, textAlign: 'center', mt: 4 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mb: 1,
                            backgroundColor: '#007aff',
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#005bb5',
                            },
                        }}
                    >
                        회원정보 변경
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                        <Button onClick={onDelete} size="small" color="inherit">회원탈퇴</Button>
                        <Button onClick={onLogout} size="small" color="inherit">로그아웃</Button>
                    </Box>
                </Box>
            </form>

            <BottomNavigation onClick={gomainpage}
                showLabels
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    position: 'fixed',
                    bottom: 0,
                    borderTop: '1px solid #e0e0e0',
                    backgroundColor: '#ffffff',
                }}
            >
                <BottomNavigationAction label="Home" icon={<Home />} />
            </BottomNavigation>
        </Box>
    );
}

export default Mypage;