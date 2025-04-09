import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import useOrder from "../../hooks/useOrder";

const SelleringCategory = ({ type}) => {
    //xác định đơn vị thời gian (tháng/ngày/năm)

    const {dailyCategory} = useOrder();

    const [filteredDataSelect, setFilteredDataSelect] = React.useState([]);


      // Tính tổng giá trị theo tháng
      const aggregateByMonth = (data) => {
        const groupedData = {};
      
        data.forEach((item) => {
          const date = new Date(item.date);
          
          const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // "2024-3"
      
          // Nếu chưa có thì khởi tạo
          if (!groupedData[monthKey]) {
            groupedData[monthKey] = { date: monthKey, categoryReport: { Phone: 0, Computer: 0} };
          }

          const computer = item.categoryReport.Computer;
            const phone = item.categoryReport.Phone;
            if(computer) {
                groupedData[monthKey].categoryReport.Computer += computer;
            }
            if(phone) {
                groupedData[monthKey].categoryReport.Phone += phone;
            }
    

        });
      
        return Object.values(groupedData); // Chuyển object thành mảng
      };
    
      // Tính tổng giá trị theo năm
      const aggregateBYear = (data) => {
        const groupedData = {};
      
        data.forEach((item) => {
          const date = new Date(item.date);
          
          const yearKey = `${date.getFullYear()}`; // "2024"
      
          // Nếu chưa có thì khởi tạo
          if (!groupedData[yearKey]) {
            groupedData[yearKey] = { date: yearKey, categoryReport: { Phone: 0, Computer: 0} };
          }
    
            const computer = item.categoryReport.Computer;
            const phone = item.categoryReport.Phone;
            if(computer) {
                groupedData[yearKey].categoryReport.Computer += computer;
            }
            if(phone) {
                groupedData[yearKey].categoryReport.Phone += phone;
            }
        });
      
        return Object.values(groupedData); // Chuyển object thành mảng
      };
      
    
      // reload dữ liệu theo option
      React.useEffect(() => {
        if(!Array.isArray(dailyCategory)) return;
        
        const today = new Date();
    
        let filtered = [];
    
        if(type === 'day') {
          filtered = dailyCategory.filter(item => new Date(item.date).toLocaleDateString('en-US', {weekday:'short'}) === today.toLocaleDateString('en-US', {weekday:'short'}));
         filtered.forEach((item) => {
            if(item.categoryReport.Computer === null) {
                item.categoryReport.Computer = 0;
            }
            if(item.categoryReport.Phone === null) {
                item.categoryReport.Phone = 0;
            }
         });
          console.log(filtered);
        } else if (type === 'month') {
    
          const currentYear = today.getFullYear();
    
          filtered = dailyCategory.filter(item => {
            const date = new Date(item.date);
            return  date.getFullYear() === currentYear;
          });
    
          filtered = aggregateByMonth(filtered);
          console.log(filtered);
    
        } else if(type === 'year') {
          filtered = dailyCategory.filter(item => new Date(item.date).getFullYear());
          filtered = aggregateBYear(filtered);
        }
        setFilteredDataSelect(filtered);
      }, [type, dailyCategory]);
    

    return (
        <div className="">
           <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={filteredDataSelect}>
                {/* Chú thích tương ứng */}
                   <defs>
                      <linearGradient id="computerGradient" x1={0} y1={0} x2={0} y2={1}>
                        <stop offset="5%" stopColor="#e2e8f0" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#e2e8f0" stopOpacity={0}/>
                      </linearGradient>

                      <linearGradient id="phoneGradient" x1={0} y1={0} x2={0} y2={1}>
                        <stop offset="5%" stopColor="#e2e8f0" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#e2e8f0" stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                {/* Truc hoanh*/}
                   <XAxis
                    dataKey={"date"}

                    //gia tri cua truc hoanh
                    tickFormatter={(tick) => {
                        const date = new Date(tick);
                        const dateParts = tick.split("-");
                        if(type === 'month') {
                            return new Date(dateParts[0], dateParts[1] - 1).toLocaleString("en-US", { month: "short" }); // Jan, Feb, Mar...
                        } else if(type === 'day') {
                            return "To Day"; // 1, 2, 3...
                        } else if (type === "year") {
                            return date.getFullYear(); // 2023, 2024...
                        }
                    }}

                    axisLine={false}
                    tickLine={false}
                    tick={{fill:'#6B7280', fontSize:12}}
                   />
                   {/* Truc tung */}
                   <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{fill:'#6B7280', fontSize:12}}
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                   />
                    <Tooltip contentStyle={{backgroundColor:'white', border:'none', borderRadius:'8px',  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',}}/>

                    <Area
                        type="monotone"
                        dataKey="categoryReport.Computer"
                        stroke="#94a3b8"
                        fill="url(#computerGradient)"
                        name="Computer"
                    />

                    <Area
                        type="monotone"
                        dataKey="categoryReport.Phone"
                        stroke="#a855f7"
                        fill="url(#phoneGradient)"
                        name="Phone"
                    />
                    <Legend verticalAlign="top" height={36}/>
                </AreaChart>
           </ResponsiveContainer>
        </div>
    )
};

export default SelleringCategory;