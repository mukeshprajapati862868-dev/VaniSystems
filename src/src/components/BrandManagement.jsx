import React, { useState } from "react";
import { useBrands } from "../context/BrandContext";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const BrandManagement = () => {
  const { brands, addBrand, editBrand, deleteBrand } = useBrands();
  const [showForm, setShowForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    website: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBrand) {
      editBrand(editingBrand.id, formData);
      setEditingBrand(null);
    } else {
      addBrand(formData);
    }
    setFormData({ name: "", description: "", logo: "", website: "" });
    setShowForm(false);
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      description: brand.description,
      logo: brand.logo,
      website: brand.website,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      deleteBrand(id);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Brand Management</h5>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            <FaPlus className="me-2" />
            {showForm ? "Cancel" : "Add Brand"}
          </button>
        </div>

        {showForm && (
          <div className="card bg-light mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">{editingBrand ? "Edit Brand" : "Add New Brand"}</h6>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Brand Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Website</label>
                    <input
                      type="url"
                      className="form-control"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
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
                  <div className="col-12">
                    <label className="form-label">Logo</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </div>
                  {formData.logo && (
                    <div className="col-12">
                      <img
                        src={formData.logo}
                        alt="Logo Preview"
                        className="img-fluid rounded"
                        style={{ maxHeight: "100px" }}
                      />
                    </div>
                  )}
                  <div className="col-12">
                    <button type="submit" className="btn btn-success">
                      {editingBrand ? "Update Brand" : "Add Brand"}
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
                <th>Logo</th>
                <th>Name</th>
                <th>Description</th>
                <th>Website</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No brands found.
                  </td>
                </tr>
              ) : (
                brands.map((brand) => (
                  <tr key={brand.id}>
                    <td>
                      {brand.logo ? (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="rounded"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      ) : (
                        <div className="bg-secondary rounded d-flex align-items-center justify-content-center text-white" style={{ width: "50px", height: "50px" }}>
                          N/A
                        </div>
                      )}
                    </td>
                    <td>{brand.name}</td>
                    <td>{brand.description || "-"}</td>
                    <td>
                      {brand.website ? (
                        <a href={brand.website} target="_blank" rel="noopener noreferrer" className="text-primary">
                          Visit
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleEdit(brand)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(brand.id)}
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

export default BrandManagement;
