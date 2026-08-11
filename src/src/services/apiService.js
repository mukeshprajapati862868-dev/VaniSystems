/**
 * Vani E-Commerce API Service
 * Connects frontend to backend endpoints
 */

// const BASE_URL = 'http://localhost:5000/api';
// const BASE_URL='https://vanisystemsb-1.onrender.com';

const BASE_URL = 'https://vanisystemsb-1.onrender.com/api';

class APIService {
  // Helper method to get headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Helper method to handle response
  async handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
      // 401 — token invalid/expired. Clear it but do NOT redirect automatically.
      // Let the individual page/component handle the unauthenticated state.
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('activeUser');
      }
      console.error('API Error:', data);
      throw new Error(data.error || data.message || 'API request failed');
    }
    return data;
  }






    // ==================== CANDIDATES ENDPOINTS (FULLY CORRECTED) ====================

  /**
   * Register a new candidate (Accepts FormData)
   */
  async registerCandidate(candidateData) {
    const token = localStorage.getItem('token');
    const multiHeaders = {};
    if (token) {
      multiHeaders['Authorization'] = `Bearer ${token}`;
    }

    // FIX: Removed incorrect '/register' path to match backend server router mappings
    const response = await fetch(`${BASE_URL}/candidates`, {
      method: 'POST',
      headers: multiHeaders,
      body: candidateData
    });
    return this.handleResponse(response);
  }

  /**
   * Fetch all registered candidates
   */
  async getCandidates() {
    const response = await fetch(`${BASE_URL}/candidates`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Delete candidate record by structure ID
   */
  async deleteCandidate(candidateId) {
    const response = await fetch(`${BASE_URL}/candidates/${candidateId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Update candidate payment workflow status flags
   */
  async updateCandidatePaymentStatus(candidateId, paymentStatus) {
    // FIX: Updated endpoint path and method to PATCH to perfectly mirror backend routing logic
    const response = await fetch(`${BASE_URL}/candidates/${candidateId}/payment`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ status: paymentStatus })
    });
    return this.handleResponse(response);
  }

  // ==================== AUTH ENDPOINTS ====================

  /**
   * Register a new user
   */
  async register(userData) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userData)
    });
    return this.handleResponse(response);
  }

  /**
   * Login user
   */
  async login(credentials) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials)
    });
    const data = await this.handleResponse(response);
    
    // Store token
    if (data.data && data.data.token) {
      localStorage.setItem('token', data.data.token);
    }
    
    return data;
  }

  /**
   * Get current user
   */
  async getCurrentUser() {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Update profile
   */
  async updateProfile(profileData) {
    const response = await fetch(`${BASE_URL}/auth/update-profile`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(profileData)
    });
    return this.handleResponse(response);
  }

  /**
   * Change password
   */
  async changePassword(passwordData) {
    const response = await fetch(`${BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(passwordData)
    });
    return this.handleResponse(response);
  }

  /**
   * Logout
   */
  async logout() {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    
    localStorage.removeItem('token');
    return this.handleResponse(response);
  }

  /**
   * Forgot password - Send reset link via email
   */
  async forgotPassword(email) {
    const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email })
    });
    return this.handleResponse(response);
  }

  /**
   * Reset password using token
   */
  async resetPassword(token, newPassword) {
    const response = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ token, newPassword })
    });
    return this.handleResponse(response);
  }

  // ==================== ORDERS ENDPOINTS ====================

  /**
   * Get all orders
   */
  async getOrders() {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Get order by ID
   */
  async getOrderById(orderId) {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Create new order
   */
  async createOrder(orderData) {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(orderData)
    });
    return this.handleResponse(response);
  }

  /**
   * Cancel order
   */
  async cancelOrder(orderId) {
    const response = await fetch(`${BASE_URL}/orders/${orderId}/cancel`, {
      method: 'PUT',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // ==================== CART ENDPOINTS ====================

  // /**
  //  * Get user's cart
  //  */
  // async getCart() {
  //   const response = await fetch(`${BASE_URL}/cart`, {
  //     method: 'GET',
  //     headers: this.getHeaders()
  //   });
  //   return this.handleResponse(response);
  // }


  /**
   * Get user's cart
   * Added timestamp to force fresh data (Fixes 304 Cache issue)
   */
  async getCart() {
    const response = await fetch(`${BASE_URL}/cart?t=${Date.now()}`, { // Query param added
      method: 'GET',
      headers: this.getHeaders(),
      cache: 'no-store' // Browser ko cache karne se rokta hai
    });
    return this.handleResponse(response);
  }
  /**
   * Add item to cart
   */
  async addToCart(productId, quantity = 1) {
    const response = await fetch(`${BASE_URL}/cart/add`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ productId, quantity })
    });
    return this.handleResponse(response);
  }

  /**
   * Update cart item quantity
   */
  async updateCartItem(productId, quantity) {
    const response = await fetch(`${BASE_URL}/cart/update`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ productId, quantity })
    });
    return this.handleResponse(response);
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(productId) {
    const response = await fetch(`${BASE_URL}/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Clear cart
   */
  async clearCart() {
    const response = await fetch(`${BASE_URL}/cart/clear`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // ==================== WISHLIST ENDPOINTS ====================

  /**
   * Get user's wishlist
   */
  async getWishlist() {
    const response = await fetch(`${BASE_URL}/wishlist`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Add item to wishlist
   */
  async addToWishlist(productId) {
    const response = await fetch(`${BASE_URL}/wishlist/add`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ productId })
    });
    return this.handleResponse(response);
  }

  /**
   * Remove item from wishlist
   */
  async removeFromWishlist(productId) {
    const response = await fetch(`${BASE_URL}/wishlist/remove/${productId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Clear wishlist
   */
  async clearWishlist() {
    const response = await fetch(`${BASE_URL}/wishlist/clear`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // ==================== ADDRESSES ENDPOINTS ====================

  /**
   * Get user's addresses
   */
  async getAddresses() {
    const response = await fetch(`${BASE_URL}/addresses`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Create new address
   */
  async createAddress(addressData) {
    const response = await fetch(`${BASE_URL}/addresses`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(addressData)
    });
    return this.handleResponse(response);
  }

  /**
   * Update address
   */
  async updateAddress(addressId, addressData) {
    const response = await fetch(`${BASE_URL}/addresses/${addressId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(addressData)
    });
    return this.handleResponse(response);
  }

  /**
   * Delete address
   */
  async deleteAddress(addressId) {
    const response = await fetch(`${BASE_URL}/addresses/${addressId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Set address as default
   */
  async setDefaultAddress(addressId) {
    const response = await fetch(`${BASE_URL}/addresses/${addressId}/set-default`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // ==================== NOTIFICATIONS ENDPOINTS ====================

  /**
   * Get user's notifications
   */
  async getNotifications() {
    const response = await fetch(`${BASE_URL}/notifications`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Get all notifications (alias for getNotifications)
   */
  async getAllNotifications() {
    return this.getNotifications();
  }

  /**
   * Mark notification as read
   */
  async markNotificationAsRead(notificationId) {
    const response = await fetch(`${BASE_URL}/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Mark all notifications as read
   */
  async markAllNotificationsAsRead() {
    const response = await fetch(`${BASE_URL}/notifications/mark-all-read`, {
      method: 'PUT',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Delete notification
   */
  async deleteNotification(notificationId) {
    const response = await fetch(`${BASE_URL}/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Clear all notifications
   */
  async clearAllNotifications() {
    const response = await fetch(`${BASE_URL}/notifications/clear-all`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // ==================== COUPONS ENDPOINTS ====================

  /**
   * Get all coupons
   */
  async getCoupons() {
    const response = await fetch(`${BASE_URL}/coupons`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Get coupon by ID
   */
  async getCouponById(couponId) {
    const response = await fetch(`${BASE_URL}/coupons/${couponId}`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Validate coupon code
   */
  async validateCoupon(code, cartTotal) {
    const response = await fetch(`${BASE_URL}/coupons/validate`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ code, cartTotal })
    });
    return this.handleResponse(response);
  }

  // ==================== PAYMENTS ENDPOINTS ====================

  /**
   * Get all payments
   */
  async getPayments() {
    const response = await fetch(`${BASE_URL}/payments`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Get all payments (alias for getPayments)
   */
  async getAllPayments() {
    return this.getPayments();
  }

  /**
   * Get payment by ID
   */
  async getPaymentById(paymentId) {
    const response = await fetch(`${BASE_URL}/payments/${paymentId}`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Create payment
   */
  async createPayment(paymentData) {
    const response = await fetch(`${BASE_URL}/payments`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(paymentData)
    });
    return this.handleResponse(response);
  }

  // ==================== PRODUCTS ENDPOINTS ====================

  /**
   * Get all products
   */
  async getProducts() {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const result = await this.handleResponse(response);
    console.log('getProducts result:', result);
    return result;
  }

  /**
   * Get product by ID
   */
  async getProductById(productId) {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // ==================== USER MANAGEMENT ENDPOINTS ====================

  /**
   * Get current user profile
   */
  async getCurrentUser() {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Update user profile
   */
  async updateUserProfile(profileData) {
    const response = await fetch(`${BASE_URL}/auth/update-profile`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(profileData)
    });
    return this.handleResponse(response);
  }

  /**
   * Change password
   */
  async changePassword(passwordData) {
    const response = await fetch(`${BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(passwordData)
    });
    return this.handleResponse(response);
  }

  // ==================== ADMIN PANEL ENDPOINTS ====================

  /**
   * Get all users (Admin)
   */
  async getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Get current user profile
   */
  async getProfile() {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Update current user profile
   */
  async updateProfile(profileData) {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(profileData)
    });
    return this.handleResponse(response);
  }

  // ==================== DASHBOARD ENDPOINTS ====================

  /**
   * Get dashboard statistics
   */
  async getDashboardStats() {
    const response = await fetch(`${BASE_URL}/dashboard/stats`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Get monthly sales chart data
   */
  async getMonthlySalesChart() {
    const response = await fetch(`${BASE_URL}/dashboard/charts/sales`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Get category sales chart data
   */
  async getCategorySalesChart() {
    const response = await fetch(`${BASE_URL}/dashboard/charts/categories`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Get user by ID (Admin)
   */
  async getUserById(userId) {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Get current user profile
   */
  async getProfile() {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Update current user profile
   */
  async updateProfile(userData) {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(userData)
    });
    return this.handleResponse(response);
  }

  /**
   * Get current user's orders
   */
  async getUserOrders() {
    const response = await fetch(`${BASE_URL}/orders/my-orders`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Get all orders (Admin)
   */
  async getAllOrders() {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Get order by ID
   */
  async getOrderById(orderId) {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Create order
   */
  async createOrder(orderData) {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(orderData)
    });
    return this.handleResponse(response);
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId, statusData) {
    const response = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(statusData)
    });
    return this.handleResponse(response);
  }

  /**
   * Cancel order
   */
  async cancelOrder(orderId, reason) {
    const response = await fetch(`${BASE_URL}/orders/${orderId}/cancel`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ reason })
    });
    return this.handleResponse(response);
  }

  /**
   * Get all inventory (returns products as inventory)
   */
  async getAllInventory() {
    // Since we don't have a separate inventory model, return products
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const result = await this.handleResponse(response);
    // Transform products to inventory format
    if (result.success && result.data.products) {
      return {
        success: true,
        data: {
          inventory: result.data.products.map(product => ({
            productId: product._id || product.id,
            productName: product.title,
            sku: product.sku,
            quantity: product.stock || 0,
            price: product.price,
            status: product.status
          }))
        }
      };
    }
    return result;
  }

  /**
   * Update user (Admin)
   */
  async updateUser(userId, userData) {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(userData)
    });
    return this.handleResponse(response);
  }

  /**
   * Delete user (Admin)
   */
  async deleteUser(userId) {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Block user (Admin)
   */
  async blockUser(userId) {
    const response = await fetch(`${BASE_URL}/users/${userId}/block`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Unblock user (Admin)
   */
  async unblockUser(userId) {
    const response = await fetch(`${BASE_URL}/users/${userId}/unblock`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Create product (Admin)
   */
  async createProduct(productData) {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(productData)
    });
    return this.handleResponse(response);
  }

  /**
   * Update product (Admin)
   */
  async updateProduct(productId, productData) {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(productData)
    });
    return this.handleResponse(response);
  }

  /**
   * Delete product (Admin)
   */
  async deleteProduct(productId) {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Update order status (Admin)
   */
  async updateOrderStatus(orderId, statusData) {
    const response = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(statusData)
    });
    return this.handleResponse(response);
  }

  /**
   * Get order statistics (Admin)
   */
  async getOrderStats() {
    const response = await fetch(`${BASE_URL}/orders/stats/summary`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Create coupon (Admin)
   */
  async createCoupon(couponData) {
    const response = await fetch(`${BASE_URL}/coupons`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(couponData)
    });
    return this.handleResponse(response);
  }

  /**
   * Update coupon (Admin)
   */
  async updateCoupon(couponId, couponData) {
    const response = await fetch(`${BASE_URL}/coupons/${couponId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(couponData)
    });
    return this.handleResponse(response);
  }

  /**
   * Delete coupon (Admin)
   */
  async deleteCoupon(couponId) {
    const response = await fetch(`${BASE_URL}/coupons/${couponId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  /**
   * Update payment status (Admin)
   */
  async updatePaymentStatus(paymentId, statusData) {
    const response = await fetch(`${BASE_URL}/payments/${paymentId}/status`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(statusData)
    });
    return this.handleResponse(response);
  }

  /**
   * Get payment statistics (Admin)
   */
  async getPaymentStats() {
    const response = await fetch(`${BASE_URL}/payments/stats/summary`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }
}

export default new APIService();
