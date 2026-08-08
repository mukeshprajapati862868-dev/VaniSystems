import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// ======================================================
// GALLERY CONTEXT
// ======================================================

const GalleryContext = createContext();

// ======================================================
// GALLERY PROVIDER
// ======================================================

export const GalleryProvider = ({ children }) => {

  // ======================================================
  // LOAD IMAGES FROM LOCAL STORAGE
  // ======================================================

  const [galleryImages, setGalleryImages] = useState(() => {
    try {
      const savedGalleryImages = localStorage.getItem("galleryImages");

      if (!savedGalleryImages) {
        return [];
      }

      const parsedImages = JSON.parse(savedGalleryImages);

      return Array.isArray(parsedImages)
        ? parsedImages
        : [];

    } catch (error) {
      console.error(
        "Error loading gallery images:",
        error
      );

      return [];
    }
  });

  // ======================================================
  // SAVE IMAGES TO LOCAL STORAGE
  // ======================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "galleryImages",
        JSON.stringify(galleryImages)
      );

    } catch (error) {

      console.error(
        "Error saving gallery images:",
        error
      );

      if (
        error.name === "QuotaExceededError" ||
        error.name === "NS_ERROR_DOM_QUOTA_REACHED"
      ) {
        alert(
          "Browser storage is full. Please delete some old images."
        );
      }
    }
  }, [galleryImages]);

  // ======================================================
  // ADD NEW GALLERY IMAGE
  // MAXIMUM 20 IMAGES
  // ======================================================

  const addGalleryImage = (image) => {

    setGalleryImages((previousImages) => {

      // Maximum 20 images
      if (previousImages.length >= 20) {

        alert(
          "Maximum 20 Event Photos can be uploaded."
        );

        return previousImages;
      }

      const newImage = {
        ...image,

        // Always make sure image has unique ID
        id:
          image.id ||
          `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 9)}`,

        createdAt:
          image.createdAt ||
          new Date().toISOString(),
      };

      return [
        ...previousImages,
        newImage,
      ];
    });
  };

  // ======================================================
  // UPDATE GALLERY IMAGE
  // ======================================================

  const updateGalleryImage = (updatedImage) => {

    setGalleryImages((previousImages) => {

      return previousImages.map((image) => {

        if (image.id === updatedImage.id) {

          return {
            ...image,
            ...updatedImage,
          };

        }

        return image;
      });
    });
  };

  // ======================================================
  // DELETE GALLERY IMAGE
  // ======================================================

  const deleteGalleryImage = (id) => {

    setGalleryImages((previousImages) => {

      return previousImages.filter(
        (image) => image.id !== id
      );

    });
  };

  // ======================================================
  // CLEAR ALL GALLERY IMAGES
  // OPTIONAL
  // ======================================================

  const clearGalleryImages = () => {

    setGalleryImages([]);

    localStorage.removeItem(
      "galleryImages"
    );
  };

  // ======================================================
  // CONTEXT PROVIDER
  // ======================================================

  return (
    <GalleryContext.Provider
      value={{
        galleryImages,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        clearGalleryImages,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

// ======================================================
// USE GALLERY HOOK
// ======================================================

export const useGallery = () => {

  const context = useContext(
    GalleryContext
  );

  if (!context) {

    throw new Error(
      "useGallery must be used inside GalleryProvider"
    );

  }

  return context;
};
