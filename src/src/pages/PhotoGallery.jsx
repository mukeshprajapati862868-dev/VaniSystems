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
        return (previousIndex + 1) % galleryImages.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // ======================================================
  // RESET INDEX WHEN IMAGES CHANGE
  // ======================================================

  useEffect(() => {
    if (currentIndex >= galleryImages.length) {
      setCurrentIndex(0);
    }
  }, [galleryImages.length, currentIndex]);

  return (
    <section className="py-4">
      <div className="container">

        {/* ==================================================
            EVENT PHOTO HEADING
        ================================================== */}

        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">
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

          {/* Agar koi image available nahi hai */}

          {galleryImages.length === 0 ? (

            <div className="col-12">

              <div className="text-center py-5">

                <h4 className="text-muted">
                  No Photos Available
                </h4>

              </div>

            </div>

          ) : (

            <div className="col-12">

              <div
                className="card border-0 shadow-sm overflow-hidden"
                style={{
                  borderRadius: "2px",
                }}
              >

                {/* ==================================================
                    IMAGE SLIDER
                ================================================== */}

                <div
                  style={{
                    width: "100%",
                    height: "450px",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#f8f9fa",
                  }}
                >

                  {galleryImages.map((image, index) => (

                    <img
                      key={image.id}
                      src={image.url}
                      alt="Event Photo"
                      className="w-100 h-100"
                      style={{
                        objectFit: "cover",
                        display:
                          index === currentIndex
                            ? "block"
                            : "none",
                        transition: "opacity 0.5s ease-in-out",
                      }}
                    />

                  ))}

                </div>

                {/* ==================================================
                    IMAGE INDICATORS
                ================================================== */}

                {galleryImages.length > 1 && (

                  <div className="d-flex justify-content-center gap-2 py-3">

                    {galleryImages.map((image, index) => (

                      <button
                        key={image.id}
                        type="button"
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

                          borderRadius: "10px",

                          backgroundColor:
                            index === currentIndex
                              ? "#0d6efd"
                              : "#adb5bd",

                          padding: 0,

                          transition:
                            "all 0.3s ease",

                          cursor: "pointer",
                        }}
                      />

                    ))}

                  </div>

                )}

              </div>

            </div>

          )}

        </div>

      </div>
    </section>
  );
};

// PhotoGallery ko export karta hai
export default PhotoGallery;
