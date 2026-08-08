// src/components/home/EventsPhotos.jsx

import React, { useEffect, useState } from "react";

const events = [
  {
    image:
      "https://vanisystems.in/images/news/5.jpg",
    title: "Corporate Event",
  },
  {
    image:
      "https://vanisystems.in/images/news/7.jpg",
    title: "Annual Ceremony",
  },
  {
    image:
      "https://vanisystems.in/images/news/8.jpg",
    title: "Company Celebration",
  },
  {
    image:
      "https://vanisystems.in/images/news/9.jpg",
    title: "Special Event",
  },
  {
    image:
      "https://vanisystems.in/images/news/9.jpg",
    title: "Business Conference",
  },
  {
    image:
      "https://vanisystems.in/images/news/2.jpg",
    title: "Team Event",
  },
  {
    image:
      "https://vanisystems.in/images/news/1.jpg",
    title: "Corporate Meeting",
  },
  {
    image:
      "https://vanisystems.in/images/news/2.jpg",
    title: "Company Function",
  },
];

const EventsPhotos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  /* ================= RESPONSIVE CARD COUNT ================= */
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 576) {
        setVisibleCards(1);
      } else if (window.innerWidth < 768) {
        setVisibleCards(2);
      } else if (window.innerWidth < 992) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateCards();

    window.addEventListener("resize", updateCards);

    return () => {
      window.removeEventListener("resize", updateCards);
    };
  }, []);

  /* ================= AUTO SLIDE 5 SECOND ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = events.length - visibleCards;

        if (prevIndex >= maxIndex) {
          return 0;
        }

        return prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [visibleCards]);

  const maxIndex = events.length - visibleCards;

  /* ================= NEXT ================= */
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) {
        return 0;
      }

      return prevIndex + 1;
    });
  };

  /* ================= PREVIOUS ================= */
  const previousSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return maxIndex;
      }

      return prevIndex - 1;
    });
  };

  return (
    <section className="py-5 bg-light">

      <div className="container">

        {/* ================= HEADER ================= */}
        <div className="row align-items-center g-4 mb-5">

          <div className="col-12 col-lg-3 col-md-6">

            <div className="border-start border-warning border-4 ps-3">

              <h2 className="fw-bold text-dark mb-0">
                Events Photos
              </h2>

            </div>

          </div>

          <div className="col-12 col-lg-8 col-md-6">

            <p className="text-secondary mb-0 fs-5">
              Events & Ceremony of Vanisystems(p) Ltd. Photos
            </p>

          </div>

        </div>

        {/* ================= SLIDER ================= */}
        <div className="position-relative">

          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            onClick={previousSlide}
            className="btn btn-warning rounded-circle position-absolute top-50 start-0 translate-middle-y d-none d-md-flex align-items-center justify-content-center shadow"
            style={{
              width: "48px",
              height: "48px",
              zIndex: 5,
            }}
          >
            <span className="fs-3 text-white">
              ‹
            </span>
          </button>

          {/* SLIDER VIEW */}
          <div className="overflow-hidden px-0 px-md-5">

            <div
              className="d-flex"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleCards)
                }%)`,
                transition: "transform 0.8s ease-in-out",
              }}
            >

              {events.map((event, index) => (

                <div
                  key={index}
                  className="flex-shrink-0 px-2"
                  style={{
                    width: `${100 / visibleCards}%`,
                  }}
                >

                  {/* PROFESSIONAL CARD */}
                  <div
                    className="card border-0 shadow-sm overflow-hidden h-100"
                    style={{
                      borderRadius: "14px",
                    }}
                  >

                    {/* IMAGE */}
                    <div
                      className="position-relative overflow-hidden"
                      style={{
                        height: "260px",
                      }}
                    >

                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                        }}
                      />

                      {/* DARK OVERLAY */}
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{
                          background:
                            "rgba(0, 0, 0, 0.25)",
                        }}
                      >

                        <div
                          className="rounded-circle bg-warning d-flex align-items-center justify-content-center shadow"
                          style={{
                            width: "55px",
                            height: "55px",
                          }}
                        >

                          <span className="text-white fs-3">
                            ↗
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* CARD FOOTER */}
                    <div className="p-3 bg-white">

                      <div className="d-flex align-items-center justify-content-between">

                        <h5 className="fw-bold mb-0 text-dark">
                          {event.title}
                        </h5>

                        <span className="text-warning fs-4">
                          →
                        </span>

                      </div>

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
            className="btn btn-warning rounded-circle position-absolute top-50 end-0 translate-middle-y d-none d-md-flex align-items-center justify-content-center shadow"
            style={{
              width: "48px",
              height: "48px",
              zIndex: 5,
            }}
          >
            <span className="fs-3 text-white">
              ›
            </span>
          </button>

        </div>

        {/* ================= DOTS ================= */}
        <div className="d-flex justify-content-center gap-2 mt-4">

          {Array.from({
            length: maxIndex + 1,
          }).map((_, index) => (

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

        {/* ================= READ MORE ================= */}
        <div className="text-center mt-4">

          <a
            href="/photo-gallery"
            className="btn btn-warning text-white fw-semibold px-4 py-2"
          >
            Read More
          </a>

        </div>

      </div>

    </section>
  );
};

export default EventsPhotos;