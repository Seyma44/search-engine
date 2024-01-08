import React from 'react';
import '../styles/PaginationButtons.scss';

const PaginationButtons = ({ label, onClick,isSelected }) => {
    const buttonClass = isSelected ? 'selected-page' : 'current-page';
    return (
      <button onClick={onClick} className={buttonClass}>
        {label}
      </button>
    );

};

export default PaginationButtons;
