"use client";

import { useEffect, useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, PiggyBank } from 'lucide-react';

const SummaryCards = () => {
    const [stats, setStats] = useState([
        { title: 'Total Balance', value: '$0.00', change: '+0.0%', isPositive: true, icon: DollarSign, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
        { title: 'Total Income', value: '$0.00', change: '+0.0%', isPositive: true, icon: ArrowUpRight, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { title: 'Total Expenses', value: '$0.00', change: '+0.0%', isPositive: false, icon: ArrowDownRight, color: 'text-rose-400', bg: 'bg-rose-500/10' },
        { title: 'Total Savings', value: '$0.00', change: '+0.0%', isPositive: true, icon: PiggyBank, color: 'text-blue-400', bg: 'bg-blue-500/10' }
    ]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await fetch('/api/transactions');
                const data = await res.json();

                let totalIncome = 0;
                let totalExpenses = 0;

                data.forEach((tx: any) => {
                    if (tx.amount > 0) totalIncome += tx.amount;
                    else totalExpenses += Math.abs(tx.amount);
                });

                const totalBalance = totalIncome - totalExpenses;
                const totalSavings = totalBalance > 0 ? totalBalance * 0.2 : 0; // arbitrary 20% savings assumption

                setStats([
                    { title: 'Total Balance', value: totalBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }), change: '+20.1%', isPositive: totalBalance >= 0, icon: DollarSign, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
                    { title: 'Total Income', value: totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' }), change: '+4.5%', isPositive: true, icon: ArrowUpRight, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { title: 'Total Expenses', value: totalExpenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' }), change: '+1.2%', isPositive: false, icon: ArrowDownRight, color: 'text-rose-400', bg: 'bg-rose-500/10' },
                    { title: 'Total Savings', value: totalSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' }), change: '+12.5%', isPositive: true, icon: PiggyBank, color: 'text-blue-400', bg: 'bg-blue-500/10' }
                ]);
            } catch (error) {
                console.error('Failed to fetch transactions for summary', error);
            }
        };

        fetchTransactions();
        // Poll every 5 seconds to keep dashboard synced if transactions are added
        const interval = setInterval(fetchTransactions, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.title} className="p-6 rounded-2xl bg-gray-900 border border-gray-800/60 shadow-lg hover:bg-gray-800/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-400">{stat.title}</span>
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <Icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-gray-50">{stat.value}</span>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${stat.isPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                                    {stat.change}
                                </span>
                                <span className="text-sm text-gray-500">vs last month</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SummaryCards;
