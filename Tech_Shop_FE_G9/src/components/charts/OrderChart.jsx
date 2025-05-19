import React,{ useState, useEffect, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import useOrder from "../../hooks/useOrder";

const OrderChart = () => {

  const {dailyOrders} = useOrder(0,1);
  const dailys = useMemo(() => dailyOrders, [dailyOrders]);

  const [timeFilter, setTimeFilter] = useState("today");
  const [filtered, setFiltered] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

    useEffect(() => {
      if(!Array.isArray(dailys)) return;
        const date = new Date();

        const firstDayOfWeek = new Date(date);
        firstDayOfWeek.setDate(date.getDate() - date.getDay() + 1); // Lấy ngày đầu tiên của tuần

        const lastDayOfWeek = new Date(date);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Lấy ngày đầu tiên của tuần + 6 ngày ra ngày cuối cùng của tuần

        let filtered=[];
        if(timeFilter === 'today') {
           filtered =dailys.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return orderDate.getDate() === date.getDate() && orderDate.getFullYear() === date.getFullYear() && orderDate.getMonth() === date.getMonth();
           })
        } else if(timeFilter === 'week') {
            filtered =dailys.filter((order) => {
                const week = new Date(order.createdAt);
                return week.getDate() >= firstDayOfWeek.getDate() && week.getDate() <= lastDayOfWeek.getDate() && week.getFullYear() === date.getFullYear() && week.getMonth() === date.getMonth();
            })
            console.log("week", filtered);
        }
        const totalOrder = filtered.reduce((acc, order) => acc + order.totalOrder, 0);
        setTotalOrder(totalOrder);
        setFiltered(filtered);
    }, [timeFilter, dailys]);

  
    return (

        <div className="chart bg-light rounded rounded-3 p-3 shadow-sm w-50" style={{height: 'auto'}}>
        <div className="d-flex align-items-center justify-content-between mb-6">
          <div>
            <h2 className="fs-5 fw-semibold text-dark">Total Orders</h2>
            <p className="display-5 fw-bold text-primary mt-2">{totalOrder}</p>
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
                  dataKey="totalOrder" 
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