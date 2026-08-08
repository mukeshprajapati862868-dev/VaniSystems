import React from "react";
import { FaPrint, FaDownload, FaFileInvoice } from "react-icons/fa";

const Invoice = ({ order }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="invoice-container" style={{ padding: "20px", backgroundColor: "#fff" }}>
      <div className="d-flex justify-content-between align-items-center mb-4 no-print">
        <h4 className="fw-bold mb-0">
          <FaFileInvoice className="me-2 text-primary" />
          Invoice #{order.invoiceNumber}
        </h4>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={handlePrint}>
            <FaPrint className="me-1" /> Print
          </button>
          <button className="btn btn-primary">
            <FaDownload className="me-1" /> Download
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-5">
          {/* Header */}
          <div className="row mb-5">
            <div className="col-md-6">
              <h5 className="fw-bold text-primary">Vani Systems</h5>
              <p className="text-muted mb-1">123 Business Street</p>
              <p className="text-muted mb-1">New Delhi, India</p>
              <p className="text-muted mb-1">Phone: +91 9876543210</p>
              <p className="text-muted">Email: info@vanisystems.com</p>
            </div>
            <div className="col-md-6 text-md-end">
              <h5 className="fw-bold">INVOICE</h5>
              <p className="text-muted mb-1">
                <strong>Invoice Number:</strong> {order.invoiceNumber}
              </p>
              <p className="text-muted mb-1">
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p className="text-muted mb-1">
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-muted">
                <strong>Status:</strong>{" "}
                <span className={`badge ${order.paymentStatus === "Paid" ? "bg-success" : "bg-warning"}`}>
                  {order.paymentStatus}
                </span>
              </p>
            </div>
          </div>

          {/* Customer Details */}
          <div className="row mb-5">
            <div className="col-12">
              <h6 className="fw-bold mb-3">Bill To:</h6>
              <div className="bg-light p-3 rounded">
                <p className="mb-1 fw-bold">{order.customerName}</p>
                <p className="mb-1">{order.customerEmail}</p>
                <p className="mb-1">{order.customerPhone}</p>
                <p className="mb-1">{order.customerAddress}</p>
                <p className="mb-0">
                  {order.customerCity} - {order.customerPinCode}
                </p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="table-responsive mb-5">
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{item.title}</strong>
                      <br />
                      <small className="text-muted">{item.description}</small>
                    </td>
                    <td>₹{item.discountPrice}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.discountPrice * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="row">
            <div className="col-md-6 offset-md-6">
              <div className="bg-light p-4 rounded">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <strong>₹{order.subtotal}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <strong className="text-success">FREE</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <strong>₹{order.tax || 0}</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <span className="fw-bold fs-5">Grand Total:</span>
                  <span className="fw-bold fs-4 text-success">₹{order.grandTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="bg-primary text-white p-3 rounded">
                <h6 className="fw-bold mb-2">Payment Information</h6>
                <p className="mb-1">
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                <p className="mb-0">
                  <strong>Status:</strong> {order.paymentStatus}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="row mt-5">
            <div className="col-12 text-center">
              <p className="text-muted small mb-0">
                Thank you for your business! If you have any questions, please contact us at
                info@vanisystems.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .invoice-container {
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Invoice;
