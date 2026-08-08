import React, { useState, useEffect } from "react";

import {
  FaUsers,
  FaImages,
  FaVideo,
  FaBoxOpen,
  FaUserShield,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCheck,
  FaUserLock,
  FaTrash,
  FaUpload,
  FaPlus,
  FaEdit,
  FaFileAlt,
  FaEye,
  FaList,
  FaTag,
  FaTicketAlt,
  FaWarehouse,
  FaCreditCard,
  FaChartBar,
  FaShieldAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useGallery } from "../context/GalleryContext";

import { useCandidateRegistration } from "../context/CandidateRegistrationContext";

import apiService from "../services/apiService";

import { useUsers } from "../context/UserContext";
import { useCategories } from "../context/CategoryContext";
import { useBrands } from "../context/BrandContext";
import { useCoupons } from "../context/CouponContext";
import { useInventory } from "../context/InventoryContext";
import { useOrders } from "../context/OrderContext";
import { usePayments } from "../context/PaymentContext";
import { useReports } from "../context/ReportsContext";
import { useSecurity } from "../context/SecurityContext";
import { useAuth } from "../context/AuthContext";

import OrderManagement from "./OrderManagement";
import DashboardStats from "../components/DashboardStats";
import UserManagement from "../components/UserManagement";
import CategoryManagement from "../components/CategoryManagement";
import BrandManagement from "../components/BrandManagement";
import CouponManagement from "../components/CouponManagement";
import InventoryManagement from "../components/InventoryManagement";
import PaymentManagement from "../components/PaymentManagement";
import ReportsAnalytics from "../components/ReportsAnalytics";
import SecurityManagement from "../components/SecurityManagement";

// ======================================================
// ADMIN DASHBOARD COMPONENT
// ======================================================

const AdminDashboard = () => {
  // ======================================================
  // NAVIGATION
  // ======================================================

  const navigate = useNavigate();
  const { user, setUser, setIsAuthenticated } = useAuth();
  const isAdminUser = user?.role === "admin" || user?.role === "Admin";

  // ======================================================
  // GALLERY CONTEXT
  // ======================================================

  const {
    galleryImages,

    addGalleryImage,

    updateGalleryImage,

    deleteGalleryImage,
  } = useGallery();

  // ======================================================
  // CANDIDATE CONTEXT
  // ======================================================

  const {
    candidates,

    deleteCandidate,

    updatePaymentStatus,
  } = useCandidateRegistration();

  // ======================================================
  // PRODUCTS STATE
  // ======================================================

  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      if (!localStorage.getItem('token') || !isAdminUser) return;
      try {
        setLoading(true);
        const result = await apiService.getProducts();
        if (result.success) {
          setProducts(result.data.products || []);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [isAdminUser]);

  // ======================================================
  // NEW CONTEXTS
  // ======================================================

  const { users } = useUsers();
  const { categories } = useCategories();
  const { brands } = useBrands();
  const { coupons } = useCoupons();
  const { inventory } = useInventory();
  const { orders } = useOrders();
  const { payments } = usePayments();

  // ======================================================
  // BASIC STATES
  // ======================================================

  const [activeSection, setActiveSection] = useState("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  // ======================================================
  // SELECTED CANDIDATE
  // ======================================================

  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // ======================================================
  // EMPLOYEES
  // ======================================================

  const [employees, setEmployees] = useState([]);

  // Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      if (!localStorage.getItem('token') || !isAdminUser) return;
      try {
        setLoading(true);
        const result = await apiService.getAllUsers();
        if (result.success) {
          setEmployees(result.data.users || []);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [isAdminUser]);

  // ======================================================
  // IMAGES
  // ======================================================

  const [images, setImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);

  // ======================================================
  // VIDEOS
  // ======================================================

  const [videos, setVideos] = useState([]);

  const [selectedVideo, setSelectedVideo] = useState(null);

  // ======================================================
  // PRODUCT FORM
  // ======================================================

  const [productForm, setProductForm] = useState({
    title: "",
    sku: "",
    brand: "",
    category: "",
    price: "",
    discount: "",
    gst: "",
    shippingCharge: "",
    stock: "",
    description: "",
    image: "",
    featured: false,
    status: "Active",
  });

  // ======================================================
  // GALLERY FORM
  // ======================================================

  const [galleryForm, setGalleryForm] = useState({
    id: null,

    name: "",

    url: "",
  });

  const [isGalleryEditing, setIsGalleryEditing] = useState(false);

  // ======================================================
  // TOGGLE EMPLOYEE STATUS
  // ======================================================

  const toggleEmployeeStatus = (id) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id
          ? {
            ...employee,

            status: employee.status === "Active" ? "Blocked" : "Active",
          }
          : employee,
      ),
    );
  };

  // ======================================================
  // DELETE EMPLOYEE
  // ======================================================

  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (confirmDelete) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  // ======================================================
  // IMAGE SELECT
  // ======================================================

  const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage({
        id: Date.now(),

        name: file.name,

        url: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  // ======================================================
  // UPLOAD IMAGE
  // ======================================================

  const uploadImage = () => {
    if (!selectedImage) {
      alert("Please select an image first.");

      return;
    }

    setImages([...images, selectedImage]);

    setSelectedImage(null);

    alert("Image uploaded successfully.");
  };

  // ======================================================
  // DELETE IMAGE
  // ======================================================

  const deleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  // ======================================================
  // GALLERY IMAGE SELECT
  // ======================================================

  const handleGalleryImageSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setGalleryForm((previousForm) => ({
        ...previousForm,

        name: file.name,

        url: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // ======================================================
  // ADD / UPDATE GALLERY
  // ======================================================

  const saveGalleryImage = (e) => {
    e.preventDefault();

    if (!galleryForm.url) {
      alert("Please select an image first.");

      return;
    }

    if (isGalleryEditing) {
      updateGalleryImage(galleryForm);

      alert("Gallery photo updated successfully.");
    } else {
      addGalleryImage({
        id: Date.now(),

        name: galleryForm.name,

        url: galleryForm.url,
      });

      alert("Gallery photo added successfully.");
    }

    resetGalleryForm();
  };

  // ======================================================
  // EDIT GALLERY
  // ======================================================

  const editGalleryImage = (image) => {
    setGalleryForm({
      id: image.id,

      name: image.name,

      url: image.url,
    });

    setIsGalleryEditing(true);

    setActiveSection("gallery");
  };

  // ======================================================
  // DELETE GALLERY
  // ======================================================

  const removeGalleryImage = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery photo?",
    );

    if (confirmDelete) {
      deleteGalleryImage(id);
    }
  };

  // ======================================================
  // RESET GALLERY
  // ======================================================

  const resetGalleryForm = () => {
    setGalleryForm({
      id: null,

      name: "",

      url: "",
    });

    setIsGalleryEditing(false);
  };

  // ======================================================
  // VIDEO SELECT
  // ======================================================

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Please select a valid video.");

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setSelectedVideo({
        id: Date.now(),

        name: file.name,

        url: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  // ======================================================
  // UPLOAD VIDEO
  // ======================================================

  const uploadVideo = () => {
    if (!selectedVideo) {
      alert("Please select a video first.");

      return;
    }

    setVideos([...videos, selectedVideo]);

    setSelectedVideo(null);

    alert("Video uploaded successfully.");
  };

  // ======================================================
  // DELETE VIDEO
  // ======================================================

  const deleteVideo = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  // ======================================================
  // PRODUCT INPUT
  // ======================================================

  const handleProductChange = (e) => {
    setProductForm({
      ...productForm,

      [e.target.name]: e.target.value,
    });
  };

  // ======================================================
  // PRODUCT IMAGE
  // ======================================================

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

  // ======================================================
  // ADD PRODUCT
  // ======================================================

  const addProduct = async (e) => {
    e.preventDefault();

    if (
      !productForm.title ||
      !productForm.price ||
      !productForm.discount ||
      !productForm.description ||
      !productForm.image
    ) {
      alert("Please fill all product details.");
      return;
    }

    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        discount: parseFloat(productForm.discount),
        gst: parseFloat(productForm.gst) || 18,
        shippingCharge: parseFloat(productForm.shippingCharge) || 0,
        stock: parseInt(productForm.stock) || 0,
        featured: productForm.featured || false,
        discountPrice: productForm.price - (productForm.price * productForm.discount / 100)
      };

      const result = await apiService.createProduct(productData);
      if (result.success) {
        // Refresh products list
        const productsResult = await apiService.getProducts();
        if (productsResult.success) {
          setProducts(productsResult.data.products || []);
        }

        setProductForm({
          title: "",
          sku: "",
          brand: "",
          category: "",
          price: "",
          discount: "",
          gst: "",
          shippingCharge: "",
          stock: "",
          description: "",
          image: "",
          featured: false,
          status: "Active",
        });

        alert("Product added successfully.");
      } else {
        alert("Failed to add product: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert("Failed to add product");
    }
  };

  // ======================================================
  // DELETE PRODUCT
  // ======================================================

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const result = await apiService.deleteProduct(id);
        if (result.success) {
          // Refresh products list
          const productsResult = await apiService.getProducts();
          if (productsResult.success) {
            setProducts(productsResult.data.products || []);
          }
          alert("Product deleted successfully.");
        } else {
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert("Failed to delete product");
      }
    }
  };

  // ======================================================
  // DELETE CANDIDATE
  // ======================================================

  const handleDeleteCandidate = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this candidate?",
    );

    if (confirmDelete) {
      deleteCandidate(id);

      setSelectedCandidate(null);
    }
  };

  // ======================================================
  // PAYMENT STATUS CHANGE
  // ======================================================

  const handlePaymentStatus = (candidate) => {
    const newStatus = candidate.paymentStatus === "Paid" ? "Unpaid" : "Paid";

    updatePaymentStatus(
      candidate.id,

      newStatus,
    );
  };

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("activeUser");
    setUser(null);
    setIsAuthenticated(false);

    navigate("/admin-login", {
      replace: true,
    });
  };

  // ======================================================
  // ACTIVE EMPLOYEES
  // ======================================================

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active",
  ).length;

  // ======================================================
  // BLOCKED EMPLOYEES
  // ======================================================

  const blockedEmployees = employees.filter(
    (employee) => employee.status === "Blocked",
  ).length;

  if (!localStorage.getItem("token") || !isAdminUser) {
    return (
      <div className="container py-5 mt-5 text-center">
        <h3 className="fw-bold text-muted">Access Denied</h3>
        <p className="text-muted mb-4">You need to be logged in with an admin account to access this page.</p>
        <button className="btn btn-primary px-4" onClick={() => navigate("/admin-login")}>
          Admin Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-5 mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100"
      style={{
        backgroundColor: "#f4f7fb",
      }}
    >
      {/* ==================================================
          MOBILE HEADER
      ================================================== */}

      <div
        className="d-lg-none d-flex align-items-center justify-content-between p-3 text-white"
        style={{
          backgroundColor: "#0d2744",
        }}
      >
        <h5 className="mb-0 fw-bold">Admin Panel</h5>

        <button
          className="btn btn-warning"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="container-fluid">
        <div className="row">
          {/* ==================================================
              SIDEBAR
          ================================================== */}

          <div
            className={`col-12 col-lg-3 col-xl-2 p-0 ${sidebarOpen ? "d-block" : "d-none d-lg-block"
              }`}
          >
            <div
              className="text-white min-vh-100 p-3"
              style={{
                backgroundColor: "#0d2744",
              }}
            >
              <div className="text-center mb-4">
                <FaUserShield
                  className="text-warning"
                  style={{
                    fontSize: "45px",
                  }}
                />

                <h4 className="fw-bold mt-2">Admin Panel</h4>

                <small className="text-light">Vani Systems</small>
              </div>

              <div className="d-grid gap-2">
                {/* DASHBOARD */}

                <button
                  className={`btn text-start ${activeSection === "dashboard"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("dashboard");

                    setSidebarOpen(false);
                  }}
                >
                  <FaUserShield className="me-2" />
                  Dashboard
                </button>

                {/* EMPLOYEE */}

                <button
                  className={`btn text-start ${activeSection === "employees"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("employees");

                    setSidebarOpen(false);
                  }}
                >
                  <FaUsers className="me-2" />
                  Employee Management
                </button>

                {/* CANDIDATE */}

                <button
                  className={`btn text-start ${activeSection === "candidates"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("candidates");

                    setSelectedCandidate(null);

                    setSidebarOpen(false);
                  }}
                >
                  <FaFileAlt className="me-2" />
                  Candidate Registration Details
                </button>

                {/* GALLERY */}

                <button
                  className={`btn text-start ${activeSection === "gallery"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("gallery");

                    setSidebarOpen(false);
                  }}
                >
                  <FaImages className="me-2" />
                  Photo Gallery
                </button>

                {/* VIDEO */}

                <button
                  className={`btn text-start ${activeSection === "videos"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("videos");

                    setSidebarOpen(false);
                  }}
                >
                  <FaVideo className="me-2" />
                  Video Upload
                </button>

                {/* PRODUCT */}

                <button
                  className={`btn text-start ${activeSection === "products"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("products");

                    setSidebarOpen(false);
                  }}
                >
                  <FaBoxOpen className="me-2" />
                  Product Management
                </button>

                {/* ORDER MANAGEMENT */}

                <button
                  className={`btn text-start ${activeSection === "orders"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("orders");

                    setSidebarOpen(false);
                  }}
                >
                  <FaFileAlt className="me-2" />
                  Order Management
                </button>

                {/* USER MANAGEMENT */}

                <button
                  className={`btn text-start ${activeSection === "users"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("users");

                    setSidebarOpen(false);
                  }}
                >
                  <FaUsers className="me-2" />
                  User Management
                </button>

                {/* CATEGORY MANAGEMENT */}

                <button
                  className={`btn text-start ${activeSection === "categories"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("categories");

                    setSidebarOpen(false);
                  }}
                >
                  <FaList className="me-2" />
                  Category Management
                </button>

                {/* BRAND MANAGEMENT */}

                <button
                  className={`btn text-start ${activeSection === "brands"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("brands");

                    setSidebarOpen(false);
                  }}
                >
                  <FaTag className="me-2" />
                  Brand Management
                </button>

                {/* COUPON MANAGEMENT */}

                <button
                  className={`btn text-start ${activeSection === "coupons"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("coupons");

                    setSidebarOpen(false);
                  }}
                >
                  <FaTicketAlt className="me-2" />
                  Coupon Management
                </button>

                {/* INVENTORY MANAGEMENT */}

                <button
                  className={`btn text-start ${activeSection === "inventory"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("inventory");

                    setSidebarOpen(false);
                  }}
                >
                  <FaWarehouse className="me-2" />
                  Inventory Management
                </button>

                {/* PAYMENT MANAGEMENT */}

                <button
                  className={`btn text-start ${activeSection === "payments"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("payments");

                    setSidebarOpen(false);
                  }}
                >
                  <FaCreditCard className="me-2" />
                  Payment Management
                </button>

                {/* REPORTS & ANALYTICS */}

                <button
                  className={`btn text-start ${activeSection === "reports"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("reports");

                    setSidebarOpen(false);
                  }}
                >
                  <FaChartBar className="me-2" />
                  Reports & Analytics
                </button>

                {/* SECURITY MANAGEMENT */}

                <button
                  className={`btn text-start ${activeSection === "security"
                    ? "btn-warning"
                    : "btn-outline-light"
                    }`}
                  onClick={() => {
                    setActiveSection("security");

                    setSidebarOpen(false);
                  }}
                >
                  <FaShieldAlt className="me-2" />
                  Security Management
                </button>
              </div>

              {/* LOGOUT */}

              <button
                className="btn btn-danger w-100 mt-5"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </div>
          </div>

          {/* ==================================================
              MAIN CONTENT
          ================================================== */}

          <div className="col-12 col-lg-9 col-xl-10 p-3 p-md-4">
            {/* ==================================================
                TOP BAR
            ================================================== */}

            <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div>
                  <h3 className="fw-bold mb-1">
                    {activeSection === "dashboard" && "Dashboard"}

                    {activeSection === "employees" && "Employee Management"}

                    {activeSection === "candidates" &&
                      "Candidate Registration Details"}

                    {activeSection === "gallery" && "Photo Gallery Management"}

                    {activeSection === "videos" && "Video Management"}

                    {activeSection === "products" && "Product Management"}

                    {activeSection === "orders" && "Order Management"}

                    {activeSection === "users" && "User Management"}

                    {activeSection === "categories" && "Category Management"}

                    {activeSection === "brands" && "Brand Management"}

                    {activeSection === "coupons" && "Coupon Management"}

                    {activeSection === "inventory" && "Inventory Management"}

                    {activeSection === "payments" && "Payment Management"}

                    {activeSection === "reports" && "Reports & Analytics"}

                    {activeSection === "security" && "Security Management"}
                  </h3>

                  <small className="text-muted">
                    Manage your website from admin panel
                  </small>
                </div>

                <div className="text-muted">
                  <FaUserShield className="text-warning me-2" />
                  Admin: <strong>vanisystemsms</strong>
                </div>
              </div>
            </div>

            {/* ==================================================
                DASHBOARD
            ================================================== */}

            {activeSection === "dashboard" && (
              <DashboardStats />
            )}

            {/* ==================================================
                EMPLOYEE MANAGEMENT
            ================================================== */}

            {activeSection === "employees" && (
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table align-middle">
                      <thead>
                        <tr>
                          <th>#</th>

                          <th>Employee</th>

                          <th>Email</th>

                          <th>Phone</th>

                          <th>Status</th>

                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {employees.map((employee, index) => (
                          <tr key={employee._id || employee.id || index}>
                            <td>{index + 1}</td>

                            <td>
                              <strong>{employee.name}</strong>

                              <br />

                              <small className="text-muted">
                                {employee.role}
                              </small>
                            </td>

                            <td>{employee.email}</td>

                            <td>{employee.phone}</td>

                            <td>
                              <span
                                className={`badge ${employee.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                                  }`}
                              >
                                {employee.status}
                              </span>
                            </td>

                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className={`btn btn-sm ${employee.status === "Active"
                                    ? "btn-danger"
                                    : "btn-success"
                                    }`}
                                  onClick={() =>
                                    toggleEmployeeStatus(employee.id)
                                  }
                                >
                                  {employee.status === "Active" ? (
                                    <>
                                      <FaUserLock className="me-1" />
                                      Block
                                    </>
                                  ) : (
                                    <>
                                      <FaUserCheck className="me-1" />
                                      Unblock
                                    </>
                                  )}
                                </button>

                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => deleteEmployee(employee.id)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================
                CANDIDATE REGISTRATION DETAILS
            ================================================== */}

            {activeSection === "candidates" && (
              <CandidateManagement
                candidates={candidates}
                selectedCandidate={selectedCandidate}
                setSelectedCandidate={setSelectedCandidate}
                onDelete={handleDeleteCandidate}
                onPaymentStatus={handlePaymentStatus}
              />
            )}

            {/* ==================================================
                PHOTO GALLERY
            ================================================== */}

            {activeSection === "gallery" && (
              <>
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body p-3 p-md-4">
                    <h5 className="fw-bold mb-4">
                      {isGalleryEditing
                        ? "Edit Gallery Photo"
                        : "Add Gallery Photo"}
                    </h5>

                    <form onSubmit={saveGalleryImage}>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label fw-semibold">
                            Select Photo
                          </label>

                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleGalleryImageSelect}
                          />
                        </div>

                        {galleryForm.url && (
                          <div className="col-12">
                            <img
                              src={galleryForm.url}
                              alt="Gallery Preview"
                              className="img-fluid rounded"
                              style={{
                                maxHeight: "280px",

                                width: "100%",

                                objectFit: "contain",
                              }}
                            />
                          </div>
                        )}

                        <div className="col-12">
                          <div className="d-flex flex-wrap gap-2">
                            <button type="submit" className="btn btn-success">
                              {isGalleryEditing ? (
                                <>
                                  <FaEdit className="me-2" />
                                  Update Photo
                                </>
                              ) : (
                                <>
                                  <FaPlus className="me-2" />
                                  Add Photo
                                </>
                              )}
                            </button>

                            {isGalleryEditing && (
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={resetGalleryForm}
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="row g-4">
                  {galleryImages.length === 0 && (
                    <div className="col-12">
                      <div className="text-center py-5">
                        <FaImages
                          className="text-muted"
                          style={{
                            fontSize: "50px",
                          }}
                        />

                        <p className="text-muted mt-3">
                          No gallery photos added yet.
                        </p>
                      </div>
                    </div>
                  )}

                  {galleryImages.map((image) => (
                    <div
                      className="col-12 col-sm-6 col-lg-4 col-xl-3"
                      key={image._id || image.id || index}
                    >
                      <div className="card border-0 shadow-sm h-100">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="card-img-top"
                          style={{
                            height: "220px",

                            width: "100%",

                            objectFit: "cover",
                          }}
                        />

                        <div className="card-body">
                          <p className="small text-muted text-truncate mb-3">
                            {image.name}
                          </p>

                          <div className="d-flex flex-wrap gap-2">
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => editGalleryImage(image)}
                            >
                              <FaEdit className="me-1" />
                              Edit
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => removeGalleryImage(image.id)}
                            >
                              <FaTrash className="me-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ==================================================
                VIDEO MANAGEMENT
            ================================================== */}

            {activeSection === "videos" && (
              <>
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-3">Upload New Video</h5>

                    <input
                      type="file"
                      className="form-control mb-3"
                      accept="video/*"
                      onChange={handleVideoSelect}
                    />

                    {selectedVideo && (
                      <div className="mb-3">
                        <video
                          src={selectedVideo.url}
                          controls
                          className="w-100 rounded"
                          style={{
                            maxHeight: "250px",
                          }}
                        />
                      </div>
                    )}

                    <button className="btn btn-primary" onClick={uploadVideo}>
                      <FaUpload className="me-2" />
                      Upload Video
                    </button>
                  </div>
                </div>

                <div className="row g-4">
                  {videos.map((video, index) => (
                    <div className="col-12 col-md-6" key={video._id || video.id || index}>
                      <div className="card border-0 shadow-sm">
                        <video
                          src={video.url}
                          controls
                          className="w-100"
                          style={{
                            height: "250px",

                            objectFit: "cover",
                          }}
                        />

                        <div className="card-body">
                          <p className="small text-muted text-truncate">
                            {video.name}
                          </p>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteVideo(video.id)}
                          >
                            <FaTrash className="me-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ==================================================
                PRODUCT MANAGEMENT
            ================================================== */}

            {activeSection === "products" && (
              <>
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body p-3 p-md-4">
                    <h5 className="fw-bold mb-4">Add New Product</h5>

                    <form onSubmit={addProduct}>
                      <div className="row g-3">
                        <div className="col-12 col-md-4">
                          <label className="form-label fw-semibold">
                            Product Title
                          </label>

                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Enter product title"
                            value={productForm.title}
                            onChange={handleProductChange}
                          />
                        </div>

                        <div className="col-12 col-md-4">
                          <label className="form-label fw-semibold">
                            SKU
                          </label>

                          <input
                            type="text"
                            name="sku"
                            className="form-control"
                            placeholder="SKU-12345"
                            value={productForm.sku}
                            onChange={handleProductChange}
                          />
                        </div>

                        <div className="col-12 col-md-4">
                          <label className="form-label fw-semibold">
                            Brand
                          </label>

                          <input
                            type="text"
                            name="brand"
                            className="form-control"
                            placeholder="Brand name"
                            value={productForm.brand}
                            onChange={handleProductChange}
                          />
                        </div>

                        <div className="col-12 col-md-4">
                          <label className="form-label fw-semibold">
                            Category
                          </label>

                          <input
                            type="text"
                            name="category"
                            className="form-control"
                            placeholder="Category"
                            value={productForm.category}
                            onChange={handleProductChange}
                          />
                        </div>

                        <div className="col-12 col-md-2">
                          <label className="form-label fw-semibold">
                            Price (₹)
                          </label>

                          <input
                            type="number"
                            name="price"
                            className="form-control"
                            placeholder="Price"
                            value={productForm.price}
                            onChange={handleProductChange}
                          />
                        </div>

                        <div className="col-12 col-md-2">
                          <label className="form-label fw-semibold">
                            Discount %
                          </label>

                          <input
                            type="number"
                            name="discount"
                            className="form-control"
                            placeholder="Discount"
                            value={productForm.discount}
                            onChange={handleProductChange}
                          />
                        </div>

                        <div className="col-12 col-md-2">
                          <label className="form-label fw-semibold">
                            GST %
                          </label>

                          <input
                            type="number"
                            name="gst"
                            className="form-control"
                            placeholder="GST"
                            value={productForm.gst}
                            onChange={handleProductChange}
                          />
                        </div>

                        <div className="col-12 col-md-2">
                          <label className="form-label fw-semibold">
                            Shipping (₹)
                          </label>

                          <input
                            type="number"
                            name="shippingCharge"
                            className="form-control"
                            placeholder="Shipping"
                            value={productForm.shippingCharge}
                            onChange={handleProductChange}
                          />
                        </div>

                        <div className="col-12 col-md-2">
                          <label className="form-label fw-semibold">
                            Stock
                          </label>

                          <input
                            type="number"
                            name="stock"
                            className="form-control"
                            placeholder="Stock"
                            value={productForm.stock}
                            onChange={handleProductChange}
                          />
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="form-label fw-semibold">
                            Description
                          </label>

                          <textarea
                            name="description"
                            className="form-control"
                            rows="3"
                            placeholder="Enter product description"
                            value={productForm.description}
                            onChange={handleProductChange}
                          ></textarea>
                        </div>

                        <div className="col-12 col-md-3">
                          <label className="form-label fw-semibold">
                            Product Image
                          </label>

                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleProductImage}
                          />
                        </div>

                        <div className="col-12 col-md-3">
                          <label className="form-label fw-semibold">
                            Status
                          </label>

                          <select
                            name="status"
                            className="form-select"
                            value={productForm.status}
                            onChange={handleProductChange}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Draft">Draft</option>
                          </select>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="form-check mt-4">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="featured"
                              id="featured"
                              checked={productForm.featured}
                              onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                            />
                            <label className="form-check-label fw-semibold" htmlFor="featured">
                              Featured Product
                            </label>
                          </div>
                        </div>

                        {productForm.image && (
                          <div className="col-12">
                            <img
                              src={productForm.image}
                              alt="Product Preview"
                              className="img-fluid rounded"
                              style={{
                                maxHeight: "250px",
                              }}
                            />
                          </div>
                        )}

                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-success px-4"
                          >
                            <FaPlus className="me-2" />
                            Add Product
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="row g-4">
                  {products.map((product, index) => (
                    <div className="col-12 col-sm-6 col-xl-4" key={product._id || product.id || index}>
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="position-relative">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="card-img-top"
                            style={{
                              height: "220px",

                              objectFit: "cover",
                            }}
                          />

                          <span className="position-absolute top-0 end-0 m-2 badge bg-danger">
                            {product.discount}% OFF
                          </span>
                        </div>

                        <div className="card-body">
                          <h5 className="fw-bold">{product.title}</h5>

                          <p className="text-muted small">
                            {product.description}
                          </p>

                          <div className="d-flex gap-2 align-items-center">
                            <span className="text-muted" style={{ textDecoration: 'line-through' }}>
                              ₹{product.price}
                            </span>

                            <strong className="text-success fs-5">
                              ₹{product.discountPrice}
                            </strong>
                          </div>

                          <button
                            className="btn btn-outline-danger btn-sm mt-3"
                            onClick={() => deleteProduct(product._id || product.id)}
                          >
                            <FaTrash className="me-1" />
                            Delete Product
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ==================================================
                ORDER MANAGEMENT
            ================================================== */}

            {activeSection === "orders" && <OrderManagement />}

            {/* ==================================================
                USER MANAGEMENT
            ================================================== */}

            {activeSection === "users" && <UserManagement />}

            {/* ==================================================
                CATEGORY MANAGEMENT
            ================================================== */}

            {activeSection === "categories" && <CategoryManagement />}

            {/* ==================================================
                BRAND MANAGEMENT
            ================================================== */}

            {activeSection === "brands" && <BrandManagement />}

            {/* ==================================================
                COUPON MANAGEMENT
            ================================================== */}

            {activeSection === "coupons" && <CouponManagement />}

            {/* ==================================================
                INVENTORY MANAGEMENT
            ================================================== */}

            {activeSection === "inventory" && <InventoryManagement />}

            {/* ==================================================
                PAYMENT MANAGEMENT
            ================================================== */}

            {activeSection === "payments" && <PaymentManagement />}

            {/* ==================================================
                REPORTS & ANALYTICS
            ================================================== */}

            {activeSection === "reports" && <ReportsAnalytics />}

            {/* ==================================================
                SECURITY MANAGEMENT
            ================================================== */}

            {activeSection === "security" && <SecurityManagement />}
          </div>
        </div>
      </div>
    </div>
  );
};

// ======================================================
// DASHBOARD CARD
// ======================================================

const DashboardCard = ({ icon, value, title }) => {
  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          {icon}

          <h2 className="fw-bold mt-3">{value}</h2>

          <p className="text-muted mb-0">{title}</p>
        </div>
      </div>
    </div>
  );
};

// ======================================================
// CANDIDATE MANAGEMENT
// ======================================================

const CandidateManagement = ({
  candidates,

  selectedCandidate,

  setSelectedCandidate,

  onDelete,

  onPaymentStatus,
}) => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        {!selectedCandidate && (
          <>
            {candidates.length === 0 ? (
              <div className="text-center py-5">
                <FaFileAlt
                  className="text-muted"
                  style={{
                    fontSize: "55px",
                  }}
                />

                <h5 className="mt-3">No Candidate Registration Found</h5>

                <p className="text-muted">
                  Online Registration से candidate add होने पर यहां दिखेगा।
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>#</th>

                      <th>ID</th>

                      <th>Registration No.</th>

                      <th>Candidate</th>

                      <th>Apply For</th>

                      <th>Mobile</th>

                      <th>Payment</th>

                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {candidates.map((candidate, index) => (
                      <tr key={candidate._id || candidate.id || index}>
                        <td>{index + 1}</td>

                        <td>
                          <strong>{candidate.registrationNumber}</strong>
                        </td>

                        <td>
                          <span className="badge bg-secondary">
                            {candidate.registrationNo}
                          </span>
                        </td>

                        <td>
                          <strong>{candidate.applicantName}</strong>

                          <br />

                          <small className="text-muted">
                            {candidate.email}
                          </small>
                        </td>

                        <td>{candidate.applyFor}</td>

                        <td>{candidate.mobile}</td>

                        <td>
                          <span
                            className={`badge ${candidate.paymentStatus === "Paid"
                              ? "bg-success"
                              : "bg-danger"
                              }`}
                          >
                            {candidate.paymentStatus}
                          </span>
                        </td>

                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => setSelectedCandidate(candidate)}
                            >
                              <FaEye className="me-1" />
                              View
                            </button>

                            <button
                              className={`btn btn-sm ${candidate.paymentStatus === "Paid"
                                ? "btn-warning"
                                : "btn-success"
                                }`}
                              onClick={() => onPaymentStatus(candidate)}
                            >
                              {candidate.paymentStatus === "Paid"
                                ? "Unpaid"
                                : "Paid"}
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => onDelete(candidate.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {selectedCandidate && (
          <CandidateFullDetails
            candidate={selectedCandidate}
            onBack={() => setSelectedCandidate(null)}
          />
        )}
      </div>
    </div>
  );
};

// ======================================================
// FULL CANDIDATE DETAILS
// ======================================================

const CandidateFullDetails = ({
  candidate,

  onBack,
}) => {
  return (
    <div className="candidate-admin-details">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Candidate Registration Details</h4>

        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          ← Back to Candidates
        </button>
      </div>

      <div className="row g-3 mb-4">
        <InfoBox label="ID" value={candidate.registrationNumber} />

        <InfoBox label="Registration No." value={candidate.registrationNo} />

        <InfoBox label="Registration Date" value={candidate.registrationDate} />

        <InfoBox label="Payment Status" value={candidate.paymentStatus} />
      </div>

      <div className="card border shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold border-bottom pb-2 mb-4">Personal Details</h5>

          <div className="row g-3">
            <AdminDetail
              label="Applicant Name"
              value={candidate.applicantName}
            />

            <AdminDetail label="Father Name" value={candidate.fatherName} />

            <AdminDetail label="Mother Name" value={candidate.motherName} />

            <AdminDetail label="DOB" value={candidate.dob} />

            <AdminDetail label="Gender" value={candidate.gender} />

            <AdminDetail label="Caste" value={candidate.caste} />

            <AdminDetail label="Mobile No." value={candidate.mobile} />

            <AdminDetail label="Aadhar No." value={candidate.aadhar} />

            <AdminDetail label="Email Id" value={candidate.email} />

            <AdminDetail label="Country" value={candidate.country} />

            <AdminDetail label="State" value={candidate.state} />

            <AdminDetail label="City" value={candidate.city} />

            <AdminDetail label="Pin Code" value={candidate.pinCode} />

            <AdminDetail
              label="Highest Qualification"
              value={candidate.qualification}
            />

            <AdminDetail label="Apply For" value={candidate.applyFor} />

            <div className="col-12">
              <div className="border rounded p-3 bg-light">
                <strong>Address</strong>

                <p className="mb-0 mt-2">{candidate.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ======================================================
// INFO BOX
// ======================================================

const InfoBox = ({ label, value }) => {
  return (
    <div className="col-12 col-md-6 col-xl-3">
      <div className="border rounded p-3 bg-light">
        <small className="text-muted d-block">{label}</small>

        <strong>{value}</strong>
      </div>
    </div>
  );
};

// ======================================================
// ADMIN DETAIL
// ======================================================

const AdminDetail = ({ label, value }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="border rounded p-3 h-100">
        <small className="text-muted d-block mb-1">{label}</small>

        <strong>{value}</strong>
      </div>
    </div>
  );
};

export default AdminDashboard;
