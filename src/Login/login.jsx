import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Style from './login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // <-- this is what lets us navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Navigate to /home
    navigate('/home');
  };

  return (
    <div className={Style.container}>
      <div className={Style.loginBox}>
        <div className={Style.header}>
          <h1>Welcome Back</h1>
          <p>Enter your credentials to access your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className={Style.form}>
          <div className={Style.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={Style.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className={Style.options}>
            <label className={Style.remember}>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className={Style.forgot}>Forgot Password?</a>
          </div>

          <button type="submit" className={Style.loginButton}>
            Sign In
          </button>

          <p className={Style.signup}>
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
