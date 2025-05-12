import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "/src/components/layout/Admin/Menu"; // Sidebar component
import Menu_Header from "/src/components/layout/Admin/Menu_Header"; // Header component

import ProtectedRoute from "./components/auth/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/admin/AdminDashboardPage";
import ManagerPage from "./pages/manager/ManagerDashboardPage";
import BrandPage from "./pages/common/brand/BrandPage";

import ProfilePage from "./pages/common/user/ProfilePage";
import ChangePassword from "./pages/common/user/ChangePassword";
import AddBrandPage from "./pages/common/brand/AddBrandPage";
import RegisterPage from "./pages/RegisterPage";
import CategoryPage from "./pages/common/category/CommonCategoryPage";
import AddCategoryPage from "./pages/common/category/AddCategoryPage";
import VoucherPage from "./pages/common/voucher/VoucherPage";
import FormVoucher from "./pages/common/voucher/FormVoucher";
import UserPage from "./pages/common/user/UserPage";
import AddUserPage from "./pages/common/user/AddUserPage";
import ProductPage from "./pages/common/product/ProductPage";
import FormProduct from "./pages/common/product/FormProduct";
import OrderPage from "./pages/common/order/OrderPage";
import OrderDetailPage from "./pages/common/order/OrderDetailModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import UpdateUserPage from "./pages/common/user/UpdateUserPage";
import AdminCodeControllerPage from "./pages/admin/AdminCodeControllerPage";
import CheckCodeModal from "./components/layout/CheckCodeModal"; 
import ProductCategory from "./components/layout/Categories/ProductCategory"; 
import HomeProductDetail from "./components/layout/HomeProductDetail";  
import Step1Cart from "./pages/carts/CartBuyOrderBox"; 
import Step2Cart from "./pages/carts/OrderInfoForm"; 
import Step3Cart from "./pages/carts/OrderPayment"; 
import Step4Cart from "./pages/carts/OrderComplete"; 
import HomeCart from "./pages/carts/HomeCart"; 
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FavoriteProducts from "./components/layout/FavoriteProducts"; 
import AccountPage  from "./pages/common/user/AccountPage";
import '@fortawesome/fontawesome-free/css/all.min.css';
import CallButton from './components/layout/CallButton';
import ChatBox from "./components/layout/ChatBox";
import BlogPosts from "./pages/common/blog/blogPosts"; // Import BlogPosts component
import '../src/assets/css/ChatIcon.css'
// Reusable Layout Component
const DashboardLayout = ({ children }) => (
  <div className="axil-signin-area">
    <div className="admin-dashboard">
      <Menu />
      <div className="admin-content">
        <Menu_Header />
        {children}
      </div>
    </div>
  </div>
);

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <Router>

      <CallButton />
      <div>
      {showChat ? (
        <ChatBox onClose={() => setShowChat(false)} />
      ) : (
        <div className="chat-icon" onClick={() => setShowChat(true)}>
          <i className="fas fa-comment-dots"></i>
        </div>
      )}
    </div>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/categories/:category" element={<ProductCategory />} />

        <Route path="blogs/all" element={<BlogPosts />} /> {/* Blog Posts Route */}
      
        <Route path="/product/:id" element={<HomeProductDetail />} />

        {/* Admin Page */}

        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
          <Route
            path="/admin/dashboard"
            element={
              <DashboardLayout>
                <AdminPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/common/UserPage"
            element={
              <DashboardLayout>
                <UserPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/common/AddUserPage"
            element={
              <DashboardLayout>
                <AddUserPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/common/UpdateUserPage/"
            element={
              <DashboardLayout>
                <UpdateUserPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/code/"
            element={
              <DashboardLayout>
                <AdminCodeControllerPage />
              </DashboardLayout>
            }
          />
        </Route>

        {/* Common Page (admin and manager)*/}
        <Route
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]} />
          }
        >
          <Route
            path="/common/BrandPage"
            element={
              <DashboardLayout>
                <BrandPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/common/ProfilePage"
            element={
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            }
          />

          <Route
            path="/common/ChangePassword"
            element={
              <DashboardLayout>
                <ChangePassword />
              </DashboardLayout>
            }
          />

          <Route
            path="/common/AddBrandPage"
            element={
              <DashboardLayout>
                <AddBrandPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/common/CategoryPage"
            element={
              <DashboardLayout>
                <CategoryPage />
              </DashboardLayout>
            }
          />
          {/* ///common/AddCategoryPage */}
          <Route
            path="/common/AddCategoryPage"
            element={
              <DashboardLayout>
                <AddCategoryPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/common/formProduct"
            element={
              <DashboardLayout>
                <FormProduct />
              </DashboardLayout>
            }
          />

          <Route
            path="/common/products"
            element={
              <DashboardLayout>
                <ProductPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/common/orders"
            element={
              <DashboardLayout>
                <OrderPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/common/orders/detail"
            element={
              <DashboardLayout>
                <OrderDetailPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/common/vouchers"
            element={
              <DashboardLayout>
                <VoucherPage />
              </DashboardLayout>
            }
          />

          <Route
            path="/common/formVoucher"
            element={
              <DashboardLayout>
                <FormVoucher />
              </DashboardLayout>
            }
          />
        </Route>


        {/* Manager Page */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_MANAGER"]} />}>
          <Route
            path="/common/checkCode"
            element={
              <DashboardLayout>
                <CheckCodeModal />
              </DashboardLayout>
            }
          />
          <Route
            path="/manager/dashboard"
            element={
              <DashboardLayout>
                <ManagerPage />
              </DashboardLayout>
            }
          />
        </Route>

        {/* User Routes (Nếu cần) */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER"]} />}>
        <Route path="/cart" element={<HomeCart />} />
          <Route path="/cart-buy-order-box" element={<Step1Cart />} />
          <Route path="/order-info-form" element={<Step2Cart />} />
          <Route path="/order-payment" element={<Step3Cart />} />
          <Route path="/order-complete" element={<Step4Cart />} />
          
          <Route path ="/my-account" element={<AccountPage />} />



        </Route>

      </Routes>
    </Router>

  );
}

export default App;
