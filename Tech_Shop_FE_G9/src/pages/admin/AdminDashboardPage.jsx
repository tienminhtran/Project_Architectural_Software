import React from "react";
import { FaUsers, FaFile, FaClipboardList, FaRegIdCard } from "react-icons/fa";
import "/src/assets/css/adminDashboard.css"; // Import CSS file
import useDashboardData from "../../hooks/useDashboardData ";

const AdminDashboardPage = () => {
  const {
    revenue,
    totalAvailVoucher,
    totalProducts,
    totalProductsSold,
    bestSeller,
    recentlyProduct,
    loyalCustomer,
    countByRoleManager,
    countByRoleUser,
    totalOrder,
    totalOrderPending
  } = useDashboardData();

  return (
    <div className="dashboard-content">
      {/* Header */}
      {/* Thống kê tổng quan */}
      <div className="stats-grid">
        <div className="stat-card">
          <img src="/images/icon/dash2.svg" alt="Total Sales" />
          <h3>{revenue}</h3>
          <p>Total Purchase Due</p>
        </div>
        <div className="stat-card">
          <img src="/images/icon/dash1.svg" alt="Total Purchase Due" />
          <h3>{totalAvailVoucher}</h3>
          <p>Total Available Vouchers</p>
        </div>
        <div className="stat-card">
          <img src="/images/icon/product.svg" alt="Total Products Sold" />
          <h3>{totalProductsSold}</h3>
          <p>Total Products Sold</p>
        </div>
        <div className="stat-card">
          <img src="/images/icon/product.svg" alt="Total Product" />
          <h3>{totalProducts}</h3>
          <p>Total Products</p>
        </div>
      </div>

      {/* Thống kê khách hàng / đơn hàng */}
      <div className="card-stats">
        <div className="card-box orange">
          <div className="card-info">
            <h3>{countByRoleUser}</h3>
            <p>Customers</p>
          </div>
          <FaUsers className="card-icon" />
        </div>

        <div className="card-box blue">
          <div className="card-info">
            <h3>{countByRoleManager}</h3>
            <p>Staff</p>
          </div>
          <FaRegIdCard className="card-icon" />
        </div>

        <div className="card-box darkblue">
          <div className="card-info">
            <h3>{totalOrder}</h3>
            <p>Purchase Invoice</p>
          </div>
          <FaClipboardList className="card-icon" />
        </div>

        <div className="card-box green">
          <div className="card-info">
            <h3>{totalOrderPending}</h3>
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
                <th>Total Sold</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {bestSeller.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><img src={product.thumbnail} alt="image" style={{width: '40px', height: '40px', marginLeft: '5px'}}/> {product.productName}</td>
                  <td>{product.totalSold}</td>
                  <td>{product.totalRevenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recently Added Products */}
        <div className="product-table">
          <h3>Recently Added Products</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Products</th>
                <th>Price</th>
                <th>CreateAt</th>
              </tr>
            </thead>
            <tbody>
              {recentlyProduct.map((product, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>
                    <img 
                      src={product.thumbnail.startsWith("https://") ? product.thumbnail : `/public/images/product/${product.thumbnail.replace(/^[^_]+_[^_]+_/, "")}`} 
                      alt="image" 
                      style={{width: '40px', height: '40px', marginRight: '5px'}}
                    />
                     {product.productName}
                  </td>
                  <td>{product.price}</td>
                  <td>{new Date(product.createdAt).toISOString().split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Khách hàng thân thiết */}
      <div className="customer-tables">
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
            {loyalCustomer.map((customer, index) => (
              <tr key={index}>
                <td>{index + 1 }</td>
                <td>{customer.fullName}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.email}</td>
                <td>{customer.dob}</td>
                <td>{customer.totalSpent}</td>
              </tr>
            ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
