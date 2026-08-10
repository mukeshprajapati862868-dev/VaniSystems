// src/components/home/HeroSection.jsx

import React from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=85",
    title: "Vanisystems(P). Ltd.",
    subtitle:
      "Company is Incorporated under Registrar of Companies Act 1956",
  },
  {
    image:
      "https://www.shutterstock.com/image-vector/banner-website-development-laptop-template-260nw-2187936595.jpg",
    title: "Professional Services",
    subtitle: "Excellence, Trust & Commitment",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOwydd3xaD22kzSoGaij2rR6Mfd1mkNyWNpw&s",
    title: "Trusted Business Partner",
    subtitle: "Delivering Quality Services Across Industries",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1674641194949-e154719cdc02?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2xpZGVyfGVufDB8fDB8fHww",
    title: "Our Strength Is Our Team",
    subtitle: "Building Success Through Professional Excellence",
  },
];

const HeroSection = () => {
  return (
    <section className="w-100">

      <div
        id="vanisystemsSlider"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="10000"
        data-bs-pause="false"
      >

        {/* INDICATORS */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#vanisystemsSlider"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* SLIDER */}
        <div className="carousel-inner">

          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === 0 ? "active" : ""
              }`}
            >

              <div
                className="position-relative overflow-hidden"
                style={{
                  height: "clamp(500px, 72vh, 750px)",
                  minHeight: "500px",
                }}
              >

                {/* IMAGE */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-100 h-100"
                  style={{
                    objectFit: "cover",
                  }}
                />

                {/* OVERLAY */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.78), rgba(0,0,0,0.35), rgba(0,0,0,0.05))",
                  }}
                ></div>

                {/* CONTENT */}
                <div className="position-absolute top-50 start-0 translate-middle-y w-100">
                  <div className="container">

                    <div className="col-12 col-md-9 col-lg-7">

                      <h1 className="display-3 fw-bold text-white mb-4">
                        {slide.title}
                      </h1>

                      <p className="fs-4 fw-bold text-warning mb-0">
                        {slide.subtitle}
                      </p>

                    </div>

                  </div>
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* PREVIOUS */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#vanisystemsSlider"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Previous
          </span>
        </button>

        {/* NEXT */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#vanisystemsSlider"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Next
          </span>
        </button>

      </div>

    </section>
  );
};

export default HeroSection;
