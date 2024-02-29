import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../components/home/homeStyled';
import {
  BoxLoader,
  PaginationBlock,
  ProductItems,
  ProductsBox,
  Title,
  Top,
  Wrapper,
} from './productStyled';
import Product from './Product';
import { fetchAllProducts } from '../../redux/features/productSlice';
import PaginationPage from '../pagination/PaginationPage';
import Loader from '../../components/Loading/Loader';

const Products = () => {
  const products = useSelector(state => state.product?.goods);
  const isLoading = useSelector(state => state.product?.loading);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const productPerPage = 12;

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const pagesVisited = (page - 1) * productPerPage;
  const itemsProduct = products
    .slice(pagesVisited, pagesVisited + productPerPage)
    ?.map(item => ({ ...item }));

  return (
    <Container>
      <Wrapper>
        <Top>
          <Title>Popular Collections</Title>
        </Top>
        <ProductsBox>
          {isLoading ? (
            <BoxLoader>
              <Loader />
            </BoxLoader>
          ) : (
            itemsProduct.map((item, index) => (
              <ProductItems key={index}>
                <Product item={item} />
              </ProductItems>
            ))
          )}
        </ProductsBox>
        <PaginationBlock>
          <PaginationPage
            page={page}
            setPage={setPage}
            productPerPage={productPerPage}
            products={products}
          />
        </PaginationBlock>
      </Wrapper>
    </Container>
  );
};

export default Products;
