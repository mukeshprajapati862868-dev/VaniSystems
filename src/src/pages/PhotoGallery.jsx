import React, { useEffect, useState } from "react";
import { useGallery } from "../context/GalleryContext";

const PhotoGallery = () => {
  const { galleryImages } = useGallery();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // ======================================================
  // AUTOMATIC IMAGE CHANGE - EVERY 5 SECONDS
  // ======================================================

  useEffect(() => {
    if (galleryImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((previousIndex) => {
        return (previousIndex + 1) % galleryImages.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // ======================================================
  // RESET CURRENT IMAGE
  // ======================================================

  useEffect(() => {
    if (
      galleryImages.length === 0 ||
      currentIndex >= galleryImages.length
    ) {
      setCurrentIndex(0);
    }
  }, [galleryImages.length, currentIndex]);

  return (
    <section className="py-5 bg-light">
      <div className="container">

        {/* ==================================================
            EVENT PHOTO HEADING
        ================================================== */}

        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark mb-2">
            Event Photo
          </h2>

          <p className="text-muted mb-0">
            Our Latest Event Photos
          </p>
        </div>

        {/* ==================================================
            NO IMAGE
        ================================================== */}

        {galleryImages.length === 0 ? (
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm text-center py-5">
                <div className="card-body">
                  <h4 className="text-muted">
                    No Photos Available
                  </h4>

                  <p className="text-muted mb-0">
                    Event photos will appear here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* ==================================================
                IMAGE CARD
            ================================================== */}

            <div className="row justify-content-center">
              <div className="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-8">

                <div
                  className="card border-0 shadow-lg overflow-hidden"
                  onMouseEnter={() =>
                    setHoveredIndex(currentIndex)
                  }
                  onMouseLeave={() =>
                    setHoveredIndex(null)
                  }
                  style={{
                    borderRadius: "18px",
                    transition:
                      "all 0.4s ease",
                    transform:
                      hoveredIndex === currentIndex
                        ? "translateY(-6px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredIndex === currentIndex
                        ? "0 15px 35px rgba(13,110,253,0.25)"
                        : "0 8px 25px rgba(0,0,0,0.12)",
                  }}
                >

                  {/* ==================================================
                      IMAGE
                  ================================================== */}

                  <div
                    className="position-relative overflow-hidden"
                    style={{
                      height:
                        "clamp(260px, 55vw, 500px)",
                      backgroundColor: "#e9ecef",
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
                          className="w-100 h-100 position-absolute top-0 start-0"
                          style={{
                            objectFit: "cover",
                            opacity:
                              index === currentIndex
                                ? 1
                                : 0,
                            transition:
                              "opacity 0.8s ease, transform 0.6s ease",
                            transform:
                              index === currentIndex &&
                              hoveredIndex ===
                                currentIndex
                                ? "scale(1.05)"
                                : "scale(1)",
                          }}
                        />
                      )
                    )}

                    {/* ==================================================
                        IMAGE OVERLAY
                    ================================================== */}

                    <div
                      className="position-absolute bottom-0 start-0 end-0 p-3"
                      style={{
                        background:
                          "linear-gradient(transparent, rgba(0,0,0,0.65))",
                      }}
                    >
                      <div className="text-white">
                        <h5 className="fw-bold mb-1">
                          Event Photo
                        </h5>

                        <small>
                          {currentIndex + 1} /{" "}
                          {galleryImages.length}
                        </small>
                      </div>
                    </div>

                  </div>

                  {/* ==================================================
                      CARD FOOTER
                  ================================================== */}

                  <div className="card-body text-center bg-white">

                    <h5 className="fw-bold text-dark mb-2">
                      Event Photo
                    </h5>

                    <p className="text-muted mb-0">
                      {galleryImages[
                        currentIndex
                      ]?.name ||
                        "Event Image"}
                    </p>

                  </div>

                </div>

              </div>
            </div>

            {/* ==================================================
                IMAGE INDICATORS
            ================================================== */}

            {galleryImages.length > 1 && (
              <div className="d-flex justify-content-center align-items-center flex-wrap gap-2 mt-4">

                {galleryImages.map(
                  (image, index) => (
                    <button
                      key={
                        image.id ||
                        image._id ||
                        index
                      }
                      type="button"
                      onClick={() =>
                        setCurrentIndex(index)
                      }
                      aria-label={`Show event photo ${
                        index + 1
                      }`}
                      className="border-0 p-0"
                      style={{
                        width:
                          index === currentIndex
                            ? "32px"
                            : "10px",
                        height: "10px",
                        borderRadius: "20px",
                        backgroundColor:
                          index === currentIndex
                            ? "#0d6efd"
                            : "#adb5bd",
                        transition:
                          "all 0.3s ease",
                        cursor: "pointer",
                      }}
                    />
                  )
                )}

              </div>
            )}

          </>
        )}

      </div>
    </section>
  );
};

export default PhotoGallery;
