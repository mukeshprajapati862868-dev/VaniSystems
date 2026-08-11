import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import {
  FaBox, FaBell, FaCreditCard, FaTruck, FaCheckCircle, FaUser, FaHome,
  FaShoppingCart, FaHeart, FaMapMarkerAlt, FaEdit, FaCamera, FaTrash,
  FaSignOutAlt, FaHistory, FaStar, FaUndo, FaDownload, FaCog, FaHeadset,
  FaLock, FaShieldAlt, FaGift, FaChartLine, FaList, FaSearch, FaPlus,
  FaMinus, FaTimes, FaEye, FaChevronRight, FaChevronLeft, FaEnvelope,
  FaPhone, FaCalendar, FaIdCard, FaCrown, FaBan, FaCheck, FaClock
} from "react-icons/fa";

// ─── Coupons Panel ───────────────────────────────────────────────────────────
const CouponsPanel = () => {
  const [coupons, setCoupons] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [copied, setCopied] = React.useState("");

  React.useEffect(() => {
    fetch("https://vanisystemsb-1.onrender.com/api/coupons/active", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) setCoupons(data.data.coupons || []);
      })
      .catch(e => console.error("Coupons error:", e))
      .finally(() => setLoading(false));
  }, []);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(""), 2000);
  };

  if (loading) return <div className="text-center py-4"><div className="spinner-border spinner-border-sm text-primary" /></div>;

  if (coupons.length === 0) return (
    <div className="text-center py-5">
      <span style={{ fontSize: 50 }}>🎟️</span>
      <h6 className="mt-3 text-muted">No active coupons available right now</h6>
      <p className="text-muted small">Check back later for new offers from admin</p>
    </div>
  );

  return (
    <div className="row g-3">
      {coupons.map(c => (
        <div key={c._id} className="col-md-6">
          <div className="border rounded-3 p-3 h-100" style={{ borderStyle: "dashed", borderColor: "#29a9e0", background: "#f0f9ff" }}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <span className="badge bg-primary fs-6 font-monospace px-3 py-2">{c.code}</span>
              </div>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => copyCode(c.code)}
              >
                {copied === c.code ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>
            <div className="fw-bold text-success fs-5 mb-1">
              {c.discountType === "percentage" ? `${c.discount}% OFF` : `₹${c.discount} OFF`}
            </div>
            {c.description && <div className="text-muted small mb-2">{c.description}</div>}
            <div className="d-flex flex-wrap gap-2 mt-2">
              {c.minPurchase > 0 && (
                <span className="badge bg-light text-dark border">Min: ₹{c.minPurchase}</span>
              )}
              {c.maxDiscount > 0 && (
                <span className="badge bg-light text-dark border">Max: ₹{c.maxDiscount}</span>
              )}
              <span className="badge bg-light text-dark border">
                Valid till {new Date(c.validTo).toLocaleDateString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Returns Panel ────────────────────────────────────────────────────────────
const ReturnsPanel = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [reason, setReason] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const deliveredOrders = orders.filter(o =>
    o.status === "Delivered" || o.status === "Completed"
  );
  const returnedOrders = orders.filter(o => o.status === "Returned");

  const submitReturn = async (e) => {
    e.preventDefault();
    if (!selectedOrder || !reason.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/${selectedOrder.orderId}/return`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ reason })
        }
      );
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: `Return request for order #${selectedOrder.orderId} submitted! Refund of ₹${selectedOrder.grandTotal} will be processed in 5-7 business days.` });
        setSelectedOrder(null);
        setReason("");
      } else {
        setMessage({ type: "danger", text: data.error || "Failed to submit return request" });
      }
    } catch (err) {
      setMessage({ type: "danger", text: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {message && (
        <div className={`alert alert-${message.type} alert-dismissible`}>
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage(null)} />
        </div>
      )}

      {/* Active return requests */}
      {returnedOrders.length > 0 && (
        <div className="mb-4">
          <h6 className="fw-bold mb-3">Active Return Requests</h6>
          {returnedOrders.map(o => (
            <div key={o._id} className="card border-warning mb-2">
              <div className="card-body p-3 d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-bold text-primary">#{o.orderId}</span>
                  <span className="text-muted small ms-2">{o.returnReason}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-warning text-dark">
                    Refund {o.refundStatus || "Pending"}: ₹{o.refundAmount || o.grandTotal}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Return request form */}
      <h6 className="fw-bold mb-3">Request a Return</h6>
      {deliveredOrders.length === 0 ? (
        <div className="text-center py-5">
          <span style={{ fontSize: 50 }}>📦</span>
          <h6 className="mt-3 text-muted">No delivered orders eligible for return</h6>
          <p className="text-muted small">Only delivered orders can be returned</p>
        </div>
      ) : (
        <form onSubmit={submitReturn}>
          <div className="mb-3">
            <label className="form-label fw-bold">Select Order to Return</label>
            <select
              className="form-select"
              value={selectedOrder?._id || ""}
              onChange={e => setSelectedOrder(deliveredOrders.find(o => o._id === e.target.value) || null)}
              required
            >
              <option value="">-- Select a delivered order --</option>
              {deliveredOrders.map(o => (
                <option key={o._id} value={o._id}>
                  #{o.orderId} — ₹{o.grandTotal} — {new Date(o.createdAt).toLocaleDateString("en-IN")}
                </option>
              ))}
            </select>
          </div>

          {selectedOrder && (
            <div className="card bg-light mb-3">
              <div className="card-body p-3">
                <div className="row g-2">
                  <div className="col-6"><small className="text-muted">Order ID</small><div className="fw-bold">#{selectedOrder.orderId}</div></div>
                  <div className="col-6"><small className="text-muted">Amount</small><div className="fw-bold text-success">₹{selectedOrder.grandTotal}</div></div>
                  <div className="col-6"><small className="text-muted">Items</small><div className="fw-bold">{selectedOrder.items?.length || 0} item(s)</div></div>
                  <div className="col-6"><small className="text-muted">Payment</small><div className="fw-bold">{selectedOrder.paymentMethod}</div></div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-bold">Return Reason *</label>
            <select className="form-select mb-2" value={reason} onChange={e => setReason(e.target.value)} required>
              <option value="">-- Select reason --</option>
              <option value="Defective or damaged product">Defective or damaged product</option>
              <option value="Wrong item received">Wrong item received</option>
              <option value="Item not as described">Item not as described</option>
              <option value="Changed my mind">Changed my mind</option>
              <option value="Better price available elsewhere">Better price available elsewhere</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" className="btn btn-warning fw-bold px-4" disabled={submitting || !selectedOrder || !reason}>
            {submitting ? "Submitting..." : "↩️ Submit Return Request"}
          </button>
        </form>
      )}
    </div>
  );
};

// ─── Payment History Panel ───────────────────────────────────────────────────
const PaymentHistory = () => {
  const [payments, setPayments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/payments', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        if (data.success) setPayments(data.data.payments || []);
      } catch (e) {
        console.error('Payment history error:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="text-center py-4"><div className="spinner-border spinner-border-sm text-primary" /></div>;

  if (payments.length === 0) return (
    <div className="text-center py-5">
      <FaCreditCard className="text-muted" style={{ fontSize: 50 }} />
      <h6 className="mt-3 text-muted">No payment records found</h6>
    </div>
  );

  const statusColor = { Paid: 'success', Pending: 'warning', Failed: 'danger', Refunded: 'info' };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Transaction ID</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p._id}>
              <td><small className="text-muted">{p.transactionId}</small></td>
              <td><small className="fw-bold text-primary">{p.orderId}</small></td>
              <td><span className="fw-bold text-success">₹{p.amount?.toFixed(2)}</span></td>
              <td><small>{p.paymentMethod}</small></td>
              <td>
                <span className={`badge bg-${statusColor[p.paymentStatus] || 'secondary'}`}>
                  {p.paymentStatus}
                </span>
              </td>
              <td><small>{new Date(p.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</small></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─── Notifications Panel ──────────────────────────────────────────────────────
const NotificationsPanel = () => {
  const [notifications, setNotifications] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const load = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/notifications', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (data.success) setNotifications(data.data.notifications || []);
    } catch (e) {
      console.error('Notifications error:', e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
  };

  const markAllRead = async () => {
    await fetch('http://localhost:5000/api/notifications/mark-all-read', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotif = async (id) => {
    await fetch(`http://localhost:5000/api/notifications/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setNotifications(prev => prev.filter(n => n._id !== id));
  };

  if (loading) return <div className="text-center py-4"><div className="spinner-border spinner-border-sm text-primary" /></div>;

  const unread = notifications.filter(n => !n.read).length;
  const typeColor = { order: 'primary', payment: 'success', system: 'secondary', promotion: 'warning' };

  return (
    <div>
      {notifications.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted small">{unread} unread</span>
          {unread > 0 && (
            <button className="btn btn-sm btn-outline-primary" onClick={markAllRead}>
              <FaCheck className="me-1" /> Mark All Read
            </button>
          )}
        </div>
      )}

      {notifications.length === 0 ? (
        <div className="text-center py-5">
          <FaBell className="text-muted" style={{ fontSize: 50 }} />
          <h6 className="mt-3 text-muted">No notifications yet</h6>
          <p className="text-muted small">Notifications about your orders and payments will appear here</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {notifications.map(n => (
            <div
              key={n._id}
              className={`p-3 rounded-3 border d-flex align-items-start gap-3 ${!n.read ? 'border-primary bg-primary bg-opacity-10' : 'bg-light border-light'}`}
            >
              <div className={`badge bg-${typeColor[n.type] || 'secondary'} mt-1 p-2`}>
                {n.type === 'order' ? <FaBox /> : n.type === 'payment' ? <FaCreditCard /> : <FaBell />}
              </div>
              <div className="flex-grow-1">
                <div className="fw-bold small">{n.title}</div>
                <div className="text-muted small mt-1">{n.message}</div>
                <div className="text-muted" style={{ fontSize: '11px' }}>
                  {new Date(n.createdAt).toLocaleString('en-IN')}
                </div>
              </div>
              <div className="d-flex gap-2">
                {!n.read && (
                  <button className="btn btn-sm btn-outline-primary py-0 px-2" onClick={() => markRead(n._id)} title="Mark as read">
                    <FaCheck style={{ fontSize: 10 }} />
                  </button>
                )}
                <button className="btn btn-sm btn-outline-danger py-0 px-2" onClick={() => deleteNotif(n._id)} title="Delete">
                  <FaTimes style={{ fontSize: 10 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Profile = () => {  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showProfilePhoto, setShowProfilePhoto] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [payments, setPayments] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [coupons, setCoupons] = useState([]);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "home",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    alternatePhone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const result = await apiService.getProfile();
        if (result.success) {
          setProfileData(result.data.user);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [isAuthenticated]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;
      try {
        const result = await apiService.getUserOrders();
        if (result.success) {
          setOrders(result.data.orders || []);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [isAuthenticated]);

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated) return;
      try {
        const result = await apiService.getCart();
        if (result.success) {
          setCartItems(result.data.items || []);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, [isAuthenticated]);

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!isAuthenticated) return;
      try {
        const result = await apiService.getAddresses();
        if (result.success) {
          setAddresses(result.data.addresses || []);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, [isAuthenticated]);

  // Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isAuthenticated) return;
      try {
        const result = await apiService.getWishlist();
        if (result.success) {
          setWishlist(result.data.items || []);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    fetchWishlist();
  }, [isAuthenticated]);

  const handleEditProfile = () => {
    setEditFormData({
      name: profileData?.name || "",
      email: profileData?.email || "",
      phone: profileData?.phone || "",
      alternatePhone: profileData?.alternatePhone || "",
      gender: profileData?.gender || "",
      dateOfBirth: profileData?.dateOfBirth || "",
      address: profileData?.address || "",
      city: profileData?.city || "",
      state: profileData?.state || "",
      pincode: profileData?.pincode || ""
    });
    setEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    try {
      const result = await apiService.updateProfile(editFormData);
      if (result.success) {
        setProfileData(result.data.user);
        setEditingProfile(false);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  // Address handlers
  const handleAddAddress = () => {
    setEditingAddress(null);
    setNewAddress({
      type: "home",
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false
    });
    setShowAddressForm(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setNewAddress({
      type: address.type === "office" ? "office" : (address.type || "home"),
      fullName: address.fullName || "",
      phone: address.phone || "",
      address: address.address || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      isDefault: address.isDefault || false
    });
    setShowAddressForm(true);
  };

  const handleSaveAddress = async () => {
    try {
      if (editingAddress) {
        await apiService.updateAddress(editingAddress._id || editingAddress.id, newAddress);
      } else {
        await apiService.createAddress(newAddress);
      }
      // Refresh addresses
      const result = await apiService.getAddresses();
      if (result.success) {
        setAddresses(result.data.addresses || []);
      }
      setShowAddressForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await apiService.deleteAddress(addressId);
        setAddresses(addresses.filter(addr => (addr._id || addr.id) !== addressId));
      } catch (error) {
        console.error('Error deleting address:', error);
        alert('Failed to delete address');
      }
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    try {
      await apiService.setDefaultAddress(addressId);
      const result = await apiService.getAddresses();
      if (result.success) {
        setAddresses(result.data.addresses || []);
      }
    } catch (error) {
      console.error('Error setting default address:', error);
      alert('Failed to set default address');
    }
  };

  // Calculate stats
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === "Pending").length,
    deliveredOrders: orders.filter(o => o.status === "Delivered" || o.status === "Completed").length,
    cancelledOrders: orders.filter(o => o.status === "Cancelled").length,
    returnedOrders: orders.filter(o => o.status === "Returned").length,
    wishlistItems: wishlist.length,
    cartItems: cartItems.length,
    savedAddresses: addresses.length,
    unreadNotifications: notifications.filter(n => !n.read).length
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="container py-5 mt-5 text-center">
        <h3 className="fw-bold text-muted">Please Login First</h3>
        <p className="text-muted mb-4">You need to be logged in to view your profile.</p>
        <button className="btn btn-primary px-4" onClick={() => navigate("/emp-login")}>
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-5 mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading profile...</p>
      </div>
    );
  }

  // Use profileData from API, fallback to user from AuthContext
  const displayUser = profileData || user;

  // Sidebar menu items
  const menuItems = [
    { id: "dashboard", icon: FaHome, label: "Dashboard" },
    { id: "orders", icon: FaBox, label: "My Orders" },
    { id: "tracking", icon: FaTruck, label: "Order Tracking" },
    // { id: "cart", icon: FaShoppingCart, label: "My Cart" },
    { id: "wishlist", icon: FaHeart, label: "Wishlist" },
    { id: "addresses", icon: FaMapMarkerAlt, label: "My Addresses" },
    { id: "personal", icon: FaUser, label: "Personal Information" },
    { id: "payments", icon: FaCreditCard, label: "Payment Methods" },
    { id: "payment-history", icon: FaHistory, label: "Payment History" },
    { id: "notifications", icon: FaBell, label: "Notifications" },
    { id: "coupons", icon: FaGift, label: "Coupons & Offers" },
    { id: "reviews", icon: FaStar, label: "Reviews & Ratings" },
    { id: "returns", icon: FaUndo, label: "Return & Refund" },
    { id: "invoices", icon: FaDownload, label: "Download Invoices" },
    { id: "settings", icon: FaCog, label: "Account Settings" },
    { id: "password", icon: FaLock, label: "Change Password" },
    { id: "support", icon: FaHeadset, label: "Help & Support" },
    { id: "security", icon: FaShieldAlt, label: "Privacy & Security" },
    { id: "logout", icon: FaSignOutAlt, label: "Logout" }
  ];

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="row g-4">
        {/* LEFT SIDEBAR */}
        <div className="col-lg-3">
          <div className="card shadow-sm border-0 sticky-top" style={{ top: "20px", borderRadius: "15px" }}>
            {/* Profile Header */}
            <div className="card-body text-center p-4 bg-gradient-primary" style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "125px 15px 0 0",
              color: "white"
            }}>
              <div className="position-relative d-inline-block mb-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    fontSize: "40px",
                    fontWeight: "bold"
                  }}
                >
                  {displayUser?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <button
                  className="btn btn-sm btn-light rounded-circle position-absolute"
                  style={{ bottom: "0", right: "0" }}
                  onClick={() => setShowProfilePhoto(!showProfilePhoto)}
                >
                  <FaCamera />
                </button>
              </div>
              <h5 className="fw-bold mb-1">{displayUser?.name || "User"}</h5>
              <p className="small mb-2 opacity-75">{displayUser?.email || "user@example.com"}</p>
              <span className="badge bg-warning text-dark">
                <FaCrown className="me-1" /> {displayUser?.membershipType || "Standard Member"}
              </span>
              <div className="mt-2">
                <span className={`badge ${displayUser?.status === "Active" ? "bg-success" : "bg-danger"}`}>
                  {displayUser?.status || "Active"}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card-body p-3 bg-white">
              <div className="row g-2 text-center">
                <div className="col-4">
                  <div className="p-2 rounded bg-light">
                    <div className="fw-bold text-primary">{stats.totalOrders}</div>
                    <div className="small text-muted">Orders</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2 rounded bg-light">
                    <div className="fw-bold text-success">{stats.deliveredOrders}</div>
                    <div className="small text-muted">Delivered</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2 rounded bg-light">
                    <div className="fw-bold text-warning">{stats.wishlistItems}</div>
                    <div className="small text-muted">Wishlist</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="card-body p-2 bg-white" style={{ borderRadius: "0 0 15px 15px" }}>
              <div className="list-group list-group-flush">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className={`list-group-item list-group-item-action border-0 d-flex align-items-center ${activeSection === item.id ? "active bg-primary text-white" : ""
                      }`}
                    style={{ borderRadius: "10px", margin: "2px 0" }}
                    onClick={() => {
                      if (item.id === "logout") {
                        handleLogout();
                      } else {
                        setActiveSection(item.id);
                      }
                    }}
                  >
                    <item.icon className="me-3" />
                    <span className="flex-grow-1">{item.label}</span>
                    {item.id === "notifications" && stats.unreadNotifications > 0 && (
                      <span className="badge bg-danger rounded-pill">{stats.unreadNotifications}</span>
                    )}
                    {item.id === "cart" && stats.cartItems > 0 && (
                      <span className="badge bg-primary rounded-pill">{stats.cartItems}</span>
                    )}
                    <FaChevronRight className="ms-auto small opacity-50" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="col-lg-9">
          {/* DASHBOARD SECTION */}
          {activeSection === "dashboard" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaHome className="text-primary me-2" />
                  Welcome Back, {displayUser?.name?.split(" ")[0] || "User"}!
                </h4>

                {/* Stats Cards */}
                <div className="row g-3 mb-4">
                  <div className="col-md-3">
                    <div className="card border-0 bg-primary text-white">
                      <div className="card-body">
                        <FaBox className="fs-4 mb-2" />
                        <h3 className="fw-bold mb-0">{stats.totalOrders}</h3>
                        <small>Total Orders</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card border-0 bg-warning text-dark">
                      <div className="card-body">
                        <FaClock className="fs-4 mb-2" />
                        <h3 className="fw-bold mb-0">{stats.pendingOrders}</h3>
                        <small>Pending Orders</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card border-0 bg-success text-white">
                      <div className="card-body">
                        <FaCheckCircle className="fs-4 mb-2" />
                        <h3 className="fw-bold mb-0">{stats.deliveredOrders}</h3>
                        <small>Delivered</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card border-0 bg-danger text-white">
                      <div className="card-body">
                        <FaBan className="fs-4 mb-2" />
                        <h3 className="fw-bold mb-0">{stats.cancelledOrders}</h3>
                        <small>Cancelled</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-3">
                    <div className="card border-0 bg-info text-white">
                      <div className="card-body">
                        <FaHeart className="fs-4 mb-2" />
                        <h3 className="fw-bold mb-0">{stats.wishlistItems}</h3>
                        <small>Wishlist Items</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card border-0 bg-secondary text-white">
                      <div className="card-body">
                        <FaShoppingCart className="fs-4 mb-2" />
                        <h3 className="fw-bold mb-0">{stats.cartItems}</h3>
                        <small>Cart Items</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card border-0 bg-dark text-white">
                      <div className="card-body">
                        <FaMapMarkerAlt className="fs-4 mb-2" />
                        <h3 className="fw-bold mb-0">{stats.savedAddresses}</h3>
                        <small>Saved Addresses</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card border-0 bg-purple text-white" style={{ background: "#6f42c1" }}>
                      <div className="card-body">
                        <FaCreditCard className="fs-4 mb-2" />
                        <h3 className="fw-bold mb-0">₹0</h3>
                        <small>Wallet Balance</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Notifications */}
                <div className="card mb-4">
                  <div className="card-header bg-white">
                    <h6 className="fw-bold mb-0">
                      <FaBell className="text-warning me-2" />
                      Recent Notifications
                    </h6>
                  </div>
                  <div className="card-body">
                    {notifications.slice(0, 5).length === 0 ? (
                      <p className="text-muted text-center py-3">No recent notifications</p>
                    ) : (
                      notifications.slice(0, 5).map(n => (
                        <div key={n.id} className={`p-2 mb-2 rounded small ${!n.read ? 'bg-warning bg-opacity-10 border-start border-warning border-4' : 'bg-light'}`}>
                          <div className="fw-bold">{n.title}</div>
                          <div className="text-muted small">{n.message}</div>
                          <div className="text-muted small">{n.timestamp ? new Date(n.timestamp).toLocaleString() : ""}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="card">
                  <div className="card-header bg-white">
                    <h6 className="fw-bold mb-0">
                      <FaBox className="text-primary me-2" />
                      Recent Orders
                    </h6>
                  </div>
                  <div className="card-body">
                    {orders.slice(0, 3).length === 0 ? (
                      <p className="text-muted text-center py-3">No recent orders</p>
                    ) : (
                      orders.slice(0, 3).map(order => (
                        <div key={order.orderId || order._id} className="border rounded p-3 mb-2 bg-white shadow-sm">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <span className="badge bg-primary me-2">#{order.orderId || order._id}</span>
                              <span className={`badge ${order.status === 'Delivered' || order.status === 'Completed' ? 'bg-success' : 'bg-info'}`}>{order.status}</span>
                            </div>
                            <div className="text-success fw-bold">₹{order.grandTotal || order.totalAmount}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MY ORDERS SECTION */}
          {activeSection === "orders" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaBox className="text-primary me-2" />
                  My Orders
                </h4>
                {orders.length === 0 ? (
                  <div className="text-center py-5">
                    <FaBox className="text-muted" style={{ fontSize: "60px" }} />
                    <h5 className="mt-3 text-muted">No Orders Yet</h5>
                    <p className="text-muted">Start shopping to see your orders here</p>
                    <button className="btn btn-primary" onClick={() => navigate("/products")}>
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Payment</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.orderId || order._id}>
                            <td><small>#{order.orderId || order._id}</small></td>
                            <td><small>{new Date(order.createdAt || order.orderDate).toLocaleDateString()}</small></td>
                            <td><small>{order.items?.length || 0} items</small></td>
                            <td><small className="fw-bold">₹{order.grandTotal || order.totalAmount}</small></td>
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
                                <button className="btn btn-outline-primary" onClick={() => setSelectedOrder(order)} title="View Details">
                                  <FaEye />
                                </button>
                                <button className="btn btn-outline-info" onClick={() => setSelectedOrder(order)} title="Track Order">
                                  <FaTruck />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ORDER TRACKING SECTION */}
          {activeSection === "tracking" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaTruck className="text-primary me-2" />
                  Order Tracking
                </h4>

                {!showTracking ? (
                  /* ── Orders list ── */
                  orders.filter(o => o.status !== "Cancelled" && o.status !== "Returned").length === 0 ? (
                    <div className="text-center py-5">
                      <FaTruck className="text-muted" style={{ fontSize: 50 }} />
                      <h6 className="mt-3 text-muted">No active orders to track</h6>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Order ID</th>
                            <th>Status</th>
                            <th>Tracking No.</th>
                            <th>Est. Delivery</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.filter(o => o.status !== "Cancelled" && o.status !== "Returned").map(order => (
                            <tr key={order.orderId || order._id}>
                              <td><small className="fw-bold text-primary">#{order.orderId || order._id}</small></td>
                              <td>
                                <span className={`badge ${
                                  order.status === 'Delivered' || order.status === 'Completed' ? 'bg-success' :
                                  order.status === 'Shipped' || order.status === 'Out For Delivery' ? 'bg-warning text-dark' :
                                  'bg-info'
                                }`}>{order.status}</span>
                              </td>
                              <td><small>{order.trackingNumber || "N/A"}</small></td>
                              <td><small>{order.tracking?.estimatedDelivery || "N/A"}</small></td>
                              <td>
                                <button
                                  className="btn btn-sm btn-primary d-flex align-items-center gap-1"
                                  onClick={() => { setSelectedOrder(order); setShowTracking(true); }}
                                >
                                  <FaMapMarkerAlt /> Track
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                ) : selectedOrder && (
                  /* ── Detail + Map view ── */
                  <div>
                    <button className="btn btn-outline-secondary mb-4" onClick={() => { setShowTracking(false); setSelectedOrder(null); }}>
                      <FaChevronLeft className="me-2" /> Back to Orders
                    </button>

                    {/* Order info bar */}
                    <div className="row g-3 mb-4">
                      {[
                        { label: 'Order ID',         value: `#${selectedOrder.orderId}` },
                        { label: 'Tracking Number',  value: selectedOrder.trackingNumber || 'N/A' },
                        { label: 'Current Location', value: selectedOrder.tracking?.currentLocation || 'Processing Center' },
                        { label: 'Est. Delivery',    value: selectedOrder.tracking?.estimatedDelivery || 'N/A' },
                        { label: 'Current Status',   value: selectedOrder.status },
                        { label: 'Payment',          value: selectedOrder.paymentStatus },
                      ].map(({ label, value }) => (
                        <div key={label} className="col-md-4">
                          <div className="bg-light rounded-3 p-3">
                            <div className="small text-muted mb-1">{label}</div>
                            <div className="fw-bold">{value}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Live Map — OpenStreetMap iframe, no API key required */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">
                        <FaMapMarkerAlt className="text-danger me-2" />
                        Live Delivery Map
                        <span className="ms-2 badge bg-success" style={{ fontSize: '11px', animation: 'pulse 1.5s infinite' }}>● LIVE</span>
                      </h6>
                      <div className="rounded-3 overflow-hidden border shadow-sm" style={{ height: '380px', position: 'relative' }}>
                        {/* OpenStreetMap via iframe — shows delivery city area */}
                        <iframe
                          title="Live Tracking Map"
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          scrolling="no"
                          style={{ border: 0 }}
                          src={`https://www.openstreetmap.org/export/embed.html?bbox=80.8%2C26.7%2C81.1%2C26.95&layer=mapnik&marker=26.85%2C80.95`}
                          allowFullScreen
                        />
                        {/* Status overlay badge on the map */}
                        <div style={{
                          position: 'absolute', top: 12, left: 12,
                          background: 'rgba(255,255,255,0.95)',
                          borderRadius: 10, padding: '8px 14px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                          zIndex: 1000
                        }}>
                          <div className="d-flex align-items-center gap-2">
                            <FaTruck className="text-primary" />
                            <div>
                              <div className="fw-bold" style={{ fontSize: 13 }}>{selectedOrder.tracking?.currentLocation || 'Processing Center'}</div>
                              <div className="text-muted" style={{ fontSize: 11 }}>
                                Est. Delivery: {selectedOrder.tracking?.estimatedDelivery || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Full screen link */}
                        <a
                          href={`https://www.openstreetmap.org/?mlat=26.85&mlon=80.95#map=12/26.85/80.95`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            position: 'absolute', bottom: 12, right: 12,
                            background: 'rgba(255,255,255,0.9)',
                            borderRadius: 8, padding: '5px 10px',
                            fontSize: 11, color: '#333', textDecoration: 'none',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                            zIndex: 1000
                          }}
                        >
                          ⛶ Open Full Map
                        </a>
                      </div>
                    </div>

                    {/* Progress stepper */}
                    {(() => {
                      const steps = ['Pending','Confirmed','Packed','Shipped','Out For Delivery','Delivered'];
                      const currentIdx = steps.indexOf(selectedOrder.status);
                      return (
                        <div className="mb-4">
                          <h6 className="fw-bold mb-3">Delivery Progress</h6>
                          <div className="d-flex align-items-center">
                            {steps.map((step, i) => (
                              <React.Fragment key={step}>
                                <div className="text-center" style={{ flex: 1 }}>
                                  <div className={`rounded-circle mx-auto d-flex align-items-center justify-content-center fw-bold
                                    ${i < currentIdx ? 'bg-success text-white' : i === currentIdx ? 'bg-primary text-white' : 'bg-light text-muted border'}`}
                                    style={{ width: 36, height: 36, fontSize: 13 }}>
                                    {i < currentIdx ? <FaCheck /> : i + 1}
                                  </div>
                                  <div className={`mt-1 ${i === currentIdx ? 'fw-bold text-primary' : 'text-muted'}`}
                                    style={{ fontSize: 10 }}>
                                    {step}
                                  </div>
                                </div>
                                {i < steps.length - 1 && (
                                  <div style={{ flex: 1, height: 3, background: i < currentIdx ? '#198754' : '#dee2e6', marginBottom: 18 }} />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Timeline */}
                    {selectedOrder.timeline?.length > 0 && (
                      <div>
                        <h6 className="fw-bold mb-3">Order Timeline</h6>
                        <div className="d-flex flex-column gap-2">
                          {selectedOrder.timeline.map((event, index) => (
                            <div key={index} className="d-flex gap-3 align-items-start">
                              <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center flex-shrink-0"
                                style={{ width: 36, height: 36 }}>
                                <FaCheck className="text-white" style={{ fontSize: 12 }} />
                              </div>
                              <div className="bg-light rounded-3 p-3 flex-grow-1">
                                <div className="fw-bold small">{event.status}</div>
                                <div className="text-muted" style={{ fontSize: 12 }}>{event.date}</div>
                                {event.remarks && <div className="text-muted small mt-1">{event.remarks}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <style>{`
                      @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.4; }
                      }
                    `}</style>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MY CART SECTION */}
          {activeSection === "cart" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaShoppingCart className="text-primary me-2" />
                  My Cart
                </h4>
                {cartItems.length === 0 ? (
                  <div className="text-center py-5">
                    <FaShoppingCart className="text-muted" style={{ fontSize: "60px" }} />
                    <h5 className="mt-3 text-muted">Your Cart is Empty</h5>
                    <p className="text-muted">Add items to your cart to see them here</p>
                    <button className="btn btn-primary" onClick={() => navigate("/products")}>
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive mb-4">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map(item => (
                            <tr key={item._id || item.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  {item.image && (
                                    <img src={item.image} alt={item.title} className="rounded me-2" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                                  )}
                                  <div>
                                    <div className="fw-bold small">{item.title}</div>
                                    <small className="text-muted">{item.sku || ""}</small>
                                  </div>
                                </div>
                              </td>
                              <td><small>₹{item.discountPrice || item.price}</small></td>
                              <td>
                                <span className="btn btn-light">{item.quantity}</span>
                              </td>
                              <td><small className="fw-bold">₹{(item.discountPrice || item.price) * item.quantity}</small></td>
                              <td>
                                <button className="btn btn-sm btn-outline-danger" onClick={async () => {
                                  try {
                                    await apiService.removeFromCart(item._id || item.id);
                                    const result = await apiService.getCart();
                                    if (result.success) setCartItems(result.data.items || []);
                                  } catch (error) {
                                    console.error('Error removing from cart:', error);
                                  }
                                }}>
                                  <FaTrash />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <button className="btn btn-outline-warning w-100" onClick={async () => {
                          try {
                            await apiService.clearCart();
                            setCartItems([]);
                          } catch (error) {
                            console.error('Error clearing cart:', error);
                          }
                        }}>
                          <FaTrash className="me-2" /> Clear Cart
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button className="btn btn-primary w-100" onClick={() => navigate("/checkout")}>
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* WISHLIST SECTION */}
          {activeSection === "wishlist" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaHeart className="text-danger me-2" />
                  My Wishlist
                </h4>
                {wishlist.length === 0 ? (
                  <div className="text-center py-5">
                    <FaHeart className="text-muted" style={{ fontSize: "60px" }} />
                    <h5 className="mt-3 text-muted">Your Wishlist is Empty</h5>
                    <p className="text-muted">Save items you love to see them here</p>
                    <button className="btn btn-primary" onClick={() => navigate("/products")}>
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <div className="row g-3">
                    {wishlist.map(item => (
                      <div key={item._id || item.id} className="col-md-3">
                        <div className="card border-0 shadow-sm">
                          {item.image && (
                            <img src={item.image} alt={item.title} className="card-img-top" style={{ height: "150px", objectFit: "cover" }} />
                          )}
                          <div className="card-body">
                            <h6 className="fw-bold small mb-1">{item.title}</h6>
                            <p className="text-success fw-bold mb-2">₹{item.discountPrice || item.price}</p>
                            <button className="btn btn-sm btn-outline-danger w-100" onClick={async () => {
                              try {
                                await apiService.removeFromWishlist(item._id || item.id);
                                const result = await apiService.getWishlist();
                                if (result.success) setWishlist(result.data.items || []);
                              } catch (error) {
                                console.error('Error removing from wishlist:', error);
                              }
                            }}>
                              <FaTrash className="me-1" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ADDRESSES SECTION */}
          {activeSection === "addresses" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0">
                    <FaMapMarkerAlt className="text-primary me-2" />
                    My Addresses
                  </h4>
                  <button className="btn btn-primary" onClick={handleAddAddress}>
                    <FaPlus className="me-2" />
                    Add Address
                  </button>
                </div>

                {showAddressForm && (
                  <div className="card bg-light mb-4">
                    <div className="card-body">
                      <h6 className="fw-bold mb-3">{editingAddress ? "Edit Address" : "Add New Address"}</h6>
                      <form onSubmit={(e) => { e.preventDefault(); handleSaveAddress(); }}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={newAddress.fullName}
                              onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input
                              type="tel"
                              className="form-control"
                              value={newAddress.phone}
                              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Address Type</label>
                            <select
                              className="form-select"
                              value={newAddress.type}
                              onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                            >
                              <option value="home">Home</option>
                              <option value="office">Office</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="col-12">
                            <label className="form-label">Address</label>
                            <textarea
                              className="form-control"
                              rows="2"
                              value={newAddress.address}
                              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                              required
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">City</label>
                            <input
                              type="text"
                              className="form-control"
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                              required
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">State</label>
                            <input
                              type="text"
                              className="form-control"
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                              required
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">Pincode</label>
                            <input
                              type="text"
                              className="form-control"
                              value={newAddress.pincode}
                              onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                              required
                            />
                          </div>
                          <div className="col-12">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="defaultAddress"
                                checked={newAddress.isDefault}
                                onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                              />
                              <label className="form-check-label" htmlFor="defaultAddress">
                                Set as default address
                              </label>
                            </div>
                          </div>
                          <div className="col-12">
                            <button type="submit" className="btn btn-success me-2">
                              {editingAddress ? "Update Address" : "Save Address"}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowAddressForm(false)}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {addresses.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted">No addresses saved yet.</p>
                  </div>
                ) : (
                  <div className="row g-3">
                    {addresses.map((address) => (
                      <div key={address._id || address.id} className="col-md-6">
                        <div className={`card ${address.isDefault ? 'border-primary' : ''}`}>
                          <div className="card-body">
                            {address.isDefault && (
                              <span className="badge bg-primary position-absolute top-0 end-0 m-2">Default</span>
                            )}
                            <h6 className="fw-bold mb-2">
                              <span className="text-capitalize">{address.type}</span>
                            </h6>
                            <p className="mb-1"><strong>{address.fullName}</strong></p>
                            <p className="mb-1">{address.phone}</p>
                            <p className="mb-1">{address.address}</p>
                            <p className="mb-1">{address.city}, {address.state} - {address.pincode}</p>
                            <div className="mt-3">
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEditAddress(address)}
                              >
                                <FaEdit className="me-1" /> Edit
                              </button>
                              {!address.isDefault && (
                                <button
                                  className="btn btn-sm btn-outline-success me-2"
                                  onClick={() => handleSetDefaultAddress(address._id || address.id)}
                                >
                                  Set Default
                                </button>
                              )}
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteAddress(address._id || address.id)}
                              >
                                <FaTrash className="me-1" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PERSONAL INFORMATION SECTION */}
          {activeSection === "personal" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaUser className="text-primary me-2" />
                  Personal Information
                </h4>

                {(() => {
                  const defaultAddr = addresses.find(a => a.isDefault) || addresses[0] || {};

                  // Helper: show a field only if it has real data
                  const Field = ({ label, value }) => {
                    if (!value || value === "N/A") return null;
                    return (
                      <div className="col-md-6 mb-3">
                        <div className="small text-muted mb-1">{label}</div>
                        <div className="fw-bold text-dark">{value}</div>
                      </div>
                    );
                  };

                  const name        = displayUser?.name            || defaultAddr.fullName || "";
                  const email       = displayUser?.email           || "";
                  const phone       = displayUser?.phone           || defaultAddr.phone    || "";
                  const altPhone    = displayUser?.alternatePhone  || "";
                  const gender      = displayUser?.gender          || "";
                  const dob         = displayUser?.dateOfBirth
                                        ? new Date(displayUser.dateOfBirth).toLocaleDateString()
                                        : "";
                  const city        = displayUser?.city            || defaultAddr.city     || "";
                  const state       = displayUser?.state           || defaultAddr.state    || "";
                  const pincode     = displayUser?.pincode         || defaultAddr.pincode  || "";
                  const address     = displayUser?.address         || defaultAddr.address  || "";
                  const addrType    = defaultAddr.type             || "";
                  const regDate     = displayUser?.registrationDate
                                        ? new Date(displayUser.registrationDate).toLocaleDateString()
                                        : "";

                  return (
                    <div className="row">
                      <Field label="Full Name"          value={name} />
                      <Field label="Email"              value={email} />
                      <Field label="Phone"              value={phone} />
                      <Field label="Alternate Phone"    value={altPhone} />
                      <Field label="Gender"             value={gender} />
                      <Field label="Date of Birth"      value={dob} />
                      <Field label="City"               value={city} />
                      <Field label="State"              value={state} />
                      <Field label="Pincode"            value={pincode} />
                      <Field label="Address Type"       value={addrType} />
                      <Field label="Registration Date"  value={regDate} />
                      {address && (
                        <div className="col-12 mb-3">
                          <div className="small text-muted mb-1">Address</div>
                          <div className="fw-bold text-dark">{address}</div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* PAYMENTS SECTION */}
          {activeSection === "payments" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaCreditCard className="text-primary me-2" />
                  Payment Methods
                </h4>
                <p className="text-muted">Payment methods management coming soon...</p>
              </div>
            </div>
          )}

          {/* PAYMENT HISTORY SECTION */}
          {activeSection === "payment-history" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaHistory className="text-primary me-2" />
                  Payment History
                </h4>
                <PaymentHistory />
              </div>
            </div>
          )}

          {/* NOTIFICATIONS SECTION */}
          {activeSection === "notifications" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaBell className="text-primary me-2" />
                  Notifications
                </h4>
                <NotificationsPanel />
              </div>
            </div>
          )}

          {/* COUPONS SECTION */}
          {activeSection === "coupons" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaGift className="text-primary me-2" />
                  Coupons & Offers
                </h4>
                <CouponsPanel />
              </div>
            </div>
          )}

          {/* REVIEWS SECTION */}
          {activeSection === "reviews" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaStar className="text-primary me-2" />
                  Reviews & Ratings
                </h4>
                <p className="text-muted">Reviews coming soon...</p>
              </div>
            </div>
          )}

          {/* RETURNS SECTION */}
          {activeSection === "returns" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaUndo className="text-primary me-2" />
                  Return & Refund
                </h4>
                <ReturnsPanel orders={orders} />
              </div>
            </div>
          )}

          {/* INVOICES SECTION */}
          {activeSection === "invoices" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaDownload className="text-primary me-2" />
                  Download Invoices
                </h4>
                <p className="text-muted">Invoices coming soon...</p>
              </div>
            </div>
          )}

          {/* SETTINGS SECTION */}
          {activeSection === "settings" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaCog className="text-primary me-2" />
                  Account Settings
                </h4>
                <p className="text-muted">Settings coming soon...</p>
              </div>
            </div>
          )}

          {/* PASSWORD SECTION */}
          {activeSection === "password" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaLock className="text-primary me-2" />
                  Change Password
                </h4>
                <p className="text-muted">Password change coming soon...</p>
              </div>
            </div>
          )}

          {/* SUPPORT SECTION */}
          {activeSection === "support" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaHeadset className="text-primary me-2" />
                  Help & Support
                </h4>
                <p className="text-muted">Support coming soon...</p>
              </div>
            </div>
          )}

          {/* SECURITY SECTION */}
          {activeSection === "security" && (
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  <FaShieldAlt className="text-primary me-2" />
                  Privacy & Security
                </h4>
                <p className="text-muted">Security settings coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
