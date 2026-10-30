import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, register, switchRolePreset } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('himanshu.travel@gmail.com');
  const [password, setPassword] = useState('guest123');
  const [name, setName] = useState('Himanshu Sanodiya');
  const [role, setRole] = useState('guest');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let authData;
      if (isRegister) {
        authData = await register({ name, email, password, role });
      } else {
        authData = await login(email, password);
      }
      const targetRole = authData?.user?.role || role;
      if (targetRole === 'admin' || targetRole === 'staff') {
        navigate('/admin');
      } else {
        navigate('/'); // Returns to Front Page with logged-in user profile
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePresetSelect = (presetRole, presetEmail, presetPass, presetName) => {
    setEmail(presetEmail);
    setPassword(presetPass);
    setName(presetName);
    setRole(presetRole);
    switchRolePreset(presetRole);
  };

  return (
    <div className="container py-5" style={{ maxWidth: '540px' }}>
      <div className="card shadow border-0 p-4">
        {/* Brand Header */}
        <div className="text-center mb-4">
          <Link to="/" className="text-decoration-none">
            <span className="brand-text text-primary h3">
              Hotel<span className="text-warning">Pro</span>
            </span>
          </Link>
          <p className="text-muted small mt-1">
            {isRegister ? 'Create your HotelPro account' : 'Sign in to access your reservations & Genius 20% discount'}
          </p>
        </div>

        {/* 1-Click Evaluation Presets */}
        <div className="bg-light p-3 rounded mb-4 border">
          <div className="text-muted small fw-bold mb-2 text-uppercase">
            <i className="bi bi-lightning-charge-fill text-warning me-1"></i>1-Click Evaluation Demo Presets:
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handlePresetSelect('guest', 'himanshu.travel@gmail.com', 'guest123', 'Himanshu Sanodiya')}
              className="btn btn-sm btn-outline-primary flex-grow-1"
            >
              Guest (Himanshu)
            </button>
            <button
              type="button"
              onClick={() => handlePresetSelect('staff', 'staff@hotelpro.com', 'staff123', 'Kenji Sato')}
              className="btn btn-sm btn-outline-secondary flex-grow-1"
            >
              Staff (Front Desk)
            </button>
            <button
              type="button"
              onClick={() => handlePresetSelect('admin', 'admin@hotelpro.com', 'admin123', 'General Manager')}
              className="btn btn-sm btn-outline-dark flex-grow-1"
            >
              Admin (Manager)
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-3">
              <label className="form-label small fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label small fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isRegister && (
            <div className="mb-3">
              <label className="form-label small fw-semibold">Account Role</label>
              <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="guest">Guest Traveler</option>
                <option value="staff">Hotel Staff / Front Desk</option>
                <option value="admin">Hotel Administrator</option>
              </select>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-hotelpro-primary w-100 py-2 mt-2">
            {loading ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top">
          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="btn btn-link text-decoration-none small"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register here"}
          </button>
        </div>
      </div>
    </div>
  );
}
