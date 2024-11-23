// components/UI/Button.js
import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const classNames = `btn btn-${variant} ${className}`;
  
  return (
    <button className={classNames} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
