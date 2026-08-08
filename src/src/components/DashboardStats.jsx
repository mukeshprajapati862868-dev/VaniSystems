import React, { useState, useEffect } from "react";
import { FaUsers, FaBox, FaShoppingCart, FaRupeeSign, FaTruck, FaClock, FaCheckCircle, FaWarehouse, FaEye } from "react-icons/fa";
import apiService from "../services/apiService";
import { useAuth } from "../context/AuthContext";

const DashboardStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAdminUser = user?.role === "admin" || user?.role === "Admin";

  const fetchStats = () => {
    if (!localStorage.getItem('token') || !isAdminUser) return;
    apiService.getDashboardStats().then(result => {
      if (result.success) setStats(result.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    if (!localStorage.getItem('token') || !isAdminUser) {
      setLoading(false);
      return;
    }
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [isAdminUser]);

  if (loading) return <div>Loading...</div>;
  if (!stats) return null;

  const dashboardStats = [
    { title: "Total Users", value: stats.users?.total || 0, icon: <FaUsers className="text-primary" />, color: "primary" },
    { title: "Total Products", value: stats.products?.total || 0, icon: <FaBox className="text-success" />, color: "success" },
    { title: "Total Orders", value: stats.orders?.total || 0, icon: <FaShoppingCart className="text-primary" />, color: "primary" },
    { title: "Total Revenue", value: `₹${(stats.revenue?.total || 0).toLocaleString()}`, icon: <FaRupeeSign className="text-success" />, color: "success" },
    { title: "Pending Orders", value: stats.orders?.pending || 0, icon: <FaClock className="text-warning" />, color: "warning" },
    { title: "Delivered Orders", value: stats.orders?.delivered || 0, icon: <FaCheckCircle className="text-success" />, color: "success" },
    { title: "Today's Sales", value: `₹${(stats.revenue?.today?.revenue || 0).toLocaleString()}`, icon: <FaTruck className="text-primary" />, color: "primary" },
    { title: "Low Stock", value: stats.products?.lowStock || 0, icon: <FaWarehouse className="text-warning" />, color: "warning" },
  ];

  return (
    <>
      <div className="row g-4">
        {dashboardStats.map((stat, index) => (
          <div className="col-12 col-sm-6 col-xl-3" key={index}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className={`fs-1 me-3 text-${stat.color}`}>{stat.icon}</div>
                  <div>
                    <h6 className="text-muted mb-1">{stat.title}</h6>
                    <h3 className="fw-bold mb-0">{stat.value}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      {stats.recentOrders && stats.recentOrders.length > 0 && (
        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-4">Recent Orders</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.slice(0, 5).map(order => (
                    <tr key={order._id || order.orderId}>
                      <td><small>#{order.orderId || order._id}</small></td>
                      <td><small>{order.userId?.name || 'N/A'}</small></td>
                      <td><small>{order.items?.length || 0}</small></td>
                      <td><small className="fw-bold">₹{order.grandTotal || order.totalAmount}</small></td>
                      <td>
                        <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : order.status === 'Cancelled' ? 'bg-danger' : 'bg-info'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td><small>{new Date(order.createdAt).toLocaleDateString()}</small></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Recent Users Section */}
      {stats.recentUsers && stats.recentUsers.length > 0 && (
        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-4">Recent Users</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Registration Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentUsers.slice(0, 5).map(user => (
                    <tr key={user._id}>
                      <td><small>{user.name || 'N/A'}</small></td>
                      <td><small>{user.email || 'N/A'}</small></td>
                      <td><small>{user.phone || 'N/A'}</small></td>
                      <td><small>{user.role || 'User'}</small></td>
                      <td>
                        <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                          {user.status || 'Active'}
                        </span>
                      </td>
                      <td><small>{user.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : 'N/A'}</small></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardStats;
