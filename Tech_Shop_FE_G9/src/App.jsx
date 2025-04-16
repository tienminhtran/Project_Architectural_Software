import React from "react";
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
import CheckCodeModal from "./components/layout/CheckCodeModal"; // đường dẫn đúng
import ProductCategories from "./components/layout/Categories/ProductCategories"; // đường dẫn đúng

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
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* Admin Page */}

                <Route
                    element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}
                >
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

                {/* Common Page */}
                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}
                        />
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
                </Route>

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER"]}
                        />
                    }
                >
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

                <Route
                    element={<ProtectedRoute allowedRoles={["ROLE_MANAGER"]} />}
                >
                    <Route
                        path="/common/checkCode"
                        element={
                            <DashboardLayout>
                                <CheckCodeModal />
                            </DashboardLayout>
                        }
                    />
                </Route>

                {/* Manager Page */}
                <Route
                    element={<ProtectedRoute allowedRoles={["ROLE_MANAGER"]} />}
                >
                    <Route
                        path="/manager/dashboard"
                        element={
                            <DashboardLayout>
                                <ManagerPage />
                            </DashboardLayout>
                        }
                    />
                </Route>


        <Route element={<ProtectedRoute allowedRoles={["ROLE_MANAGER"]} />}>
          <Route
              path="/common/checkCode"
              element={
                <DashboardLayout>
                  <CheckCodeModal />
                </DashboardLayout>
              }
            />
        </Route>

        {/* Manager Page */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_MANAGER"]} />}>
          <Route
            path="/manager/dashboard"
            element={
              <DashboardLayout>
                <ManagerPage />
              </DashboardLayout>
            }
          />
        </Route>


        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<ProductCategories />} />
      </Routes>
    </Router>
  );
}

export default App;
