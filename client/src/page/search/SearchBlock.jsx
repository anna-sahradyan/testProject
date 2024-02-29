import React, { useState } from 'react';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useProductsContext } from '../../context/SearchProvider';
import { useNavigate } from 'react-router';

const SearchBlock = ({ handleClose }) => {
  const { setFilteredProduct, setIsSearchResults } = useProductsContext();
  const [rerenderKey, setRerenderKey] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const products = useSelector(state => state.product?.goods || []);
  const navigate = useNavigate();
  const handleInputChange = e => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const searchLowerCase = searchInput.toLocaleLowerCase();
    const foundProducts = products.filter(item => {
      const productName = item.product && item.product.toLocaleLowerCase();
      const brandName = item.brand && item.brand.toLocaleLowerCase();

      return (
        (productName && productName.includes(searchLowerCase)) ||
        (item.price && item.price.toString().includes(searchLowerCase)) ||
        (brandName && brandName.includes(searchLowerCase))
      );
    });

    if (foundProducts.length === 0) {
      navigate('/');
      toast.error('There are no matching products.', { icon: '⚔️' });
    } else {
      setFilteredProduct(foundProducts);
      setIsSearchResults(true);
      navigate('/filter');
    }

    setSearchInput('');
    handleClose();
    setRerenderKey(prevKey => !prevKey);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <Paper
      key={rerenderKey}
      component='form'
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search by index or keyword'
        inputProps={{ 'aria-label': 'search' }}
        value={searchInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        type='button'
        sx={{ p: '10px' }}
        aria-label='search'
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
    </Paper>
  );
};

export default SearchBlock;
