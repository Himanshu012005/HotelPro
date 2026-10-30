import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h4 className="fw-bold mb-3">
              Hotel<span className="text-warning">Pro</span>
            </h4>
            <p className="text-white-50 small mb-3">
              Your ultimate hotel booking and management solution. Providing seamless reservations, real-time availability, 100% free cancellation guarantee, and executive luxury comfort.
            </p>
            <div className="d-flex gap-3 text-warning">
              <span className="small"><i className="bi bi-star-fill me-1"></i>9.6/10 Exceptional</span>
              <span className="small"><i className="bi bi-shield-check me-1"></i>100% Free Refund</span>
            </div>
          </div>

          <div className="col-sm-6 col-lg-2">
            <h6 className="fw-bold text-uppercase small mb-3 text-warning">Room Types</h6>
            <ul className="list-unstyled small text-white-50 d-flex flex-column gap-2">
              <li>Executive Suites</li>
              <li>Deluxe King Rooms</li>
              <li>Luxury Penthouses</li>
              <li>Diplomatic Boardrooms</li>
            </ul>
          </div>

          <div className="col-sm-6 col-lg-3">
            <h6 className="fw-bold text-uppercase small mb-3 text-warning">Hotel Amenities</h6>
            <ul className="list-unstyled small text-white-50 d-flex flex-column gap-2">
              <li>Heated Skyline Lap Pool (35th Fl)</li>
              <li>Lotus Luxury Spa & Traditional Onsen</li>
              <li>Fine Dining Bistro & Sky Bar</li>
              <li>24/7 Executive Workstation Lounge</li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h6 className="fw-bold text-uppercase small mb-3 text-warning">Contact & Location</h6>
            <p className="small text-white-50 mb-1">
              <i className="bi bi-geo-alt-fill text-warning me-2"></i>Ginza 5-Chome, Chuo City, Tokyo 104-0061
            </p>
            <p className="small text-white-50 mb-1">
              <i className="bi bi-telephone-fill text-warning me-2"></i>+81 3-5555-0199
            </p>
            <p className="small text-white-50">
              <i className="bi bi-envelope-fill text-warning me-2"></i>reservations@hotelpro.com
            </p>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-white-50 small">
          <p className="mb-0">© 2026 HotelPro Hospitality Group. All rights reserved. GSTIN: 13AAAAH0000A1Z5 (HSN 996311).</p>
          <div className="d-flex gap-3 mt-2 mt-md-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>SkillWallet Evaluation Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
