import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import './LoginPage.css';
import loginBg from '../../assets/images/login-bg.png';
import brandingBg from '../../assets/images/branding-bg.png';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Add authentication logic here
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="login-overlay">
        
        <div className="glass-panel">
          
          {/* Left Side - Branding & Value Prop */}
          <div className="glass-branding" style={{ backgroundImage: `url(${brandingBg})` }}>
            <div className="branding-overlay"></div>
            
            <div className="brand-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                  <path d="M19 10h-5V5c0-1.1-.9-2-2-2s-2 .9-2 2v5H5c-1.1 0-2 .9-2 2s.9 2 2 2h5v5c0 1.1.9 2 2 2s2-.9 2-2v-5h5c1.1 0 2-.9 2-2s-.9-2-2-2z"/>
                </svg>
              </div>
              <div className="logo-text">Medi<span>Sync</span></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="decorative-badges">
              <div className="floating-badge badge-1">
                <div className="badge-icon green"><ShieldCheck size={20} /></div>
                <div className="badge-info">
                  <span className="badge-title">100% Secure</span>
                  <span className="badge-desc">HIPAA Compliant</span>
                </div>
              </div>
              <div className="floating-badge badge-2">
                <div className="badge-icon blue"><Activity size={20} /></div>
                <div className="badge-info">
                  <span className="badge-title">24/7 Access</span>
                  <span className="badge-desc">Real-time Sync</span>
                </div>
              </div>
            </div>

            <div className="branding-content">
              <h1>Your Health,<br/>Synchronized.</h1>
              <p>Experience the next generation of healthcare management. Secure, fast, and always at your fingertips.</p>
              
              <ul className="feature-list">
                <li>
                  <div className="feature-icon"><CheckCircle2 size={16} /></div>
                  <span>Secure Health Records</span>
                </li>
                <li>
                  <div className="feature-icon"><CheckCircle2 size={16} /></div>
                  <span>Smart Medicine Tracking</span>
                </li>
                <li>
                  <div className="feature-icon"><CheckCircle2 size={16} /></div>
                  <span>Direct Doctor Access</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="glass-form-section">
            <div className="form-wrapper">
              <div className="login-header">
                <h2>Welcome Back</h2>
                <p>Please enter your details to sign in.</p>
              </div>

              <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-container">
                    <Mail className="input-icon" size={20} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-container">
                    <Lock className="input-icon" size={20} />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>

                <div className="form-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span className="custom-checkbox"></span>
                    Remember me
                  </label>
                  <a href="/forgot-password" name="forgot-password" className="forgot-password">
                    Forgot password?
                  </a>
                </div>

                <button type="submit" className="login-button">
                  Sign in <ArrowRight className="btn-icon" size={18} />
                </button>
              </form>

              <div className="divider">or continue with</div>

              <button className="google-button">
                <svg className="google-logo" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                Sign in with Google
              </button>

              <p className="signup-prompt">
                Don't have an account? <a href="/signup" name="signup" className="signup-link">Sign up</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
