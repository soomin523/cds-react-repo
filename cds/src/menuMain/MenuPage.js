import React from "react";
import DietPage from './DietPage';
import FamilyPage from './FamilyPage';
import NutritionPage from './NutritionPage';
import './disign.css';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useSelect } from "../AppContext";

const MenuPage = () => {
    const { menuSelect, setmenuSelect } = useSelect();

    const renderPage = () => {
        switch (menuSelect) {
            case 'diet':
                return <DietPage />;
            case 'family':
                return <FamilyPage />;
            case 'nutrition':
                return <NutritionPage />;
            default:
                return <DietPage />;
        }
    };

    return (
        <div className="food-App">
            <Header />
            {/* 사이드바 */}
            <div className="food-sidebar">
                <ul>
                    <li>
                        <button onClick={() => setmenuSelect('diet')}>
                            다이어트 식단
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setmenuSelect('family')}>
                            가족 건강식단
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setmenuSelect('nutrition')}>
                            영양 톡톡
                        </button>
                    </li>
                </ul>
            </div>

            {/* 콘텐츠 영역 */}
            <div className="food-content">
                {renderPage()}
            </div>

            {/* 페이지 링크 */}
            <div className="food-page-links">
                <p>
                    <button onClick={() => setmenuSelect('diet')}>1</button> |
                    <button onClick={() => setmenuSelect('family')}>2</button> |
                    <button onClick={() => setmenuSelect('nutrition')}>3</button>
                </p>
            </div>
            <Footer />
        </div>
    );

}

export default MenuPage;