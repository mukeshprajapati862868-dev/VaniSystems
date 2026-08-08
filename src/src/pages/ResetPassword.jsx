// import React, { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import apiService from "../services/apiService";

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token");
  
//   const [formData, setFormData] = useState({
//     newPassword: "",
//     confirmPassword: ""
//   });
  
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!token) {
//       setError("Invalid or missing reset token. Please request a new password reset.");
//     }
//   }, [token]);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.id]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setMessage("");

//     if (formData.newPassword !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     if (formData.newPassword.length < 6) {
//       setError("Password must be at least 6 characters long");
//       setLoading(false);
//       return;
//     }

//     if (!token) {
//       setError("Invalid or missing reset token");
//       setLoading(false);
//       return;
//     }

//     try {
//       const result = await apiService.resetPassword(token, formData.newPassword);
//       setMessage("Password reset successfully! Redirecting to login...");
      
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (err) {
//       setError(err.message || "Failed to reset password. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-vh-100 d-flex align-items-center justify-content-center py-5 bg-light">
//       <div className="card shadow-lg border-0" style={{ width: "400px", borderRadius: "15px" }}>
//         <div
//           className="card-header text-white text-center p-4"
//           style={{ backgroundColor: "#0d2744", borderRadius: "15px 15px 0 0" }}
//         >
//           <h4 className="mb-0">Reset Password</h4>
//         </div>
//         <div className="card-body p-4">
//           {message && <div className="alert alert-success small mb-3">{message}</div>}
//           {error && <div className="alert alert-danger small mb-3">{error}</div>}
          
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="small mb-1 text-muted">New Password</label>
//               <input
//                 type="password"
//                 id="newPassword"
//                 className="form-control"
//                 placeholder="Enter new password"
//                 value={formData.newPassword}
//                 onChange={handleChange}
//                 required
//                 minLength={6}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="small mb-1 text-muted">Confirm Password</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 className="form-control"
//                 placeholder="Confirm new password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//                 minLength={6}
//               />
//             </div>

//             <button type="submit" className="btn btn-primary w-100 mb-3 py-2 fw-bold" disabled={loading}>
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>

//             <div className="text-center">
//               <button
//                 type="button"
//                 className="btn btn-link text-decoration-none small"
//                 onClick={() => navigate("/login")}
//               >
//                 Back to Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ResetPassword;

import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiService from "../services/apiService";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token. Please request a new password reset.");
    }
  }, [token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading-false;
      return;
    }

    if (!token) {
      setError("Invalid or missing reset token");
      setLoading(false);
      return;
    }

    try {
      // REAL RESET PASSWORD API CALL
      await apiService.resetPassword(token, formData.newPassword);
      setMessage("Password reset successfully! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center py-5 bg-light">
      <div className="card shadow-lg border-0" style={{ width: "400px", borderRadius: "15px" }}>
        <div
          className="card-header text-white text-center p-4"
          style={{ backgroundColor: "#0d2744", borderRadius: "15px 15px 0 0" }}
        >
          <h4 className="mb-0">Reset Password</h4>
        </div>
        <div className="card-body p-4">
          {message && <div className="alert alert-success small mb-3">{message}</div>}
          {error && <div className="alert alert-danger small mb-3">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="small mb-1 text-muted">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <div className="mb-4">
              <label className="small mb-1 text-muted">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3 py-2 fw-bold" disabled={loading || !token}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-link text-decoration-none small"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
