import React, { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Corporate Training",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Enterprise Solution",
    image:
      "https://vanisystems.in/images/services/service2.jpg",
  },
  {
    title: "Networking Consulting",
    image:
      "https://vanisystems.in/images/services/service3.jpg",
  },
  {
    title: "Civil Engineering",
    image:
      "https://vanisystems.in/images/services/service4.jpg",
  },
  {
    title: "GIS Consultant",
    image:
      "https://vanisystems.in/images/services/service5.jpg",
  },
  {
    title: "MIS Consultant",
    image:
      "https://vanisystems.in/images/services/service6.jpg",
  },
];

const ServicesHeading = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  const sliderRef = useRef(null);

  /* ================= RESPONSIVE CARD COUNT ================= */
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 576) {
        setVisibleCards(1);
      } else if (window.innerWidth < 768) {
        setVisibleCards(2);
      } else if (window.innerWidth < 992) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    updateCards();

    window.addEventListener("resize", updateCards);

    return () => {
      window.removeEventListener("resize", updateCards);
    };
  }, []);

  /* ================= AUTO SLIDE 5 SECONDS ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = services.length - visibleCards;

        if (prevIndex >= maxIndex) {
          return 0;
        }

        return prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [visibleCards]);

  /* ================= SLIDE POSITION ================= */
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${
        currentIndex * (100 / visibleCards)
      }%)`;
    }
  }, [currentIndex, visibleCards]);

  /* ================= NEXT ================= */
  const nextSlide = () => {
    const maxIndex = services.length - visibleCards;

    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) {
        return 0;
      }

      return prevIndex + 1;
    });
  };

  /* ================= PREVIOUS ================= */
  const previousSlide = () => {
    const maxIndex = services.length - visibleCards;

    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return maxIndex;
      }

      return prevIndex - 1;
    });
  };

  return (
    <section className="py-5 bg-white">

      <div className="container">

        {/* ================= HEADER ================= */}
        <div className="row align-items-center g-4 mb-5">

          <div className="col-12 col-lg-3 col-md-4">

            <div className="border-start border-warning border-4 ps-3">

              <h2 className="fw-bold text-dark mb-0">
                Our Services
              </h2>

            </div>

          </div>

          <div className="col-12 col-lg-8 col-md-8">

            <p className="text-secondary lh-lg mb-0">

              We are a top notch enterprise solution provider in India.
              We render all sorts of Placement Consultancy, Corporate
              Training Services, Enterprise Solution and Network Consulting
              Services in Lucknow. We also offer entire range of solutions
              for Information Technology and HRM sector including IT services
              and enterprise empowerment.

            </p>

          </div>

        </div>

        {/* ================= SERVICE SLIDER ================= */}
        <div className="position-relative">

          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            onClick={previousSlide}
            className="btn btn-warning position-absolute top-50 start-0 translate-middle-y rounded-circle shadow d-none d-md-flex align-items-center justify-content-center"
            style={{
              width: "45px",
              height: "45px",
              zIndex: 5,
            }}
          >
            <span className="fs-4 text-white">
              ‹
            </span>
          </button>

          {/* SLIDER VIEW */}
          <div className="overflow-hidden px-0 px-md-5">

            <div
              ref={sliderRef}
              className="d-flex"
              style={{
                transition: "transform 0.8s ease-in-out",
              }}
            >

              {services.map((service, index) => (

                <div
                  key={index}
                  className="flex-shrink-0 px-2"
                  style={{
                    width: `${100 / visibleCards}%`,
                  }}
                >

                  <div className="card border-0 rounded-0 shadow-sm h-100 overflow-hidden">

                    {/* IMAGE */}
                    <div
                      className="position-relative overflow-hidden"
                      style={{
                        height: "230px",
                      }}
                    >

                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                        }}
                      />

                      {/* YELLOW OVERLAY */}
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0"
                        style={{
                          backgroundColor: "rgba(255, 200, 17, 0.8)",
                          transition: "opacity 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.classList.remove("opacity-0");
                          e.currentTarget.classList.add("opacity-100");
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.classList.remove("opacity-100");
                          e.currentTarget.classList.add("opacity-0");
                        }}
                      >

                        <span className="text-white fs-1">
                          +
                        </span>

                      </div>

                    </div>

                    {/* TITLE */}
                    <div className="p-3 text-center">

                      <h5 className="fw-bold mb-0">

                        <a
                          href="#"
                          className="text-dark text-decoration-none"
                        >
                          {service.title}
                        </a>

                      </h5>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* NEXT BUTTON */}
          <button
            type="button"
            onClick={nextSlide}
            className="btn btn-warning position-absolute top-50 end-0 translate-middle-y rounded-circle shadow d-none d-md-flex align-items-center justify-content-center"
            style={{
              width: "45px",
              height: "45px",
              zIndex: 5,
            }}
          >
            <span className="fs-4 text-white">
              ›
            </span>
          </button>

        </div>

        {/* ================= DOTS ================= */}
        <div className="d-flex justify-content-center gap-2 mt-4">

          {services
            .slice(0, services.length - visibleCards + 1)
            .map((_, index) => (

              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`rounded-circle border-0 ${
                  currentIndex === index
                    ? "bg-warning"
                    : "bg-secondary"
                }`}
                style={{
                  width: "10px",
                  height: "10px",
                }}
              ></button>

            ))}

        </div>

      </div>

    </section>
  );
};

export default ServicesHeading;