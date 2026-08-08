import React, { createContext, useContext, useState, useEffect } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);

  // Load addresses from localStorage on initialization
  useEffect(() => {
    const savedAddresses = localStorage.getItem("vani_addresses");
    if (savedAddresses) {
      try {
        setAddresses(JSON.parse(savedAddresses));
      } catch (e) {
        console.error("Failed to parse addresses:", e);
      }
    }
  }, []);

  // Save addresses to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("vani_addresses", JSON.stringify(addresses));
    } catch (error) {
      console.error("LocalStorage Error:", error);
    }
  }, [addresses]);

  // Add address
  const addAddress = (addressData) => {
    const newAddress = {
      ...addressData,
      id: Date.now(),
      isDefault: addresses.length === 0, // First address is default
      createdAt: new Date().toISOString(),
    };
    setAddresses([...addresses, newAddress]);
    return { success: true, message: "Address added successfully" };
  };

  // Edit address
  const editAddress = (id, addressData) => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === id ? { ...addr, ...addressData } : addr
      )
    );
  };

  // Delete address
  const deleteAddress = (id) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== id);
    // If deleted address was default, set first remaining as default
    if (addresses.find((addr) => addr.id === id)?.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }
    setAddresses(updatedAddresses);
  };

  // Set default address
  const setDefaultAddress = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  // Get default address
  const getDefaultAddress = () => addresses.find((addr) => addr.isDefault);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        editAddress,
        deleteAddress,
        setDefaultAddress,
        getDefaultAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddresses = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddresses must be used within an AddressProvider");
  }
  return context;
};
