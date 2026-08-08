import React, { useState, useEffect } from "react";
import apiService from "../services/apiService";
import { FaSearch, FaEdit, FaTrash, FaBan, FaUnlock, FaEye, FaBox, FaCreditCard, FaBell } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem('token')) { setLoading(false); return; }
      try {
        const [usersResult, ordersResult, paymentsResult, notificationsResult] = await Promise.all([
          apiService.getAllUsers(),
          apiService.getAllOrders(),
          apiService.getAllPayments(),
          apiService.getAllNotifications()
        ]);
        if (usersResult.success) setUsers(usersResult.data.users || []);
        if (ordersResult.success) setOrders(ordersResult.data.orders || []);
        if (paymentsResult.success) setPayments(paymentsResult.data.payments || []);
        if (notificationsResult.success) setNotifications(notificationsResult.data.notifications || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = async (user) => {
    const newName = prompt("Enter new name:", user.name);
    const newEmail = prompt("Enter new email:", user.email);
    const newPhone = prompt("Enter new phone:", user.phone);
    
    if (newName || newEmail || newPhone) {
      try {
        await apiService.updateUser(user._id || user.id, {
          name: newName || user.name,
          email: newEmail || user.email,
          phone: newPhone || user.phone,
        });
        const result = await apiService.getAllUsers();
        if (result.success) setUsers(result.data.users || []);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await apiService.deleteUser(id);
        setUsers(users.filter(u => (u._id || u.id) !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleBlock = async (id) => {
    if (window.confirm("Are you sure you want to block this user?")) {
      try {
        await apiService.blockUser(id);
        const result = await apiService.getAllUsers();
        if (result.success) setUsers(result.data.users || []);
      } catch (error) {
        console.error('Error blocking user:', error);
      }
    }
  };

  const handleUnblock = async (id) => {
    try {
      await apiService.unblockUser(id);
      const result = await apiService.getAllUsers();
      if (result.success) setUsers(result.data.users || []);
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  const handleViewHistory = (userId) => {
    setSelectedUser(userId);
    setShowHistory(true);
    setShowDetails(false);
  };

  const handleViewDetails = (userId) => {
    setSelectedUser(userId);
    setShowDetails(true);
    setShowHistory(false);
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userOrders = orders.filter(order => (order.userId?._id || order.userId) === selectedUser);
  const userPayments = payments.filter(payment => (payment.userId?._id || payment.userId) === selectedUser);
  const userNotifications = notifications.filter(notif => (notif.userId?._id || notif.userId) === selectedUser);

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">User Management</h5>
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {showDetails ? (
          <>
            <button className="btn btn-outline-secondary mb-3" onClick={() => setShowDetails(false)}>
              ← Back to Users
            </button>
            <h6 className="fw-bold mb-3">User Details & Activity</h6>
            
            {/* User Orders */}
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <FaBox className="me-2" /> Orders ({userOrders.length})
              </div>
              <div className="card-body">
                {userOrders.length === 0 ? (
                  <p className="text-muted mb-0">No orders found.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userOrders.map((order) => (
                          <tr key={order.orderId}>
                            <td><small>{order.orderId}</small></td>
                            <td><span className={`badge ${order.status === 'Delivered' || order.status === 'Completed' ? 'bg-success' : 'bg-info'}`}>{order.status}</span></td>
                            <td><small>₹{order.grandTotal}</small></td>
                            <td><small>{new Date(order.createdAt).toLocaleDateString()}</small></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* User Payments */}
            <div className="card mb-3">
              <div className="card-header bg-success text-white">
                <FaCreditCard className="me-2" /> Payments ({userPayments.length})
              </div>
              <div className="card-body">
                {userPayments.length === 0 ? (
                  <p className="text-muted mb-0">No payments found.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Transaction ID</th>
                          <th>Method</th>
                          <th>Status</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userPayments.map((payment) => (
                          <tr key={payment.transactionId}>
                            <td><small>{payment.transactionId}</small></td>
                            <td><small>{payment.paymentMethod}</small></td>
                            <td><span className={`badge ${payment.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning'}`}>{payment.paymentStatus}</span></td>
                            <td><small>₹{payment.amount}</small></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* User Notifications */}
            <div className="card">
              <div className="card-header bg-warning text-dark">
                <FaBell className="me-2" /> Notifications ({userNotifications.length})
              </div>
              <div className="card-body">
                {userNotifications.length === 0 ? (
                  <p className="text-muted mb-0">No notifications found.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Message</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userNotifications.map((notif) => (
                          <tr key={notif.id}>
                            <td><small>{notif.title}</small></td>
                            <td><small>{notif.message}</small></td>
                            <td><span className={`badge ${notif.read ? 'bg-secondary' : 'bg-primary'}`}>{notif.read ? 'Read' : 'Unread'}</span></td>
                            <td><small>{new Date(notif.timestamp).toLocaleDateString()}</small></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id || user.id}>
                      <td>#{user._id || user.id}</td>
                      <td>{user.name || "N/A"}</td>
                      <td>{user.email || "N/A"}</td>
                      <td>{user.phone || "N/A"}</td>
                      <td>
                        {user.status === "Blocked" || user.isBlocked ? (
                          <span className="badge bg-danger">Blocked</span>
                        ) : (
                          <span className="badge bg-success">Active</span>
                        )}
                      </td>
                      <td>{user.role || "User"}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleEdit(user)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleViewDetails(user._id || user.id)}
                            title="View Details"
                          >
                            <FaBox />
                          </button>
                          {user.status === "Blocked" || user.isBlocked ? (
                            <button
                              className="btn btn-outline-success"
                              onClick={() => handleUnblock(user._id || user.id)}
                              title="Unblock"
                            >
                              <FaUnlock />
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-warning"
                              onClick={() => handleBlock(user._id || user.id)}
                              title="Block"
                            >
                              <FaBan />
                            </button>
                          )}
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(user._id || user.id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
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

export default UserManagement;
