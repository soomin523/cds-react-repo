import './Board.css';
import 'bootstrap/dist/css/bootstrap.css' //bootstrap에 저장된 css 사용하기 위한 import
import React from "react";
import BoardList from './BoardList';
import { BoardContext } from './BoardContext';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Board = () => {

    return (
        <BoardContext>
            <Header />
            <BoardList />
            <Footer />
        </BoardContext>
    );
}

export default Board;