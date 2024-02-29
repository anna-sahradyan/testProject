import React, { useState } from 'react';
import { useProductsContext } from '../../context/SearchProvider';
import { Wrapper } from './searchBlockStyled';
import { Container } from '../../components/home/homeStyled';
import {
  BoxLoader,
  PaginationBlock,
  ProductItems,
  ProductsBox,
} from '../product/productStyled';
import Loader from '../../components/Loading/Loader';
import Product from '../product/Product';
import PaginationPage from '../pagination/PaginationPage';
import { useSelector } from 'react-redux';

const FilterComponent = () => {
  const { filteredProduct } = useProductsContext();
  const isLoading = useSelector(state => state.product?.loading);
  const [page, setPage] = useState(1);
  const productPerPage = 12;
  const pagesVisited = (page - 1) * productPerPage;
  const filterProduct = filteredProduct
    ?.slice(pagesVisited, pagesVisited + productPerPage)
    ?.map(item => ({ ...item }));

  return (
    <Container>
      <Wrapper>
        <ProductsBox>
          {isLoading ? (
            <BoxLoader>
              <Loader />
            </BoxLoader>
          ) : (
            filterProduct?.map((item, index) => (
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
            filter={filteredProduct}
          />
        </PaginationBlock>
      </Wrapper>
    </Container>
  );
};

export default FilterComponent;
