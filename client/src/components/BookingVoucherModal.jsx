import React from 'react';

export default function BookingVoucherModal({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-card p-4 printable-area" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="brand-text text-primary">
              Hotel<span className="text-warning">Pro</span>
            </span>
            <span className="badge bg-success">CONFIRMED VOUCHER</span>
          </div>
          <button onClick={onClose} className="btn-close d-print-none"></button>
        </div>

        {/* Voucher Reference Box */}
        <div className="bg-light p-3 rounded mb-3 border">
          <div className="row align-items-center">
            <div className="col-8">
              <div className="text-muted small">Official Booking Reference:</div>
              <div className="h4 fw-bold text-primary mb-1">{booking.bookingReference}</div>
              <div className="text-muted small">Invoice Number: {booking.invoiceNumber || 'INV-2026-8842'}</div>
            </div>
            <div className="col-4 text-end">
              <span className="badge bg-primary px-3 py-2">
                <i className="bi bi-qr-code me-1"></i>VOUCHER ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Stay Details */}
        <div className="row g-3 mb-3">
          <div className="col-6">
            <div className="text-muted small">Guest Name:</div>
            <div className="fw-bold">{booking.guestDetails?.fullName || 'Himanshu Sanodiya'}</div>
            <div className="text-muted small">{booking.guestDetails?.email}</div>
          </div>
          <div className="col-6">
            <div className="text-muted small">Phone Number:</div>
            <div className="fw-bold">{booking.guestDetails?.phone || '+91 98765 43210'}</div>
          </div>
          <div className="col-6">
            <div className="text-muted small">Room Reserved:</div>
            <div className="fw-bold text-dark">{booking.roomDetails?.title || 'Executive Grand Suite'}</div>
            <div className="text-muted small">Room No: {booking.roomDetails?.roomNumber || 'STE-101'}</div>
          </div>
          <div className="col-6">
            <div className="text-muted small">Stay Duration:</div>
            <div className="fw-bold">{booking.stayDetails?.nights || 2} Nights · {booking.stayDetails?.adults || 2} Adults</div>
            <div className="text-muted small">Check-in: 14:00 · Check-out: 11:00</div>
          </div>
        </div>

        {/* Financial Settlement */}
        <div className="border-top pt-3 mb-4">
          <div className="d-flex justify-content-between mb-1 small">
            <span>Room Base Tariff:</span>
            <span>₹{(booking.pricing?.roomSubtotal || 7798).toLocaleString()}</span>
          </div>
          <div className="d-flex justify-content-between mb-1 small text-success">
            <span>Genius Level 2 Discount (20%):</span>
            <span>-₹{(booking.pricing?.geniusDiscount || 1559).toLocaleString()}</span>
          </div>
          <div className="d-flex justify-content-between mb-1 small">
            <span>Taxes & GST (18%):</span>
            <span>₹{(booking.pricing?.taxGST18 || 1375).toLocaleString()}</span>
          </div>
          <div className="d-flex justify-content-between border-top pt-2 fw-bold text-dark h5 mb-0">
            <span>Total Paid (INR):</span>
            <span className="text-primary">₹{(booking.pricing?.totalPayable || 9014).toLocaleString()}</span>
          </div>
        </div>

        {/* Cancellation Notice */}
        <div className="alert alert-success d-flex align-items-center gap-2 small mb-4 py-2">
          <i className="bi bi-shield-check fs-5"></i>
          <div>
            <strong>100% Free Cancellation Policy:</strong> Cancel anytime from your My Bookings dashboard for an instant full refund.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-2 d-print-none">
          <button onClick={() => window.print()} className="btn btn-outline-primary">
            <i className="bi bi-printer me-1"></i>Print Voucher
          </button>
          <button onClick={onClose} className="btn btn-primary px-4">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
