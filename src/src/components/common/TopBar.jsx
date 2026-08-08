import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaUsers,
  FaUser,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // Integrated Auth
import { useAuth } from "../../context/AuthContext";

const TopBar = () => {
  const { isAuthenticated } = useAuth(); // Check if user is logged in

  return (
    <>
      {/* ================= TOP DARK BAR ================= */}
      <div className="bg-dark text-white h-40">
        <div className="container-fluid px-3 px-lg-5 py-3">
          <div className="row align-items-center g-3">

            {/* ================= CONTACT DETAILS ================= */}
            <div className="col-12 col-lg-7">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start flex-wrap gap-3 gap-lg-4">
                <div className="d-flex align-items-center gap-2 text-nowrap">
                  <FaMapMarkerAlt className="text-warning fs-5" />
                  <span>New Berry Road Lucknow</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-nowrap">
                  <FaPhoneAlt className="text-warning fs-5" />
                  <span>Phone 0522-2207400</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-nowrap">
                  <FaEnvelope className="text-warning fs-5" />
                  <span>info@vanisystems.com</span>
                </div>
              </div>
            </div>

            {/* ================= LOGIN + SEARCH ================= */}
            <div className="col-12 col-lg-5">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-end gap-4">

                {/* DYNAMIC NAVIGATION: EMP LOGIN OR PROFILE */}
                <Link
                  to={isAuthenticated ? "/profile" : "/emp-login"}
                  className="text-white text-decoration-none"
                >
                  <div className="text-center">
                    <FaUsers className="text-warning fs-5 mb-1" />
                    <div>
                      <span>{isAuthenticated ? "Profile" : "Emp"}</span>
                      <br />
                      <span>{isAuthenticated ? "Page" : "Login"}</span>
                    </div>
                  </div>
                </Link>

                {/* ================= ADMIN LOGIN ================= */}
                <Link to="/admin-login" className="text-white text-decoration-none">
                  <div className="text-center">
                    <FaUser className="text-warning fs-5 mb-1" />
                    <div>
                      <span>Admin</span>
                      <br />
                      <span>Login</span>
                    </div>
                  </div>
                </Link>

                {/* ================= SEARCH ================= */}
                <div className="d-none d-md-block">
                  <div className="text-center fw-bold mb-1 small">Search for:</div>
                  <div className="input-group input-group-sm">
                    <input type="text" className="form-control" placeholder="Search ..." />
                    <button className="btn btn-warning text-white fw-semibold px-3">Search</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMPANY INFO BAR ================= */}
      <div className="bg-white border-bottom">
        <div className="container-fluid px-3 px-lg-5 py-3">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-4 text-center text-lg-start">
              <img
                src="https://vanisystems.in/images/logo.png"
                alt="Vanisystems Pvt Ltd"
                className="img-fluid"
                style={{ maxHeight: "50px" }}
              />
            </div>
            <div className="col-12 col-md-4 col-lg-3">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3">
                <FaMapMarkerAlt className="text-warning fs-3" />
                <div>
                  <div className="fw-bold">Visit our Location :</div>
                  <div className="text-secondary small">New Berry Road Lucknow</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-2">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3">
                <FaClock className="text-warning fs-3" />
                <div>
                  <div className="fw-bold">Opening Hours :</div>
                  <div className="text-secondary small text-nowrap">Mon - Fri: 9am - 7pm</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-3">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3">
                <FaEnvelope className="text-warning fs-3" />
                <div>
                  <div className="fw-bold">Send us a Mail:</div>
                  <div className="text-secondary small">Info@vanisystems.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;