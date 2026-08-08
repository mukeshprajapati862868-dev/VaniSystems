import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Gallery ka global context create karta hai
const GalleryContext = createContext();

// Gallery Provider poori app ko gallery data deta hai
export const GalleryProvider = ({ children }) => {

  // localStorage se saved gallery images load karta hai
  const [galleryImages, setGalleryImages] = useState(() => {

    // Browser localStorage se data leta hai
    const savedGalleryImages =
      localStorage.getItem("galleryImages");

    // Data available hai to JSON me convert karta hai
    return savedGalleryImages
      ? JSON.parse(savedGalleryImages)
      : [];

  });


  // Gallery images ko localStorage me save karta hai
  useEffect(() => {
    try {
      localStorage.setItem("galleryImages", JSON.stringify(galleryImages));
    } catch (error) {
      if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        // Clear old data to free space
        localStorage.removeItem("galleryImages");
        alert("Storage limit exceeded! Some gallery images could not be saved. Please delete some old images.");
      } else {
        console.error("LocalStorage Error:", error);
      }
    }
  }, [galleryImages]);


  // New gallery image add karta hai
  const addGalleryImage = (image) => {

    // Previous images ko rakhta hai
    // aur new image add karta hai
    setGalleryImages((prevImages) => [
      ...prevImages,
      image,
    ]);

  };


  // Existing gallery image update karta hai
  const updateGalleryImage = (updatedImage) => {

    // Image id ke basis par image update karta hai
    setGalleryImages((prevImages) =>
      prevImages.map((image) =>
        image.id === updatedImage.id
          ? updatedImage
          : image
      )
    );

  };


  // Admin ke delete karne par image delete karta hai
  const deleteGalleryImage = (id) => {

    // Matching id wali image remove hoti hai
    setGalleryImages((prevImages) =>
      prevImages.filter(
        (image) => image.id !== id
      )
    );

  };


  // Context data aur functions provide karta hai
  return (
    <GalleryContext.Provider
      value={{
        galleryImages,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
      }}
    >

      {children}

    </GalleryContext.Provider>
  );

};


// Gallery data use karne ka custom hook
export const useGallery = () => {

  // Context data receive karta hai
  const context = useContext(GalleryContext);


  // Provider ke bahar use hone par error
  if (!context) {

    throw new Error(
      "useGallery must be used inside GalleryProvider"
    );

  }


  // Context data return karta hai
  return context;

};