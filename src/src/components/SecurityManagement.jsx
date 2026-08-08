import React, { useState } from "react";
import { useSecurity } from "../context/SecurityContext";
import { FaShieldAlt, FaUserShield, FaHistory, FaKey, FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const SecurityManagement = () => {
  const { activityLogs, auditLogs, roles, logActivity, logAudit, addRole, updateRole, deleteRole, hasPermission, recentActivity } = useSecurity();
  const [activeTab, setActiveTab] = useState("activity");
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleFormData, setRoleFormData] = useState({
    name: "",
    permissions: [],
  });

  const availablePermissions = [
    "all",
    "manage_products",
    "manage_orders",
    "manage_users",
    "manage_categories",
    "manage_brands",
    "manage_coupons",
    "manage_inventory",
    "view_reports",
    "manage_payments",
    "manage_security",
  ];

  const handleAddRole = (e) => {
    e.preventDefault();
    if (editingRole) {
      updateRole(editingRole.id, roleFormData);
      setEditingRole(null);
    } else {
      addRole(roleFormData);
    }
    setRoleFormData({ name: "", permissions: [] });
    setShowRoleForm(false);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setRoleFormData({ name: role.name, permissions: role.permissions });
    setShowRoleForm(true);
  };

  const handleDeleteRole = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      deleteRole(id);
    }
  };

  const handlePermissionToggle = (permission) => {
    if (roleFormData.permissions.includes(permission)) {
      setRoleFormData({
        ...roleFormData,
        permissions: roleFormData.permissions.filter(p => p !== permission),
      });
    } else {
      setRoleFormData({
        ...roleFormData,
        permissions: [...roleFormData.permissions, permission],
      });
    }
  };

  const clearLogs = () => {
    if (window.confirm("Are you sure you want to clear all logs?")) {
      localStorage.removeItem("activityLogs");
      localStorage.removeItem("auditLogs");
      window.location.reload();
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Security Management</h5>
          <button className="btn btn-outline-danger btn-sm" onClick={clearLogs}>
            <FaTrash className="me-2" />
            Clear Logs
          </button>
        </div>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "activity" ? "active" : ""}`}
              onClick={() => setActiveTab("activity")}
            >
              <FaHistory className="me-2" />
              Activity Logs
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "audit" ? "active" : ""}`}
              onClick={() => setActiveTab("audit")}
            >
              <FaShieldAlt className="me-2" />
              Audit Logs
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "roles" ? "active" : ""}`}
              onClick={() => setActiveTab("roles")}
            >
              <FaUserShield className="me-2" />
              Roles & Permissions
            </button>
          </li>
        </ul>

        {activeTab === "activity" && (
          <>
            <div className="alert alert-info">
              <strong>Recent Activity:</strong> Showing last 20 activities
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User ID</th>
                    <th>Action</th>
                    <th>Details</th>
                    <th>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No activity logs found.
                      </td>
                    </tr>
                  ) : (
                    recentActivity.map((log) => (
                      <tr key={log.id}>
                        <td>{new Date(log.timestamp).toLocaleString()}</td>
                        <td>#{log.userId}</td>
                        <td>{log.action}</td>
                        <td>{log.details}</td>
                        <td>{log.ipAddress}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "audit" && (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User ID</th>
                  <th>Entity</th>
                  <th>Action</th>
                  <th>Old Value</th>
                  <th>New Value</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No audit logs found.
                    </td>
                  </tr>
                ) : (
                  auditLogs.slice(-50).reverse().map((log) => (
                    <tr key={log.id}>
                      <td>{new Date(log.timestamp).toLocaleString()}</td>
                      <td>#{log.userId}</td>
                      <td>{log.entity}</td>
                      <td>{log.action}</td>
                      <td className="text-muted small">{JSON.stringify(log.oldValue)}</td>
                      <td className="text-success small">{JSON.stringify(log.newValue)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "roles" && (
          <>
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-primary" onClick={() => setShowRoleForm(!showRoleForm)}>
                <FaPlus className="me-2" />
                {showRoleForm ? "Cancel" : "Add Role"}
              </button>
            </div>

            {showRoleForm && (
              <div className="card bg-light mb-4">
                <div className="card-body">
                  <h6 className="fw-bold mb-3">{editingRole ? "Edit Role" : "Add New Role"}</h6>
                  <form onSubmit={handleAddRole}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Role Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={roleFormData.name}
                          onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Permissions</label>
                        <div className="row g-2">
                          {availablePermissions.map((permission) => (
                            <div className="col-md-4" key={permission}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`perm-${permission}`}
                                  checked={roleFormData.permissions.includes(permission)}
                                  onChange={() => handlePermissionToggle(permission)}
                                />
                                <label className="form-check-label" htmlFor={`perm-${permission}`}>
                                  {permission}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-success">
                          {editingRole ? "Update Role" : "Add Role"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Role Name</th>
                    <th>Permissions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        No roles found.
                      </td>
                    </tr>
                  ) : (
                    roles.map((role) => (
                      <tr key={role.id}>
                        <td className="fw-bold">{role.name}</td>
                        <td>
                          {role.permissions.includes("all") ? (
                            <span className="badge bg-success">All Permissions</span>
                          ) : (
                            <div className="d-flex flex-wrap gap-1">
                              {role.permissions.map((perm) => (
                                <span key={perm} className="badge bg-info">
                                  {perm}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => handleEditRole(role)}
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            {role.id > 4 && (
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => handleDeleteRole(role.id)}
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SecurityManagement;
