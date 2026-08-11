import React, { useEffect, useRef } from "react";

// Gallery Context se images receive karta hai
import { useGallery } from "../context/GalleryContext";

const PhotoGallery = () => {
  const { galleryImages } = useGallery();
  const scrollContainerRef = useRef(null);

  // 5 Second Automatic Scroll Engine
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || galleryImages.length === 0) return;

    const autoScroll = setInterval(() => {
      // Har scroll par single card width + gap jitna aage scroll hoga
      const cardWidth = container.clientWidth / (window.innerWidth < 576 ? 1 : window.innerWidth < 768 ? 2 : window.innerWidth < 992 ? 3 : 4);
      
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        // Agar aakhri image par pohoch jaye toh wapas start (0) par aa jaye
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 5000); // 5 Seconds Interval

    return () => clearInterval(autoScroll);
  }, [galleryImages]);

  return (
    <section className="py-4 py-md-5 bg-light">
      <div className="container-fluid container-xxl px-3 px-sm-4">
        
        {/* PHOTO GALLERY TITLE HEADING */}
        <div className="row mb-4 mb-md-5">
          <div className="col-12 text-start">
            <h1 className="fw-bold text-dark mb-2" style={{ letterSpacing: "-0.5px", fontSize: "calc(1.6rem + 1vw)" }}>
              Photo Gallery
            </h1>
            <div className="bg-primary rounded" style={{ width: "50px", height: "4px" }}></div>
            {galleryImages.length > 0 && (
              <p className="text-muted small mt-2 mb-0 fw-medium">
                Showing {galleryImages.length} beautiful memories
              </p>
            )}
          </div>
        </div>

        {/* Horizontal Scroll Layout */}
        {galleryImages.length === 0 ? (
          <div className="text-center py-5 bg-white rounded shadow-sm border border-dashed">
            <h5 className="text-muted fw-normal mb-0">No Photos Available</h5>
          </div>
        ) : (
          <div 
            ref={scrollContainerRef}
            className="d-flex g-3 g-md-4 overflow-x-auto pb-3"
            style={{ 
              scrollSnapType: "x mandatory", 
              scrollbarWidth: "none", // Hide scrollbar for clean UI
              msOverflowStyle: "none"
            }}
          >
            {galleryImages.map((image) => (
              <div 
                className="flex-shrink-0" 
                key={image.id}
                style={{ 
                  width: "calc(100% / var(--bs-columns, 4))",
                  scrollSnapAlign: "start",
                  // CSS variables for responsive widths inside flex container
                  "--bs-columns": window.innerWidth < 576 ? 1 : window.innerWidth < 768 ? 2 : window.innerWidth < 992 ? 3 : 4,
                  paddingRight: "1.5rem"
                }}
              >
                <div
                  className="card border-0 shadow-sm h-100 overflow-hidden"
                  style={{
                    borderRadius: "6px",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,0.075)";
                  }}
                >
                  <div style={{ width: "100%", height: "0", paddingBottom: "75%", position: "relative", overflow: "hidden" }}>
                    <img
                      src={image.url}
                      alt="Gallery Image"
                      crossOrigin="anonymous"
                      className="w-100 h-100"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        objectFit: "cover",
                        display: "block",
                        cursor: "pointer",
                        transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;
