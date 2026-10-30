import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, switchRolePreset } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="hotelpro-navbar sticky-top">
      <div className="container py-2">
        <div className="d-flex justify-content-between align-items-center">
          {/* Brand Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <span className="brand-text">
              Hotel<span>Pro</span>
            </span>
            <span className="brand-badge d-none d-sm-inline">
              <i className="bi bi-shield-check me-1"></i>VERIFIED LUXURY
            </span>
          </Link>

          {/* Quick Role Switcher (Evaluation Presets) */}
          <div className="d-flex align-items-center bg-dark bg-opacity-25 p-1 rounded-pill px-2 d-none d-md-flex">
            <span className="text-white-50 small me-2 ps-1">Role:</span>
            <button
              onClick={() => switchRolePreset('guest')}
              className={`btn btn-sm rounded-pill px-2 py-0 ${user?.role === 'guest' ? 'btn-warning text-dark fw-bold' : 'text-white'}`}
            >
              Guest
            </button>
            <button
              onClick={() => switchRolePreset('staff')}
              className={`btn btn-sm rounded-pill px-2 py-0 ${user?.role === 'staff' ? 'btn-warning text-dark fw-bold' : 'text-white'}`}
            >
              Staff
            </button>
            <button
              onClick={() => switchRolePreset('admin')}
              className={`btn btn-sm rounded-pill px-2 py-0 ${user?.role === 'admin' ? 'btn-warning text-dark fw-bold' : 'text-white'}`}
            >
              Admin
            </button>
          </div>

          {/* Nav Links */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/rooms" className="text-white text-decoration-none small fw-semibold">
              <i className="bi bi-door-open me-1"></i>All Rooms
            </Link>
            <Link to="/my-bookings" className="text-white text-decoration-none small fw-semibold">
              <i className="bi bi-briefcase me-1"></i>My Bookings
            </Link>
            {(user?.role === 'admin' || user?.role === 'staff') && (
              <Link to="/admin" className="text-warning text-decoration-none small fw-bold">
                <i className="bi bi-speedometer2 me-1"></i>Dashboard
              </Link>
            )}

            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-outline-light rounded-pill px-3 dropdown-toggle d-flex align-items-center gap-1"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle"></i>
                  <span className="d-none d-lg-inline">{user.name.split(' ')[0]}</span>
                  <span className="badge bg-warning text-dark ms-1">Genius 2</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li className="dropdown-item-text text-muted small">{user.email}</li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link to="/my-bookings" className="dropdown-item">
                      <i className="bi bi-receipt me-2"></i>My Bookings & Invoices
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="dropdown-item text-danger">
                      <i className="bi bi-box-arrow-right me-2"></i>Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-sm btn-light fw-bold px-3 rounded-pill">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
