import React, { createContext, useContext, useState } from "react";
import apiService from "../services/apiService";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    const result = await apiService.getWishlist();
    if (result.success) setWishlist(result.data.wishlist || []);
  };

  const addToWishlist = async (product) => {
    await apiService.addToWishlist(product);
    await fetchWishlist();
  };

  const removeFromWishlist = async (productId) => {
    await apiService.removeFromWishlist(productId);
    setWishlist(wishlist.filter((item) => (item._id || item.id) !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => (item._id || item.id) === productId);
  };

  const moveToCart = (product, addToCartFunction) => {
    addToCartFunction(product);
    removeFromWishlist(product._id || product.id);
  };

  const clearWishlist = async () => {
    await apiService.clearWishlist();
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        moveToCart,
        clearWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
