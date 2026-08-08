import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiService from "../services/apiService";
import {
  FaUserShield,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isLocked) {
      setError("Too many failed attempts. Please try again later.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await apiService.login({
        email: email.trim(),
        password,
      });
      const loggedInUser = result?.data?.user;

      if (!result.success || !loggedInUser) {
        throw new Error("Login failed");
      }

      if (loggedInUser.role !== "admin" && loggedInUser.role !== "Admin") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("activeUser");
        setUser(null);
        setIsAuthenticated(false);
        throw new Error("This account does not have admin access.");
      }

      localStorage.setItem("activeUser", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setIsAuthenticated(true);
      setFailedAttempts(0);

      navigate("/admin-panel", {
        replace: true,
      });
    } catch (err) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 5) {
        setIsLocked(true);
        setError("Login locked after 5 failed attempts.");
      } else {
        setError(
          err.message || `Invalid credentials. ${5 - newAttempts} attempts remaining.`,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        background: "linear-gradient(135deg, #0d2744, #123f68)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              {/* HEADER */}
              <div
                className="text-center text-white p-4"
                style={{
                  backgroundColor: "#0d2744",
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "50%",
                    backgroundColor: "#f5b400",
                  }}
                >
                  <FaUserShield
                    className="text-dark"
                    style={{
                      fontSize: "38px",
                    }}
                  />
                </div>

                <h3 className="fw-bold mb-1">Admin Login</h3>

                <p className="mb-0 text-light">Secure Administration Panel</p>
              </div>

              {/* BODY */}
              <div className="card-body p-4 p-md-5">
                {/* SECURITY INFO */}
                <div
                  className="alert alert-info d-flex align-items-center gap-2 small"
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <FaShieldAlt />

                  <span>Authorized admin access only</span>
                </div>

                {/* ERROR */}
                {error && (
                  <div
                    className="alert alert-danger text-center small"
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* FORM */}
                <form onSubmit={handleLogin}>
                  {/* EMAIL */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Admin Email</label>

                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FaUserShield className="text-primary" />
                      </span>

                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter admin email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        disabled={isLocked || loading}
                        required
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Password</label>

                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FaLock className="text-primary" />
                      </span>

                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        disabled={isLocked || loading}
                        required
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLocked || loading}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* LOGIN BUTTON */}
                  <button
                    type="submit"
                    className="btn btn-warning w-100 fw-bold py-3"
                    disabled={isLocked || loading}
                    style={{
                      borderRadius: "8px",
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Authenticating...
                      </>
                    ) : (
                      "Login to Admin Panel"
                    )}
                  </button>
                </form>

                {/* SECURITY FOOTER */}
                <div className="text-center mt-4">
                  <small className="text-muted">
                    🔒 Protected Admin Access
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
