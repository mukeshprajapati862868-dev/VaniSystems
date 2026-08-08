import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaHeart, FaBolt, FaBox, FaTag } from "react-icons/fa";

const Products = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  // Fetch products from backend API only
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await apiService.getProducts();
        console.log('Products API response:', result);
        if (result.success) {
          setProducts(result.data.products || []);
          console.log('Products loaded:', result.data.products?.length || 0);
        } else {
          console.error('API returned error:', result);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Fetch wishlist if authenticated
  useEffect(() => {
    const fetchWishlist = async () => {
      if (isAuthenticated) {
        try {
          const result = await apiService.getWishlist();
          if (result.success) {
            setWishlist(result.data.items || []);
          }
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      }
    };
    fetchWishlist();
  }, [isAuthenticated]);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      navigate('/emp-login');
      return;
    }
    try {
      const productId = product._id || product.id;
      await apiService.addToCart(productId);
      // Navigate to cart so the user immediately sees the updated cart
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.message || 'Failed to add item to cart. Please try again.');
    }
  };

  const handleWishlist = async (product) => {
    try {
      if (!isAuthenticated) {
        alert('Please login to add items to wishlist');
        navigate('/emp-login');
        return;
      }

      const productId = product._id || product.id;
      const isInWishlist = wishlist.some(w => (w.product?._id === productId || w.product?.id === productId || w._id === productId || w.id === productId));

      if (isInWishlist) {
        await apiService.removeFromWishlist(productId);
        const result = await apiService.getWishlist();
        if (result.success) setWishlist(result.data.items || []);
        alert(`${product.title || product.name || "Product"} removed from wishlist!`);
      } else {
        await apiService.addToWishlist(productId);
        const result = await apiService.getWishlist();
        if (result.success) setWishlist(result.data.items || []);
        alert(`${product.title || product.name || "Product"} added to wishlist!`);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(w => (w.product?._id === productId || w.product?.id === productId || w._id === productId || w.id === productId));
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Out of Stock", color: "danger" };
    if (stock < 10) return { text: "Low Stock", color: "warning" };
    return { text: "In Stock", color: "success" };
  };

  if (loading) {
    return (
      <div className="text-center py-5 my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Our Premium Products</h2>
        <p className="text-muted">High quality services and products at best prices</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-5 border rounded bg-light">
          <h4 className="text-muted">No products available at the moment.</h4>
        </div>
      ) : (
        <div className="row g-4">
          {products.map((p, index) => {
            const stockStatus = getStockStatus(p.stock);
            // Unique key configuration safely handles index configurations if database ids clash
            const productId = p._id || p.id || `product-idx-${index}`;
            const displayTitle = p.title || p.name || "Unnamed Product";
            const displayImage = p.image || p.imageUrl || "https://placeholder.com";
            const displayPrice = p.discountPrice || p.price || 0;

            return (
              <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={productId}>
                <div className="card h-100 border-0 shadow product-card overflow-hidden">
                  <div className="position-relative">
                    <img
                      src={displayImage}
                      className="card-img-top"
                      style={{ height: "240px", objectFit: "cover" }}
                      alt={displayTitle}
                    />
                    <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1">
                      {p.featured && <span className="badge bg-warning"><FaBolt /> Featured</span>}
                      {p.status === "Inactive" && <span className="badge bg-secondary">Inactive</span>}
                    </div>
                    {p.discount > 0 && (
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-danger p-2">{p.discount}% OFF</span>
                      </div>
                    )}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <small className="text-primary fw-bold text-uppercase"><FaTag /> {p.category || "General"}</small>
                      <small className="text-muted"><FaBox /> {p.brand || "Brand"}</small>
                    </div>
                    <h5 className="fw-bold my-2">{displayTitle}</h5>
                    <p className="text-muted small flex-grow-1 mb-2">
                      {p.description ? `${p.description.substring(0, 80)}...` : "No description available."}
                    </p>
                    <div className="mb-2">
                      <small className="text-muted">SKU: {p.sku || "N/A"}</small>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      {p.discount > 0 && (
                        <span className="text-muted" style={{ textDecoration: 'line-through' }}>₹{p.price}</span>
                      )}
                      <span className="text-success fw-bold fs-5">₹{displayPrice}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3 small">
                      <span className="text-muted">GST: {p.gst || 0}%</span>
                      <span className="text-muted">Shipping: ₹{p.shippingCharge || 0}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className={`badge bg-${stockStatus.color}`}>{stockStatus.text}</span>
                      <span className="text-muted">Stock: {p.stock || 0}</span>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-dark flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2"
                        onClick={() => handleAddToCart(p)}
                        disabled={p.stock === 0}
                      >
                        <FaShoppingCart /> Add
                      </button>
                      <button
                        className={`btn ${isInWishlist(productId) ? 'btn-danger' : 'btn-outline-danger'} d-flex align-items-center justify-content-center gap-2 py-2`}
                        onClick={() => handleWishlist(p)}
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <style>{`
        .product-card { 
          transition: all 0.3s ease; 
          border-radius: 12px;
        }
        .product-card:hover { 
          transform: translateY(-10px); 
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; 
        }
      `}</style>
    </div>
  );
};

export default Products;
