import React from "react";
import { FaUsers, FaFile, FaClipboardList,FaRegIdCard   } from "react-icons/fa";
import Menu from "/src/components/layout/Admin/Menu"; // Sidebar component
import Menu_Header from "/src/components/layout/Admin/Menu_Header"; // Header component
import "/src/assets/css/adminDashboard.css"; // Import CSS file

const AdminDashboardPage = () => {
  return (
    <div className="axil-signin-area ">
      <div className="admin-dashboard">
      {/* Sidebar */}
        <Menu />

      {/* Main Content */}
        <div className="admin-content ">
          {/* Header */}
          <Menu_Header />

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
              <FaRegIdCard   className="card-icon" />

            </div>

            <div className="card-box darkblue">
              <div className="card-info">
                <h3>12</h3>
                <p>Purchase Invoice</p>
              </div>
              <FaClipboardList  className="card-icon" />
            </div>
            
            <div className="card-box green">
              <div className="card-info">
                <h3>12</h3>
                <p>Purchase Pending</p>
              </div>
              <FaFile className="card-icon" />
            </div>
          </div>




          <div className="product-tables">
          {/* Best Seller */}
            <div className="product-table">
              <h3>Best Seller</h3>
              <table>
                <thead>
                  <tr>
                    <th>Top</th>
                    <th>Products</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Acer Swift 3</td>
                    <td>9000000.00</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>LG Gram</td>
                    <td>8000000.00</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>HP ProBook</td>
                    <td>12000000.00</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Samsung Galaxy Book</td>
                    <td>10000000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recently Added Products */}
            <div className="product-table">
              <h3>Recently Added Products</h3>
              <table>
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>Products</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Dell G15</td>
                    <td>15000000.00</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>HP ProBook</td>
                    <td>12000000.00</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Acer Swift 3</td>
                    <td>9000000.00</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Lenovo ThinkPad</td>
                    <td>11000000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Khách hàng thân thiết */}
          <div className="customer-table">
            <h3>Loyal Customers</h3>
            <table>
              <thead>
                <tr>
                  <th>Top</th>
                  <th>Full Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Dob</th>
                  <th>Total Purchase Due</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Nguyễn Hà Huế</td>
                  <td>0468392418</td>
                  <td>user@gmail.com</td>
                  <td>1985-05-21</td>
                  <td>69,000,000</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Mai Hồng Linh</td>
                  <td>0956274924</td>
                  <td>user48@gmail.com</td>
                  <td>2005-08-12</td>
                  <td>66,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>    
    </div>
  );
};

export default AdminDashboardPage;
