import { createContext, useContext, useState } from 'react';

const ProductsContext = createContext();
export const ProductsProvider = ({ children }) => {
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isSearchResults, setIsSearchResults] = useState(false);


  return (
    <ProductsContext.Provider
      value={{
        filteredProduct,
        setFilteredProduct,
        isSearchResults,
        setIsSearchResults,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProductsContext = () => useContext(ProductsContext);
