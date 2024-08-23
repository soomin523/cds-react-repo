import React, { useState } from "react";
import './excSection.css'
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";


const Challenge = () => {
    const [TabState, setTabstate] = useState('diet')

    const toggle = (tabnum) => {
        if (TabState !== tabnum) setTabstate(tabnum)
    }

    return (
        <div>
            <Nav tabs className="nav">
                <NavItem>
                    <NavLink onClick={() => { toggle('diet'); }} style={{ cursor: 'pointer' }}>체중감량</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={() => { toggle('strangth'); }} style={{ cursor: 'pointer' }}>근력증가</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={() => { toggle('bodyshape'); }} style={{ cursor: 'pointer' }}>체형교정</NavLink>
                </NavItem>
            </Nav>
            <div className="chalbox">
                <TabContent activeTab={TabState}>
                    <TabPane tabId="diet" className="schedule">
                        <div className="schedulebox">
                            <hr />
                            <h4>월요일</h4>
                            <li>유산소 운동: 30분 조깅 또는 빠른 걷기</li>
                            <li>버피 </li>
                            <li>스트레칭: 10분</li>
                            <h4>화요일</h4>
                            <li>유산소 운동: 30분 조깅 또는 빠른 걷기</li>
                            <li>플랭크</li>
                            <li>스트레칭: 10분</li>
                            <h4>수요일</h4>
                            <li>유산소 운동: 30분 조깅 또는 빠른 걷기</li>
                            <li>크런치</li>
                            <li>스트레칭: 10분</li>
                            <h4>목요일</h4>
                            <li>유산소 운동: 30분 조깅 또는 빠른 걷기</li>
                            <li>줄넘기</li>
                            <li>스트레칭: 10분</li>
                            <h4>금요일</h4>
                            <li>유산소 운동: 30분 조깅 또는 빠른 걷기</li>
                            <li>스쿼트</li>
                            <li>스트레칭: 10분</li>
                            <hr />
                        </div>
                    </TabPane>
                    <TabPane tabId="strangth" className="schedule">
                        <div className="schedulebox">
                            <hr />
                            <h4>월요일</h4>
                            <li>요가 동작: 다운독, 차일드 포즈</li>
                            <li>스트레칭: 10분</li>
                            <h4>화요일</h4>
                            <li>코어 운동: 플랭크, 러시안 트위스트</li>
                            <li>스트레칭: 10분</li>
                            <h4>수요일</h4>
                            <li>코어 및 안정성: 크런치, 버드독</li>
                            <li>스트레칭: 10분</li>
                            <h4>목요일</h4>
                            <li>전신 스트레칭: 요가 자세</li>
                            <li>스트레칭: 10분</li>
                            <h4>금요일</h4>
                            <li>근력 및 균형 운동: 스쿼트, 밸런스 보드</li>
                            <li>스트레칭: 10분</li>
                            <hr />
                        </div>
                    </TabPane>
                    <TabPane tabId="bodyshape" className="schedule">
                        <div className="schedulebox">
                            <hr />
                            <h4>월요일</h4>
                            <li>햄스트링 스트레치, 차일드 포즈</li>
                            <li>3세트 30초</li>
                            <h4>화요일</h4>
                            <li>스쿼트 ,런지</li>
                            <li>15회 반복, 3세트</li>
                            <h4>수요일</h4>
                            <li>풀업, 코브라 스트레치</li>
                            <li>10회 반복, 3세트 , 3세트, 각 세트당 30초 유지</li>
                            <h4>목요일</h4>
                            <li>다리 교차 스트레치,플랭크</li>
                            <li>3세트, 30초 유지</li>
                            <h4>금요일</h4>
                            <li>푸시업</li>
                            <li>15회 반복, 3세트</li>
                            <hr />
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        </div >
    )
}

export default Challenge;