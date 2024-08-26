import React from "react";
import { Container, Grid, TextField, Typography, Button, Checkbox, FormControlLabel } from "@mui/material";
import { Link } from 'react-router-dom';
import { call } from "../join/ApiService";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUidx, setId, setName } from "../redux/actions";
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        // 로그인 처리 로직 추가
        const data = new FormData(e.target);
        const id = data.get("id");
        const pw = data.get("pw");

        signin({ id: id, pw: pw });
    };

    function signin(userDTO) {
        return call("/fitloot/login", "POST", userDTO)
            .then((response) => {
                if (response.result === "OK") {
                    // 로그인 성공시
                    alert("성공");
                    dispatch(setIsLoggedIn(true));
                    //로그인 후 응답내용 중 uIdx, userId를 리덕스의 스토어에 저장함
                    dispatch(setUidx(response.uIdx));
                    dispatch(setId(response.id));
                    dispatch(setName(response.name));
                    console.log(response.name);
                    navigate('/profile');
                } else {
                    alert("실패");
                }
            })
            .catch((error) => {
                console.error("로그인 에러:", error);
                alert("로그인 중 오류가 발생했습니다.");
            });
    }

    const bannerOnclick = () => {
        navigate("/")
    }

    return (

        <div style={{ padding: '15px 0 200px', width: '100%', height: 'auto' }}>
            <Container maxWidth="xs" style={{ marginTop: "15%", width: '400px', height: 'auto', paddingBottom: "20px", backgroundColor: '#white',
                borderRadius:'10px' 
             }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h4" sx={{
                            marginBottom: '15px',
                            textAlign: 'center',
                            marginTop: '30px'
                        }}>
                            <img onClick={bannerOnclick}
                                src={`${process.env.PUBLIC_URL}/headerlogo.webp`}
                                alt="My Image"
                                style={{ width: '300px', height: 'auto', cursor: 'pointer' }

                                }
                            />
                        </Typography>
                    </Grid>
                </Grid>
                <form noValidate onSubmit={handleSubmit}>
                    {/* submit 버튼을 누르면 handleSubmit이 실행됨 */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="id"
                                name="id"
                                variant="outlined"
                                required
                                fullWidth
                                id="id"
                                label="아이디"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="pw"
                                id="pw"
                                label="비밀번호"
                                type="password"
                                autoComplete="current-password"
                                inputProps={{ minLength: 0, maxLength: 20 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox sx={{ display: 'inline-flex', borderRadius: "50%" }} />}
                                label="로그인 상태 유지하기"
                                sx={{ marginLeft: '0px' }} // Adjust spacing if needed
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{ backgroundColor: '#243040', color: 'white' }}
                            >
                                로그인
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: '20px', textAlign: 'center' }}>
                            <Typography variant="body2">
                                <Link to="/find-id" style={{ marginRight: '15px', textDecoration: 'none', color: 'black' }}>아이디 찾기</Link>
                                <Link to="/find-password" style={{ marginRight: '15px', textDecoration: 'none', color: 'black' }}>비밀번호 찾기</Link>
                                <Link to="/join" style={{ textDecoration: 'none', color: 'black' }}>회원가입</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>

    );
};

export default Login;
