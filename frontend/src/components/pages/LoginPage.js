import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import './AuthPages.css';

const LoginPage = () => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div className="auth-page">
      <div className="auth-container">
        {message && (
          <div className="success-banner">{message}</div>
        )}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;