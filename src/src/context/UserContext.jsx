import React, { createContext, useContext, useState } from "react";
import apiService from "../services/apiService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);

  const fetchUsers = async () => {
    const result = await apiService.getAllUsers();
    if (result.success) setUsers(result.data.users || []);
  };

  const addUser = async (userData) => {
    await apiService.register(userData);
    await fetchUsers();
  };

  const editUser = async (id, userData) => {
    await apiService.updateUser(id, userData);
    await fetchUsers();
  };

  const deleteUser = async (id) => {
    await apiService.deleteUser(id);
    setUsers(users.filter(user => (user._id || user.id) !== id));
  };

  const blockUser = async (id) => {
    await apiService.blockUser(id);
    await fetchUsers();
  };

  const unblockUser = async (id) => {
    await apiService.unblockUser(id);
    await fetchUsers();
  };

  const addLoginHistory = (userId, loginData) => {
    setLoginHistory([...loginHistory, { id: Date.now(), userId, ...loginData, timestamp: new Date().toISOString() }]);
  };

  const getUserById = (id) => users.find(user => (user._id || user.id) === id);
  const getUserByEmail = (email) => users.find(user => user.email === email);

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status !== 'Blocked' && !user.isBlocked).length;
  const blockedUsers = users.filter(user => user.status === 'Blocked' || user.isBlocked).length;

  return (
    <UserContext.Provider value={{ users, loginHistory, addUser, editUser, deleteUser, blockUser, unblockUser, addLoginHistory, getUserById, getUserByEmail, totalUsers, activeUsers, blockedUsers, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers must be used within UserProvider");
  return context;
};
