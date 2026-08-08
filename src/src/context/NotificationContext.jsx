import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem("notifications");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load notifications from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    } catch (error) {
      console.error("Failed to save notifications to localStorage:", error);
      if (error.name === "QuotaExceededError") {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key !== "notifications" && key !== "registeredUsers" && key !== "activeUser" && key !== "cartItems" && key !== "orders") {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        try {
          localStorage.setItem("notifications", JSON.stringify(notifications));
        } catch (retryError) {
          console.error("Still failed after clearing old data:", retryError);
        }
      }
    }
  }, [notifications]);

  const addNotification = (title, message, type = "info", orderId = null) => {
    const newNotif = {
      id: Date.now(),
      userId: user?.id || null,
      userEmail: user?.email || null,
      title,
      message,
      type,
      read: false,
      timestamp: new Date().toISOString(),
      orderId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Auto notification functions for order events
  const notifyOrderPlaced = (orderId) => {
    addNotification(
      "Order Placed",
      `Your order ${orderId} has been placed successfully!`,
      "success",
      orderId
    );
  };

  const notifyOrderConfirmed = (orderId) => {
    addNotification(
      "Order Confirmed",
      `Your order ${orderId} has been confirmed and is being processed.`,
      "success",
      orderId
    );
  };

  const notifyOrderPacked = (orderId) => {
    addNotification(
      "Order Packed",
      `Your order ${orderId} has been packed and ready for shipping.`,
      "info",
      orderId
    );
  };

  const notifyOrderShipped = (orderId, trackingNumber) => {
    addNotification(
      "Order Shipped",
      `Your order ${orderId} has been shipped. Tracking: ${trackingNumber}`,
      "info",
      orderId
    );
  };

  const notifyOrderOutForDelivery = (orderId) => {
    addNotification(
      "Out For Delivery",
      `Your order ${orderId} is out for delivery and will reach you soon!`,
      "warning",
      orderId
    );
  };

  const notifyOrderDelivered = (orderId) => {
    addNotification(
      "Order Delivered",
      `Your order ${orderId} has been delivered successfully. Thank you for shopping with us!`,
      "success",
      orderId
    );
  };

  const notifyOrderCompleted = (orderId) => {
    addNotification(
      "Order Completed",
      `Your order ${orderId} has been completed.`,
      "success",
      orderId
    );
  };

  const notifyOrderCancelled = (orderId, reason) => {
    addNotification(
      "Order Cancelled",
      `Your order ${orderId} has been cancelled. Reason: ${reason}`,
      "danger",
      orderId
    );
  };

  const notifyOrderReturned = (orderId) => {
    addNotification(
      "Return Initiated",
      `Return request for order ${orderId} has been initiated.`,
      "warning",
      orderId
    );
  };

  const notifyOrderRefunded = (orderId, amount) => {
    addNotification(
      "Refund Processed",
      `Refund of ₹${amount} for order ${orderId} has been processed.`,
      "success",
      orderId
    );
  };

  const notifyPaymentReceived = (orderId, amount) => {
    addNotification(
      "Payment Received",
      `Payment of ₹${amount} for order ${orderId} has been received.`,
      "success",
      orderId
    );
  };

  const notifyCODCollected = (orderId, amount) => {
    addNotification(
      "COD Collected",
      `Cash on Delivery of ₹${amount} for order ${orderId} has been collected.`,
      "success",
      orderId
    );
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAll,
      unreadCount,
      notifyOrderPlaced,
      notifyOrderConfirmed,
      notifyOrderPacked,
      notifyOrderShipped,
      notifyOrderOutForDelivery,
      notifyOrderDelivered,
      notifyOrderCompleted,
      notifyOrderCancelled,
      notifyOrderReturned,
      notifyOrderRefunded,
      notifyPaymentReceived,
      notifyCODCollected
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);