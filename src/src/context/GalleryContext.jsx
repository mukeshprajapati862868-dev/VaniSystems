import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const API_BASE_URL = 'https://api-rishabh.vanisystems.in/api';

// Gallery ka global context create karta hai
const GalleryContext = createContext();

// Gallery Provider poori app ko gallery data deta hai
export const GalleryProvider = ({ children }) => {

  const [galleryImages, setGalleryImages] = useState([]);

  const resolveImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${API_BASE_URL}${path}`;
  };

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/gallery`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) {
          throw new Error(`Failed to load gallery images: ${res.status}`);
        }
        const json = await res.json();
        const normalized = (json.data || []).map((item) => ({
          id: item._id || item.id || Date.now(),
          name: item.name,
          url: resolveImageUrl(item.path)
        }));
        setGalleryImages(normalized);
      } catch (error) {
        console.error('Failed to load gallery images from backend:', error);
        setGalleryImages([]);
      }
    };

    fetchGalleryImages();
  }, []);

  // New gallery image add karta hai
  const addGalleryImage = async (image) => {
    if (typeof image.url !== 'string' || !image.url.startsWith('data:')) {
      throw new Error('Only base64 image uploads are supported for gallery images');
    }

    const response = await fetch(`${API_BASE_URL}/gallery/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: image.name || 'image', dataUrl: image.url })
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      console.error('Gallery upload error response:', response.status, errorBody);
      throw new Error(errorBody.error || 'Gallery upload failed');
    }

    const json = await response.json();
    const saved = json.data;
    const serverImage = {
      id: saved._id || saved.id || Date.now(),
      name: saved.name,
      url: resolveImageUrl(saved.path)
    };
    setGalleryImages((prevImages) => [...prevImages, serverImage]);
    return serverImage;
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
