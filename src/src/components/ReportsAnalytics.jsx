import React, { useState, useEffect } from "react";
import apiService from "../services/apiService";
import { FaChartBar, FaDownload, FaTrash, FaCalendar } from "react-icons/fa";

const ReportsAnalytics = () => {
  const [reports, setReports] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGenerator, setShowGenerator] = useState(false);
  const [reportType, setReportType] = useState("sales");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResult, paymentsResult] = await Promise.all([
          apiService.getAllOrders(),
          apiService.getAllPayments()
        ]);
        
        if (ordersResult.success) setOrders(ordersResult.data.orders || []);
        if (paymentsResult.success) setPayments(paymentsResult.data.payments || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleGenerateReport = () => {
    let report;
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
      return orderDate >= dateRange.startDate && orderDate <= dateRange.endDate;
    });
    
    const filteredPayments = payments.filter(payment => {
      const paymentDate = new Date(payment.createdAt || payment.timestamp).toISOString().split('T')[0];
      return paymentDate >= dateRange.startDate && paymentDate <= dateRange.endDate;
    });

    switch (reportType) {
      case "sales":
        const totalSales = filteredOrders.reduce((sum, order) => sum + (order.grandTotal || order.totalAmount || 0), 0);
        report = {
          id: Date.now(),
          type: "Sales",
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          generatedAt: new Date().toISOString(),
          totalSales,
          totalOrders: filteredOrders.length
        };
        break;
      case "orders":
        report = {
          id: Date.now(),
          type: "Orders",
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          generatedAt: new Date().toISOString(),
          totalOrders: filteredOrders.length
        };
        break;
      case "revenue":
        const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.grandTotal || order.totalAmount || 0), 0);
        const paidRevenue = filteredPayments.filter(p => p.paymentStatus === 'Paid' || p.paymentStatus === 'Success').reduce((sum, p) => sum + (p.amount || 0), 0);
        report = {
          id: Date.now(),
          type: "Revenue",
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          generatedAt: new Date().toISOString(),
          totalRevenue,
          paidRevenue
        };
        break;
      case "gst":
        const totalGST = filteredOrders.reduce((sum, order) => sum + (order.gstAmount || 0), 0);
        report = {
          id: Date.now(),
          type: "GST",
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          generatedAt: new Date().toISOString(),
          totalGST
        };
        break;
      case "payment":
        const totalAmount = filteredPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
        report = {
          id: Date.now(),
          type: "Payment",
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          generatedAt: new Date().toISOString(),
          totalAmount,
          totalTransactions: filteredPayments.length
        };
        break;
      default:
        return;
    }
    setReports([...reports, report]);
    setShowGenerator(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  const downloadReport = (report) => {
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${report.type}_Report_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getReportIcon = (type) => {
    switch (type) {
      case "Sales":
        return <FaChartBar className="text-success" />;
      case "Orders":
        return <FaChartBar className="text-primary" />;
      case "Revenue":
        return <FaChartBar className="text-success" />;
      case "GST":
        return <FaChartBar className="text-warning" />;
      case "Payment":
        return <FaChartBar className="text-info" />;
      default:
        return <FaChartBar className="text-secondary" />;
    }
  };

  if (loading) return <div>Loading reports...</div>;

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Reports & Analytics</h5>
          <button className="btn btn-primary" onClick={() => setShowGenerator(!showGenerator)}>
            <FaCalendar className="me-2" />
            {showGenerator ? "Cancel" : "Generate Report"}
          </button>
        </div>

        {showGenerator && (
          <div className="card bg-light mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Generate New Report</h6>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Report Type</label>
                  <select
                    className="form-select"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <option value="sales">Sales Report</option>
                    <option value="orders">Orders Report</option>
                    <option value="revenue">Revenue Report</option>
                    <option value="gst">GST Report</option>
                    <option value="payment">Payment Report</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                  />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button className="btn btn-success w-100" onClick={handleGenerateReport}>
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Type</th>
                <th>Period</th>
                <th>Generated At</th>
                <th>Key Metrics</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No reports generated yet.
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="fs-4 me-2">{getReportIcon(report.type)}</span>
                        <span className="fw-bold">{report.type} Report</span>
                      </div>
                    </td>
                    <td>
                      {new Date(report.startDate).toLocaleDateString()} - {new Date(report.endDate).toLocaleDateString()}
                    </td>
                    <td>{new Date(report.generatedAt).toLocaleString()}</td>
                    <td>
                      {report.type === "Sales" && (
                        <div>
                          <div>Total Sales: <strong>₹{report.totalSales?.toLocaleString()}</strong></div>
                          <div>Total Orders: <strong>{report.totalOrders}</strong></div>
                        </div>
                      )}
                      {report.type === "Orders" && (
                        <div>
                          <div>Total Orders: <strong>{report.totalOrders}</strong></div>
                        </div>
                      )}
                      {report.type === "Revenue" && (
                        <div>
                          <div>Total Revenue: <strong>₹{report.totalRevenue?.toLocaleString()}</strong></div>
                          <div>Paid: <strong>₹{report.paidRevenue?.toLocaleString()}</strong></div>
                        </div>
                      )}
                      {report.type === "GST" && (
                        <div>
                          <div>Total GST: <strong>₹{report.totalGST?.toLocaleString()}</strong></div>
                        </div>
                      )}
                      {report.type === "Payment" && (
                        <div>
                          <div>Total Amount: <strong>₹{report.totalAmount?.toLocaleString()}</strong></div>
                          <div>Transactions: <strong>{report.totalTransactions}</strong></div>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => downloadReport(report)}
                          title="Download"
                        >
                          <FaDownload />
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(report.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
