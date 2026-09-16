import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const VideoGalleryContext = createContext();

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const VideoGalleryProvider = ({ children }) => {
  const [videoGallery, setVideoGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  // ======================================================
  // FETCH VIDEOS
  // ======================================================
  const fetchVideos = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/videos`);

      const result = await response.json();

      if (response.ok && result.success) {
        const formattedVideos = (result.data || []).map((video) => {
          const videoId = video._id || video.id;

          return {
            ...video,

            // IMPORTANT:
            // Backend gives /api/videos/video/ID
            // Convert it to complete URL only once.
            url: `${API_URL}/videos/video/${videoId}`,

            path: `${API_URL}/videos/video/${videoId}`,
          };
        });

        setVideoGallery(formattedVideos);
      } else {
        console.error(
          "Failed to fetch videos:",
          result.message
        );
      }
    } catch (error) {
      console.error("Fetch videos error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // ADD VIDEO
  // ======================================================
  const addVideo = async (video) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/videos/upload`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: video.name,
            dataUrl: video.url || video.dataUrl,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Video upload failed"
        );
      }

      await fetchVideos();

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      console.error("Add video error:", error);

      return {
        success: false,
        error: error.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // UPDATE VIDEO
  // ======================================================
  const updateVideo = async (video) => {
    try {
      setLoading(true);

      const id = video._id || video.id;

      const response = await fetch(
        `${API_URL}/videos/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: video.name,
            dataUrl: video.url || video.dataUrl,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Video update failed"
        );
      }

      await fetchVideos();

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      console.error("Update video error:", error);

      return {
        success: false,
        error: error.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // DELETE VIDEO
  // ======================================================
  const deleteVideo = async (id) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/videos/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Video delete failed"
        );
      }

      setVideoGallery((prev) =>
        prev.filter(
          (video) =>
            String(video._id) !== String(id) &&
            String(video.id) !== String(id)
        )
      );

      return {
        success: true,
      };
    } catch (error) {
      console.error("Delete video error:", error);

      return {
        success: false,
        error: error.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // LOAD VIDEOS
  // ======================================================
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <VideoGalleryContext.Provider
      value={{
        videoGallery,
        setVideoGallery,
        loading,
        fetchVideos,
        addVideo,
        updateVideo,
        deleteVideo,
      }}
    >
      {children}
    </VideoGalleryContext.Provider>
  );
};

// ======================================================
// HOOK
// ======================================================
export const useVideoGallery = () => {
  const context = useContext(VideoGalleryContext);

  if (!context) {
    throw new Error(
      "useVideoGallery must be used inside VideoGalleryProvider"
    );
  }

  return context;
};

// ======================================================
// EXPORT
// ======================================================
export { VideoGalleryProvider };

export default VideoGalleryContext;