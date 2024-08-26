import React from 'react';
import HeaderImage from './HeaderImage';
import BodyImage from './BodyImage';
import UseButton from './UseButton';
import Footer from '../footer/Footer';
import Header2 from '../header/Header2';


const Middle = () => {
  return (
    <div>
      <Header2 />
      <HeaderImage />
      <BodyImage />
      <UseButton />
      <Footer />
    </div>
  );
};

export default Middle;
