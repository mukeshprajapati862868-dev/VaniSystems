import React from "react";

// Gallery Context se images receive karta hai
import { useGallery } from "../context/GalleryContext";

// Photo Gallery Component
const PhotoGallery = () => {
  // Context se live gallery images leta hai
  const { galleryImages } = useGallery();

  return (
    <section className="py-5 bg-light">
      {/* Hover effects ke liye inline dynamic styles inject kiye hain */}
      <style>{`
        .gallery-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          cursor: pointer;
        }
        .gallery-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;
        }
        .img-wrapper img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gallery-card:hover .img-wrapper img {
          transform: scale(1.08);
        }
        .hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .gallery-card:hover .hover-overlay {
          opacity: 1;
        }
      `}</style>

      <div className="container">
        {/* Responsive gallery row */}
        <div className="row g-4">
          <h1>|| Photo Galler ||</h1>
          {/* Agar koi image available nahi hai */}
          {galleryImages.length === 0 ? (
            <div className="col-12">
              <div className="text-center py-5">
                <h4 className="text-muted fw-light">No Photos Available</h4>
              </div>
            </div>
          ) : (
            /* Gallery images ko dynamically show karta hai */
            galleryImages.map((image) => (
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
                key={image.id}
              >
                {/* Modern responsive image card with styling */}
                <div
                  className="card gallery-card border-0 shadow-sm h-100 overflow-hidden position-relative"
                  style={{
                    borderRadius: "12px",
                  }}
                >
                  {/* Image wrapper */}
                  <div
                    className="img-wrapper"
                    style={{
                      width: "100%",
                      height: "280px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {/* Sirf image show hogi */}
                    <img
                      src={image.url}
                      alt="Gallery Image"
                      className="w-100 h-100"
                      style={{
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    
                    {/* Hover karne par aane wala soft dark overlay gradient */}
                    <div className="hover-overlay" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

// PhotoGallery ko export karta hai
export default PhotoGallery;
