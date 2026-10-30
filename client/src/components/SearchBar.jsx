import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [destination, setDestination] = useState('Downtown Central, Tokyo');
  const [checkIn, setCheckIn] = useState('2026-11-15');
  const [checkOut, setCheckOut] = useState('2026-11-17');
  const [guests, setGuests] = useState('2 Adults · 0 Children · 1 Room');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ destination, checkIn, checkOut, guests });
    }
  };

  return (
    <div className="search-card">
      <form onSubmit={handleSubmit} className="row g-2 align-items-center">
        {/* Destination */}
        <div className="col-lg-4 col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-geo-alt-fill text-primary"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 py-2"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Check-In / Check-Out */}
        <div className="col-lg-3 col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-calendar3 text-primary"></i>
            </span>
            <input
              type="date"
              className="form-control border-start-0 py-2 small"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
            <input
              type="date"
              className="form-control py-2 small"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Guests & Rooms */}
        <div className="col-lg-3 col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-people-fill text-primary"></i>
            </span>
            <select
              className="form-select border-start-0 py-2"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="2 Adults · 0 Children · 1 Room">2 Adults · 0 Children · 1 Room</option>
              <option value="1 Adult · 0 Children · 1 Room">1 Adult · 0 Children · 1 Room</option>
              <option value="2 Adults · 2 Children · 1 Suite">2 Adults · 2 Children · 1 Suite</option>
              <option value="4 Adults · 0 Children · 2 Rooms">4 Adults · 0 Children · 2 Rooms</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="col-lg-2 col-md-4">
          <button type="submit" className="btn btn-hotelpro-yellow w-100 py-2 d-flex align-items-center justify-content-center gap-2">
            <i className="bi bi-search"></i>
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
}
