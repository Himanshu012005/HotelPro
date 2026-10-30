import React from 'react';

export default function TaxInvoiceModal({ booking, onClose }) {
  if (!booking) return null;

  const roomSubtotal = booking.pricing?.roomSubtotal || 7798;
  const geniusDiscount = booking.pricing?.geniusDiscount || 1559;
  const taxableVal = Math.max(0, roomSubtotal - geniusDiscount + (booking.pricing?.addOnsTotal || 0));
  const cgst = Math.round(taxableVal * 0.09);
  const sgst = Math.round(taxableVal * 0.09);
  const total = booking.pricing?.totalPayable || (taxableVal + cgst + sgst);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-card p-4 printable-area" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        {/* Invoice Header */}
        <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-4">
          <div>
            <div className="h3 fw-bold text-primary mb-0">HotelPro Hospitality Group</div>
            <div className="text-muted small">Ginza 5-Chome, Chuo City, Tokyo 104-0061, Japan</div>
            <div className="text-muted small">GSTIN: 13AAAAH0000A1Z5 · SAC / HSN Code: 996311</div>
            <div className="text-muted small">Email: billing@hotelpro.com · Phone: +81 3-5555-0199</div>
          </div>
          <div className="text-end">
            <span className="badge bg-primary fs-6 mb-2">TAX INVOICE</span>
            <div className="fw-bold text-dark">{booking.invoiceNumber || 'INV-2026-8842'}</div>
            <div className="text-muted small">Date: {new Date(booking.createdAt || Date.now()).toLocaleDateString()}</div>
            <div className="text-muted small">Ref: {booking.bookingReference}</div>
          </div>
        </div>

        {/* Bill To */}
        <div className="bg-light p-3 rounded mb-4 border">
          <div className="text-uppercase small fw-bold text-muted mb-1">Billed To (Customer):</div>
          <div className="row">
            <div className="col-sm-6">
              <div className="fw-bold">{booking.guestDetails?.fullName || 'Himanshu Sanodiya'}</div>
              <div className="small text-muted">{booking.guestDetails?.email}</div>
              <div className="small text-muted">{booking.guestDetails?.phone}</div>
            </div>
            <div className="col-sm-6 text-sm-end">
              <div className="small text-muted">Stay Dates: {booking.stayDetails?.nights || 2} Nights</div>
              <div className="small text-muted">Room: {booking.roomDetails?.title || 'Executive Grand Suite'} ({booking.roomDetails?.roomNumber || 'STE-101'})</div>
              <div className="badge bg-success">PAID VIA {booking.payment?.method || 'CREDIT CARD'}</div>
            </div>
          </div>
        </div>

        {/* Tax Itemized Table */}
        <table className="table table-bordered small mb-4">
          <thead className="table-light">
            <tr>
              <th>Description of Service</th>
              <th>HSN Code</th>
              <th className="text-center">Qty / Nights</th>
              <th className="text-end">Taxable Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Hotel Accommodation Service</strong>
                <div className="text-muted" style={{ fontSize: '11px' }}>
                  {booking.roomDetails?.title} (Genius 20% discount applied)
                </div>
              </td>
              <td>996311</td>
              <td className="text-center">{booking.stayDetails?.nights || 2}</td>
              <td className="text-end">₹{taxableVal.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan="3" className="text-end fw-semibold">CGST (9.0%):</td>
              <td className="text-end">₹{cgst.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan="3" className="text-end fw-semibold">SGST (9.0%):</td>
              <td className="text-end">₹{sgst.toLocaleString()}</td>
            </tr>
            <tr className="table-primary fw-bold">
              <td colSpan="3" className="text-end">Total Amount (INR):</td>
              <td className="text-end h5 mb-0">₹{total.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        {/* Refund Policy Declaration */}
        <div className="small text-muted border-top pt-3 mb-4">
          <p className="mb-1"><strong>Declaration:</strong> This is a computer-generated tax invoice and requires no physical signature. Registered under the Goods and Services Tax Act.</p>
          <p className="mb-0"><strong>Cancellation Terms:</strong> 100% refundable upon 1-click cancellation up to 24 hours prior to scheduled check-in.</p>
        </div>

        {/* Modal Actions */}
        <div className="d-flex justify-content-end gap-2 d-print-none">
          <button onClick={() => window.print()} className="btn btn-outline-primary">
            <i className="bi bi-printer me-1"></i>Print / Save PDF
          </button>
          <button onClick={onClose} className="btn btn-primary px-4">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
