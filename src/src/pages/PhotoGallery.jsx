import React from "react";

// Gallery Context se images receive karta hai
import { useGallery } from "../context/GalleryContext";

// Photo Gallery Component
const PhotoGallery = () => {
  // Context se live gallery images leta hai
  const { galleryImages } = useGallery();

  return (
    <section className="py-2">
      <h1>||Event images||</h1>
      <div className="container">
        {/* Responsive gallery row */}

        <div className="row g-4">
          {/* Agar koi image available nahi hai */}

          {galleryImages.length === 0 ? (
            <div className="col-12">
              <div className="text-center py-5">
                <h4 className="text-muted">No Photos Available</h4>
              </div>
            </div>
          ) : (
            /* Gallery images ko dynamically show karta hai */

            galleryImages.map((image) => (
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
                key={image.id}
              >
                {/* Responsive image card */}

                <div
                  className="card border-0 shadow-sm h-100 overflow-hidden"
                  style={{
                    borderRadius: "2px",
                  }}
                >
                  {/* Image wrapper */}

                  <div
                    style={{
                      width: "100%",
                      height: "260px",
                      overflow: "hidden",
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
