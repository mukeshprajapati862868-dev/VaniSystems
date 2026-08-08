import React, { createContext, useContext, useState, useEffect } from "react";

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);

  const addBrand = (brandData) => {
    const newBrand = {
      id: Date.now(),
      ...brandData,
      createdAt: new Date().toISOString(),
    };
    setBrands([...brands, newBrand]);
  };

  const editBrand = (id, brandData) => {
    setBrands(brands.map(brand => brand.id === id ? { ...brand, ...brandData } : brand));
  };

  const deleteBrand = (id) => {
    setBrands(brands.filter(brand => brand.id !== id));
  };

  const getBrandById = (id) => brands.find(brand => brand.id === id);
  const getBrandByName = (name) => brands.find(brand => brand.name.toLowerCase() === name.toLowerCase());

  const totalBrands = brands.length;

  return (
    <BrandContext.Provider
      value={{
        brands,
        addBrand,
        editBrand,
        deleteBrand,
        getBrandById,
        getBrandByName,
        totalBrands,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrands = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrands must be used within BrandProvider");
  }
  return context;
};
