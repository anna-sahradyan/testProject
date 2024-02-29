import React from 'react';
import { Container } from './homeStyled';
import SliderComponent from '../slider/SliderComponent';
import Products from '../../page/product/Products';

const Home = () => {
  return (
    <Container>
      <SliderComponent />
      <Products />
    </Container>
  );
};

export default Home;
