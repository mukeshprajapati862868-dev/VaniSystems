// src/components/common/Footer.jsx

import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaSkype,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const footerLinkStyle = (linkName) => ({
    color: "#ffffff",
    textDecorationLine:
      hoveredLink === linkName ? "underline" : "none",
    textDecorationColor: "#ffc107",
    textDecorationThickness: "2px",
    textUnderlineOffset: "6px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  });

  return (
    <footer
      className="text-white"
      style={{
        backgroundColor: "#0d2744",
      }}
    >

      {/* ================= MAIN FOOTER ================= */}
      <div className="container py-5">

        <div className="row g-5">

          {/* ================= COMPANY ================= */}
          <div className="col-12 col-md-6 col-lg-3">

            <img
              src="https://vanisystems.in/images/footer-logo.png"
              alt="ISO Certified"
              className="img-fluid mb-3"
              style={{
                maxWidth: "230px",
                height: "auto",
              }}
            />

            <p className="mb-0 lh-lg">

              Vani Systems (P) Limited is Incorporated
              under Registrar of Companies Act
              1956. The Vani Systems is an ISO 9001-
              2008, ISO 27001:2013 certified private
              limited.

            </p>

          </div>

          {/* ================= OUR SERVICES ================= */}
          <div className="col-12 col-sm-6 col-lg-3">

            <h4 className="text-warning mb-4">
              Our Services
            </h4>

            <ul className="list-unstyled">

              {[
                "Application Development",
                "Consultent Service",
                "Manpower Service",
              ].map((item, index) => (

                <li key={item} className="mb-3">

                  <a
                    href="#"
                    style={footerLinkStyle(`service-${index}`)}
                    onMouseEnter={() =>
                      setHoveredLink(`service-${index}`)
                    }
                    onMouseLeave={() =>
                      setHoveredLink(null)
                    }
                  >
                    {item}
                  </a>

                </li>

              ))}

            </ul>

          </div>

          {/* ================= ABOUT ================= */}
          <div className="col-12 col-sm-6 col-lg-3">

            <h4 className="text-warning mb-4">
              About us
            </h4>

            <ul className="list-unstyled">

              {[
                "Profiles",
                "Milestones",
                "Our Team",
                "Employee List",
                "Latest Information",
              ].map((item, index) => (

                <li key={item} className="mb-3">

                  <a
                    href="#"
                    style={footerLinkStyle(`about-${index}`)}
                    onMouseEnter={() =>
                      setHoveredLink(`about-${index}`)
                    }
                    onMouseLeave={() =>
                      setHoveredLink(null)
                    }
                  >
                    {item}
                  </a>

                </li>

              ))}

            </ul>

          </div>

          {/* ================= LINKS ================= */}
          <div className="col-12 col-sm-6 col-lg-3">

            <h4 className="text-warning mb-4">
              Links
            </h4>

            <ul className="list-unstyled">

              {[
                "Privacy Policy",
                "Terms & Conditions",
                "Refund and Cancellation policy",
                "Advertisment",
                "Emp Login",
                "Admin Login",
              ].map((item, index) => (

                <li key={item} className="mb-3">

                  <a
                    href="#"
                    style={footerLinkStyle(`link-${index}`)}
                    onMouseEnter={() =>
                      setHoveredLink(`link-${index}`)
                    }
                    onMouseLeave={() =>
                      setHoveredLink(null)
                    }
                  >
                    {item}
                  </a>

                </li>

              ))}

            </ul>

          </div>

        </div>

      </div>

      {/* ================= COPYRIGHT ================= */}
      <div
        style={{
          backgroundColor: "#081b31",
        }}
      >

        <div className="container py-3">

          <div className="row align-items-center g-3">

            {/* COPYRIGHT */}
            <div className="col-12 col-md-8 text-center text-md-start">

              <span>
                Copyright @ 2018{" "}
                <span className="text-warning fw-semibold">
                  Vanisystems(P).Ltd.
                </span>
                , All Right Reserved
              </span>

            </div>

            {/* SOCIAL ICONS */}
            <div className="col-12 col-md-4">

              <div className="d-flex justify-content-center justify-content-md-end gap-4">

                <a
                  href="#"
                  className="text-white fs-5"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="text-white fs-5"
                >
                  <FaTwitter />
                </a>

                <a
                  href="#"
                  className="text-white fs-5"
                >
                  <FaSkype />
                </a>

                <a
                  href="#"
                  className="text-white fs-5"
                >
                  <FaInstagram />
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;