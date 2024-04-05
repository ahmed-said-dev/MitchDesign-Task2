import React from 'react';
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useProducts } from '../../context/Providers/ProductsProvider';
import SearchBarStyles from './SearchBar.module.css';

const SearchBar = () => {
  const { dispatch, productsSearchQuery } = useProducts();

  const searchingHandler = (e) => {
    dispatch({ type: 'SEARCH_PRODUCTS', query: e.target.value });
  };

  const renderIcon = () => (
    <span className={SearchBarStyles.icon}>
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path
          d="M17.786 16.543L13.757 12.514C14.829 11.186 15.429 9.514 15.429 7.714C15.429 3.471 11.957 0 7.714 0C3.471 0 0 3.471 0 7.714C0 11.957 3.471 15.429 7.714 15.429C9.514 15.429 11.186 14.786 12.514 13.757L16.543 17.786L17.786 16.543ZM7.757 13.714C4.457 13.714 1.757 11.014 1.757 7.714C1.757 4.414 4.457 1.714 7.757 1.714C11.057 1.714 13.757 4.414 13.757 7.714C13.757 11.014 11.057 13.714 7.757 13.714Z"
          fill="black"
        />
      </svg>
    </span>
  );

  return (
    <Stack direction="row" alignItems="center" className={SearchBarStyles['search-box']}>
      {renderIcon()}
      <input
        type="text"
        name="search-query"
        placeholder="اكتب ما تريد البحث عنه"
        value={productsSearchQuery}
        className={SearchBarStyles['search-input']}
        onChange={searchingHandler}
      />
      <CancelIcon sx={{ fill: '#868685' }} />
    </Stack>
  );
};

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  productsSearchQuery: PropTypes.string.isRequired,
};

export default SearchBar;
