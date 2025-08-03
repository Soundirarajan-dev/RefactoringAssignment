import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${disabled || loading ? 'disabled' : ''}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn-spinner"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;