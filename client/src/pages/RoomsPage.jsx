import React, { useState, useEffect } from 'react';
import RoomCard from '../components/RoomCard';
import { roomService } from '../services/api';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [category, setCategory] = useState('All Stays');
  const [priceRange, setPriceRange] = useState('');
  const [sort, setSort] = useState('price-asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, [category, priceRange, sort]);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const data = await roomService.getRooms({
        category,
        priceRange,
        sort,
        search: searchTerm
      });
      setRooms(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadRooms();
  };

  return (
    <div className="container my-5">
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">HotelPro Suites & Room Catalog</h2>
        <p className="text-muted small">Explore executive suites and luxury penthouses with Genius Level 2 savings</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-3 shadow-sm mb-4 border">
        <div className="row g-3 align-items-center">
          <div className="col-md-4">
            <form onSubmit={handleSearchSubmit} className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search suite name or feature..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>

          <div className="col-md-5">
            <div className="d-flex flex-wrap gap-1">
              {['All Stays', 'Executive Suites', 'Deluxe King Rooms', 'Luxury Penthouses'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="col-md-3 text-md-end">
            <select
              className="form-select form-select-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="row g-4">
          {rooms.map((room) => (
            <div key={room._id} className="col-md-6 col-lg-4">
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
