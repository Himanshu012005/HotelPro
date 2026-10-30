import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { roomService } from '../services/api';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await roomService.getRooms();
      setRooms(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = (roomId) => {
    setRooms((prev) =>
      prev.map((r) => (r._id === roomId ? { ...r, isAvailable: !r.isAvailable } : r))
    );
  };

  const totalSuites = rooms.length;
  const availableSuites = rooms.filter((r) => r.isAvailable).length;
  const occupancyPct = totalSuites > 0 ? Math.round(((totalSuites - availableSuites) / totalSuites) * 100) : 25;

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <span className="badge bg-warning text-dark fw-bold mb-1">
            <i className="bi bi-shield-lock-fill me-1"></i>STAFF & ADMIN CONTROL PANEL
          </span>
          <h2 className="fw-bold text-dark mb-0">Hotel Operations & Inventory Desk</h2>
          <p className="text-muted small">Logged in as: <strong>{user?.name}</strong> ({user?.role?.toUpperCase()})</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="row g-4 mb-5">
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm border p-3">
            <div className="text-muted small text-uppercase fw-bold">Total Suites</div>
            <div className="h2 fw-bold text-primary my-1">{totalSuites}</div>
            <div className="small text-success">
              <i className="bi bi-arrow-up-right me-1"></i>100% Operational
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm border p-3">
            <div className="text-muted small text-uppercase fw-bold">Current Occupancy</div>
            <div className="h2 fw-bold text-dark my-1">{occupancyPct}%</div>
            <div className="small text-muted">{totalSuites - availableSuites} suites reserved</div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm border p-3">
            <div className="text-muted small text-uppercase fw-bold">Active Bookings</div>
            <div className="h2 fw-bold text-success my-1">42</div>
            <div className="small text-success">Verified Guests</div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm border p-3">
            <div className="text-muted small text-uppercase fw-bold">Monthly Revenue (INR)</div>
            <div className="h2 fw-bold text-primary my-1">₹3,28,400</div>
            <div className="small text-muted">Includes 18% GST</div>
          </div>
        </div>
      </div>

      {/* Room Inventory Management */}
      <div className="card shadow-sm border mb-5">
        <div className="card-header bg-white py-3">
          <h5 className="fw-bold mb-0 text-dark">
            <i className="bi bi-door-open-fill text-primary me-2"></i>Suite Inventory & Availability Control
          </h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th>Suite Number</th>
                <th>Title & Category</th>
                <th>Nightly Tariff</th>
                <th>Rating</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={r._id}>
                  <td className="fw-bold text-primary">{r.roomNumber}</td>
                  <td>
                    <div className="fw-semibold text-dark">{r.title}</div>
                    <div className="text-muted small">{r.category}</div>
                  </td>
                  <td>₹{r.pricePerNight.toLocaleString()}</td>
                  <td>
                    <span className="badge bg-primary">{r.rating}</span>
                  </td>
                  <td>
                    <span className={`badge ${r.isAvailable ? 'bg-success' : 'bg-secondary'}`}>
                      {r.isAvailable ? 'Available' : 'Booked / Maintenance'}
                    </span>
                  </td>
                  <td className="text-end">
                    <button
                      onClick={() => toggleAvailability(r._id)}
                      className={`btn btn-sm ${r.isAvailable ? 'btn-outline-secondary' : 'btn-outline-success'}`}
                    >
                      {r.isAvailable ? 'Mark Occupied' : 'Mark Available'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
