import React from 'react';
import { Search } from 'react-flaticons';
import '../styles/SearchBox.scss';

const SearchBox = ({ value, onChange, placeholder, className, style }) => {
  return (
    <div className={`search-box-container ${className}`} style={style} data-testid="search-box-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder={placeholder}
          className={`search-input ${className}`} 
          value={value}
          onChange={onChange}         
        />
        <div className="search-icon">
          <Search color="#090A0A" size="16px" />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
