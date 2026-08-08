import React, { useState } from "react";
import { FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  const { totalItems } = useCart();

  const navStyle = () => ({
    position: "relative",
    color: "#fff",
    fontWeight: "700",
    transition: "all 0.3s ease",
  });

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{
        backgroundColor: "#0d2744",
        zIndex: 9999,
      }}
    >
      <div className="container-fluid px-3 px-lg-5">

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAVBAR */}
        <div
          className="collapse navbar-collapse"
          id="mainNavbar"
        >

          <ul className="navbar-nav align-items-lg-center gap-lg-4">

            {/* HOME */}
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                style={navStyle()}
              >
                Home
              </Link>
            </li>

            {/* ABOUT */}
            <li className="nav-item dropdown">

              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                style={navStyle()}
              >
                About
              </a>

              <ul className="dropdown-menu shadow-lg border-0 rounded-0 mt-2">

                {[
                  ["Profiles", "/profile"],
                  ["Milestones", "/milestones"],
                  ["Our Team", "/team"],
                  ["Employee List", "/employee-list"],
                  ["Latest Information", "/latestinformation"],
                ].map(([title, link]) => (

                  <li key={title}>

                    <Link
                      to={link}
                      className="dropdown-item py-2 px-3"
                      onMouseEnter={() =>
                        setHoveredDropdown(title)
                      }
                      onMouseLeave={() =>
                        setHoveredDropdown(null)
                      }
                      style={{
                        color:
                          hoveredDropdown === title
                            ? "#f5b400"
                            : "#212529",

                        borderLeft:
                          hoveredDropdown === title
                            ? "4px solid #f5b400"
                            : "4px solid transparent",

                        transition: "all 0.3s ease",
                      }}
                    >
                      {title}
                    </Link>

                  </li>

                ))}

              </ul>

            </li>

            {/* SERVICES */}
            <li className="nav-item dropdown">

              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                style={navStyle()}
              >
                Services
              </a>

              <ul className="dropdown-menu shadow-lg border-0 rounded-0 mt-2">

                {[
                  [
                    "Application Development",
                    "/application-development",
                  ],
                  [
                    "Consultant Service",
                    "/consultant-service",
                  ],
                  [
                    "ManPower Service",
                    "/manpower-service",
                  ],
                  [
                    "Products",
                    "/products",
                  ],
                ].map(([title, link]) => (

                  <li key={title}>

                    <Link
                      to={link}
                      className="dropdown-item py-2 px-3"
                      onMouseEnter={() =>
                        setHoveredDropdown(title)
                      }
                      onMouseLeave={() =>
                        setHoveredDropdown(null)
                      }
                      style={{
                        color:
                          hoveredDropdown === title
                            ? "#f5b400"
                            : "#212529",

                        borderLeft:
                          hoveredDropdown === title
                            ? "4px solid #f5b400"
                            : "4px solid transparent",

                        transition: "all 0.3s ease",
                      }}
                    >
                      {title}
                    </Link>

                  </li>

                ))}

              </ul>

            </li>

            {/* INDUSTRIES */}
            <li className="nav-item dropdown">

              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                style={navStyle()}
              >
                Industries
              </a>

              <ul className="dropdown-menu shadow-lg border-0 rounded-0 mt-2">

                <li>

                  <Link
                    to="/geo-social-service"
                    className="dropdown-item py-2 px-3"
                  >
                    Geo Social Service
                  </Link>

                </li>

              </ul>

            </li>

            {/* MEDIA */}
            <li className="nav-item dropdown">

              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                style={navStyle()}
              >
                Media Gallery
              </a>

              <ul className="dropdown-menu shadow-lg border-0 rounded-0 mt-2">

                <li>
                  <a
                    className="dropdown-item py-2 px-3"
                    href="/photo-gallery"
                  >
                    Photo Gallery
                  </a>
                </li>

                <li>
                  <a
                    className="dropdown-item py-2 px-3"
                    href="/video-gallery"
                  >
                    Video Gallery
                  </a>
                </li>

                <li>
                  <a
                    className="dropdown-item py-2 px-3"
                    href="/press-release"
                  >
                    Press Release
                  </a>
                </li>

              </ul>

            </li>

            {/* CAREER */}
            <li className="nav-item">

              <Link
                to="/career"
                className="nav-link"
                style={navStyle()}
              >
                Career
              </Link>

            </li>

            {/* CONTACT */}
            <li className="nav-item">

              <Link
                to="/contact"
                className="nav-link"
                style={navStyle()}
              >
                Contact Us
              </Link>

            </li>

            {/* CART */}
            <li className="nav-item">

              <Link
                to="/cart"
                className="nav-link text-white fs-4 position-relative"
                style={{
                  transition: "all 0.3s ease",
                }}
              >

                <FaShoppingCart />

                {totalItems > 0 && (

                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{
                      fontSize: "11px",
                      minWidth: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {totalItems}
                  </span>

                )}

              </Link>

            </li>

          </ul>

          {/* CONTACT NUMBER */}
          <div className="ms-auto d-flex align-items-center text-white gap-3 mt-3 mt-lg-0">

            <FaPhoneAlt className="fs-4 text-warning" />

            <div className="lh-sm">

              <small className="text-light">
                Contact Number
              </small>

              <br />

              <strong>
                0522-2207400
              </strong>

            </div>

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Header;