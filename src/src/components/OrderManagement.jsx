import React, { useState } from "react";
import { useOrders } from "../context/OrderContext";
import { FaSearch, FaEye, FaTruck, FaTimes, FaUndo, FaCheck, FaBox } from "react-icons/fa";

const OrderManagement = () => {
  const { orders, updateOrderStatus, getOrderById, orderStatuses } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showTracking, setShowTracking] = useState(false);

  const filteredOrders = orders.filter(order =>
    order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (orderId) => {
    const order = getOrderById(orderId);
    setSelectedOrder(order);
    setShowDetails(true);
    setShowTracking(false);
  };

  const handleTrackOrder = (orderId) => {
    const order = getOrderById(orderId);
    setSelectedOrder(order);
    setShowTracking(true);
    setShowDetails(false);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    const remarks = prompt(`Enter remarks for ${newStatus}:`, "Status updated by admin");
    if (remarks) {
      updateOrderStatus(orderId, newStatus, remarks, "Admin");
    }
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      updateOrderStatus(orderId, "Cancelled", "Cancelled by admin", "Admin");
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Order Management</h5>
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {showDetails && selectedOrder ? (
          <>
            <button className="btn btn-outline-secondary mb-3" onClick={() => setShowDetails(false)}>
              ← Back to Orders
            </button>
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h6 className="mb-0">Order Details - #{selectedOrder.orderId}</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <small className="text-muted">Invoice Number</small>
                    <div className="fw-bold">{selectedOrder.invoiceNumber}</div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">Tracking Number</small>
                    <div className="fw-bold">{selectedOrder.trackingNumber}</div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <small className="text-muted">Customer Email</small>
                    <div className="fw-bold">{selectedOrder.customerEmail}</div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <small className="text-muted">Order Date</small>
                    <div className="fw-bold">{new Date(selectedOrder.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <small className="text-muted">Payment Method</small>
                    <div className="fw-bold">{selectedOrder.paymentMethod}</div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <small className="text-muted">Payment Status</small>
                    <div className="fw-bold">{selectedOrder.paymentStatus}</div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <small className="text-muted">Order Status</small>
                    <div className="fw-bold">{selectedOrder.status}</div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <small className="text-muted">Grand Total</small>
                    <div className="fw-bold text-success">₹{selectedOrder.grandTotal}</div>
                  </div>
                </div>
                <h6 className="fw-bold mt-4 mb-3">Order Items</h6>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items?.map((item, index) => (
                        <tr key={index}>
                          <td>{item.title}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price}</td>
                          <td>₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <small className="text-muted">Subtotal</small>
                    <div>₹{selectedOrder.subtotal}</div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">GST</small>
                    <div>₹{selectedOrder.gst}</div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <small className="text-muted">Shipping</small>
                    <div>₹{selectedOrder.shipping}</div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <small className="text-muted">Discount</small>
                    <div>₹{selectedOrder.discount || 0}</div>
                  </div>
                  <div className="col-12 mt-3 pt-3 border-top">
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Grand Total</span>
                      <span className="fw-bold text-success">₹{selectedOrder.grandTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : showTracking && selectedOrder ? (
          <>
            <button className="btn btn-outline-secondary mb-3" onClick={() => setShowTracking(false)}>
              ← Back to Orders
            </button>
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h6 className="mb-0">Order Tracking - #{selectedOrder.orderId}</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <small className="text-muted">Tracking Number</small>
                    <div className="fw-bold">{selectedOrder.trackingNumber}</div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">Current Location</small>
                    <div className="fw-bold">{selectedOrder.tracking?.currentLocation}</div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <small className="text-muted">Estimated Delivery</small>
                    <div className="fw-bold">{selectedOrder.tracking?.estimatedDelivery}</div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <small className="text-muted">Current Status</small>
                    <div className="fw-bold">{selectedOrder.status}</div>
                  </div>
                </div>
              </div>
            </div>
            <h6 className="fw-bold mb-3">Order Timeline</h6>
            <div className="timeline">
              {selectedOrder.timeline?.map((event, index) => (
                <div key={index} className="d-flex mb-3">
                  <div className="me-3">
                    <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                      <FaCheck className="text-white" />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-bold">{event.status}</div>
                    <small className="text-muted">{event.date}</small>
                    <div className="small text-muted">{event.remarks}</div>
                    <small className="text-muted">By: {event.adminName}</small>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Invoice</th>
                  <th>Customer Email</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.orderId}>
                      <td><small>#{order.orderId}</small></td>
                      <td><small>{order.invoiceNumber}</small></td>
                      <td><small>{order.customerEmail}</small></td>
                      <td><small>{new Date(order.createdAt).toLocaleDateString()}</small></td>
                      <td><small>{order.items?.length || 0}</small></td>
                      <td><small className="fw-bold">₹{order.grandTotal}</small></td>
                      <td>
                        <span className={`badge ${order.status === 'Delivered' || order.status === 'Completed' ? 'bg-success' : order.status === 'Cancelled' ? 'bg-danger' : 'bg-info'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${order.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleViewDetails(order.orderId)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            className="btn btn-outline-info"
                            onClick={() => handleTrackOrder(order.orderId)}
                            title="Track Order"
                          >
                            <FaTruck />
                          </button>
                          <select
                            className="btn btn-outline-secondary form-select form-select-sm"
                            style={{ width: "auto" }}
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.orderId, e.target.value)}
                          >
                            {orderStatuses.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                          {(order.status === "Pending" || order.status === "Confirmed") && (
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleCancelOrder(order.orderId)}
                              title="Cancel"
                            >
                              <FaTimes />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
