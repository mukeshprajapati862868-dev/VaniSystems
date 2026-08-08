import React, { useState, useEffect } from "react";
import apiService from "../services/apiService";
import { FaPlus, FaArrowUp, FaArrowDown, FaEdit, FaTrash, FaExclamationTriangle } from "react-icons/fa";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showStockMovement, setShowStockMovement] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    initialStock: "",
    lowStockThreshold: "",
    location: "",
    supplier: "",
  });
  const [movementData, setMovementData] = useState({
    productId: "",
    quantity: "",
    type: "IN",
    reason: "",
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const result = await apiService.getAllInventory();
        if (result.success) {
          setInventory(result.data.inventory || []);
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
    const interval = setInterval(fetchInventory, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await apiService.updateInventory(editingItem._id || editingItem.id, formData);
        setEditingItem(null);
      } else {
        await apiService.createInventory(formData);
      }
      const result = await apiService.getAllInventory();
      if (result.success) setInventory(result.data.inventory || []);
      setFormData({
        productId: "",
        productName: "",
        initialStock: "",
        lowStockThreshold: "",
        location: "",
        supplier: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error saving inventory:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      productId: item.productId,
      productName: item.productName,
      initialStock: item.initialStock,
      lowStockThreshold: item.lowStockThreshold,
      location: item.location,
      supplier: item.supplier,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inventory item?")) {
      try {
        await apiService.deleteInventory(id);
        setInventory(inventory.filter(i => (i._id || i.id) !== id));
      } catch (error) {
        console.error('Error deleting inventory:', error);
      }
    }
  };

  const handleStockMovement = async (e) => {
    e.preventDefault();
    try {
      if (movementData.type === "IN") {
        await apiService.stockIn(movementData.productId, movementData);
      } else {
        await apiService.stockOut(movementData.productId, movementData);
      }
      const result = await apiService.getAllInventory();
      if (result.success) setInventory(result.data.inventory || []);
      setMovementData({ productId: "", quantity: "", type: "IN", reason: "" });
      setShowStockMovement(false);
    } catch (error) {
      console.error('Error handling stock movement:', error);
    }
  };

  const totalInventoryItems = inventory.length;
  const lowStockItems = inventory.filter(item => item.availableStock <= item.lowStockThreshold && item.availableStock > 0);
  const outOfStockItems = inventory.filter(item => item.availableStock === 0);
  const lowStockCount = lowStockItems.length;
  const outOfStockCount = outOfStockItems.length;

  if (loading) return <div>Loading inventory...</div>;

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Inventory Management</h5>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
              <FaPlus className="me-2" />
              {showForm ? "Cancel" : "Add Item"}
            </button>
            <button className="btn btn-success" onClick={() => setShowStockMovement(!showStockMovement)}>
              {showStockMovement ? "Cancel" : "Stock Movement"}
            </button>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card bg-primary text-white">
              <div className="card-body p-3">
                <h6 className="mb-0">Total Items</h6>
                <h3 className="fw-bold mb-0">{totalInventoryItems}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-warning text-dark">
              <div className="card-body p-3">
                <h6 className="mb-0">Low Stock</h6>
                <h3 className="fw-bold mb-0">{lowStockCount}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-danger text-white">
              <div className="card-body p-3">
                <h6 className="mb-0">Out of Stock</h6>
                <h3 className="fw-bold mb-0">{outOfStockCount}</h3>
              </div>
            </div>
          </div>
        </div>

        {lowStockItems.length > 0 && (
          <div className="alert alert-warning mb-3">
            <FaExclamationTriangle className="me-2" />
            <strong>Low Stock Alert:</strong> {lowStockItems.map(i => i.productName).join(", ")}
          </div>
        )}

        {outOfStockItems.length > 0 && (
          <div className="alert alert-danger mb-3">
            <FaExclamationTriangle className="me-2" />
            <strong>Out of Stock:</strong> {outOfStockItems.map(i => i.productName).join(", ")}
          </div>
        )}

        {showForm && (
          <div className="card bg-light mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">{editingItem ? "Edit Inventory Item" : "Add New Inventory Item"}</h6>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Product ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.productId}
                      onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Initial Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.initialStock}
                      onChange={(e) => setFormData({ ...formData, initialStock: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Low Stock Threshold</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.lowStockThreshold}
                      onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Supplier</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.supplier}
                      onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-success">
                      {editingItem ? "Update Item" : "Add Item"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {showStockMovement && (
          <div className="card bg-light mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Stock Movement</h6>
              <form onSubmit={handleStockMovement}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Product ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={movementData.productId}
                      onChange={(e) => setMovementData({ ...movementData, productId: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      value={movementData.quantity}
                      onChange={(e) => setMovementData({ ...movementData, quantity: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Type</label>
                    <select
                      className="form-select"
                      value={movementData.type}
                      onChange={(e) => setMovementData({ ...movementData, type: e.target.value })}
                    >
                      <option value="IN">Stock In</option>
                      <option value="OUT">Stock Out</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Reason</label>
                    <input
                      type="text"
                      className="form-control"
                      value={movementData.reason}
                      onChange={(e) => setMovementData({ ...movementData, reason: e.target.value })}
                      placeholder="e.g., Purchase, Sale, Return"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-success">
                      {movementData.type === "IN" ? (
                        <>
                          <FaArrowUp className="me-2" />
                          Stock In
                        </>
                      ) : (
                        <>
                          <FaArrowDown className="me-2" />
                          Stock Out
                        </>
                      )}
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
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Available Stock</th>
                <th>Threshold</th>
                <th>Location</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No inventory items found.
                  </td>
                </tr>
              ) : (
                inventory.map((item, index) => (
                  <tr key={item._id || item.id || index}>
                    <td>{item.productId}</td>
                    <td>{item.productName}</td>
                    <td>
                      <span className={`fw-bold ${item.availableStock <= item.lowStockThreshold ? 'text-danger' : 'text-success'}`}>
                        {item.availableStock}
                      </span>
                    </td>
                    <td>{item.lowStockThreshold}</td>
                    <td>{item.location || "-"}</td>
                    <td>{item.supplier || "-"}</td>
                    <td>
                      {item.availableStock === 0 ? (
                        <span className="badge bg-danger">Out of Stock</span>
                      ) : item.availableStock <= item.lowStockThreshold ? (
                        <span className="badge bg-warning">Low Stock</span>
                      ) : (
                        <span className="badge bg-success">In Stock</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleEdit(item)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(item._id || item.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
