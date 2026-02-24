"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";

const data = [
    { category: "Housing", amount: 1500, color: "#818cf8" },   // indigo-400
    { category: "Food", amount: 800, color: "#34d399" },      // emerald-400
    { category: "Transport", amount: 450, color: "#fbbf24" }, // amber-400
    { category: "Utilities", amount: 350, color: "#fb7185" }, // rose-400
    { category: "Entertainment", amount: 400, color: "#c084fc" }, // purple-400
    { category: "Shopping", amount: 320, color: "#38bdf8" },  // sky-400
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl shadow-xl flex items-center gap-3">
                <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: data.color }}
                />
                <div>
                    <p className="text-gray-300 text-sm font-medium">{data.category}</p>
                    <p className="text-white font-bold">${data.amount.toLocaleString()}</p>
                </div>
            </div>
        );
    }
    return null;
};

const ExpenseChart = () => {
    return (
        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800/60 shadow-lg col-span-1 hover:border-gray-700/60 transition-colors h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-100">Expenses</h2>
                    <p className="text-sm text-gray-500">By category this month</p>
                </div>
                <button className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors">
                    View All
                </button>
            </div>

            <div className="flex-1 w-full relative -ml-4 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 30, bottom: 0 }} barSize={16}>
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="category"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1f2937', opacity: 0.4 }} />
                        <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ExpenseChart;
