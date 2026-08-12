import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaTruck, FaCheckCircle, FaArrowLeft, FaBoxOpen } from "react-icons/fa";

// ============================================================================
// PART 1: SERVICE ROUTING CONSTANTS & INITIAL STATE BLUEPRINT
// ============================================================================
// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL='https://api-rishabh.vanisystems.in/api'

class APIService {
  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  async handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
      console.error('API Error Response Matrix:', data);
      throw new Error(data.error || data.message || 'API request failed');
    }
    return data;
  }

  async getCart() {
    const response = await fetch(`${BASE_URL}/cart`, { method: 'GET', headers: this.getHeaders() });
    return this.handleResponse(response);
  }

  async createOrder(orderData) {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(orderData)
    });
    return this.handleResponse(response);
  }

  async createPayment(paymentData) {
    const response = await fetch(`${BASE_URL}/payments`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(paymentData)
    });
    return this.handleResponse(response);
  }

  async clearCart() {
    const response = await fetch(`${BASE_URL}/cart/clear`, { method: 'DELETE', headers: this.getHeaders() });
    return this.handleResponse(response);
  }
}

const api = new APIService();

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [billingSummary, setBillingSummary] = useState({ totalItems: 0, subtotal: 0, totalGST: 0, totalShipping: 0, grandTotal: 0 });
  
  const [formData, setFormData] = useState({ 
    fullName: "", 
    email: "", 
    phone: "", 
    address: "", 
    city: "", 
    pinCode: "", 
    paymentMethod: "cod" 
  });
  // ============================================================================
  // PART 2: DYNAMIC SYNC HOOKS & ACCURATE MONGOOSE VALIDATED TRANSACTIONS
  // ============================================================================
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const result = await api.getCart();
        const rawData = result.data?.cart || result.data || {};
        const itemsList = rawData.items || [];
        setCartItems(itemsList);

        // Use server-calculated totals directly
        if (itemsList.length > 0) {
          setBillingSummary({
            totalItems:   rawData.totalItems   || itemsList.reduce((s, i) => s + (i.quantity || 1), 0),
            subtotal:     rawData.subtotal      || 0,
            totalGST:     rawData.totalGST      || 0,
            totalShipping: rawData.totalShipping || 0,
            grandTotal:   rawData.grandTotal    || 0
          });
        }
      } catch (err) { 
        console.error("Cart loading failed:", err); 
      } finally { 
        setInitialLoading(false); 
      }
    };
    fetchCartData();
  }, []);

  const handleInputChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.pinCode) {
      alert("Please fill all required fields.");
      setLoading(false); 
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const cleanEmail = formData.email.trim();

      // 🛠️ फ़िक्स: आपके Order स्कीमा के 'items' एरे स्ट्रक्चर के अनुसार मैपिंग (id)
      const mappedItems = cartItems.map(item => {
        const prod = item.product || item || {};
        return {
          id: item.productId || prod.productId || prod._id || prod.id, // स्कीमा मांगता है 'id'
          title: prod.title || "Premium Plan",
          image: prod.image || prod.imageUrl || "",
          price: item.price || prod.price || prod.discountPrice || 0,
          discountPrice: prod.discountPrice || 0,
          quantity: item.quantity || 1,
          gst: Math.round((item.price || prod.price || 0) * 0.18),
          shippingCharge: 50
        };
      });

      // 🛠️ फ़िक्स: आपके Enum स्कीमा के अनुसार केवल स्वीकृत पेमेंट मेथड स्ट्रिंग्स ही भेजी जाएंगी
      const targetMethod = formData.paymentMethod === "cod" ? "Cash On Delivery" : "UPI";

      // 1. CREATE ORDER SUBMISSION
      const orderPayload = {
        customerName: formData.fullName,
        customerEmail: cleanEmail,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        customerCity: formData.city,
        customerPinCode: formData.pinCode,
        items: mappedItems,
        totalItems: billingSummary.totalItems,
        subtotal: billingSummary.subtotal,
        shippingCharge: billingSummary.totalShipping,
        tax: billingSummary.totalGST,
        grandTotal: billingSummary.grandTotal,
        paymentMethod: targetMethod, // 'Cash On Delivery' या 'UPI'
        paymentStatus: formData.paymentMethod === "cod" ? "Pending" : "Paid"
      };

      const orderResult = await api.createOrder(orderPayload);
      const orderNode = orderResult.data || orderResult.data?.order || orderResult || {};
      const generatedOrderId = orderNode.orderId || orderResult.orderId || `ORD-${Date.now()}`;
      const generatedInvoice = orderNode.invoiceNumber || orderResult.invoiceNumber || `INV-${Date.now()}`;

      // 2. CREATE PAYMENT SUBMISSION (🛠️ फ़िक्स: आपके Payment स्कीमा के सभी 9 अनिवार्य फ़ील्ड्स पूरे हैं)
      const paymentPayload = {
        transactionId: `TXN${Date.now()}`,
        orderId: generatedOrderId, 
        invoiceNumber: generatedInvoice, 
        amount: billingSummary.grandTotal,
        paymentMethod: targetMethod, // 'Cash On Delivery' या 'UPI'
        paymentStatus: formData.paymentMethod === "cod" ? "Pending" : "Paid",
        customerName: formData.fullName,      
        customerEmail: cleanEmail,             
        customerPhone: formData.phone
      };

      try {
        await api.createPayment(paymentPayload);
      } catch (payErr) {
        console.warn("Payment entry warning:", payErr);
      }

      // 3. CART CLEAR PIPELINE
      try {
        await api.clearCart();
      } catch (cartErr) {
        console.warn("Cart empty route skipped:", cartErr);
      }

      navigate("/success", { state: { orderId: generatedOrderId } });
    } catch (err) {
      alert(`API Server Validation Fault: ${err.message}`);
    } finally { 
      setLoading(false); 
    }
  };
  // ============================================================================
  // PART 3: BOOTSTRAP MODERN RENDERING MODULES & VALID SLOTS CLOSURES
  // ============================================================================
  if (initialLoading) {
    return <div className="text-center py-5 my-5"><div className="spinner-border text-primary"></div></div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <FaBoxOpen className="fs-1 mb-3 text-muted" />
        <h3>Your Cart is Empty</h3>
        <button className="btn btn-primary px-4 mt-2" onClick={() => navigate("/products")}>Browse Products</button>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="row">
        <div className="col-12 mb-4">
          <button className="btn btn-outline-secondary" onClick={() => navigate("/cart")}><FaArrowLeft className="me-2" /> Back to Cart</button>
        </div>

        {/* Input Form Column */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "12px", overflow: "hidden" }}>
            <div className="card-header bg-dark p-4"><h4 className="mb-0 text-warning fw-bold">Checkout Details</h4></div>
            <div className="card-body p-4">
              <form onSubmit={handlePlaceOrder}>
                <h5 className="fw-bold mb-3 text-dark">Personal Information</h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-6"><label className="form-label fw-semibold small text-muted">Full Name *</label><input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleInputChange} required /></div>
                  <div className="col-md-6"><label className="form-label fw-semibold small text-muted">Email Address *</label><input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required /></div>
                  <div className="col-md-6"><label className="form-label fw-semibold small text-muted">Phone Number *</label><input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} required /></div>
                </div>

                <h5 className="fw-bold mb-3 text-dark">Shipping Address</h5>
                <div className="row g-3 mb-4">
                  <div className="col-12"><label className="form-label fw-semibold small text-muted">Full Address *</label><textarea className="form-control" name="address" value={formData.address} onChange={handleInputChange} rows="3" required></textarea></div>
                  <div className="col-md-6"><label className="form-label fw-semibold small text-muted">City *</label><input type="text" className="form-control" name="city" value={formData.city} onChange={handleInputChange} required /></div>
                  <div className="col-md-6"><label className="form-label fw-semibold small text-muted">PIN Code *</label><input type="text" className="form-control" name="pinCode" value={formData.pinCode} onChange={handleInputChange} required /></div>
                </div>

                <h5 className="fw-bold mb-3 text-dark">Payment Method</h5>
                <div className="card bg-light border-0 p-3 mb-4">
                  <div className="form-check mb-2"><input className="form-check-input" type="radio" name="paymentMethod" id="cod" value="cod" checked={formData.paymentMethod === "cod"} onChange={handleInputChange} /><label className="form-check-label ms-2" htmlFor="cod"><strong>Cash On Delivery (COD)</strong></label></div>
                  <div className="form-check"><input className="form-check-input" type="radio" name="paymentMethod" id="online" value="online" checked={formData.paymentMethod === "online"} onChange={handleInputChange} /><label className="form-check-label ms-2" htmlFor="online"><strong>Online Payment Gateway (UPI)</strong></label></div>
                </div>

                <button type="submit" className="btn btn-success w-100 py-3 fw-bold" disabled={loading}>
                  {loading ? "Processing Transaction..." : "Place Order & Confirm"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Sticky Summary Card Column */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ borderRadius: "12px", top: "20px" }}>
            <div className="card-header bg-primary text-white p-4"><h5 className="mb-0 fw-bold">Order Summary</h5></div>
            <div className="card-body p-4 bg-white">
              <div className="d-flex justify-content-between mb-2 small text-muted"><span>Total Items:</span><strong>{billingSummary.totalItems}</strong></div>
              <div className="d-flex justify-content-between mb-2 small text-muted"><span>Subtotal:</span><span>₹{billingSummary.subtotal?.toFixed(2)}</span></div>
              <div className="d-flex justify-content-between mb-2 small text-muted"><span>GST:</span><span>₹{billingSummary.totalGST?.toFixed(2)}</span></div>
              <div className="d-flex justify-content-between mb-2 small text-muted"><span>Shipping:</span><span>₹{billingSummary.totalShipping?.toFixed(2)}</span></div>
              <hr /><div className="d-flex justify-content-between mb-4"><span className="fw-bold fs-5 text-dark">Grand Total:</span><span className="fw-bold fs-4 text-success">₹{billingSummary.grandTotal?.toFixed(2)}</span></div>
              <div className="p-3 bg-light rounded text-muted small"><FaTruck className="me-2 text-primary" /><span>Estimated delivery: 5-7 business days</span></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
