import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ======================================================
// CONTEXT PROVIDERS
// ======================================================
import { AuthProvider, useAuth } from "./src/context/AuthContext"; // Logic moved to this page
import { CartProvider } from "./src/context/CartContext";
import { GalleryProvider } from "./src/context/GalleryContext";
import { CandidateRegistrationProvider } from "./src/context/CandidateRegistrationContext";
import { ProductProvider } from "./src/context/ProductContext"; // Sync products state globally
import { OrderProvider } from "./src/context/OrderContext";
import { NotificationProvider } from "./src/context/NotificationContext";
import { PaymentProvider } from "./src/context/PaymentContext";
import { UserProvider } from "./src/context/UserContext";
import { CategoryProvider } from "./src/context/CategoryContext";
import { BrandProvider } from "./src/context/BrandContext";
import { CouponProvider } from "./src/context/CouponContext";
import { InventoryProvider } from "./src/context/InventoryContext";
import { ReportsProvider } from "./src/context/ReportsContext";
import { SecurityProvider } from "./src/context/SecurityContext";
import { WishlistProvider } from "./src/context/WishlistContext";
import { AddressProvider } from "./src/context/AddressContext";

// ======================================================
// COMMON COMPONENTS
// ======================================================
import TopBar from "./src/components/common/TopBar";
import Header from "./src/components/common/Header";
import Footer from "./src/components/common/Footer";

// ======================================================
// WEBSITE PAGES
// ======================================================
import Home from "./src/pages/Home";
import Profile from "./src/pages/Profile";
import Milestones from "./src/pages/Milestones";
import Team from "./src/pages/Team";
import LatestInformation from "./src/pages/LatestInformation";
import Application from "./src/pages/Application";
import Consultancy from "./src/pages/Consultancy";
import Manpower from "./src/pages/Manpowe";
import GeoSocialService from "./src/pages/GeoSocialService";
import PhotoGallery from "./src/pages/PhotoGallery";
import VideoGallery from "./src/pages/VideoGallery";
import Notifications from "./src/pages/Notifications";
import Contact from "./src/pages/Contact";
import Cart from "./src/pages/Cart";

// ======================================================
// TOP BAR & AUTH PAGES
// ======================================================
import EmpLogin from "./src/pages/EmpLogin";
import AdminLogin from "./src/pages/AdminLogin";
import AdminDashboard from "./src/pages/AdminDashboard";
import OnlineRegistration from "./src/pages/OnlineRegistration";
import FeePayment from "./src/pages/FeePayment";
import Products from "./src/pages/Products";
import Success from "./src/pages/Success";
import Checkout from "./src/pages/Checkout";

// ======================================================
// ADMIN MODE GUARD
// ======================================================
const AdminModeGuard = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const isAdminAuthenticated =
    isAuthenticated && (user?.role === "admin" || user?.role === "Admin");

  if (isAdminAuthenticated) {
    return <Navigate to="/admin-panel" replace />;
  }
  return children;
};

// ======================================================
// MAIN APP COMPONENT
// ======================================================
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AddressProvider>
            <GalleryProvider>
              <CandidateRegistrationProvider>
                <ProductProvider>
                  <OrderProvider>
                    <NotificationProvider>
                      <PaymentProvider>
                        <UserProvider>
                          <CategoryProvider>
                            <BrandProvider>
                              <CouponProvider>
                                <InventoryProvider>
                                  <ReportsProvider>
                                    <SecurityProvider>
                                      <BrowserRouter>
                                        
                                        <TopBar />
                                        <Header />

                                        <Routes>
                                          {/* HOME & MAIN PAGES */}
                                          <Route path="/" element={<AdminModeGuard><Home /></AdminModeGuard>} />
                                          <Route path="/home" element={<AdminModeGuard><Home /></AdminModeGuard>} />
                                          <Route path="/profile" element={<Profile />} />
                                          <Route path="/milestones" element={<AdminModeGuard><Milestones /></AdminModeGuard>} />
                                          <Route path="/team" element={<AdminModeGuard><Team /></AdminModeGuard>} />
                                          <Route path="/latestinformation" element={<AdminModeGuard><LatestInformation /></AdminModeGuard>} />

                                          {/* SERVICES */}
                                          <Route path="/application-development" element={<AdminModeGuard><Application /></AdminModeGuard>} />
                                          <Route path="/consultant-service" element={<AdminModeGuard><Consultancy /></AdminModeGuard>} />
                                          <Route path="/manpower-service" element={<AdminModeGuard><Manpower /></AdminModeGuard>} />
                                          <Route path="/geo-social-service" element={<AdminModeGuard><GeoSocialService /></AdminModeGuard>} />

                                          {/* GALLERIES */}
                                          <Route path="/photo-gallery" element={<AdminModeGuard><PhotoGallery /></AdminModeGuard>} />
                                          <Route path="/video-gallery" element={<AdminModeGuard><VideoGallery /></AdminModeGuard>} />

                                          {/* CAREER & CONTACT */}
                                          <Route path="/career" element={<AdminModeGuard><Notifications /></AdminModeGuard>} />
                                          <Route path="/contact" element={<AdminModeGuard><Contact /></AdminModeGuard>} />

                                          {/* E-COMMERCE & USER SYSTEM */}
                                          <Route path="/products" element={<AdminModeGuard><Products /></AdminModeGuard>} />
                                          <Route path="/cart" element={<AdminModeGuard><Cart /></AdminModeGuard>} />
                                          <Route path="/checkout" element={<AdminModeGuard><Checkout /></AdminModeGuard>} />
                                          <Route path="/success" element={<AdminModeGuard><Success /></AdminModeGuard>} />
                                          <Route path="/online-registration" element={<AdminModeGuard><OnlineRegistration /></AdminModeGuard>} />
                                          <Route path="/fee-payment" element={<AdminModeGuard><FeePayment /></AdminModeGuard>} />

                                          {/* AUTH & PROFILE */}
                                          <Route path="/emp-login" element={<AdminModeGuard><EmpLogin /></AdminModeGuard>} />
                                          <Route path="/user-profile" element={<Navigate to="/profile" replace />} />

                                          {/* ADMIN ROUTES */}
                                          <Route path="/admin-login" element={<AdminLogin />} />
                                          <Route path="/admin-panel" element={
                                            <UserProvider>
                                              <AdminDashboard />
                                            </UserProvider>
                                          } />
                                        </Routes>

                                        <Footer />

                                      </BrowserRouter>
                                    </SecurityProvider>
                                  </ReportsProvider>
                                </InventoryProvider>
                              </CouponProvider>
                            </BrandProvider>
                          </CategoryProvider>
                        </UserProvider>
                      </PaymentProvider>
                    </NotificationProvider>
                  </OrderProvider>
                </ProductProvider>
              </CandidateRegistrationProvider>
            </GalleryProvider>
          </AddressProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
