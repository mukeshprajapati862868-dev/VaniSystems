import React, { createContext, useContext, useState } from "react";
import apiService from "../services/apiService";

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const result = await apiService.getAllOrders();
      if (result.success) setOrders(result.data.orders || []);
    } catch (e) { console.error('fetchOrders error:', e); }
  };

  const createOrder = async (orderData) => {
    await apiService.createOrder(orderData);
    await fetchOrders();
  };

  const updateOrderStatus = async (orderId, statusData) => {
    await apiService.updateOrderStatus(orderId, statusData);
    await fetchOrders();
  };

  const getOrderById = (id) => orders.find(o => (o._id || o.id) === id);
  const getOrdersByUserId = (userId) => orders.filter(order => order.userId === userId);
  const getOrdersByStatus = (status) => orders.filter(order => order.status === status);
  const cancelOrder = async (orderId, reason) => {
    await apiService.updateOrderStatus(orderId, { status: "Cancelled", remarks: reason });
    await fetchOrders();
  };
  const returnOrder = async (orderId, reason) => {
    await apiService.updateOrderStatus(orderId, { status: "Returned", remarks: reason });
    await fetchOrders();
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === "Pending").length,
      confirmed: orders.filter(o => o.status === "Confirmed").length,
      shipped: orders.filter(o => o.status === "Shipped").length,
      delivered: orders.filter(o => o.status === "Delivered" || o.status === "Completed").length,
      cancelled: orders.filter(o => o.status === "Cancelled").length,
      returned: orders.filter(o => o.status === "Returned").length,
    };
  };

  const orderStatuses = [
    "Pending", "Confirmed", "Packed", "Ready To Ship",
    "Shipped", "Out For Delivery", "Delivered", "Completed",
    "Cancelled", "Returned", "Refunded"
  ];

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      updateOrderStatus,
      getOrderById,
      getOrdersByUserId,
      getOrdersByStatus,
      cancelOrder,
      returnOrder,
      getOrderStats,
      orderStatuses,
      fetchOrders,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};