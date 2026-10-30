import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RoomCard from '../components/RoomCard';
import { roomService } from '../services/api';

export default function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [category, setCategory] = useState('All Stays');
  const [priceRange, setPriceRange] = useState('');
  const [sort, setSort] = useState('price-asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, [category, priceRange, sort]);

  const loadRooms = async (searchParams = {}) => {
    setLoading(true);
    try {
      const data = await roomService.getRooms({
        category,
        priceRange,
        sort,
        search: searchParams.destination || ''
      });
      setRooms(data);
    } catch (err) {
      console.error('Failed to load rooms', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchParams) => {
    loadRooms(searchParams);
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-warning text-dark fw-bold mb-3 px-3 py-2">
                <i className="bi bi-award-fill me-1"></i>GENIUS LEVEL 2 · UNLOCK 20% DISCOUNTS ON LUXURY SUITES
              </span>
              <h1 className="hero-title">
                Find Your Next Luxury Stay in Tokyo Central
              </h1>
              <p className="hero-subtitle mb-4">
                Experience high-converting executive hospitality with 100% free cancellation, no prepayment required, and complimentary Michelin-inspired breakfast buffet.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <div className="d-flex align-items-center gap-2 text-white-50 small">
                  <i className="bi bi-shield-check text-success fs-5"></i>
                  <span>100% Instant Refund Cancellation</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-white-50 small">
                  <i className="bi bi-wifi text-warning fs-5"></i>
                  <span>Gigabit Fiber Workstations</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-white-50 small">
                  <i className="bi bi-credit-card text-info fs-5"></i>
                  <span>No Prepayment Needed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Search Bar */}
      <div className="container">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Main Catalog & Filter Engine */}
      <section className="container my-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom">
          <div>
            <h3 className="fw-bold text-dark mb-1">Tokyo Central Stays & Executive Suites</h3>
            <p className="text-muted small mb-0">Showing {rooms.length} curated luxury accommodations</p>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="small text-muted">Sort by:</span>
            <select
              className="form-select form-select-sm w-auto"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Top Guest Rating</option>
            </select>
          </div>
        </div>

        {/* Category Pills & Price Filter Buttons */}
        <div className="row g-3 mb-4">
          <div className="col-lg-6">
            <div className="d-flex flex-wrap gap-2">
              {['All Stays', 'Executive Suites', 'Deluxe King Rooms', 'Luxury Penthouses'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`btn btn-sm rounded-pill px-3 ${category === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="col-lg-6 text-lg-end">
            <div className="d-inline-flex flex-wrap gap-2">
              {[
                { label: 'All Prices', val: '' },
                { label: 'Under ₹3,000', val: 'under3000' },
                { label: '₹3,000 – ₹4,000', val: '3000to4000' },
                { label: '₹4,000+', val: 'above4000' }
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => setPriceRange(p.val)}
                  className={`btn btn-sm ${priceRange === p.val ? 'btn-warning text-dark fw-bold' : 'btn-light text-muted border'}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Room Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-muted mt-2">Loading available luxury suites...</p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-5 bg-white rounded border">
            <i className="bi bi-search fs-1 text-muted"></i>
            <h5 className="fw-bold mt-2">No suites match your filter</h5>
            <p className="text-muted small">Try broadening your price or category selections.</p>
            <button onClick={() => { setCategory('All Stays'); setPriceRange(''); }} className="btn btn-sm btn-outline-primary">
              Reset Filters
            </button>
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
      </section>

      {/* About HotelPro Brand & Statistics */}
      <section className="bg-white py-5 border-top border-bottom">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-light text-primary border mb-2">ABOUT HOTELPRO</span>
              <h2 className="fw-bold text-dark mb-3">
                14+ Years of Dedicated Hospitality Excellence
              </h2>
              <p className="text-muted">
                HotelPro provides a robust hospitality infrastructure that powers efficient booking management, real-time availability tracking, and secure guest authentication. Designed for corporate executives and discerning leisure travelers, our system simplifies hotel management and guest reservations with zero friction.
              </p>
              <div className="row g-4 pt-3">
                <div className="col-6 col-sm-3">
                  <div className="h2 fw-bold text-primary mb-0">14+</div>
                  <div className="text-muted small">Years Operating</div>
                </div>
                <div className="col-6 col-sm-3">
                  <div className="h2 fw-bold text-primary mb-0">250+</div>
                  <div className="text-muted small">Luxury Suites</div>
                </div>
                <div className="col-6 col-sm-3">
                  <div className="h2 fw-bold text-primary mb-0">1.8M+</div>
                  <div className="text-muted small">Happy Guests</div>
                </div>
                <div className="col-6 col-sm-3">
                  <div className="h2 fw-bold text-primary mb-0">99.4%</div>
                  <div className="text-muted small">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                  alt="HotelPro Lobby"
                  className="rounded-3 shadow w-100"
                  style={{ maxHeight: '380px', objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 start-0 m-4 bg-white p-3 rounded shadow-sm border">
                  <div className="d-flex align-items-center gap-2">
                    <span className="rating-badge">9.6</span>
                    <div>
                      <div className="fw-bold small">Exceptional Rating</div>
                      <div className="text-muted small">1,420 Verified Reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Amenities */}
      <section className="container my-5">
        <div className="text-center mb-5">
          <span className="badge bg-light text-primary border mb-2">FIVE-STAR FACILITIES</span>
          <h2 className="fw-bold text-dark">World-Class Amenities For Discerning Guests</h2>
          <p className="text-muted">Designed for peak relaxation, productivity, and luxury dining</p>
        </div>

        <div className="row g-4">
          {[
            {
              icon: 'bi-water',
              title: 'Heated Skyline Lap Pool',
              desc: 'Panoramic 35th-floor heated lap pool with breathtaking Tokyo Tower views and cocktail cabanas.'
            },
            {
              icon: 'bi-flower1',
              title: 'Lotus Luxury Spa & Onsen',
              desc: 'Traditional Japanese hinoki cypress soaking baths, dry Finnish sauna, and restorative massage therapy.'
            },
            {
              icon: 'bi-cup-hot',
              title: 'Fine Dining Bistro & Bar',
              desc: 'Michelin-starred breakfast buffet, authentic Wagyu robata grill, and rooftop artisan cocktail lounge.'
            },
            {
              icon: 'bi-laptop',
              title: '24/7 Executive Workstation',
              desc: 'Private boardroom suites, ultra-fast 1Gbps fiber Wi-Fi, ergonomic Herman Miller seating, and printing.'
            }
          ].map((am, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <div className="card h-100 p-4 border text-center shadow-sm">
                <div className="fs-1 text-primary mb-3">
                  <i className={`bi ${am.icon}`}></i>
                </div>
                <h5 className="fw-bold mb-2">{am.title}</h5>
                <p className="text-muted small mb-0">{am.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Guest Reviews */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary px-3 py-1 mb-2">REAL REVIEWS</span>
            <h2 className="fw-bold text-dark">What Our Verified Guests Say</h2>
          </div>

          <div className="row g-4">
            {[
              {
                name: 'Vikram & Priya Malhotra',
                city: 'Mumbai, India',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                rating: '10/10',
                text: 'The Tokyo Skyline Executive Suite was sensational. Sunset views over Tokyo Tower were unforgettable, the breakfast buffet was five-star, and having 100% free cancellation gave us total peace of mind.'
              },
              {
                name: 'Alexander Hayes',
                city: 'London, UK',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                rating: '9.8/10',
                text: 'Stayed 5 nights for a Tokyo Fintech summit. The fiber Wi-Fi clocked at 900+ Mbps, the workstation was ergonomic, and the airport chauffeur transfer was punctual and courteous.'
              },
              {
                name: 'Sophia Chen',
                city: 'Singapore',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
                rating: '9.6/10',
                text: 'Superb location in Ginza with world-class amenities. The heated rooftop pool and lotus spa after a long flight were heaven. Truly HotelPro delivers on its promise!'
              }
            ].map((rev, i) => (
              <div key={i} className="col-md-4">
                <div className="card h-100 p-4 border shadow-sm bg-white">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <img src={rev.avatar} alt={rev.name} className="rounded-circle" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                    <div>
                      <div className="fw-bold small">{rev.name}</div>
                      <div className="text-muted" style={{ fontSize: '11px' }}>{rev.city} · Verified Stay</div>
                    </div>
                    <div className="ms-auto badge bg-success">{rev.rating}</div>
                  </div>
                  <p className="text-muted small mb-0 italic">"{rev.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section className="container my-5">
        <div className="text-center mb-5">
          <span className="badge bg-light text-primary border mb-2">TRAVELER FAQ</span>
          <h2 className="fw-bold text-dark">Frequently Asked Questions</h2>
        </div>

        <div className="accordion accordion-flush shadow-sm rounded border p-3" id="hotelFaq">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                How does 100% Free Cancellation work?
              </button>
            </h2>
            <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#hotelFaq">
              <div className="accordion-body text-muted small">
                Every reservation on HotelPro comes with guaranteed 100% free cancellation up to 24 hours prior to check-in. You can cancel with 1 click directly from your "My Bookings" dashboard and receive an immediate refund confirmation.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                What are the check-in and check-out timings?
              </button>
            </h2>
            <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#hotelFaq">
              <div className="accordion-body text-muted small">
                Standard check-in begins at 14:00 (2:00 PM) and check-out is until 11:00 AM. Guaranteed Late Check-out until 4:00 PM is available as an optional add-on during reservation.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                Is GST tax invoice provided for corporate reimbursement?
              </button>
            </h2>
            <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#hotelFaq">
              <div className="accordion-body text-muted small">
                Yes! Every booking immediately generates an official GST Tax Invoice containing our registered GSTIN (13AAAAH0000A1Z5), SAC/HSN code 996311, CGST 9%, and SGST 9% itemized breakdown.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
