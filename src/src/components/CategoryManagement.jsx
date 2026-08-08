import React, { useState } from "react";
import { useCategories } from "../context/CategoryContext";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaPlus } from "react-icons/fa";

const CategoryManagement = () => {
  const { categories, addCategory, editCategory, deleteCategory, toggleCategoryStatus } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      editCategory(editingCategory.id, formData);
      setEditingCategory(null);
    } else {
      addCategory(formData);
    }
    setFormData({ name: "", description: "", image: "" });
    setShowForm(false);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id);
    }
  };

  const handleToggle = (id) => {
    toggleCategoryStatus(id);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Category Management</h5>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            <FaPlus className="me-2" />
            {showForm ? "Cancel" : "Add Category"}
          </button>
        </div>

        {showForm && (
          <div className="card bg-light mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">{editingCategory ? "Edit Category" : "Add New Category"}</h6>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  {formData.image && (
                    <div className="col-12">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="img-fluid rounded"
                        style={{ maxHeight: "150px" }}
                      />
                    </div>
                  )}
                  <div className="col-12">
                    <button type="submit" className="btn btn-success">
                      {editingCategory ? "Update Category" : "Add Category"}
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
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="rounded"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      ) : (
                        <div className="bg-secondary rounded d-flex align-items-center justify-content-center text-white" style={{ width: "50px", height: "50px" }}>
                          N/A
                        </div>
                      )}
                    </td>
                    <td>{category.name}</td>
                    <td>{category.description || "-"}</td>
                    <td>
                      {category.isActive ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-secondary">Inactive</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleEdit(category)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-outline-info"
                          onClick={() => handleToggle(category.id)}
                          title={category.isActive ? "Disable" : "Enable"}
                        >
                          {category.isActive ? <FaToggleOn /> : <FaToggleOff />}
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(category.id)}
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

export default CategoryManagement;
