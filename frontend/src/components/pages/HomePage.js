import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to UserManager</h1>
          <p className="hero-subtitle">
            A modern, secure user management system built with React and Node.js
          </p>
          
          {user ? (
            <div className="hero-actions">
              <Link to="/dashboard" className="btn btn-primary btn-large">
                Go to Dashboard
              </Link>
              <Link to="/users" className="btn btn-outline btn-large">
                View Users
              </Link>
            </div>
          ) : (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline btn-large">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔐 Secure Authentication</h3>
              <p>JWT-based authentication with bcrypt password hashing</p>
            </div>
            <div className="feature-card">
              <h3>👥 User Management</h3>
              <p>Complete CRUD operations for user management</p>
            </div>
            <div className="feature-card">
              <h3>🔍 Search & Filter</h3>
              <p>Advanced search functionality with pagination</p>
            </div>
            <div className="feature-card">
              <h3>📱 Responsive Design</h3>
              <p>Modern, mobile-friendly user interface</p>
            </div>
            <div className="feature-card">
              <h3>⚡ Fast & Reliable</h3>
              <p>Built with modern technologies for optimal performance</p>
            </div>
            <div className="feature-card">
              <h3>🛡️ Security First</h3>
              <p>Input validation, CORS protection, and rate limiting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;