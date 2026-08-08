import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaCopy, FaCheck } from "react-icons/fa";

const BASE_URL = "https://vanisystemsb-1.onrender.com/api";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
});

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [copied, setCopied] = useState("");
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discount: "",
    minPurchase: "",
    maxDiscount: "",
    validFrom: new Date().toISOString().split("T")[0],
    validTo: "",
    usageLimit: "",
    status: "active",
    description: ""
  });

  // ── Fetch all coupons from API ──────────────────────────────────────────────
  const fetchCoupons = async () => {
    if (!localStorage.getItem('token')) { setLoading(false); return; }
    try {
      const res = await fetch(`${BASE_URL}/coupons`, { headers: getHeaders() });
      const data = await res.json();
      if (data.success) setCoupons(data.data.coupons || []);
    } catch (e) {
      console.error("Fetch coupons error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCoupons(); }, []);

  // ── Submit: create or update ────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        discount: Number(formData.discount),
        minPurchase: formData.minPurchase ? Number(formData.minPurchase) : 0,
        maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null
      };

      const url = editingCoupon
        ? `${BASE_URL}/coupons/${editingCoupon._id}`
        : `${BASE_URL}/coupons`;
      const method = editingCoupon ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        await fetchCoupons();
        resetForm();
      } else {
        alert(data.errors?.[0]?.msg || data.error || "Failed to save coupon");
      }
    } catch (e) {
      alert("Error saving coupon");
    }
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      await fetch(`${BASE_URL}/coupons/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      setCoupons(prev => prev.filter(c => c._id !== id));
    } catch (e) {
      alert("Error deleting coupon");
    }
  };

  // ── Edit ────────────────────────────────────────────────────────────────────
  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discountType: coupon.discountType,
      discount: coupon.discount,
      minPurchase: coupon.minPurchase || "",
      maxDiscount: coupon.maxDiscount || "",
      validFrom: coupon.validFrom?.split("T")[0] || new Date().toISOString().split("T")[0],
      validTo: coupon.validTo?.split("T")[0] || "",
      usageLimit: coupon.usageLimit || "",
      status: coupon.status,
      description: coupon.description || ""
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingCoupon(null);
    setShowForm(false);
    setFormData({
      code: "", discountType: "percentage", discount: "",
      minPurchase: "", maxDiscount: "",
      validFrom: new Date().toISOString().split("T")[0],
      validTo: "", usageLimit: "", status: "active", description: ""
    });
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(""), 2000);
  };

  const isExpired = (validTo) => new Date(validTo) < new Date();

  const active = coupons.filter(c => c.status === "active" && !isExpired(c.validTo)).length;
  const expired = coupons.filter(c => c.status === "expired" || isExpired(c.validTo)).length;

  if (loading) return <div className="text-center py-4"><div className="spinner-border spinner-border-sm text-primary" /></div>;

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Coupon Management</h5>
          <button className="btn btn-primary" onClick={() => showForm ? resetForm() : setShowForm(true)}>
            <FaPlus className="me-2" />
            {showForm ? "Cancel" : "Add Coupon"}
          </button>
        </div>

        {/* Stats */}
        <div className="row g-3 mb-4">
          {[
            { label: "Total Coupons", value: coupons.length, color: "primary" },
            { label: "Active", value: active, color: "success" },
            { label: "Expired", value: expired, color: "danger" }
          ].map(s => (
            <div key={s.label} className="col-md-4">
              <div className={`card bg-${s.color} text-white`}>
                <div className="card-body p-3">
                  <h6 className="mb-0">{s.label}</h6>
                  <h3 className="fw-bold mb-0">{s.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        {showForm && (
          <div className="card bg-light mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">{editingCoupon ? "Edit Coupon" : "Add New Coupon"}</h6>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Coupon Code *</label>
                    <input className="form-control" value={formData.code}
                      onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      required placeholder="e.g. SAVE20" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Discount Type</label>
                    <select className="form-select" value={formData.discountType}
                      onChange={e => setFormData({ ...formData, discountType: e.target.value })}>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">
                      {formData.discountType === "percentage" ? "Discount %" : "Discount ₹"} *
                    </label>
                    <input type="number" className="form-control" value={formData.discount}
                      onChange={e => setFormData({ ...formData, discount: e.target.value })} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Min Purchase (₹)</label>
                    <input type="number" className="form-control" value={formData.minPurchase}
                      onChange={e => setFormData({ ...formData, minPurchase: e.target.value })} placeholder="0" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Max Discount (₹)</label>
                    <input type="number" className="form-control" value={formData.maxDiscount}
                      onChange={e => setFormData({ ...formData, maxDiscount: e.target.value })} placeholder="No limit" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Valid From *</label>
                    <input type="date" className="form-control" value={formData.validFrom}
                      onChange={e => setFormData({ ...formData, validFrom: e.target.value })} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Valid To *</label>
                    <input type="date" className="form-control" value={formData.validTo}
                      onChange={e => setFormData({ ...formData, validTo: e.target.value })} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Usage Limit</label>
                    <input type="number" className="form-control" value={formData.usageLimit}
                      onChange={e => setFormData({ ...formData, usageLimit: e.target.value })} placeholder="Unlimited" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Description</label>
                    <input className="form-control" value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Optional" />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-success me-2">
                      {editingCoupon ? "Update Coupon" : "Create Coupon"}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Min Order</th>
                <th>Valid Till</th>
                <th>Usage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-4 text-muted">No coupons found. Create one above.</td></tr>
              ) : coupons.map(coupon => (
                <tr key={coupon._id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-bold text-primary font-monospace">{coupon.code}</span>
                      <button className="btn btn-sm btn-outline-secondary p-1" style={{ lineHeight: 1 }}
                        onClick={() => copyCode(coupon.code)} title="Copy">
                        {copied === coupon.code ? <FaCheck style={{ color: "green" }} /> : <FaCopy />}
                      </button>
                    </div>
                    {coupon.description && <div className="text-muted small">{coupon.description}</div>}
                  </td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {coupon.discountType === "percentage" ? `${coupon.discount}%` : `₹${coupon.discount}`}
                    </span>
                  </td>
                  <td><small>₹{coupon.minPurchase || 0}</small></td>
                  <td>
                    <small className={isExpired(coupon.validTo) ? "text-danger" : "text-success"}>
                      {new Date(coupon.validTo).toLocaleDateString("en-IN")}
                    </small>
                  </td>
                  <td><small>{coupon.usedCount} / {coupon.usageLimit || "∞"}</small></td>
                  <td>
                    {isExpired(coupon.validTo)
                      ? <span className="badge bg-danger">Expired</span>
                      : coupon.status === "active"
                        ? <span className="badge bg-success">Active</span>
                        : <span className="badge bg-secondary">Inactive</span>}
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-outline-primary" onClick={() => handleEdit(coupon)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="btn btn-outline-danger" onClick={() => handleDelete(coupon._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CouponManagement;
