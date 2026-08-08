{activeSection === "products" && (
              <>
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body p-3 p-md-4">
                    <h5 className="fw-bold mb-4">Add New Product</h5>
                    <form onSubmit={addProductSubmitHandler}>
                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <label className="form-label fw-semibold">Product Title</label>
                          <input type="text" name="title" className="form-control" placeholder="Enter product title" value={productForm.title} onChange={handleProductChange} required />
                        </div>
                        <div className="col-12 col-md-3">
                          <label className="form-label fw-semibold">Price</label>
                          <input type="number" name="price" className="form-control" placeholder="₹ Price" value={productForm.price} onChange={handleProductChange} required />
                        </div>
                        <div className="col-12 col-md-3">
                          <label className="form-label fw-semibold">Discount %</label>
                          <input type="number" name="discount" className="form-control" placeholder="Discount" value={productForm.discount} onChange={handleProductChange} required />
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-semibold">Description</label>
                          <textarea name="description" className="form-control" rows="4" placeholder="Enter product description" value={productForm.description} onChange={handleProductChange} required></textarea>
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-semibold">Product Image</label>
                          <input type="file" className="form-control" accept="image/*" onChange={handleProductImage} />
                        </div>
                        {productForm.image && (
                          <div className="col-12">
                            <img src={productForm.image} alt="Product Preview" className="img-fluid rounded" style={{ maxHeight: "250px" }} />
                          </div>
                        )}
                        <div className="col-12">
                          <button type="submit" className="btn btn-success px-4">
                            <FaPlus className="me-2" />Add Product
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="row g-4">
                  {products.map((product) => (
                    <div className="col-12 col-sm-6 col-xl-4" key={product.id}>
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="position-relative">
                          <img src={product.image} alt={product.title} className="card-img-top" style={{ height: "220px", objectFit: "cover" }} />
                          {product.discount > 0 && (
                            <span className="position-absolute top-0 end-0 m-2 badge bg-danger">
                              {product.discount}% OFF
                            </span>
                          )}
                        </div>
                        <div className="card-body">
                          <h5 className="fw-bold">{product.title}</h5>
                          <p className="text-muted small">{product.description}</p>
                          <div className="d-flex gap-2 align-items-center">
                            {product.discount > 0 && <span className="text-muted" style={{ textDecoration: 'line-through' }}>₹{product.price}</span>}
                            <strong className="text-success fs-5">₹{product.discountPrice}</strong>
                          </div>
                          <button className="btn btn-outline-danger btn-sm mt-3" onClick={() => deleteProduct(product.id)}>
                            <FaTrash className="me-1" />Delete Product
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            // ======================================================
  // PRODUCT PANEL MANAGEMENT FUNCTIONS (UPDATED)
  // ======================================================
  const handleProductChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid product image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProductForm({
        ...productForm,
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const addProductSubmitHandler = (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price || !productForm.discount || !productForm.description) {
      alert("Please fill all product details.");
      return;
    }

    addProduct(productForm);
    setProductForm({ title: "", price: "", discount: "", description: "", image: "" });
    alert("Product added successfully! Visible instantly inside Products page.");
  };