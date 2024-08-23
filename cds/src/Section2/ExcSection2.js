import React from "react";
import Challengeban from "./Challengeban";
import Exercise1 from "./Exercise1";
import Secfoot from "./Secfoot";
import '../Section/excSection.css';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link } from 'react-router-dom';

const ExcSection2 = () => {
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
                        <Exercise1 />
                    </div>
                </div>
                <hr className="section-divider" />
                <Secfoot />
            </div>
            <Footer />
        </div>
    );
}

export default ExcSection2;