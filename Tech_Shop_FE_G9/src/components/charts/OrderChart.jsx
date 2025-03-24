import React,{ useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const dailyOrders = [
    { createdAt: '2025-02-17 00:00:0', orders: 42 },
    { createdAt: '2025-02-18 00:00:0', orders: 56 },
    { createdAt: '2025-02-19 00:00:0', orders: 89 },
    { createdAt: '2025-02-20 00:00:0', orders: 63 },
    { createdAt: '2025-02-21 00:00:0', orders: 78 },
    { createdAt: '2025-02-22 00:00:0', orders: 45 },
    { createdAt: '2025-02-23 00:00:0', orders: 35 }
  ];

const OrderChart = () => {
  const [timeFilter, setTimeFilter] = useState("today");
  const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        const date = new Date();

        let filtered=[];
        if(timeFilter === 'today') {
           filtered =dailyOrders.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return orderDate.getDate() === date.getDate();
           })
        } else if(timeFilter === 'week') {
            filtered =dailyOrders.filter((order) => {
                const week = new Date(order.createdAt);
                return week.getDate() <= date.getDate();
            })
        }
        setFiltered(filtered);
    }, [timeFilter]);

  
    return (

        <div className="chart bg-light rounded rounded-3 p-3 shadow-sm w-50" style={{height: 'auto'}}>
        <div className="d-flex align-items-center justify-content-between mb-6">
          <div>
            <h2 className="fs-5 fw-semibold text-dark">Total Orders</h2>
            <p className="display-5 fw-bold text-primary mt-2">56</p>
          </div>
          <div className="d-flex gap-2">
            <button 
              onClick={() => setTimeFilter('today')}
              className={`btn px-4 py-2 btn-sm rounded ${
                timeFilter === 'today' 
                  ? 'bg-primary bg-opacity-10 text-primary' 
                  : 'text-secondary bg-light'
              }`}
            >
              Today
            </button>
            <button 
              onClick={() => setTimeFilter('week')}
              className={`btn px-4 py-2 btn-sm rounded ${
                timeFilter === 'week' 
                  ? 'bg-primary bg-opacity-10 text-primary' 
                  : 'text-secondary bg-light'
              }`}
            >
              This week
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full d-flex ">
          <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filtered}>
                
                <CartesianGrid strokeDasharray="3 3" vertical={false} /> 
                <XAxis 
                  dataKey="createdAt"
                 //chinh sua gia tri cua truc hoanh theo format ngay thang
                  tickFormatter={(tick) => {
                    const dateTick = new Date(tick);
                    return dateTick.toLocaleDateString('en-US', {weekday:'short'});
                  }}

                  axisLine={false}
                  tickLine={false}
                  tick={{fill:'#6B7280', fontSize:12}} 
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{fill:'#6B7280', fontSize:12}}
                />

                <Tooltip contentStyle={{backgroundColor:'white', border:'none', borderRadius:'8px',  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',}}/>
                <Bar 
                  dataKey="orders" 
                  fill="#818CF8"
                  radius={[4, 4, 0, 0]}
                  barSize={32} 
                />
              </BarChart>
          </ResponsiveContainer>  
        </div>          
      </div>
    )
};

export default OrderChart;