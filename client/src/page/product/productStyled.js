import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100dvh;
`;
export const Top = styled.div`
  margin-top: -30px;
  display: flex;
  justify-content: center;
`;
export const Title = styled.h2`
  color: #cccccc;
`;
export const ProductsBox = styled.div`
  width: 95%;
  height: 100dvh;
  margin: 30px auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
  grid-auto-rows: 15vw;
  grid-gap: 10px;
  grid-auto-flow: dense;
  color: #21201f;
  font-size: 14px;
  font-weight: 600;
`;

export const ProductTitle = styled.div`
  padding: 10px 0 0;
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
`;

export const ProductPrise = styled.div`
  padding: 5px 0 0;
  color: darkgoldenrod;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
`;
export const ProductBrand = styled.div`
  padding: 5px 0 0;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
`;
export const ProductId = styled.div`
  padding: 5px 0 0;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
`;

export const ProductItems = styled.div``;
export const Div = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/img/gold.jpg');
  background-size: cover;
  box-shadow: 1px 2px 10px rgba(204, 204, 204, 0.8);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 3px 5px 20px rgba(204, 204, 204, 0.8);
    cursor: pointer;
  }
`;
export const BoxLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
/*pagination*/
export const PaginationBlock = styled.div`
  margin: -130px auto;
  width: 500px;
  height: 70px;
  box-shadow: 3px 5px 20px rgba(204, 204, 204, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

