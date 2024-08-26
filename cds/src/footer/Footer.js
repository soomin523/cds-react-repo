import React from 'react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import '../Section/excSection.css';


function Footer({ handleShow }) {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <p><span onClick={() => handleShow('privacy')} className="footer-link"><strong>개인정보처리방침</strong></span> <span onClick={() => handleShow('terms')} className="footer-link"><strong>이용약관</strong></span></p>
                    <p>상호: (주)코등생컴퍼니  | 대표자: 서수민</p>
                    <p>개인정보취급담당자: 임도현</p>
                    <p>사업자등록번호: 123-45-67891</p>
                    <p>주소: 충남 천안시 동남구 대흥로 215, 8층 6강의실</p>
                </div>
                <div className="footer-center">
                    <h4>고객센터 041-561-1122</h4>
                    <p><strong></strong></p> {/* 전화번호를 굵게 표시 */}
                    <p>평일 11:00 ~ 18:00 | 점심시간 13:00 ~ 14:00</p>
                    <p>(토, 일요일 및 공휴일 휴무)</p>
                    <p>고객문의: teamBeACodingPro@coding.com</p>
                </div>
                <div className="footer-right">
                    <div className="footer-icons">
                        <a href="https://www.instagram.com/sem/campaign/emailsignup/?campaign_id=21189041652&extra_1=s%7Cc%7C696809307816%7Cb%7C%EC%9D%B8%EC%8A%A4%ED%83%80%7C&placement=&creative=696809307816&keyword=%EC%9D%B8%EC%8A%A4%ED%83%80&partner_id=googlesem&extra_2=campaignid%3D21189041652%26adgroupid%3D166831407728%26matchtype%3Db%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-297961871966%26loc_physical_ms%3D1009838%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gad_source=1&gclid=EAIaIQobChMIyMG2k8GAiAMVOucWBR2nZDEZEAAYASAAEgJO2vD_BwE" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="footer-icon" />
                        </a>
                        <a href="https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="footer-icon" />
                        </a>
                    </div>
                    <div className="footer-action">
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;