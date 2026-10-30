import React from 'react';
import { Link } from 'react-router-dom';

export default function RoomCard({ room }) {
  const displayImage = room.images && room.images.length > 0 ? room.images[0] : 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="room-card">
      <div className="room-image-wrap">
        <img src={displayImage} alt={room.title} />
        <div className="position-absolute top-0 start-0 m-3">
          <span className="genius-badge shadow-sm">
            <i className="bi bi-tag-fill me-1"></i>{room.discountBadge || 'Genius 20% Off'}
          </span>
        </div>
        <div className="position-absolute bottom-0 end-0 m-2">
          <span className="badge bg-dark bg-opacity-75 text-white small">
            <i className="bi bi-images me-1"></i>{room.images ? room.images.length : 3} Photos
          </span>
        </div>
      </div>

      <div className="p-3 d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <span className="badge bg-light text-primary border mb-1">{room.category}</span>
            <h5 className="fw-bold mb-1 text-dark">{room.title}</h5>
            <p className="text-muted small mb-0">
              <i className="bi bi-building me-1"></i>Suite {room.roomNumber} · {room.roomSize}
            </p>
          </div>

          <div className="text-end">
            <div className="rating-badge">{room.rating || 9.6}</div>
            <div className="text-muted" style={{ fontSize: '11px' }}>
              {room.ratingReview?.split('(')[0] || 'Exceptional'}
            </div>
          </div>
        </div>

        <div className="small text-secondary mb-3">
          <div className="mb-1">
            <i className="bi bi-person-fill text-dark me-1"></i>
            Up to {room.capacityAdults} Adults · {room.bedType}
          </div>
          <div className="free-canc-tag">
            <i className="bi bi-check-circle-fill"></i>
            <span>Free cancellation · No prepayment needed</span>
          </div>
          <div className="text-success small fw-semibold">
            <i className="bi bi-cup-hot-fill me-1"></i>Complimentary Gourmet Breakfast Included
          </div>
        </div>

        <div className="d-flex flex-wrap gap-1 mb-3">
          {room.features && room.features.slice(0, 3).map((f, i) => (
            <span key={i} className="badge bg-light text-muted border" style={{ fontSize: '11px' }}>
              {f}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-end">
          <div>
            <div className="text-decoration-line-through text-muted small">
              ₹{(room.originalPrice || Math.round(room.pricePerNight * 1.25)).toLocaleString()}
            </div>
            <div className="d-flex align-items-baseline gap-1">
              <span className="h4 fw-bold text-dark mb-0">₹{room.pricePerNight.toLocaleString()}</span>
              <span className="text-muted small">/ night</span>
            </div>
            <div className="text-muted" style={{ fontSize: '11px' }}>+18% GST (Includes taxes)</div>
          </div>

          <Link to={`/checkout/${room._id}`} className="btn btn-hotelpro-primary btn-sm px-3 py-2">
            Reserve Suite <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
