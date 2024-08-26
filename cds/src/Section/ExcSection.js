import React, { useState } from "react";
import './excSection.css'
import Challenge from "./Challenge";
import Challengeban from "./Challengeban";
import Section2 from "./Section2";
import StrechingFade from "./StrethingFade";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import TermsModal from '../footer/TermsModal';


const ExcSection = () => {

    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('terms');

    const handleShow = (tab) => {
        setActiveTab(tab);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const { isLoggedIn } = useSelector((state) => state);
    console.log(isLoggedIn);
    return (
        <div>
            <Header />
            <div className="section">
                <Challengeban className="banner" />
                <hr className="section-divider" />
                <div className="content-container">
                    <div className="category">
                        <ul style={{ listStyleType: 'none' }}>
                            <li><Link to="/exercise">이 주의 챌린지</Link></li>
                            <hr className="category-divider" />
                            <li><Link to="/exercise2">근력향상</Link></li>
                            <hr className="category-divider" />
                            <li><Link to="/exercise3">체형교정</Link></li>
                            <hr className="category-divider" />
                            <li><Link to="/exercise4">유연성</Link></li>
                            <hr className="category-divider" />
                            <li><Link to="/exercise5">다이어트</Link></li>
                        </ul>
                    </div>

                    <div className="mainbox">
                        <h2>운동 챌린지 - 일주일</h2>
                        {isLoggedIn ? <Challenge /> : <h2>로그인 후 확인하실 수 있습니다</h2> }
                    </div>
                </div>
                <hr className="section-divider" />

                <div className="banner">
                    <Section2 className="banner" />
                </div>
                <div className="banner">
                    <StrechingFade />
                </div>
            </div>
            <Footer handleShow={handleShow} />
      <TermsModal show={showModal} handleClose={handleClose} activeTab={activeTab} />
        </div>
    );
}

export default ExcSection;
