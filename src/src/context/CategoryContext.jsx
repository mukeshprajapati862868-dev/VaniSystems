import React, { createContext, useContext, useState, useEffect } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const addCategory = (categoryData) => {
    const newCategory = {
      id: Date.now(),
      ...categoryData,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    setCategories([...categories, newCategory]);
  };

  const editCategory = (id, categoryData) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, ...categoryData } : cat));
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const toggleCategoryStatus = (id) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, isActive: !cat.isActive } : cat));
  };

  const getCategoryById = (id) => categories.find(cat => cat.id === id);
  const getCategoryByName = (name) => categories.find(cat => cat.name.toLowerCase() === name.toLowerCase());

  const totalCategories = categories.length;
  const activeCategories = categories.filter(cat => cat.isActive).length;

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        editCategory,
        deleteCategory,
        toggleCategoryStatus,
        getCategoryById,
        getCategoryByName,
        totalCategories,
        activeCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within CategoryProvider");
  }
  return context;
};
