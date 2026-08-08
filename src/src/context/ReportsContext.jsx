import React, { createContext, useContext, useState } from "react";
import apiService from "../services/apiService";

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const result = await apiService.getAllReports();
    if (result.success) setReports(result.data.reports || []);
  };

  const saveReport = async (report) => {
    await apiService.createReport(report);
    await fetchReports();
  };

  const deleteReport = async (id) => {
    await apiService.deleteReport(id);
    setReports(reports.filter(report => report.id !== id));
  };

  const getReportById = (id) => reports.find(report => report.id === id);

  const generateSalesReport = (orders, startDate, endDate) => {
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });

    const totalSales = filteredOrders.reduce((sum, order) => sum + (order.grandTotal || order.totalAmount || 0), 0);
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    const salesByDate = {};
    filteredOrders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString();
      salesByDate[date] = (salesByDate[date] || 0) + (order.grandTotal || order.totalAmount || 0);
    });

    return {
      id: Date.now(),
      type: "Sales",
      startDate,
      endDate,
      totalSales,
      totalOrders,
      avgOrderValue,
      salesByDate,
      generatedAt: new Date().toISOString(),
    };
  };

  const generateOrdersReport = (orders, startDate, endDate) => {
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });

    const statusCounts = {};
    filteredOrders.forEach(order => {
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });

    const paymentMethodCounts = {};
    filteredOrders.forEach(order => {
      paymentMethodCounts[order.paymentMethod] = (paymentMethodCounts[order.paymentMethod] || 0) + 1;
    });

    return {
      id: Date.now(),
      type: "Orders",
      startDate,
      endDate,
      totalOrders: filteredOrders.length,
      statusCounts,
      paymentMethodCounts,
      generatedAt: new Date().toISOString(),
    };
  };

  const generateRevenueReport = (orders, payments, startDate, endDate) => {
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });

    const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.grandTotal || order.totalAmount || 0), 0);
    const paidRevenue = filteredOrders.filter(o => o.paymentStatus === "Paid").reduce((sum, o) => sum + (o.grandTotal || o.totalAmount || 0), 0);
    const pendingRevenue = totalRevenue - paidRevenue;

    return {
      id: Date.now(),
      type: "Revenue",
      startDate,
      endDate,
      totalRevenue,
      paidRevenue,
      pendingRevenue,
      generatedAt: new Date().toISOString(),
    };
  };

  const generateGSTReport = (orders, startDate, endDate) => {
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });

    const totalGST = filteredOrders.reduce((sum, order) => sum + (order.gstAmount || 0), 0);

    return {
      id: Date.now(),
      type: "GST",
      startDate,
      endDate,
      totalGST,
      totalOrders: filteredOrders.length,
      generatedAt: new Date().toISOString(),
    };
  };

  const generatePaymentReport = (payments, startDate, endDate) => {
    const filteredPayments = payments.filter(payment => {
      const paymentDate = new Date(payment.timestamp || payment.createdAt);
      return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
    });

    const totalAmount = filteredPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
    const methodCounts = {};
    filteredPayments.forEach(payment => {
      methodCounts[payment.paymentMethod] = (methodCounts[payment.paymentMethod] || 0) + 1;
    });

    return {
      id: Date.now(),
      type: "Payment",
      startDate,
      endDate,
      totalAmount,
      methodCounts,
      totalTransactions: filteredPayments.length,
      generatedAt: new Date().toISOString(),
    };
  };

  return (
    <ReportsContext.Provider
      value={{
        reports,
        generateSalesReport,
        generateOrdersReport,
        generateRevenueReport,
        generateGSTReport,
        generatePaymentReport,
        saveReport,
        deleteReport,
        getReportById,
        fetchReports,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error("useReports must be used within ReportsProvider");
  }
  return context;
};
