import React from "react";
import { FaCheckCircle, FaCircle, FaTruck, FaBox, FaCreditCard, FaHome } from "react-icons/fa";

const Timeline = ({ order }) => {
  if (!order || !order.timeline) return null;

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "order placed":
        return <FaBox className="text-primary" />;
      case "confirmed":
        return <FaCheckCircle className="text-success" />;
      case "packed":
        return <FaBox className="text-info" />;
      case "shipped":
        return <FaTruck className="text-warning" />;
      case "out for delivery":
        return <FaTruck className="text-primary" />;
      case "delivered":
        return <FaHome className="text-success" />;
      case "completed":
        return <FaCheckCircle className="text-success" />;
      case "cancelled":
        return <FaCircle className="text-danger" />;
      default:
        return <FaCircle className="text-secondary" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "order placed":
        return "primary";
      case "confirmed":
        return "success";
      case "packed":
        return "info";
      case "shipped":
        return "warning";
      case "out for delivery":
        return "primary";
      case "delivered":
      case "completed":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="timeline-container">
      <h5 className="fw-bold mb-4">Order Timeline</h5>
      <div className="timeline">
        {order.timeline.map((event, index) => (
          <div key={index} className="timeline-item mb-4">
            <div className="d-flex">
              <div className="timeline-icon me-3">
                <div
                  className={`d-flex align-items-center justify-content-center rounded-circle bg-${getStatusColor(
                    event.status
                  )} text-white`}
                  style={{ width: "40px", height: "40px" }}
                >
                  {getStatusIcon(event.status)}
                </div>
              </div>
              <div className="timeline-content flex-grow-1">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="fw-bold mb-0">{event.status}</h6>
                      <small className="text-muted">{event.date}</small>
                    </div>
                    <p className="text-muted small mb-2">{event.remarks}</p>
                    {event.adminName && (
                      <small className="text-muted">
                        <strong>Updated by:</strong> {event.adminName}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {index < order.timeline.length - 1 && (
              <div className="timeline-line ms-5" style={{ height: "20px", borderLeft: "2px dashed #dee2e6" }}></div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .timeline-item:last-child .timeline-line {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Timeline;
