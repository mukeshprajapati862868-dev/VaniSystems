import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await apiService.getAllOrders();
        if (result.success) {
          setOrders(result.data.orders || []);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const statusOptions = [
    "Pending", "Confirmed", "Packed", "Shipped",
    "Out For Delivery", "Delivered", "Completed",
    "Cancelled", "Returned", "Refunded"
  ];

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await apiService.updateOrderStatus(orderId, { status: newStatus });
      const result = await apiService.getAllOrders();
      if (result.success) {
        setOrders(result.data.orders || []);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter(order =>
    (order.orderId || order._id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.customerName || order.userId?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="order-mgmt-container" style={{ padding: '20px' }}>
      <h2>Order Management</h2>
      <input
        type="text"
        placeholder="Search by Order ID or Name..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.orderId || order._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{order.orderId || order._id}</td>
              <td>{order.customerName || order.userId?.name || 'N/A'}</td>
              <td>₹{order.grandTotal || order.totalAmount}</td>
              <td>
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order.orderId || order._id, e.target.value)}
                >
                  {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;