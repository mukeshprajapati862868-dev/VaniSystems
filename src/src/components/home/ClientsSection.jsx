// src/components/home/ClientsSection.jsx

import React, { useEffect, useState } from "react";

const clients = [
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg",
    name: "Government of India",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Forest_Department_Logo.png",
    name: "Forest Department",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/9e/Seal_of_Uttar_Pradesh.svg",
    name: "Uttar Pradesh Government",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7a/Emblem_of_Uttar_Pradesh.svg",
    name: "Uttar Pradesh",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg",
    name: "Government Client",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Forest_Department_Logo.png",
    name: "Forest Department",
  },
];

const ClientsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  /* RESPONSIVE CARDS */
  useEffect(() => {
    const updateVisibleCards = () => {
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

    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  /* AUTO SLIDER - 5 SECOND */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = clients.length - visibleCards;

        if (prev >= maxIndex) {
          return 0;
        }

        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [visibleCards]);

  const maxIndex = clients.length - visibleCards;

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0;
      }

      return prev + 1;
    });
  };

  const previousSlide = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex;
      }

      return prev - 1;
    });
  };

  return (
    <section className="py-5 bg-light">

      <div className="container">

        {/* TITLE */}
        <div className="row mb-4">

          <div className="col-12 col-lg-3 col-md-6">

            <div className="border-start border-warning border-4 ps-3">

              <h2 className="fw-bold text-dark mb-0">
                Clients
              </h2>

            </div>

          </div>

        </div>

        {/* SLIDER */}
        <div className="position-relative">

          {/* PREVIOUS */}
          <button
            type="button"
            onClick={previousSlide}
            className="btn btn-warning rounded-circle position-absolute top-50 start-0 translate-middle-y d-none d-md-flex align-items-center justify-content-center shadow"
            style={{
              width: "45px",
              height: "45px",
              zIndex: 5,
            }}
          >
            <span className="fs-3 text-white">
              ‹
            </span>
          </button>

          {/* SLIDER CONTAINER */}
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

              {clients.map((client, index) => (

                <div
                  key={index}
                  className="flex-shrink-0 px-2"
                  style={{
                    width: `${100 / visibleCards}%`,
                  }}
                >

                  <div
                    className="bg-white border rounded shadow-sm d-flex align-items-center justify-content-center p-4"
                    style={{
                      height: "170px",
                    }}
                  >

                    <img
                      src={client.image}
                      alt={client.name}
                      className="img-fluid"
                      style={{
                        maxHeight: "105px",
                        maxWidth: "85%",
                        objectFit: "contain",
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* NEXT */}
          <button
            type="button"
            onClick={nextSlide}
            className="btn btn-warning rounded-circle position-absolute top-50 end-0 translate-middle-y d-none d-md-flex align-items-center justify-content-center shadow"
            style={{
              width: "45px",
              height: "45px",
              zIndex: 5,
            }}
          >
            <span className="fs-3 text-white">
              ›
            </span>
          </button>

        </div>

        {/* DOTS */}
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

      </div>

    </section>
  );
};

export default ClientsSection;