import React, { useState } from "react";
import Challengeban from "./Challengeban";
import '../Section/excSection.css';
import Exercise2 from "./Exercise2";
import Secfoot from "./Secfoot";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link } from 'react-router-dom';
import TermsModal from "../footer/TermsModal";
import { useSelector } from "react-redux";
const ExcSection3 = () => {

    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('terms');
    const { isLoggedIn } = useSelector((state) => state);
    const handleShow = (tab) => {
        setActiveTab(tab);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

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
                        {isLoggedIn ? <Exercise2 /> : <h2>로그인 후 확인하실 수 있습니다</h2>}
                    </div>
                </div>
                <hr className="section-divider" />
                <Secfoot />
            </div>
            <Footer handleShow={handleShow} />
            <TermsModal show={showModal} handleClose={handleClose} activeTab={activeTab} />
        </div>
    );
}

export default ExcSection3;