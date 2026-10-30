import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roomService, bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import BookingVoucherModal from '../components/BookingVoucherModal';

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [room, setRoom] = useState(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [nights, setNights] = useState(2);
  const [guestName, setGuestName] = useState(user?.name || 'Himanshu Sanodiya');
  const [guestEmail, setGuestEmail] = useState(user?.email || 'himanshu.travel@gmail.com');
  const [guestPhone, setGuestPhone] = useState(user?.phone || '+91 98765 43210');
  const [specialRequests, setSpecialRequests] = useState('High floor, feather pillows preferred');

  // Add-ons
  const [addBreakfast, setAddBreakfast] = useState(true);
  const [addChauffeur, setAddChauffeur] = useState(true);
  const [addLateCheckout, setAddLateCheckout] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card');
  const [loading, setLoading] = useState(true);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    loadRoom();
  }, [id]);

  const loadRoom = async () => {
    setLoading(true);
    try {
      const data = await roomService.getRoomById(id);
      setRoom(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-muted mt-2">Preparing reservation checkout...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="container py-5 text-center">
        <h4>Room not found</h4>
        <button onClick={() => navigate('/rooms')} className="btn btn-primary mt-2">
          Back to Rooms
        </button>
      </div>
    );
  }

  // Financial calculations
  const roomRate = room.pricePerNight || 3899;
  const roomSubtotal = roomRate * nights;
  const geniusDiscount = Math.round(roomSubtotal * 0.20); // 20% Genius discount
  let addOnsTotal = 0;
  if (addBreakfast) addOnsTotal += 450 * nights;
  if (addChauffeur) addOnsTotal += 950;
  if (addLateCheckout) addOnsTotal += 600;

  const taxableSubtotal = roomSubtotal - geniusDiscount + addOnsTotal;
  const gstTax = Math.round(taxableSubtotal * 0.18);
  const grandTotal = taxableSubtotal + gstTax;

  const handleConfirmReservation = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        roomId: room._id,
        nights,
        stayDetails: {
          checkInDate: new Date().toISOString(),
          checkOutDate: new Date(Date.now() + nights * 24 * 60 * 60 * 1000).toISOString(),
          nights,
          adults: 2
        },
        guestDetails: {
          fullName: guestName,
          email: guestEmail,
          phone: guestPhone,
          specialRequests
        },
        addOns: {
          buffetBreakfast: { selected: addBreakfast, price: 450 },
          airportChauffeur: { selected: addChauffeur, price: 950 },
          lateCheckout: { selected: addLateCheckout, price: 600 }
        },
        paymentMethod
      };

      const result = await bookingService.createBooking(payload);
      setConfirmedBooking(result);
    } catch (err) {
      alert('Reservation could not be processed: ' + err.message);
    }
  };

  return (
    <div className="container my-5">
      {/* Breadcrumb / Title */}
      <div className="mb-4">
        <span className="badge bg-primary px-3 py-1 mb-2">SECURE CHECKOUT</span>
        <h2 className="fw-bold text-dark mb-1">Confirm Your Reservation & Stay Details</h2>
        <p className="text-muted small">Tokyo Grand Suites · 100% Free Cancellation with Full Refund Guarantee</p>
      </div>

      <div className="row g-4">
        {/* Left Column: Room Details, Gallery, Add-ons & Guest Form */}
        <div className="col-lg-8">
          {/* Room Gallery & Overview Card */}
          <div className="card shadow-sm border mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <span className="badge bg-light text-primary border mb-1">{room.category}</span>
                  <h4 className="fw-bold text-dark mb-1">{room.title}</h4>
                  <div className="text-muted small">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>Downtown Central, Tokyo · Suite {room.roomNumber}
                  </div>
                </div>
                <div className="rating-badge">{room.rating || 9.6}</div>
              </div>

              {/* Photo Mosaic */}
              <div className="mb-3">
                <img
                  src={room.images ? room.images[activePhoto] : 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'}
                  alt={room.title}
                  className="rounded w-100 shadow-sm"
                  style={{ maxHeight: '380px', objectFit: 'cover' }}
                />
                <div className="d-flex gap-2 mt-2">
                  {room.images && room.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="thumbnail"
                      onClick={() => setActivePhoto(idx)}
                      className={`rounded cursor-pointer border ${activePhoto === idx ? 'border-primary border-3' : 'opacity-75'}`}
                      style={{ width: '80px', height: '56px', objectFit: 'cover', cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </div>

              {/* Stay Nights Selector */}
              <div className="bg-light p-3 rounded mb-3 border">
                <div className="fw-bold small mb-2 text-dark">Select Number of Nights:</div>
                <div className="d-flex gap-2">
                  {[1, 2, 3, 7].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNights(n)}
                      className={`btn btn-sm ${nights === n ? 'btn-primary fw-bold' : 'btn-outline-secondary'}`}
                    >
                      {n} {n === 1 ? 'Night' : 'Nights'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons Selector */}
              <div className="mb-3">
                <div className="fw-bold small mb-2 text-dark">Tailor Your Stay With Premium Add-Ons:</div>
                <div className="d-flex flex-column gap-2">
                  <label className="card p-2 border d-flex flex-row align-items-center justify-content-between cursor-pointer">
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addBreakfast}
                        onChange={(e) => setAddBreakfast(e.target.checked)}
                        className="form-check-input mt-0"
                      />
                      <div>
                        <div className="fw-semibold small">Hot Gourmet Buffet Breakfast</div>
                        <div className="text-muted" style={{ fontSize: '11px' }}>Michelin-inspired breakfast spread per night</div>
                      </div>
                    </div>
                    <span className="badge bg-light text-dark border">+₹450 / night</span>
                  </label>

                  <label className="card p-2 border d-flex flex-row align-items-center justify-content-between cursor-pointer">
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addChauffeur}
                        onChange={(e) => setAddChauffeur(e.target.checked)}
                        className="form-check-input mt-0"
                      />
                      <div>
                        <div className="fw-semibold small">Private Airport Chauffeur Transfer</div>
                        <div className="text-muted" style={{ fontSize: '11px' }}>Haneda or Narita executive limousine pickup</div>
                      </div>
                    </div>
                    <span className="badge bg-light text-dark border">+₹950 flat</span>
                  </label>

                  <label className="card p-2 border d-flex flex-row align-items-center justify-content-between cursor-pointer">
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addLateCheckout}
                        onChange={(e) => setAddLateCheckout(e.target.checked)}
                        className="form-check-input mt-0"
                      />
                      <div>
                        <div className="fw-semibold small">Guaranteed Late Check-Out (Until 4:00 PM)</div>
                        <div className="text-muted" style={{ fontSize: '11px' }}>Relax longer before your evening departure</div>
                      </div>
                    </div>
                    <span className="badge bg-light text-dark border">+₹600 flat</span>
                  </label>
                </div>
              </div>

              {/* Guest Information Form */}
              <form onSubmit={handleConfirmReservation}>
                <h5 className="fw-bold text-dark mt-4 mb-3 border-top pt-3">Guest Information</h5>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Mobile Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Special Requests (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </div>
                </div>

                {/* Payment Simulator */}
                <h5 className="fw-bold text-dark mt-4 mb-3 border-top pt-3">Payment Method</h5>
                <div className="row g-2 mb-4">
                  {['Credit/Debit Card', 'UPI QR', 'Pay at Hotel'].map((pm) => (
                    <div key={pm} className="col-md-4">
                      <div
                        onClick={() => setPaymentMethod(pm)}
                        className={`card p-3 text-center border cursor-pointer ${paymentMethod === pm ? 'border-primary bg-primary bg-opacity-10 fw-bold' : ''}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className={`bi ${pm === 'Credit/Debit Card' ? 'bi-credit-card-2-front' : pm === 'UPI QR' ? 'bi-qr-code-scan' : 'bi-cash-coin'} fs-4 mb-1`}></i>
                        <span className="small">{pm}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button type="submit" className="btn btn-hotelpro-yellow w-100 py-3 fs-5 shadow">
                  <i className="bi bi-lock-fill me-2"></i>Complete Reservation & Instant Confirmation
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: Price Summary Sticky Card */}
        <div className="col-lg-4">
          <div className="card shadow-sm border sticky-top" style={{ top: '80px' }}>
            <div className="card-header bg-primary text-white p-3">
              <h5 className="fw-bold mb-0">Price Summary</h5>
              <div className="small text-white-50">100% Free Cancellation Included</div>
            </div>

            <div className="card-body p-4">
              <div className="d-flex justify-content-between mb-2 small">
                <span>Room Tariff ({nights} Nights × ₹{roomRate}):</span>
                <span className="fw-semibold">₹{roomSubtotal.toLocaleString()}</span>
              </div>

              <div className="d-flex justify-content-between mb-2 small text-success">
                <span>
                  <i className="bi bi-tag-fill me-1"></i>Genius Level 2 (20% Off):
                </span>
                <span className="fw-bold">-₹{geniusDiscount.toLocaleString()}</span>
              </div>

              {addOnsTotal > 0 && (
                <div className="d-flex justify-content-between mb-2 small text-primary">
                  <span>Selected Add-Ons:</span>
                  <span className="fw-semibold">+₹{addOnsTotal.toLocaleString()}</span>
                </div>
              )}

              <div className="d-flex justify-content-between mb-2 small">
                <span>Taxes & GST (18%):</span>
                <span className="fw-semibold">₹{gstTax.toLocaleString()}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-baseline mb-3">
                <span className="h5 fw-bold text-dark mb-0">Total Amount:</span>
                <span className="h3 fw-bold text-primary mb-0">₹{grandTotal.toLocaleString()}</span>
              </div>

              <div className="alert alert-success p-2 small mb-3">
                <i className="bi bi-shield-check me-1"></i>
                <strong>Risk-Free Guarantee:</strong> Cancel with 1 click from your dashboard for a 100% full instant refund.
              </div>

              <div className="small text-muted">
                <div className="mb-1"><i className="bi bi-check2 text-success me-1"></i>No booking fees</div>
                <div className="mb-1"><i className="bi bi-check2 text-success me-1"></i>Instant digital booking voucher</div>
                <div><i className="bi bi-check2 text-success me-1"></i>Official GST Tax Invoice (HSN 996311)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <BookingVoucherModal
          booking={confirmedBooking}
          onClose={() => {
            setConfirmedBooking(null);
            navigate('/my-bookings');
          }}
        />
      )}
    </div>
  );
}
