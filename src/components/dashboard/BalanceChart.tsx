"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { month: "Jan", balance: 12000 },
    { month: "Feb", balance: 19000 },
    { month: "Mar", balance: 15000 },
    { month: "Apr", balance: 25000 },
    { month: "May", balance: 22000 },
    { month: "Jun", balance: 32000 },
    { month: "Jul", balance: 28000 },
    { month: "Aug", balance: 36000 },
    { month: "Sep", balance: 41000 },
    { month: "Oct", balance: 39000 },
    { month: "Nov", balance: 45231 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-xl">
                <p className="text-gray-400 text-sm mb-1">{label}</p>
                <p className="text-emerald-400 font-bold text-lg">
                    ${payload[0].value.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-xs text-gray-500">Total Balance</span>
                </div>
            </div>
        );
    }
    return null;
};

const BalanceChart = () => {
    return (
        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800/60 shadow-lg col-span-1 lg:col-span-2 hover:border-gray-700/60 transition-colors h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-100">Balance History</h2>
                    <p className="text-sm text-gray-500">Your total balance over time</p>
                </div>
                <select className="bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                    <option>Last 12 Months</option>
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                </select>
            </div>

            <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#374151', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Area
                            type="monotone"
                            dataKey="balance"
                            stroke="#10b981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorBalance)"
                            activeDot={{ r: 6, fill: '#10b981', stroke: '#030712', strokeWidth: 4 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BalanceChart;
