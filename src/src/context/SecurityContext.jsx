import React, { createContext, useContext, useState } from "react";
import apiService from "../services/apiService";

const SecurityContext = createContext();

export const SecurityProvider = ({ children }) => {
  const [activityLogs, setActivityLogs] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [roles, setRoles] = useState([
    { id: 1, name: "Super Admin", permissions: ["all"] },
    { id: 2, name: "Admin", permissions: ["manage_products", "manage_orders", "manage_users"] },
    { id: 3, name: "Manager", permissions: ["manage_orders", "view_reports"] },
    { id: 4, name: "Staff", permissions: ["view_orders"] },
  ]);

  const fetchActivityLogs = async () => {
    const result = await apiService.getActivityLogs();
    if (result.success) setActivityLogs(result.data.logs || []);
  };

  const fetchAuditLogs = async () => {
    const result = await apiService.getAuditLogs();
    if (result.success) setAuditLogs(result.data.logs || []);
  };

  const logActivity = async (userId, action, details) => {
    const log = {
      userId,
      action,
      details,
      timestamp: new Date().toISOString(),
      ipAddress: "192.168.1.1",
      userAgent: navigator.userAgent,
    };
    await apiService.createActivityLog(log);
    await fetchActivityLogs();
  };

  const logAudit = async (userId, entity, action, oldValue, newValue) => {
    const log = {
      userId,
      entity,
      action,
      oldValue,
      newValue,
      timestamp: new Date().toISOString(),
    };
    await apiService.createAuditLog(log);
    await fetchAuditLogs();
  };

  const addRole = (roleData) => {
    const newRole = {
      id: Date.now(),
      ...roleData,
      createdAt: new Date().toISOString(),
    };
    setRoles([...roles, newRole]);
  };

  const updateRole = (id, roleData) => {
    setRoles(roles.map(role => role.id === id ? { ...role, ...roleData } : role));
  };

  const deleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const hasPermission = (userRole, permission) => {
    const role = roles.find(r => r.name === userRole);
    if (!role) return false;
    return role.permissions.includes("all") || role.permissions.includes(permission);
  };

  const getActivityByUserId = (userId) => activityLogs.filter(log => log.userId === userId);
  const getAuditByUserId = (userId) => auditLogs.filter(log => log.userId === userId);
  const recentActivity = activityLogs.slice(-20).reverse();

  return (
    <SecurityContext.Provider
      value={{
        activityLogs,
        auditLogs,
        roles,
        logActivity,
        logAudit,
        addRole,
        updateRole,
        deleteRole,
        hasPermission,
        getActivityByUserId,
        getAuditByUserId,
        recentActivity,
        fetchActivityLogs,
        fetchAuditLogs,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error("useSecurity must be used within SecurityProvider");
  }
  return context;
};
