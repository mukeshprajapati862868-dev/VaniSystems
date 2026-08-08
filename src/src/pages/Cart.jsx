
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import apiService from "../services/apiService";
// import { useAuth } from "../context/AuthContext";

// const Cart = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCart = async () => {
//       if (isAuthenticated) {
//         try {
//           const result = await apiService.getCart();
//           if (result.success) {
//             const rawData = result.data?.cart || result.data || {};
//             const itemsList = rawData.items || [];
//             setCartItems(itemsList);
//           }
//         } catch (error) {
//           console.error("Error fetching cart:", error);
//         }
//       }
//       setLoading(false);
//     };
//     fetchCart();
//   }, [isAuthenticated]);

//   const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  
//   const subtotal = cartItems.reduce((sum, item) => {
//     const targetProduct = item.product || item || {};
//     const productPrice = item.price || targetProduct.price || targetProduct.discountPrice || 1256;
//     return sum + (productPrice * (item.quantity || 1));
//   }, 0);

//   const totalGST = Math.round(subtotal * 0.18);
//   const totalShipping = cartItems.length > 0 ? 50 : 0;
//   const couponDiscount = 0;
//   const grandTotal = subtotal + totalGST + totalShipping - couponDiscount;

//   const handleUpdateQuantity = async (targetProductId, newQuantity) => {
//     try {
//       if (!targetProductId) return;
      
//       await apiService.updateCartItem(targetProductId, newQuantity);
      
//       const result = await apiService.getCart();
//       if (result.success) {
//         const rawData = result.data?.cart || result.data || {};
//         setCartItems(rawData.items || []);
//       }
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   const removeFromCart = async (targetProductId) => {
//     try {
//       if (!targetProductId) return;

//       await apiService.removeFromCart(targetProductId);
      
//       const result = await apiService.getCart();
//       if (result.success) {
//         const rawData = result.data?.cart || result.data || {};
//         setCartItems(rawData.items || []);
//       }
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5 my-5">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading Your Cart...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="py-5" style={{ backgroundColor: "#eaf8ff", minHeight: "100vh" }}>
//       <div className="container">
//         <div className="text-center mb-5">
//           <h1 className="fw-bold text-dark">Your Cart</h1>
//           <p className="text-muted">Review your selected services before proceeding</p>
//           <div className="mx-auto mt-3" style={{ width: "70px", height: "3px", backgroundColor: "#29a9e0", borderRadius: "10px" }}></div>
//         </div>

//         {cartItems.length === 0 && (
//           <div className="text-center py-5">
//             <h3 className="fw-bold text-muted">Your Cart is Empty</h3>
//             <p className="text-muted">Please add some services to your cart.</p>
//             <button onClick={() => navigate("/products")} className="btn btn-primary px-4 mt-2">Explore Services</button>
//           </div>
//         )}

//         {cartItems.length > 0 && (
//           <div className="row g-4">
//             <div className="col-12 col-lg-8">
//               <div className="row g-4">
//                 {cartItems.map((item, index) => {
//                   const product = item.product || item || {};
                  
//                   const actualProductId = item.productId || product.productId || product._id || product.id;
//                   const entryKey = item._id || item.id || actualProductId || `cart-item-${index}`;

//                   const displayTitle = item.title || product.title || product.name || "v dsdsf";
//                   const displayImage = item.image || product.image || product.imageUrl || "";
//                   const displayPrice = item.price || product.price || product.discountPrice || 1256;

//                   return (
//                     <div className="col-12" key={entryKey}>
//                       <div className="card border-0 shadow-sm" style={{ borderRadius: "10px" }}>
//                         <div className="card-body p-3 p-md-4">
//                           <div className="row align-items-center g-4">
//                             <div className="col-12 col-sm-4 col-md-3">
//                               <div className="position-relative d-flex align-items-center justify-content-center bg-light rounded-3" style={{ height: "140px" }}>
//                                 {displayImage && displayImage.length > 100 ? (
//                                   <img
//                                     src={displayImage}
//                                     alt={displayTitle}
//                                     className="img-fluid w-100 h-100 rounded-3"
//                                     style={{ objectFit: "cover" }}
//                                     onError={(e) => {
//                                       e.target.onerror = null;
//                                       e.target.src = "https://placehold.co";
//                                     }}
//                                   />
//                                 ) : (
//                                   <div className="text-center text-secondary p-2">
//                                     <div className="fs-2 mb-1">📦</div>
//                                     <small className="d-block fw-bold text-uppercase" style={{ fontSize: "10px" }}>Premium Plan</small>
//                                   </div>
//                                 )}
//                                 {(product.discount > 0 || item.discount > 0) && (
//                                   <span className="position-absolute top-0 end-0 m-2 badge bg-danger">
//                                     {product.discount || item.discount || 20}% OFF
//                                   </span>
//                                 )}
//                               </div>
//                             </div>

//                             <div className="col-12 col-sm-8 col-md-5">
//                               <small className="text-primary fw-bold">{product.category || item.category || "sf"}</small>
//                               <h5 className="fw-bold mt-1 mb-2">{displayTitle}</h5>
//                               <p className="text-muted small mb-2 text-truncate">{product.description || item.description || "good"}</p>
//                               <div className="d-flex align-items-center gap-2">
//                                 <span className="text-success fw-bold fs-5">₹{displayPrice}</span>
//                               </div>
//                             </div>

//                             <div className="col-12 col-md-4 text-md-end">
//                               <div className="d-flex align-items-center justify-content-md-end gap-2 mb-3">
//                                 <button onClick={() => handleUpdateQuantity(actualProductId, (item.quantity || 1) - 1)} disabled={(item.quantity || 1) <= 1} className="btn btn-sm btn-outline-secondary px-2" style={{ width: "32px" }}>-</button>
//                                 <span className="fw-bold px-2">{item.quantity || 1}</span>
//                                 <button onClick={() => handleUpdateQuantity(actualProductId, (item.quantity || 1) + 1)} className="btn btn-sm btn-outline-secondary px-2" style={{ width: "32px" }}>+</button>
//                               </div>
//                               <button onClick={() => removeFromCart(actualProductId)} className="btn btn-outline-danger btn-sm px-3">Remove Item</button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="col-12 col-lg-4">
//               <div className="bg-white rounded-3 shadow-sm p-4 sticky-top" style={{ top: "20px" }}>
//                 <h5 className="fw-bold mb-4">Order Summary</h5>
//                 <div className="d-flex justify-content-between mb-2">
//                   <span className="text-muted">Total Items</span>
//                   <span className="fw-bold">{totalItems}</span>
//                 </div>
//                 <div className="d-flex justify-content-between mb-2">
//                   <span className="text-muted">Subtotal</span>
//                   <span>₹{subtotal}</span>
//                 </div>
//                 <div className="d-flex justify-content-between mb-2">
//                   <span className="text-muted">GST (18%)</span>
//                   <span>₹{totalGST}</span>
//                 </div>
//                 <div className="d-flex justify-content-between mb-2">
//                   <span className="text-muted">Shipping Charges</span>
//                   <span>₹{totalShipping}</span>
//                 </div>
//                 <hr />
//                 <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
//                   <span>Grand Total</span>
//                   <span className="text-success">₹{grandTotal}</span>
//                 </div>
//                 <div className="pt-2">
//                   <button onClick={() => navigate("/checkout")} className="btn btn-success w-100 py-2 fw-bold" style={{ borderRadius: "8px" }}>
//                     Proceed to Checkout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Cart;
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaDownload } from "react-icons/fa";
import apiService from "../services/apiService";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    totalGST: 0,
    totalShipping: 0,
    couponDiscount: 0,
    grandTotal: 0,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Checks for a JWT token directly — does not rely on isAuthenticated
  // so the cart always loads correctly on page mount/navigation.
  const hasToken = () => !!localStorage.getItem("token");

  const fetchCart = useCallback(async () => {
    if (!hasToken()) {
      setLoading(false);
      return;
    }
    try {
      setError("");
      const result = await apiService.getCart();
      if (result.success) {
        // Backend returns: { success, data: { items, subtotal, totalGST, … } }
        const data = result.data || {};
        setCartItems(data.items || []);
        setCartTotals({
          subtotal: data.subtotal || 0,
          totalGST: data.totalGST || 0,
          totalShipping: data.totalShipping || 0,
          couponDiscount: data.couponDiscount || 0,
          grandTotal: data.grandTotal || 0,
          totalItems: data.totalItems || 0,
        });
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Failed to load cart. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Always fetch on mount — not gated on isAuthenticated so it works
  // even before AuthContext finishes rehydrating from localStorage.
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Destructure totals from state — calculated server-side per product's GST/shipping
  const { subtotal, totalGST, totalShipping, couponDiscount, grandTotal, totalItems } = cartTotals;

  const refreshCart = async () => {
    try {
      const result = await apiService.getCart();
      if (result.success) {
        const data = result.data || {};
        setCartItems(data.items || []);
        setCartTotals({
          subtotal: data.subtotal || 0,
          totalGST: data.totalGST || 0,
          totalShipping: data.totalShipping || 0,
          couponDiscount: data.couponDiscount || 0,
          grandTotal: data.grandTotal || 0,
          totalItems: data.totalItems || 0,
        });
      }
    } catch (err) {
      console.error("Error refreshing cart:", err);
    }
  };

  const handleUpdateQuantity = async (targetProductId, newQuantity) => {
    if (!targetProductId || newQuantity < 1) return;
    try {
      await apiService.updateCartItem(targetProductId, newQuantity);
      await refreshCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (targetProductId) => {
    if (!targetProductId) return;
    try {
      await apiService.removeFromCart(targetProductId);
      await refreshCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5 my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Your Cart...</span>
        </div>
      </div>
    );
  }

  // Not logged in — prompt to login
  if (!hasToken()) {
    return (
      <section className="py-5" style={{ backgroundColor: "#eaf8ff", minHeight: "100vh" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="fw-bold text-dark">Your Cart</h1>
            <div className="mx-auto mt-3" style={{ width: "70px", height: "3px", backgroundColor: "#29a9e0", borderRadius: "10px" }}></div>
          </div>
          <div className="text-center py-5">
            <h3 className="fw-bold text-muted">Please Login to View Your Cart</h3>
            <p className="text-muted">You need to be logged in to add and view cart items.</p>
            <button onClick={() => navigate("/emp-login")} className="btn btn-primary px-4 mt-2">Login / Register</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5" style={{ backgroundColor: "#eaf8ff", minHeight: "100vh" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold text-dark">Your Cart</h1>
          <p className="text-muted">Review your selected services before proceeding</p>
          <div className="mx-auto mt-3" style={{ width: "70px", height: "3px", backgroundColor: "#29a9e0", borderRadius: "10px" }}></div>
        </div>

        {cartItems.length === 0 && (
          <div className="text-center py-5">
            <h3 className="fw-bold text-muted">Your Cart is Empty</h3>
            <p className="text-muted">Please add some services to your cart.</p>
            <button onClick={() => navigate("/products")} className="btn btn-primary px-4 mt-2">Explore Services</button>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="row g-4">
                {cartItems.map((item, index) => {
                  const product = item.product || item || {};
                  const actualProductId = item.productId || product.productId || product._id || product.id;
                  const entryKey = item._id || item.id || actualProductId || `cart-item-${index}`;
                  const displayTitle = item.title || product.title || product.name || "v dsdsf";
                  const displayImage = item.image || product.image || product.imageUrl || "";
                  const displayPrice = item.price || product.price || product.discountPrice || 1256;

                  return (
                    <div className="col-12" key={entryKey}>
                      <div className="card border-0 shadow-sm" style={{ borderRadius: "10px" }}>
                        <div className="card-body p-3 p-md-4">
                          <div className="row align-items-center g-4">
                            <div className="col-12 col-sm-4 col-md-3">
                              <div className="position-relative d-flex align-items-center justify-content-center bg-light rounded-3" style={{ height: "140px" }}>
                                {displayImage && displayImage.length > 100 ? (
                                  <img src={displayImage} alt={displayTitle} className="img-fluid w-100 h-100 rounded-3" style={{ objectFit: "cover" }} />
                                ) : (
                                  <div className="text-center text-secondary p-2">
                                    <div className="fs-2 mb-1">📦</div>
                                    <small className="d-block fw-bold text-uppercase" style={{ fontSize: "10px" }}>Premium Plan</small>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-12 col-sm-8 col-md-5">
                              <small className="text-primary fw-bold">{product.category || item.category || "sf"}</small>
                              <h5 className="fw-bold mt-1 mb-2">{displayTitle}</h5>
                              <p className="text-muted small mb-2 text-truncate">{product.description || item.description || "good"}</p>
                              <div className="d-flex align-items-center gap-2">
                                <span className="text-success fw-bold fs-5">₹{displayPrice}</span>
                              </div>
                            </div>

                            <div className="col-12 col-md-4 text-md-end">
                              <div className="d-flex align-items-center justify-content-md-end gap-2 mb-3">
                                <button onClick={() => handleUpdateQuantity(actualProductId, (item.quantity || 1) - 1)} disabled={(item.quantity || 1) <= 1} className="btn btn-sm btn-outline-secondary px-2" style={{ width: "32px" }}>-</button>
                                <span className="fw-bold px-2">{item.quantity || 1}</span>
                                <button onClick={() => handleUpdateQuantity(actualProductId, (item.quantity || 1) + 1)} className="btn btn-sm btn-outline-secondary px-2" style={{ width: "32px" }}>+</button>
                              </div>
                              <button onClick={() => removeFromCart(actualProductId)} className="btn btn-outline-danger btn-sm px-3">Remove Item</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="bg-white rounded-3 shadow-sm p-4 sticky-top" style={{ top: "20px" }}>
                <h5 className="fw-bold mb-4">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Total Items</span>
                  <span className="fw-bold">{totalItems}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">GST</span>
                  <span>₹{totalGST.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Shipping Charges</span>
                  <span>₹{totalShipping.toFixed(2)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Coupon Discount</span>
                    <span>- ₹{couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                  <span>Grand Total</span>
                  <span className="text-success">₹{grandTotal.toFixed(2)}</span>
                </div>
                <div className="pt-2">
                  <button onClick={() => navigate("/checkout")} className="btn btn-success w-100 py-2 fw-bold" style={{ borderRadius: "8px" }}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
