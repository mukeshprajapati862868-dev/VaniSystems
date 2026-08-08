import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Session and Data on App Start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const activeUser = localStorage.getItem("activeUser");
    const savedOrders = localStorage.getItem("allOrders");
    const savedNotifs = localStorage.getItem("userNotifs");
    const savedAddresses = localStorage.getItem("userAddresses");

    if (token && activeUser) {
      const parsedUser = JSON.parse(activeUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
    if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
    
    setLoading(false);
  }, []);

  // --- REGISTRATION LOGIC ---
  const register = (formData) => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const userExists = registeredUsers.find((u) => u.email === formData.email);

    if (userExists) return { success: false, message: "Already Registered" };

    const newUser = {
      ...formData,
      id: Date.now(),
      registrationDate: new Date().toLocaleDateString(),
      loginDate: "Not Logged In Yet",
    };

    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    
    // Dispatch custom event to notify UserContext
    window.dispatchEvent(new CustomEvent('userRegistered', { detail: registeredUsers }));
    
    return { success: true, message: "Registration Successful" };
  };

  // --- LOGIN LOGIC ---
  const login = (email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const foundUser = registeredUsers.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      const updatedUser = { ...foundUser, loginDate: new Date().toLocaleString() };
      
      // Update the user in the main database too
      const updatedAll = registeredUsers.map(u => u.id === foundUser.id ? updatedUser : u);
      localStorage.setItem("registeredUsers", JSON.stringify(updatedAll));
      
      // Set Active Session
      setUser(updatedUser);
      setIsAuthenticated(true);
      localStorage.setItem("activeUser", JSON.stringify(updatedUser));
      return { success: true, message: "Welcome Back" };
    }
    return { success: false, message: "Invalid Email or Password" };
  };

  // --- LOGOUT LOGIC ---
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("activeUser");
  };

  // --- PROFILE UPDATE LOGIC ---
  const updateProfile = (updatedData) => {
    setUser(updatedData);
    localStorage.setItem("activeUser", JSON.stringify(updatedData));
    
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const index = registeredUsers.findIndex(u => u.id === updatedData.id);
    if(index !== -1) {
      registeredUsers[index] = updatedData;
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    }
  };

  // --- ADDITIONAL FUNCTIONS ---
  const createOrder = (order) => {
    const newOrders = [...orders, { ...order, orderId: Date.now() }];
    setOrders(newOrders);
    localStorage.setItem("allOrders", JSON.stringify(newOrders));
  };

  const addNotification = (notif) => {
    const newNotifs = [...notifications, { ...notif, date: new Date().toLocaleString() }];
    setNotifications(newNotifs);
    localStorage.setItem("userNotifs", JSON.stringify(newNotifs));
  };

  return (
    <AuthContext.Provider value={{
      user, setUser, isAuthenticated, setIsAuthenticated, login, logout, register, updateProfile,
      orders, createOrder, notifications, addNotification, addresses, setAddresses
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);