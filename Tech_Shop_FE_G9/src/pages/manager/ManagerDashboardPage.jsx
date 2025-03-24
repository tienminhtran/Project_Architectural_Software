import React , {useState}from "react";
import "/src/assets/css/adminDashboard.css";
import { FaUsers, FaFile, FaClipboardList, FaRegIdCard } from "react-icons/fa";
import { TbShoppingCartCopy } from "react-icons/tb";

import DeviceChart from "../../components/charts/SelleringCategoryChart";
import OrderChart from "../../components/charts/OrderChart";
import useDashboardData from "../../hooks/useDashboardData ";

const recentlyProduct = [
  { customer: 'Phan Tiên Sinh', date: '2025-03-10', amount: '$156.00', status: 'Completed' },
  { customer: 'Nguyễn Tấn Thái Dương', date: '2025-03-09', amount: '$245.00', status: 'Processing' },
  { customer: 'Trần Hiển Vinh', date: '2025-03-09', amount: '$98.50', status: 'Pending' },
  { customer: 'Trần Minh Tiến', date: '2025-03-08', amount: '$387.00', status: 'Completed' },
];

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

  const [filteredDataSelect, setFilteredDataSelect] = useState([]);

  const handleViewTypeChange = (e) => {
    const value = e.target.value;
    if(['month', 'year', 'day'].includes(value)) {
      setViewType(value);
    }
  }

  // Tính tổng giá trị theo tháng
  const aggregateByMonth = (data) => {
    const groupedData = {};
  
    data.forEach((item) => {
      const date = new Date(item.createdAt);
      
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // "2024-3"
  
      // Nếu chưa có thì khởi tạo
      if (!groupedData[monthKey]) {
        groupedData[monthKey] = { createdAt: monthKey, computer: 0, phone: 0 };
      }

      groupedData[monthKey].computer += item.computer; 
      groupedData[monthKey].phone += item.phone; 
    });
  
    return Object.values(groupedData); // Chuyển object thành mảng
  };

  // Tính tổng giá trị theo năm
  const aggregateBYear = (data) => {
    const groupedData = {};
  
    data.forEach((item) => {
      const date = new Date(item.createdAt);
      
      const yearKey = `${date.getFullYear()}`; // "2024"
  
      // Nếu chưa có thì khởi tạo
      if (!groupedData[yearKey]) {
        groupedData[yearKey] = { createdAt: yearKey, computer: 0, phone: 0 };
      }

      groupedData[yearKey].computer += item.computer; 
      groupedData[yearKey].phone += item.phone; 
    });
  
    return Object.values(groupedData); // Chuyển object thành mảng
  };
  

  // reload dữ liệu theo option
  React.useEffect(() => {
    const today = new Date();

    let filtered = [];

    if(viewType === 'day') {
      filtered = data.filter(item => new Date(item.createdAt).toLocaleDateString('en-US', {weekday:'short'}) === today.toLocaleDateString('en-US', {weekday:'short'}));
      console.log(filtered);
    } else if (viewType === 'month') {

      const currentYear = today.getFullYear();

      filtered = data.filter(item => {
        const date = new Date(item.createdAt);
        return  date.getFullYear() === currentYear;
      });

      filtered = aggregateByMonth(filtered);
      console.log(filtered);

    } else if(viewType === 'year') {
      filtered = data.filter(item => new Date(item.createdAt).getFullYear());
      filtered = aggregateBYear(filtered);
    }
    setFilteredDataSelect(filtered);
  }, [viewType]);

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
          <h3>Sellering Category</h3>
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
          <DeviceChart data={filteredDataSelect} type={viewType}/>
        </div>
      </div>


    </div>
  );
}

export default ManagerDashboardPage;