import React, { createContext, useContext, useState } from "react";
import apiService from "../services/apiService";

const PaymentContext = createContext(null);

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const result = await apiService.getAllPayments();
      if (result.success) setPayments(result.data.payments || []);
    } catch (e) { console.error('fetchPayments error:', e); }
  };

  const recordPayment = async (paymentDetails) => {
    await apiService.createPayment(paymentDetails);
    await fetchPayments();
  };

  const updatePaymentStatus = async (transactionId, status) => {
    await apiService.updatePaymentStatus(transactionId, { paymentStatus: status });
    await fetchPayments();
  };

  const getPaymentByOrderId = (orderId) => {
    return payments.find(payment => payment.orderId === orderId);
  };

  const getPaymentsByUserId = (userId) => {
    return payments.filter(payment => payment.userId === userId);
  };

  const processCODCollection = async (transactionId) => {
    await updatePaymentStatus(transactionId, 'Paid');
  };

  const processRefund = async (transactionId, refundAmount) => {
    const payment = payments.find(p => p.transactionId === transactionId);
    if (payment) {
      const refundPayment = {
        ...payment,
        transactionId: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        paymentStatus: 'Refunded',
        refundAmount,
        originalTransactionId: transactionId,
        timestamp: new Date().toISOString(),
      };
      await apiService.createPayment(refundPayment);
      await fetchPayments();
      return refundPayment;
    }
  };

  return (
    <PaymentContext.Provider value={{
      payments,
      recordPayment,
      updatePaymentStatus,
      getPaymentByOrderId,
      getPaymentsByUserId,
      processCODCollection,
      processRefund,
      fetchPayments
    }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context) throw new Error("usePayments must be used within PaymentProvider");
  return context;
};
