import React, { createContext, useContext, useState, useEffect } from "react";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem("inventory");
    return savedInventory ? JSON.parse(savedInventory) : [];
  });

  const [stockMovements, setStockMovements] = useState(() => {
    const savedMovements = localStorage.getItem("stockMovements");
    return savedMovements ? JSON.parse(savedMovements) : [];
  });

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem("stockMovements", JSON.stringify(stockMovements));
  }, [stockMovements]);

  const addInventoryItem = (inventoryData) => {
    const newItem = {
      id: Date.now(),
      ...inventoryData,
      availableStock: inventoryData.initialStock,
      lowStockThreshold: inventoryData.lowStockThreshold || 10,
      createdAt: new Date().toISOString(),
    };
    setInventory([...inventory, newItem]);
  };

  const updateInventoryItem = (id, inventoryData) => {
    setInventory(inventory.map(item => item.id === id ? { ...item, ...inventoryData } : item));
  };

  const deleteInventoryItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const stockIn = (productId, quantity, reason = "Purchase") => {
    const item = inventory.find(i => i.productId === productId);
    if (item) {
      const newStock = item.availableStock + quantity;
      updateInventoryItem(item.id, { availableStock: newStock });
      
      const movement = {
        id: Date.now(),
        productId,
        type: "IN",
        quantity,
        previousStock: item.availableStock,
        newStock,
        reason,
        timestamp: new Date().toISOString(),
      };
      setStockMovements([...stockMovements, movement]);
    }
  };

  const stockOut = (productId, quantity, reason = "Sale") => {
    const item = inventory.find(i => i.productId === productId);
    if (item && item.availableStock >= quantity) {
      const newStock = item.availableStock - quantity;
      updateInventoryItem(item.id, { availableStock: newStock });
      
      const movement = {
        id: Date.now(),
        productId,
        type: "OUT",
        quantity,
        previousStock: item.availableStock,
        newStock,
        reason,
        timestamp: new Date().toISOString(),
      };
      setStockMovements([...stockMovements, movement]);
    }
  };

  const getInventoryByProductId = (productId) => inventory.find(i => i.productId === productId);
  
  const getLowStockItems = () => inventory.filter(i => i.availableStock <= i.lowStockThreshold);
  const getOutOfStockItems = () => inventory.filter(i => i.availableStock === 0);

  const totalInventoryItems = inventory.length;
  const lowStockCount = getLowStockItems().length;
  const outOfStockCount = getOutOfStockItems().length;

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        stockMovements,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        stockIn,
        stockOut,
        getInventoryByProductId,
        getLowStockItems,
        getOutOfStockItems,
        totalInventoryItems,
        lowStockCount,
        outOfStockCount,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within InventoryProvider");
  }
  return context;
};
