import './Community.css';
import 'bootstrap/dist/css/bootstrap.css' //bootstrap에 저장된 css 사용하기 위한 import
import React from "react";
import CommuList from "./CommuList";
import { CommuContext } from './CommuContext';
import Header from '../header/Header';
import Footer from '../footer/Footer';

function Community() {

    return (
        <CommuContext>
            <Header />
            <CommuList />
            <Footer />
        </CommuContext>
    );
}

export default Community;