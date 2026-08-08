import React, { useState, useEffect } from "react";
import apiService from "../services/apiService";
import { FaSearch, FaCheckCircle, FaTimesCircle, FaUndo } from "react-icons/fa";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchPayments = async () => {
      if (!localStorage.getItem('token')) { setLoading(false); return; }
      try {
        const result = await apiService.getAllPayments();
        if (result.success) setPayments(result.data.payments || []);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch =
      (payment.transactionId || payment._id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.orderId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.customerEmail || payment.userId?.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || payment.paymentStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const paymentMethods = ["cod", "UPI", "Debit Card", "Credit Card", "Wallet", "Net Banking", "EMI"];

  const methodCounts = {};
  paymentMethods.forEach(method => {
    methodCounts[method] = payments.filter(p => p.paymentMethod === method).length;
  });

  const totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const paidAmount = payments.filter(p => p.paymentStatus === "Paid" || p.paymentStatus === "Success").reduce((sum, p) => sum + (p.amount || 0), 0);
  const pendingAmount = payments.filter(p => p.paymentStatus === "Pending").reduce((sum, p) => sum + (p.amount || 0), 0);
  const failedAmount = payments.filter(p => p.paymentStatus === "Failed").reduce((sum, p) => sum + (p.amount || 0), 0);
  const refundedAmount = payments.filter(p => p.paymentStatus === "Refunded").reduce((sum, p) => sum + (p.amount || 0), 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
      case "Success":
        return <span className="badge bg-success">Paid</span>;
      case "Pending":
        return <span className="badge bg-warning">Pending</span>;
      case "Failed":
        return <span className="badge bg-danger">Failed</span>;
      case "Refunded":
        return <span className="badge bg-info">Refunded</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  if (loading) return <div>Loading payments...</div>;

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Payment Management</h5>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white">
              <div className="card-body p-3">
                <h6 className="mb-0">Total Amount</h6>
                <h4 className="fw-bold mb-0">₹{totalAmount.toLocaleString()}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success text-white">
              <div className="card-body p-3">
                <h6 className="mb-0">Paid Amount</h6>
                <h4 className="fw-bold mb-0">₹{paidAmount.toLocaleString()}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-warning text-dark">
              <div className="card-body p-3">
                <h6 className="mb-0">Pending Amount</h6>
                <h4 className="fw-bold mb-0">₹{pendingAmount.toLocaleString()}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-info text-white">
              <div className="card-body p-3">
                <h6 className="mb-0">Failed Amount</h6>
                <h4 className="fw-bold mb-0">₹{failedAmount.toLocaleString()}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by Transaction ID or Order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>

        <div className="row g-3 mb-4">
          {paymentMethods.map(method => (
            <div className="col-md-4 col-lg-3" key={method}>
              <div className="card border-0 shadow-sm">
                <div className="card-body p-3">
                  <h6 className="text-muted mb-1">{method}</h6>
                  <h5 className="fw-bold mb-0">{methodCounts[method] || 0} transactions</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Order ID</th>
                <th>Customer Email</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No payments found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.transactionId || payment._id}>
                    <td>
                      <span className="fw-bold">{payment.transactionId || payment._id}</span>
                    </td>
                    <td>#{payment.orderId}</td>
                    <td><small>{payment.customerEmail || payment.userId?.email || 'N/A'}</small></td>
                    <td className="fw-bold text-success">₹{(payment.amount || 0).toLocaleString()}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>{getStatusBadge(payment.paymentStatus)}</td>
                    <td>{payment.timestamp ? new Date(payment.timestamp).toLocaleString() : new Date(payment.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
