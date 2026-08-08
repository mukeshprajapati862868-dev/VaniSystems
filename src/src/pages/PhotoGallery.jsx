
import React, { useEffect, useState } from "react";

// Gallery Context se images receive karta hai
import { useGallery } from "../context/GalleryContext";

// Photo Gallery Component
const PhotoGallery = () => {

  // Context se live gallery images leta hai
  const { galleryImages } = useGallery();

  // Current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // ======================================================
  // AUTOMATIC IMAGE SCROLL - EVERY 5 SECONDS
  // ======================================================

  useEffect(() => {

    if (galleryImages.length <= 1) {
      return;
    }

    const interval = setInterval(() => {

      setCurrentIndex((previousIndex) => {

        return (
          (previousIndex + 1) %
          galleryImages.length
        );

      });

    }, 5000);

    return () => clearInterval(interval);

  }, [galleryImages.length]);

  // ======================================================
  // RESET INDEX WHEN IMAGES CHANGE
  // ======================================================

  useEffect(() => {

    if (
      galleryImages.length === 0 ||
      currentIndex >= galleryImages.length
    ) {

      setCurrentIndex(0);

    }

  }, [
    galleryImages.length,
    currentIndex,
  ]);

  return (

    <section
      className="py-4 py-md-5"
      style={{
        backgroundColor: "#ffffff",
      }}
    >

      <div className="container">

        {/* ==================================================
            EVENT PHOTO HEADING
        ================================================== */}

        <div className="text-center mb-4 mb-md-5">

          <h2
            className="fw-bold mb-2"
            style={{
              color: "#0d2744",
            }}
          >
            Event Photo
          </h2>

          <p className="text-muted mb-0">
            Our Latest Event Photos
          </p>

        </div>

        {/* ==================================================
            RESPONSIVE GALLERY
        ================================================== */}

        <div className="row g-4">

          {/* ==================================================
              NO PHOTO
          ================================================== */}

          {galleryImages.length === 0 ? (

            <div className="col-12">

              <div
                className="text-center py-5"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#f8f9fa",
                }}
              >

                <h4 className="text-muted">
                  No Photos Available
                </h4>

              </div>

            </div>

          ) : (

            /* ==================================================
               IMAGE CARD
            ================================================== */

            <div className="col-12">

              <div
                className="event-photo-card"
                style={{
                  position: "relative",
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: "22px",
                  backgroundColor: "#ffffff",
                  boxShadow:
                    "0 8px 30px rgba(0, 0, 0, 0.12)",
                  transition:
                    "transform 0.4s ease, box-shadow 0.4s ease",
                }}
              >

                {/* ==================================================
                    IMAGE WRAPPER
                ================================================== */}

                <div
                  style={{
                    width: "100%",
                    height: "clamp(260px, 55vw, 520px)",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#f1f3f5",
                  }}
                >

                  {galleryImages.map(
                    (image, index) => (

                      <img
                        key={
                          image.id ||
                          image._id ||
                          index
                        }
                        src={image.url}
                        alt={
                          image.name ||
                          "Event Photo"
                        }
                        className="event-photo-image"
                        style={{
                          position: "absolute",
                          inset: 0,

                          width: "100%",
                          height: "100%",

                          objectFit: "cover",

                          display:
                            index === currentIndex
                              ? "block"
                              : "none",

                          transition:
                            "transform 0.6s ease, opacity 0.6s ease",

                          transform:
                            index === currentIndex
                              ? "scale(1)"
                              : "scale(1.05)",
                        }}
                      />

                    )
                  )}

                </div>

                {/* ==================================================
                    IMAGE NUMBER
                ================================================== */}

                {galleryImages.length > 1 && (

                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      zIndex: 5,
                      padding: "6px 12px",
                      borderRadius: "20px",
                      backgroundColor:
                        "rgba(0, 0, 0, 0.55)",
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: "600",
                      backdropFilter: "blur(5px)",
                    }}
                  >

                    {currentIndex + 1} /{" "}
                    {galleryImages.length}

                  </div>

                )}

                {/* ==================================================
                    IMAGE INDICATORS
                ================================================== */}

                {galleryImages.length > 1 && (

                  <div
                    className="d-flex justify-content-center align-items-center gap-2"
                    style={{
                      position: "absolute",
                      bottom: "18px",
                      left: "0",
                      right: "0",
                      zIndex: 5,
                    }}
                  >

                    {galleryImages.map(
                      (image, index) => (

                        <button
                          key={
                            image.id ||
                            image._id ||
                            index
                          }
                          type="button"
                          aria-label={`Show event photo ${
                            index + 1
                          }`}
                          onClick={() =>
                            setCurrentIndex(index)
                          }
                          style={{
                            width:
                              index === currentIndex
                                ? "28px"
                                : "9px",

                            height: "9px",

                            border: "none",

                            borderRadius: "20px",

                            backgroundColor:
                              index === currentIndex
                                ? "#ffffff"
                                : "rgba(255,255,255,0.55)",

                            padding: 0,

                            transition:
                              "all 0.3s ease",

                            cursor: "pointer",

                            boxShadow:
                              "0 2px 6px rgba(0,0,0,0.25)",
                          }}
                        />

                      )
                    )}

                  </div>

                )}

              </div>

            </div>

          )}

        </div>

      </div>

      {/* ==================================================
          HOVER CSS
      ================================================== */}

      <style>
        {`
          .event-photo-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18) !important;
          }

          .event-photo-card:hover .event-photo-image {
            transform: scale(1.04) !important;
          }

          @media (max-width: 576px) {

            .event-photo-card {
              border-radius: 16px !important;
            }

          }

          @media (min-width: 768px) {

            .event-photo-card {
              border-radius: 22px !important;
            }

          }
        `}
      </style>

    </section>

  );
};

// PhotoGallery ko export karta hai
export default PhotoGallery;

