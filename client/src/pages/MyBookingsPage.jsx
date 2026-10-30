import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import BookingVoucherModal from '../components/BookingVoucherModal';
import TaxInvoiceModal from '../components/TaxInvoiceModal';

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    loadBookings();
  }, [user]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingService.getMyBookings(user?.email || 'himanshu.travel@gmail.com');
      setBookings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking? You will receive a 100% full instant refund.')) {
      return;
    }
    setCancellingId(bookingId);
    try {
      const updated = await bookingService.cancelBooking(bookingId, 'User requested cancellation');
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId || b.bookingReference === bookingId ? { ...b, ...updated } : b))
      );
      alert('Your booking has been cancelled successfully. 100% full refund has been initiated to your original payment method!');
    } catch (e) {
      alert('Cancellation failed: ' + e.message);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-1">My Bookings & Trips</h2>
          <p className="text-muted small mb-0">Manage reservations, print vouchers, download GST invoices, and 1-click free cancellations</p>
        </div>
        <button onClick={loadBookings} className="btn btn-sm btn-outline-secondary">
          <i className="bi bi-arrow-clockwise me-1"></i>Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-muted mt-2">Retrieving your trips and vouchers...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-5 bg-white rounded border shadow-sm">
          <i className="bi bi-calendar-x fs-1 text-muted"></i>
          <h4 className="fw-bold mt-2">No Active Reservations</h4>
          <p className="text-muted small">You don't have any bookings under this account yet.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {bookings.map((b) => {
            const isCancelled = b.bookingStatus === 'Cancelled' || b.cancellation?.isCancelled;

            return (
              <div key={b._id} className="card shadow-sm border overflow-hidden">
                <div className="card-header bg-white py-3 d-flex flex-wrap justify-content-between align-items-center border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold text-primary fs-5">{b.bookingReference}</span>
                    <span className={`badge ${isCancelled ? 'bg-danger' : 'bg-success'}`}>
                      {isCancelled ? 'CANCELLED · 100% REFUND PROCESSED' : 'CONFIRMED STAY'}
                    </span>
                  </div>
                  <div className="text-muted small">
                    Invoice: <strong className="text-dark">{b.invoiceNumber || 'INV-2026-8842'}</strong>
                  </div>
                </div>

                <div className="card-body p-4">
                  <div className="row g-4 align-items-center">
                    <div className="col-md-3">
                      <img
                        src={b.roomDetails?.image || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80'}
                        alt="Room"
                        className="rounded w-100 shadow-sm"
                        style={{ height: '140px', objectFit: 'cover' }}
                      />
                    </div>

                    <div className="col-md-5">
                      <span className="badge bg-light text-primary border mb-1">
                        {b.roomDetails?.category || 'Executive Suite'}
                      </span>
                      <h5 className="fw-bold text-dark mb-1">{b.roomDetails?.title || 'Tokyo Skyline Executive Grand Suite'}</h5>
                      <div className="text-muted small mb-2">
                        <i className="bi bi-door-closed me-1"></i>Room {b.roomDetails?.roomNumber || 'STE-101'} · Downtown Central Tokyo
                      </div>

                      <div className="small text-secondary">
                        <div>
                          <i className="bi bi-calendar-check me-1 text-primary"></i>
                          Stay: <strong>{b.stayDetails?.nights || 2} Nights</strong> ({b.stayDetails?.adults || 2} Adults)
                        </div>
                        <div>
                          <i className="bi bi-person me-1 text-primary"></i>
                          Primary Guest: <strong>{b.guestDetails?.fullName || 'Himanshu Sanodiya'}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 text-md-end border-start">
                      <div className="text-muted small">Total Paid Amount:</div>
                      <div className="h3 fw-bold text-primary mb-1">
                        ₹{(b.pricing?.totalPayable || 9014).toLocaleString()}
                      </div>
                      <div className="badge bg-light text-dark border mb-3">
                        <i className="bi bi-check-circle-fill text-success me-1"></i>
                        Paid via {b.payment?.method || 'Credit/Debit Card'}
                      </div>

                      <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                        <button
                          onClick={() => setSelectedVoucher(b)}
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="bi bi-qr-code me-1"></i>Voucher
                        </button>
                        <button
                          onClick={() => setSelectedInvoice(b)}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          <i className="bi bi-receipt me-1"></i>GST Invoice
                        </button>
                        {!isCancelled && (
                          <button
                            onClick={() => handleCancel(b._id)}
                            disabled={cancellingId === b._id}
                            className="btn btn-sm btn-outline-danger"
                          >
                            <i className="bi bi-x-circle me-1"></i>
                            {cancellingId === b._id ? 'Cancelling...' : 'Cancel Stay'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {isCancelled && (
                  <div className="card-footer bg-danger bg-opacity-10 py-2 border-top border-danger border-opacity-25 small text-danger d-flex align-items-center gap-2">
                    <i className="bi bi-shield-check fs-5"></i>
                    <span>
                      <strong>100% Refund Status:</strong> Full refund of ₹{(b.pricing?.totalPayable || 9014).toLocaleString()} successfully initiated to original payment card / UPI.
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {selectedVoucher && (
        <BookingVoucherModal booking={selectedVoucher} onClose={() => setSelectedVoucher(null)} />
      )}
      {selectedInvoice && (
        <TaxInvoiceModal booking={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
    </div>
  );
}
