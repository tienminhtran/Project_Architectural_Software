import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/auth/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/admin/AdminDashboardPage';
import ManagerPage from './pages/manager/ManagerDashboardPage';

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<LoginPage/>} />
      {/* Admin Page */}
      <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
        <Route >
            <Route path="/admin/dashboard" element={<AdminPage />} />
        </Route>
      </Route>


      {/* Manager Page */}
      <Route element={<ProtectedRoute allowedRoles={['ROLE_MANAGER']} />}>
          <Route path="/manager/dashboard" element={<ManagerPage />} />
      </Route>

      <Route path="/" element={<HomePage/>} />
      </Routes>
    </Router>
  )
}

export default App
