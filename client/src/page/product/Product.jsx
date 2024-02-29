import React from 'react';
import {
  Div,
  ProductBrand,
  ProductId,
  ProductPrise,
  ProductTitle,
} from './productStyled';

const Product = ({ item }) => {
  return (
    <Div>
      <ProductTitle>{item.product}</ProductTitle>
      <ProductPrise>{item.price}</ProductPrise>
      <ProductBrand>
        {item.brand ? item.brand : ' The brand was not specified'}
      </ProductBrand>
      <ProductId>{item.id}</ProductId>
    </Div>
  );
};

export default Product;
