import React, { createContext, useContext, useState } from "react";
import apiService from "../services/apiService";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const result = await apiService.getProducts();
    if (result.success) setProducts(result.data.products || []);
  };

  const addProduct = async (productData) => {
    await apiService.createProduct(productData);
    await fetchProducts();
  };

  const deleteProduct = async (id) => {
    await apiService.deleteProduct(id);
    setProducts(products.filter(p => (p._id || p.id) !== id));
  };

  const updateProduct = async (id, productData) => {
    await apiService.updateProduct(id, productData);
    await fetchProducts();
  };

  const getProductById = (id) => products.find(p => (p._id || p.id) === id);

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct, getProductById, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
};