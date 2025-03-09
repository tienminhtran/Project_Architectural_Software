import React from "react";
import { FaUsers, FaFile, FaClipboardList, FaRegIdCard } from "react-icons/fa";
import Menu from "/src/components/layout/Admin/Menu"; // Sidebar component
import Menu_Header from "/src/components/layout/Admin/Menu_Header"; // Header component
import "/src/assets/css/adminDashboard.css"; // Import CSS file


const BrandPage = () => {
  return (
    <div className="dashboard-content">
          {/* Header */}
          {/* Thống kê tổng quan */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>135000000</h3>
              <p>Total Purchase Due</p>
            </div>
            <div className="stat-card">
              <h3>0</h3>
              <p>Total Available Vouchers</p>
            </div>
            <div className="stat-card">
              <h3>12</h3>
              <p>Total Products Sold</p>
            </div>
            <div className="stat-card">
              <h3>1943</h3>
              <p>Total Products</p>
            </div>
          </div>

          {/* Thống kê khách hàng / đơn hàng */}
          <div className="card-stats">
            <div className="card-box orange">
              <div className="card-info">
                <h3>2</h3>
                <p>Customers</p>
              </div>
              <FaUsers className="card-icon" />
            </div>

            <div className="card-box blue">
              <div className="card-info">
                <h3>3</h3>
                <p>Staff</p>
              </div>
              <FaRegIdCard className="card-icon" />
            </div>

            <div className="card-box darkblue">
              <div className="card-info">
                <h3>12</h3>
                <p>Purchase Invoice</p>
              </div>
              <FaClipboardList className="card-icon" />
            </div>

            <div className="card-box green">
              <div className="card-info">
                <h3>12</h3>
                <p>Purchase Pending</p>
              </div>
              <FaFile className="card-icon" />
            </div>
          </div>
    </div>
  );
}

export default BrandPage;