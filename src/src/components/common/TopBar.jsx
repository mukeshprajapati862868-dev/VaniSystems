import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaUsers,
  FaUser,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TopBar = () => {
  const { isAuthenticated } = useAuth();

  // ================= WHATSAPP CONFIGURATION =================

  const whatsappNumber = "916307058567";

  const whatsappMessage =
    "Hello Vani Systems Pvt. Ltd., I want to know more about your services. Please help me.";

  // Direct WhatsApp chat URL
  // Message will automatically appear in WhatsApp message box
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <>
      {/* ======================================================
          TOP DARK BAR
      ====================================================== */}

      <div className="bg-dark text-white">
        <div className="container-fluid px-3 px-lg-5 py-2">
          <div className="row align-items-center g-3">

            {/* ==================================================
                CONTACT DETAILS
            ================================================== */}

            <div className="col-12 col-lg-7">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start flex-wrap gap-3 gap-lg-4">

                {/* ================= LOCATION ================= */}

                <div className="d-flex align-items-center gap-2 text-nowrap">
                  <FaMapMarkerAlt className="text-warning fs-5" />

                  <span>
                    Paramount Apartment, 15, New Berry Road, Dalibagh Lucknow
                  </span>
                </div>

                {/* ================= PHONE ================= */}

                <a
                  href="tel:05222207400"
                  className="text-white text-decoration-none d-flex align-items-center gap-2 text-nowrap"
                  title="Call Vani Systems"
                >
                  <FaPhoneAlt className="text-warning fs-5" />

                  <span>
                    Phone 0522-2207400
                  </span>
                </a>

                {/* ================= WHATSAPP ================= */}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none d-flex align-items-center gap-2 text-nowrap"
                  title="Chat with Vani Systems on WhatsApp"
                >
                  <FaWhatsapp className="text-success fs-5" />

                  <span>
                    WhatsApp 63070 58567
                  </span>
                </a>

                {/* ================= EMAIL ================= */}

                <a
                  href="mailto:info@vanisystems.com"
                  className="text-white text-decoration-none d-flex align-items-center gap-2 text-nowrap"
                  title="Send Email"
                >
                  <FaEnvelope className="text-warning fs-5" />

                  <span>
                    vanisystems2003@yahoo.co.in
                  </span>
                </a>
              </div>
            </div>

            {/* ==================================================
                LOGIN + SEARCH
            ================================================== */}

            <div className="col-12 col-lg-5">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-end gap-4">

                {/* ================= EMP LOGIN / PROFILE ================= */}

                <Link
                  to={
                    isAuthenticated
                      ? "/profile"
                      : "/emp-login"
                  }
                  className="text-white text-decoration-none"
                >
                  <div className="text-center">

                    <FaUsers className="text-warning fs-5 mb-1" />

                    <div>
                      <span>
                        {isAuthenticated
                          ? "Profile"
                          : "Emp"}
                      </span>

                      <br />

                      <span>
                        {isAuthenticated
                          ? "Page"
                          : "Login"}
                      </span>
                    </div>

                  </div>
                </Link>

                {/* ================= ADMIN LOGIN ================= */}

                <Link
                  to="/admin-login"
                  className="text-white text-decoration-none"
                >
                  <div className="text-center">

                    <FaUser className="text-warning fs-5 mb-1" />

                    <div>
                      <span>
                        Admin
                      </span>

                      <br />

                      <span>
                        Login
                      </span>
                    </div>

                  </div>
                </Link>

                {/* ================= SEARCH ================= */}

                <div className="d-none d-md-block">

                  <div className="text-center fw-bold mb-1 small">
                    Search for:
                  </div>

                  <div className="input-group input-group-sm">

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search ..."
                    />

                    <button
                      type="button"
                      className="btn btn-warning text-white fw-semibold px-3"
                    >
                      Search
                    </button>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ======================================================
          COMPANY INFO BAR
      ====================================================== */}

      <div className="bg-white border-bottom">

        <div className="container-fluid px-3 px-lg-5 py-3">

          <div className="row align-items-center g-4">

            {/* ================= COMPANY LOGO ================= */}

            <div className="col-12 col-lg-4 text-center text-lg-start">

              <img
                src="https://vanisystems.in/images/logo.png"
                alt="Vanisystems Pvt Ltd"
                className="img-fluid"
                style={{
                  maxHeight: "50px",
                }}
              />

            </div>

            {/* ================= LOCATION ================= */}

            <div className="col-12 col-md-4 col-lg-3">

              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3">

                <FaMapMarkerAlt className="text-warning fs-3" />

                <div>

                  <div className="fw-bold">
                    Visit our Location :
                  </div>

                  <div className="text-secondary small">
                    New Berry Road Lucknow
                  </div>

                </div>

              </div>

            </div>

            {/* ================= OPENING HOURS ================= */}

            <div className="col-12 col-md-4 col-lg-2">

              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3">

                <FaClock className="text-warning fs-3" />

                <div>

                  <div className="fw-bold">
                    Opening Hours :
                  </div>

                  <div className="text-secondary small text-nowrap">
                    Mon - Fri: 9am - 7pm
                  </div>

                </div>

              </div>

            </div>

            {/* ================= EMAIL ================= */}

            <div className="col-12 col-md-4 col-lg-3">

              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3">

                <FaEnvelope className="text-warning fs-3" />

                <div>

                  <div className="fw-bold">
                    Send us a Mail:
                  </div>

                  <a
                    href="mailto:info@vanisystems.com"
                    className="text-secondary small text-decoration-none"
                  >
                    vanisystems2003@yahoo.co.in
                  </a>

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
