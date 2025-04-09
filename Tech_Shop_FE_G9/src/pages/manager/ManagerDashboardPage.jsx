import React , {useState}from "react";
import "/src/assets/css/adminDashboard.css";
import { FaUsers, FaFile, FaClipboardList, FaRegIdCard } from "react-icons/fa";
import { TbShoppingCartCopy } from "react-icons/tb";

import DeviceChart from "../../components/charts/SelleringCategoryChart";
import OrderChart from "../../components/charts/OrderChart";
import useDashboardData from "../../hooks/useDashboardData ";

const data = [
  { createdAt: '2024-12-05 00:00:00', computer: 20, phone: 45  },
  { createdAt: '2024-12-05 00:00:00', computer: 15, phone: 50  },
  { createdAt: '2024-12-05 00:00:00', computer: 25, phone: 40  },
  { createdAt: '2025-02-23 00:00:00', computer: 30, phone: 65  },
  { createdAt: '2025-02-23 00:00:00', computer: 18, phone: 35  },
  { createdAt: '2025-03-21 00:00:00', computer: 22, phone: 30  },
  { createdAt: '2025-03-10 00:00:00', computer: 35, phone: 25  },
  { createdAt: '2025-01-23 00:00:00', computer: 20, phone: 40  },
  { createdAt: '2025-01-23 00:00:00', computer: 45, phone: 43  },
  { createdAt: '2025-01-23 00:00:00', computer: 15, phone: 45  },
  { createdAt: '2025-03-24 00:00:00', computer: 30, phone: 43  }
];

const ManagerDashboardPage = () => {

  const {
    revenue,
    totalProductsSold,
    totalAvailVoucher,
    recentOrders,
    totalOrder
  } = useDashboardData();

  const [viewType, setViewType] = useState('month');


  const handleViewTypeChange = (e) => {
    const value = e.target.value;
    if(['month', 'year', 'day'].includes(value)) {
      setViewType(value);
    }
  }

  return (
    <div className="dashboard-content">
      <div className="card-stats">
              <div className="card-box justify-content-start gap-3">
                <div className="bg-secondary bg-opacity-10 p-2 rounded-circle d-flex justify-content-center align-items-center">
                  <img src="/images/icon/dash2.svg" alt="Total Sales"  style={{width: '30px', height:'30px'}}/>
                </div>

                <div className="card-info flex-column">
                  <h3 className="text-dark">{revenue}</h3>
                  <p className="fs-6">Revenue</p>
                </div>
              </div>
      
              <div className="card-box justify-content-start gap-3">

                <div className="bg-secondary bg-opacity-10 p-2 rounded-circle d-flex justify-content-center align-items-center">

                  <TbShoppingCartCopy className="card-icon" color="#EB5B00" size={30}/>
                </div> 

                <div className="card-info flex-column">
                  <h3 className="text-dark">{totalOrder}</h3>
                  <p className="fs-6">Order</p>
                </div>
              </div>
      
              <div className="card-box justify-content-start gap-3">
                <div className="bg-secondary bg-opacity-10 p-2 rounded-circle d-flex justify-content-center align-items-center">
                  <img src="/images/icon/product.svg" alt="Total Products Sold" style={{width: '30px', height:'30px'}}/>
                </div> 
                <div className="card-info flex-column">
                  <h3 className="text-dark">{totalProductsSold}</h3>
                  <p className="fs-6">Total Products Sold</p>
                </div>
              </div>
      
              <div className="card-box justify-content-start gap-3">
                 <div className="bg-secondary bg-opacity-10 p-2 rounded-circle d-flex justify-content-center align-items-center">

                  <img src="/images/icon/dash1.svg" alt="Total Purchase Due" style={{width: '30px', height:'30px'}}/>
                </div> 
                <div className="card-info flex-column">
                  <h3 className="text-dark">{totalAvailVoucher}</h3>
                  <p className="fs-6">Total Available Vouchers</p>
                </div>
              </div>
      </div>

      <div className="main">
        {/* Order Chart */}
        <OrderChart />
                
        {/* Recent Orders */}
        <div className="bg-light rounded rounded-3 p-3 shadow-sm w-50">
        <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>CreateAt</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(recentOrders) &&              
                recentOrders.map((order, index) => (
                  <tr key={index} className="align-middle mb-2">
                    <td>{index+1}</td>
                    <td>
                      {order.fullName}
                    </td>
                    <td>{order.amount}</td>
                    <td>{new Date(order.orderDate).toISOString().split("T")[0]}</td>
                    <td>
                      <span className={'p-1 rounded rounded-3 bg-primary text-light'
                        } style={{fontSize: '14px'}}>{order.status}</span>
                      </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Sellering Category Chart */}
      <div className="main">
        <div className="bg-light rounded rounded-3 p-3 shadow-sm w-100">
          <h3>Selling Category</h3>
          <div className="d-flex justify-content-end mt-4">
              <select 
                value={viewType}
                onChange={handleViewTypeChange} 
                className="form-select"
                style={{width: '150px'}}
              >
                <option value="month">Month</option>
                <option value="year">Year</option>
                <option value="day">Day</option>
              </select>
          </div>
          <DeviceChart type={viewType}/>
        </div>
      </div>


    </div>
  );
}

export default ManagerDashboardPage;