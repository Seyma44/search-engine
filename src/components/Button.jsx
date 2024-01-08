import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Button.scss'; 

const Button = ({ label, type, to, onClick }) => {
  const buttonClass = type === 'link' ? 'custom-button-link' : 'custom-button';

  if (type === 'link') {
    return (
      <Link to={to} className={buttonClass}>
        {label}
      </Link>
    );
  } else {
    return (
      <button onClick={onClick} className={buttonClass}>
        {label}
      </button>
    );
  }
};

export default Button;
