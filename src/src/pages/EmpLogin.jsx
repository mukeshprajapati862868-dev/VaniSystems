// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import apiService from "../services/apiService";

// // const EmpLogin = () => {
// //   const navigate = useNavigate();
// //   const { login, register, isAuthenticated } = useAuth();
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [showForgotPassword, setShowForgotPassword] = useState(false);

// //   // Redirect if already logged in
// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       navigate("/profile");
// //     }
// //   }, [isAuthenticated, navigate]);

// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //     name: "",
// //     location: "",
// //     pinCode: "",
// //     address: "",
// //   });

// //   const [forgotPasswordData, setForgotPasswordData] = useState({
// //     email: ""
// //   });

// //   const [resetPasswordData, setResetPasswordData] = useState({
// //     token: "",
// //     newPassword: "",
// //     confirmPassword: ""
// //   });

// //   const [message, setMessage] = useState("");
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) =>
// //     setFormData({ ...formData, [e.target.id]: e.target.value });

// //   const handleForgotPasswordChange = (e) =>
// //     setForgotPasswordData({ ...forgotPasswordData, [e.target.id]: e.target.value });

// //   const handleResetPasswordChange = (e) =>
// //     setResetPasswordData({ ...resetPasswordData, [e.target.id]: e.target.value });

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (isLogin) {
// //       // LOGIN LOGIC
// //       const result = login(formData.email, formData.password);
// //       if (result.success) {
// //         alert("Welcome Back! Login Successful.");
// //         navigate("/profile");
// //       } else {
// //         alert(result.message); // Shows "Invalid Email or Password"
// //       }
// //     } else {
// //       // REGISTRATION LOGIC
// //       const result = register(formData);
// //       if (result.success) {
// //         alert("Registration Successful! Please Login.");
// //         setIsLogin(true); // Switch to login view
// //       } else {
// //         alert(result.message); // Shows "Already Registered"
// //       }
// //     }
// //   };

// //   const handleForgotPassword = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");
// //     setMessage("");

// //     try {
// //       const result = await apiService.forgotPassword(forgotPasswordData.email);
// //       setMessage("Password reset link has been sent to your email. Please check your inbox.");
// //       setForgotPasswordData({ email: "" });
// //     } catch (err) {
// //       setError(err.message || "Failed to send reset link. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleResetPassword = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");
// //     setMessage("");

// //     if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
// //       setError("Passwords do not match");
// //       setLoading(false);
// //       return;
// //     }

// //     if (resetPasswordData.newPassword.length < 6) {
// //       setError("Password must be at least 6 characters long");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const result = await apiService.resetPassword(resetPasswordData.token, resetPasswordData.newPassword);
// //       setMessage("Password reset successfully! Redirecting to login...");

// //       setTimeout(() => {
// //         setShowForgotPassword(false);
// //         setResetPasswordData({ token: "", newPassword: "", confirmPassword: "" });
// //       }, 2000);
// //     } catch (err) {
// //       setError(err.message || "Failed to reset password. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <section className="min-vh-100 d-flex align-items-center justify-content-center py-5 bg-light">
// //       <div className="card shadow-lg border-0" style={{ width: "400px", borderRadius: "15px" }}>
// //         <div
// //           className="card-header text-white text-center p-4"
// //           style={{ backgroundColor: "#0d2744", borderRadius: "15px 15px 0 0" }}
// //         >
// //           <h4 className="mb-0">
// //             {showForgotPassword ? "Forgot Password" : isLogin ? "Employee Login" : "Employee Registration"}
// //           </h4>
// //         </div>
// //         <div className="card-body p-4">
// //           {showForgotPassword ? (
// //             // FORGOT PASSWORD FORM
// //             <form onSubmit={handleForgotPassword}>
// //               {message && <div className="alert alert-success small mb-3">{message}</div>}
// //               {error && <div className="alert alert-danger small mb-3">{error}</div>}

// //               <div className="mb-3">
// //                 <label className="small mb-1 text-muted">Email Address</label>
// //                 <input
// //                   type="email"
// //                   id="email"
// //                   className="form-control"
// //                   placeholder="name@company.com"
// //                   value={forgotPasswordData.email}
// //                   onChange={handleForgotPasswordChange}
// //                   required
// //                 />
// //               </div>

// //               <button type="submit" className="btn btn-primary w-100 mb-3 py-2 fw-bold" disabled={loading}>
// //                 {loading ? "Sending..." : "Send Reset Link"}
// //               </button>

// //               <div className="text-center">
// //                 <button
// //                   type="button"
// //                   className="btn btn-link text-decoration-none small"
// //                   onClick={() => {
// //                     setShowForgotPassword(false);
// //                     setMessage("");
// //                     setError("");
// //                   }}
// //                 >
// //                   Back to Login
// //                 </button>
// //               </div>
// //             </form>
// //           ) : (
// //             // LOGIN/REGISTRATION FORM
// //             <form onSubmit={handleSubmit}>
// //               <div className="mb-3">
// //                 <label className="small mb-1 text-muted">Email Address</label>
// //                 <input
// //                   type="email"
// //                   id="email"
// //                   className="form-control"
// //                   placeholder="name@company.com"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>

// //               {!isLogin && (
// //                 <>
// //                   <div className="mb-3">
// //                     <label className="small mb-1 text-muted">Full Name</label>
// //                     <input
// //                       type="text"
// //                       id="name"
// //                       className="form-control"
// //                       placeholder="John Doe"
// //                       value={formData.name}
// //                       onChange={handleChange}
// //                       required
// //                     />
// //                   </div>
// //                   <div className="row g-2 mb-3">
// //                     <div className="col-md-7">
// //                       <label className="small mb-1 text-muted">City</label>
// //                       <input
// //                         type="text"
// //                         id="location"
// //                         className="form-control"
// //                         placeholder="City"
// //                         value={formData.location}
// //                         onChange={handleChange}
// //                         required
// //                       />
// //                     </div>
// //                     <div className="col-md-5">
// //                       <label className="small mb-1 text-muted">PIN</label>
// //                       <input
// //                         type="number"
// //                         id="pinCode"
// //                         className="form-control"
// //                         placeholder="000000"
// //                         value={formData.pinCode}
// //                         onChange={handleChange}
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                   <div className="mb-3">
// //                     <label className="small mb-1 text-muted">Full Address</label>
// //                     <textarea
// //                       id="address"
// //                       className="form-control"
// //                       rows="2"
// //                       placeholder="Street, Building, etc."
// //                       value={formData.address}
// //                       onChange={handleChange}
// //                     ></textarea>
// //                   </div>
// //                 </>
// //               )}

// //               <div className="mb-4">
// //                 <label className="small mb-1 text-muted">Password</label>
// //                 <input
// //                   type="password"
// //                   id="password"
// //                   className="form-control"
// //                   placeholder="••••••••"
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>

// //               <button type="submit" className="btn btn-primary w-100 mb-3 py-2 fw-bold">
// //                 {isLogin ? "Sign In" : "Create Account"}
// //               </button>

// //               <div className="text-center">
// //                 {isLogin && (
// //                   <button
// //                     type="button"
// //                     className="btn btn-link text-decoration-none small d-block mb-2"
// //                     onClick={() => setShowForgotPassword(true)}
// //                   >
// //                     Forgot Password?
// //                   </button>
// //                 )}
// //                 <button
// //                   type="button"
// //                   className="btn btn-link text-decoration-none small"
// //                   onClick={() => setIsLogin(!isLogin)}
// //                 >
// //                   {isLogin
// //                     ? "New user? Create account"
// //                     : "Already have an account? Login"}
// //                 </button>
// //               </div>
// //             </form>
// //           )}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default EmpLogin;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import apiService from "../services/apiService";

// const EmpLogin = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth(); // Context se status tracking
//   const [isLogin, setIsLogin] = useState(true);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);

//   // Redirect if already logged in
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/profile");
//     }
//   }, [isAuthenticated, navigate]);

//   // FIXED: Added 'phone' field to state to match backend schema requirements
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     name: "",
//     phone: "", 
//     location: "",
//     pinCode: "",
//     address: "",
//   });

//   const [forgotPasswordData, setForgotPasswordData] = useState({
//     email: ""
//   });

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.id]: e.target.value });

//   const handleForgotPasswordChange = (e) =>
//     setForgotPasswordData({ ...forgotPasswordData, [e.target.id]: e.target.value });

//   // Main Form Submit Handler for Login & Register
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setMessage("");

//     try {
//       if (isLogin) {
//         // REAL LOGIN API CALL
//         const credentials = { email: formData.email, password: formData.password };
//         const result = await apiService.login(credentials);

//         if (result.success) {
//           alert("Welcome Back! Login Successful.");
//           navigate("/profile");
//           window.location.reload(); // State refresh karne ke liye
//         }
//       } else {
//         // REAL REGISTRATION API CALL
//         const result = await apiService.register(formData);

//         if (result.success) {
//           alert("Registration Successful! Please Login.");
//           setIsLogin(true); // Switch to login view on success
//         }
//       }
//     } catch (err) {
//       alert(err.message || "Authentication failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Forgot Password Action Handler
//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setMessage("");

//     try {
//       await apiService.forgotPassword(forgotPasswordData.email);
//       setMessage("Password reset link has been sent to your email. Please check your inbox.");
//       setForgotPasswordData({ email: "" });
//     } catch (err) {
//       setError(err.message || "Failed to send reset link. Please try again.");
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
//           <h4 className="mb-0">
//             {showForgotPassword ? "Forgot Password" : isLogin ? "Employee Login" : "Employee Registration"}
//           </h4>
//         </div>
//         <div className="card-body p-4">
//           {showForgotPassword ? (
//             // FORGOT PASSWORD FORM
//             <form onSubmit={handleForgotPassword}>
//               {message && <div className="alert alert-success small mb-3">{message}</div>}
//               {error && <div className="alert alert-danger small mb-3">{error}</div>}

//               <div className="mb-3">
//                 <label className="small mb-1 text-muted">Email Address</label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="form-control"
//                   placeholder="name@company.com"
//                   value={forgotPasswordData.email}
//                   onChange={handleForgotPasswordChange}
//                   required
//                 />
//               </div>

//               <button type="submit" className="btn btn-primary w-100 mb-3 py-2 fw-bold" disabled={loading}>
//                 {loading ? "Sending..." : "Send Reset Link"}
//               </button>

//               <div className="text-center">
//                 <button
//                   type="button"
//                   className="btn btn-link text-decoration-none small"
//                   onClick={() => {
//                     setShowForgotPassword(false);
//                     setMessage("");
//                     setError("");
//                   }}
//                 >
//                   Back to Login
//                 </button>
//               </div>
//             </form>
//           ) : (
//             // MAIN LOGIN / REGISTRATION FORM
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="small mb-1 text-muted">Email Address</label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="form-control"
//                   placeholder="name@company.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {!isLogin && (
//                 <>
//                   <div className="mb-3">
//                     <label className="small mb-1 text-muted">Full Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       className="form-control"
//                       placeholder="John Doe"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   {/* FIXED: Added working Phone Number field integrated with express-validator format */}
//                   <div className="mb-3">
//                     <label className="small mb-1 text-muted">Phone Number (10 Digits)</label>
//                     <input
//                       type="text"
//                       id="phone"
//                       className="form-control"
//                       placeholder="9876543210"
//                       pattern="[0-9]{10}"
//                       maxLength="10"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="row g-2 mb-3">
//                     <div className="col-md-7">
//                       <label className="small mb-1 text-muted">City</label>
//                       <input
//                         type="text"
//                         id="location"
//                         className="form-control"
//                         placeholder="City"
//                         value={formData.location}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="col-md-5">
//                       <label className="small mb-1 text-muted">PIN</label>
//                       <input
//                         type="number"
//                         id="pinCode"
//                         className="form-control"
//                         placeholder="000000"
//                         value={formData.pinCode}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="mb-3">
//                     <label className="small mb-1 text-muted">Full Address</label>
//                     <textarea
//                       id="address"
//                       className="form-control"
//                       rows="2"
//                       placeholder="Street, Building, etc."
//                       value={formData.address}
//                       onChange={handleChange}
//                     ></textarea>
//                   </div>
//                 </>
//               )}

//               <div className="mb-4">
//                 <label className="small mb-1 text-muted">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="form-control"
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <button type="submit" className="btn btn-primary w-100 mb-3 py-2 fw-bold" disabled={loading}>
//                 {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
//               </button>

//               <div className="text-center">
//                 {isLogin && (
//                   <button
//                     type="button"
//                     className="btn btn-link text-decoration-none small d-block mb-2"
//                     onClick={() => setShowForgotPassword(true)}
//                   >
//                     Forgot Password?
//                   </button>
//                 )}
//                 <button
//                   type="button"
//                   className="btn btn-link text-decoration-none small"
//                   onClick={() => setIsLogin(!isLogin)}
//                 >
//                   {isLogin ? "New user? Create account" : "Already have an account? Login"}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EmpLogin;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiService from "../services/apiService";

const EmpLogin = () => {
  const navigate = useNavigate();
  // FIXED: Destructured auth functions from context to handle internal state updates
  const { isAuthenticated, setUser, setIsAuthenticated } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Guard Clause Redirect Hook
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    location: "",
    pinCode: "",
    address: "",
  });

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleForgotPasswordChange = (e) =>
    setForgotPasswordData({ ...forgotPasswordData, [e.target.id]: e.target.value });

  // Main Form Submit Handler for Login & Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (isLogin) {
        // REAL LOGIN API CALL
        const credentials = { email: formData.email, password: formData.password };
        const result = await apiService.login(credentials);

        if (result.success) {
          // FIXED: Bypassing Token payload into local storage state manually before routing jump
          if (result.data && result.data.token) {
            localStorage.setItem('token', result.data.token);
          }

          // Update AuthContext state with user data
          if (result.data && result.data.user) {
            localStorage.setItem('activeUser', JSON.stringify(result.data.user));
            // Manually update AuthContext state
            setUser(result.data.user);
            setIsAuthenticated(true);
          }

          alert("Welcome Back! Login Successful.");

          // Redirect to profile page immediately after login
          window.location.href = "/profile";
        }
      } else {
        // REAL REGISTRATION API CALL
        const result = await apiService.register(formData);

        if (result.success) {
          alert("Registration Successful! Please Login.");
          setIsLogin(true); // Switch to login view on success
        }
      }
    } catch (err) {
      alert(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Action Handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await apiService.forgotPassword(forgotPasswordData.email);
      setMessage("Password reset link has been sent to your email. Please check your inbox.");
      setForgotPasswordData({ email: "" });
    } catch (err) {
      setError(err.message || "Failed to send reset link. Please try again.");
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
          <h4 className="mb-0">
            {showForgotPassword ? "Forgot Password" : isLogin ? "Employee Login" : "Employee Registration"}
          </h4>
        </div>
        <div className="card-body p-4">
          {showForgotPassword ? (
            // FORGOT PASSWORD FORM
            <form onSubmit={handleForgotPassword}>
              {message && <div className="alert alert-success small mb-3">{message}</div>}
              {error && <div className="alert alert-danger small mb-3">{error}</div>}

              <div className="mb-3">
                <label className="small mb-1 text-muted">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="name@company.com"
                  value={forgotPasswordData.email}
                  onChange={handleForgotPasswordChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3 py-2 fw-bold" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none small"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setMessage("");
                    setError("");
                  }}
                >
                  Back to Login
                </button>
              </div>
            </form>
          ) : (
            // MAIN LOGIN / REGISTRATION FORM
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="small mb-1 text-muted">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {!isLogin && (
                <>
                  <div className="mb-3">
                    <label className="small mb-1 text-muted">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="small mb-1 text-muted">Phone Number (10 Digits)</label>
                    <input
                      type="text"
                      id="phone"
                      className="form-control"
                      placeholder="9876543210"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-md-7">
                      <label className="small mb-1 text-muted">City</label>
                      <input
                        type="text"
                        id="location"
                        className="form-control"
                        placeholder="City"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-5">
                      <label className="small mb-1 text-muted">PIN</label>
                      <input
                        type="number"
                        id="pinCode"
                        className="form-control"
                        placeholder="000000"
                        value={formData.pinCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1 text-muted">Full Address</label>
                    <textarea
                      id="address"
                      className="form-control"
                      rows="2"
                      placeholder="Street, Building, etc."
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </>
              )}

              <div className="mb-4">
                <label className="small mb-1 text-muted">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3 py-2 fw-bold" disabled={loading}>
                {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              </button>

              <div className="text-center">
                {isLogin && (
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none small d-block mb-2"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot Password?
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-link text-decoration-none small"
                  onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "New user? Create account" : "Already have an account? Login"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
export default EmpLogin;