import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from "/src/components/layout/Admin/Menu"; // Sidebar component
import Menu_Header from "/src/components/layout/Admin/Menu_Header"; // Header component

import ProtectedRoute from './components/auth/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/admin/AdminDashboardPage';
import ManagerPage from './pages/manager/ManagerDashboardPage';
import BrandPage from './pages/common/BrandPage';

import ProfilePage from './pages/common/ProfilePage';
import ChangePassword from './pages/common/ChangePassword';


// Reusable Layout Component
const AdminLayout = ({ children }) => (
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

        {/* Admin Page */}
        {/* // Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout>
                <AdminPage />
              </AdminLayout>
            }
          />

          <Route
            path="/common/BrandPage"
            element={
              <AdminLayout>
                <BrandPage />
              </AdminLayout>
            }
          />

          <Route
            path="/common/ProfilePage"
            element={
              <AdminLayout>
                <ProfilePage />
              </AdminLayout>
            }
          />

          <Route
            path="/common/ChangePassword"
            element={
              <AdminLayout>
                <ChangePassword />
              </AdminLayout>
            }
          />

        </Route>

        {/* Manager Page */}
        <Route element={<ProtectedRoute allowedRoles={['ROLE_MANAGER']} />}>
          <Route path="/manager/dashboard" element={<ManagerPage />} />
        </Route>

        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
