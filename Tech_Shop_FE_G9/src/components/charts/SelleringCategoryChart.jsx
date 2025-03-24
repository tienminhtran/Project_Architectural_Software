import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const SelleringCategory = ({data, type}) => {
    //xác định đơn vị thời gian (tháng/ngày/năm)
    const [selectedTimeUnit, setSelectedTimeUnit] = React.useState("month");

    React.useEffect(() => {
        if(type === 'day') {
            setSelectedTimeUnit('day');
        } else if (type === 'month') {
            setSelectedTimeUnit('month');
        } else if(type === 'year') {
            setSelectedTimeUnit('year');
        }
    }, [type]);
    console.log(data);
    

    return (
        <div className="">
           <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
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
                    dataKey={"createdAt"}

                    //gia tri cua truc hoanh
                    tickFormatter={(tick) => {
                        const date = new Date(tick);
                        const dateParts = tick.split("-");
                        if(selectedTimeUnit === 'month') {
                            return new Date(dateParts[0], dateParts[1] - 1).toLocaleString("en-US", { month: "short" }); // Jan, Feb, Mar...
                        } else if(selectedTimeUnit === 'day') {
                            return date.getDate(); // 1, 2, 3...
                        } else if (selectedTimeUnit === "year") {
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
                        dataKey="computer"
                        stroke="#94a3b8"
                        fill="url(#computerGradient)"
                        name="Computer"
                    />

                    <Area
                        type="monotone"
                        dataKey="phone"
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