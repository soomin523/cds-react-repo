import React, { useState } from "react";
import './excSection.css'
import { Card, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import diet from './IMG/diet.png'
import str from './IMG/strength.png'
import bac from './IMG/bac.png'

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
                    <Card style={{
                            backgroundImage: `url(${diet})`,
                            backgroundSize: 'cover', // 이미지를 카드 전체에 맞추기
                            backgroundPosition: 'center', // 이미지 중앙 정렬
                            backgroundRepeat: 'no-repeat', // 이미지 반복 방지
                            height: '600px',
                            width: '600px'
                            }}/>
                    </TabPane>
                    <TabPane tabId="strangth" className="schedule">
                    <Card style={{
                            backgroundImage: `url(${str})`,
                            backgroundSize: 'cover', // 이미지를 카드 전체에 맞추기
                            backgroundPosition: 'center', // 이미지 중앙 정렬
                            backgroundRepeat: 'no-repeat', // 이미지 반복 방지
                            height: '600px',
                            width: '600px'
                            }}/>
                    </TabPane>
                    <TabPane tabId="bodyshape" className="schedule">
                    <Card style={{
                            backgroundImage: `url(${bac})`,
                            backgroundSize: 'cover', // 이미지를 카드 전체에 맞추기
                            backgroundPosition: 'center', // 이미지 중앙 정렬
                            backgroundRepeat: 'no-repeat', // 이미지 반복 방지
                            height: '600px',
                            width: '600px'
                            }}/>
                    </TabPane>
                </TabContent>
            </div>
        </div >
    )
}

export default Challenge;