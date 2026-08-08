import React, { useEffect, useState } from "react";

const InnerPageHero = ({
  subtitle = "The best company ever in India",
  title = "Providing Professional Man Power Services",
  buttonText = "Work With Us Today",
}) => {
  const [imageScroll, setImageScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Image slow movement - 0.1 speed
      setImageScroll(currentScrollY * 0.1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className="position-relative overflow-hidden"
      style={{
        height: "520px",
        width: "100%",
      }}
    >

      {/* SLOW MOVING IMAGE */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=85')",

          backgroundSize: "cover",

          /*
            Page load par:
            image position = 0px

            Scroll hone par:
            image slowly move karegi
          */
          backgroundPosition: `center ${imageScroll}px`,

          transition: "background-position 0.1s linear",

          transform: "scale(1.05)",
        }}
      ></div>

      {/* DARK OVERLAY */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.75), rgba(0,0,0,0.25))",
          zIndex: 1,
        }}
      ></div>

      {/* CONTENT */}
      <div
        className="container h-100 position-relative d-flex align-items-center"
        style={{
          zIndex: 2,
        }}
      >
        <div className="col-12 col-lg-8 text-white">

          {/* SUBTITLE */}
          <div className="text-warning fw-semibold fs-5 mb-3">
            {subtitle}
          </div>

          {/* TITLE */}
          <h1 className="display-4 fw-bold mb-4">
            {title}
          </h1>

          {/* BUTTON */}
          <a
            href="/contact"
            className="btn btn-warning fw-bold px-4 py-3"
          >
            {buttonText}
          </a>

        </div>
      </div>

    </section>
  );
};

export default InnerPageHero;