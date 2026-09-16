import React from "react";
import { useVideoGallery } from "../context/VideoGalleryContext";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const VideoGallery = () => {
  const {
    videoGallery,
    loading,
  } = useVideoGallery();

  return (
    <section className="py-2">
      <div className="container">
        <div className="row g-4">

          {loading && videoGallery.length === 0 ? (
            <div className="col-12">
              <div className="text-center py-5">
                <div
                  className="spinner-border text-primary"
                  role="status"
                >
                  <span className="visually-hidden">
                    Loading...
                  </span>
                </div>

                <p className="text-muted mt-3">
                  Loading videos...
                </p>
              </div>
            </div>
          ) : videoGallery.length === 0 ? (
            <div className="col-12">
              <div className="text-center py-5">
                <h4 className="text-muted">
                  No Videos Available
                </h4>
              </div>
            </div>
          ) : (
            videoGallery.map((video, index) => {
              const videoId =
                video._id ||
                video.id;

              const videoUrl =
                video.url ||
                video.path ||
                `${API_URL}/videos/video/${videoId}`;

              return (
                <div
                  className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
                  key={videoId || index}
                >
                  <div
                    className="card border-0 shadow-sm h-100 overflow-hidden"
                    style={{
                      borderRadius: "2px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "260px",
                        overflow: "hidden",
                        backgroundColor: "#000",
                      }}
                    >
                      <video
                        src={videoUrl}
                        controls
                        preload="metadata"
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>

                    {video.name && (
                      <div className="card-body py-2">
                        <p className="mb-0 text-muted text-truncate">
                          {video.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}

        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
