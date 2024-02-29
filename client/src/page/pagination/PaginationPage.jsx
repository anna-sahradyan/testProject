import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationPage = ({
  page,
  setPage,
  productPerPage,
  products,
  filter,
}) => {
  const handleChange = (event, value) => {
    setPage(value);
  };
  const totalCount = filter
    ? Math.ceil(filter.length / productPerPage)
    : Math.ceil(products.length / productPerPage);
  return (
    <>
      <Stack spacing={2}>
        <Pagination
          count={totalCount}
          color='secondary'
          onChange={handleChange}
          page={page}
          sx={{
            '& .MuiPaginationItem-page': {
              color: page === page ? 'white' : '#cccccc',
            },
            '& .MuiPaginationItem-icon': {
              color: '#cccccc',
            },
          }}
        />
      </Stack>
    </>
  );
};

export default PaginationPage;
