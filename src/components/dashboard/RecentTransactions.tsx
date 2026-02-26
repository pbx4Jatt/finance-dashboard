"use client";

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Coffee, ShoppingBag, Laptop, Zap, Home, Plus, Trash2, Search, ArrowUpDown } from 'lucide-react';

const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
        case 'electronics': return { icon: Laptop, color: 'text-gray-400', bg: 'bg-gray-800' };
        case 'income': return { icon: ArrowDownRight, color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
        case 'groceries': return { icon: ShoppingBag, color: 'text-rose-400', bg: 'bg-rose-500/10' };
        case 'utilities': return { icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' };
        case 'food & drink': return { icon: Coffee, color: 'text-orange-400', bg: 'bg-orange-500/10' };
        case 'housing': return { icon: Home, color: 'text-indigo-400', bg: 'bg-indigo-500/10' };
        default: return { icon: ArrowUpRight, color: 'text-gray-400', bg: 'bg-gray-800' };
    }
};

const RecentTransactions = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    // Search and Sort
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc'); // desc = High to Low, asc = Low to High

    const [formData, setFormData] = useState({ name: '', category: 'Food & Drink', amount: '', type: 'expense' });

    const fetchTransactions = async () => {
        try {
            const res = await fetch('/api/transactions');
            const data = await res.json();
            setTransactions(data);
        } catch (error) {
            console.error('Failed to fetch transactions', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.amount) return;

        const amountNum = formData.type === 'expense' ? -Math.abs(Number(formData.amount)) : Math.abs(Number(formData.amount));

        try {
            const res = await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    category: formData.category,
                    amount: amountNum
                })
            });

            if (res.ok) {
                // Clear the input fields immediately
                setFormData({ name: '', category: 'Food & Drink', amount: '', type: 'expense' });
                setShowAddForm(false);
                fetchTransactions();
            }
        } catch (error) {
            console.error('Failed to add transaction', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this transaction?')) return;

        try {
            const res = await fetch('/api/transactions', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (res.ok) {
                fetchTransactions();
            } else {
                alert('Failed to delete transaction');
            }
        } catch (error) {
            console.error('Failed to delete transaction', error);
        }
    };

    // Derived state for sorting and filtering
    const filteredAndSortedTransactions = transactions
        .filter(tx => tx.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            // Sort absolute values to compare magnitude for "High to Low"
            const amountA = Math.abs(Number(a.amount));
            const amountB = Math.abs(Number(b.amount));
            if (sortOrder === 'desc') {
                return amountB - amountA; // High to Low
            } else {
                return amountA - amountB; // Low to High
            }
        });

    return (
        <div className="p-4 md:p-6 rounded-2xl bg-gray-900 border border-gray-800/60 shadow-lg mt-6 hover:border-gray-700/60 transition-colors">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-100">Recent Transactions</h2>
                    <p className="text-sm text-gray-500">Your latest financial activity</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full sm:flex-1 md:w-64">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg pl-9 pr-3 py-2.5 sm:py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                        />
                    </div>
                    <div className="flex w-full sm:w-auto gap-2">
                        <button
                            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-gray-800 border border-gray-700 text-gray-300 px-3 py-2.5 sm:py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                            title={sortOrder === 'desc' ? "Sort: High to Low" : "Sort: Low to High"}
                        >
                            <ArrowUpDown className="w-4 h-4" />
                            <span className="sm:inline">{sortOrder === 'desc' ? 'Desc' : 'Asc'}</span>
                        </button>
                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-indigo-500/10 text-indigo-400 px-3 py-2.5 sm:py-2 rounded-xl text-sm font-medium hover:bg-indigo-500/20 transition-colors shrink-0"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="sm:inline">Add New</span>
                        </button>
                    </div>
                </div>
            </div>

            {showAddForm && (
                <form onSubmit={handleSubmit} className="mb-6 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Name / Title</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
                                placeholder="e.g. Starbucks"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Amount</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="Food & Drink">Food & Drink</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Housing">Housing</option>
                                <option value="Income">Income</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="expense">Expense (-)</option>
                                <option value="income">Income (+)</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-gray-200">Cancel</button>
                        <button type="submit" className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-sm text-white font-medium transition-colors">Save Transaction</button>
                    </div>
                </form>
            )}

            {isLoading ? (
                <div className="text-center py-8 text-gray-500">Loading transactions...</div>
            ) : filteredAndSortedTransactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-gray-800/20 rounded-xl border border-dashed border-gray-700/50">
                    No transactions found.
                </div>
            ) : (
                <div className="space-y-3 sm:space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredAndSortedTransactions.map((tx) => {
                        const style = getIconForCategory(tx.category);
                        const Icon = style.icon;
                        const isPositive = Number(tx.amount) > 0;
                        const formattedDate = new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                        return (
                            <div key={tx.id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl hover:bg-gray-800/60 transition-colors border border-transparent hover:border-gray-700/50 gap-3 sm:gap-0">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className={`p-2 sm:p-3 rounded-xl ${style.bg} shrink-0`}>
                                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${style.color}`} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-gray-200 font-medium truncate">{tx.name}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs text-gray-400 truncate">{tx.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0"></span>
                                            <span className="text-xs text-gray-500 shrink-0">{formattedDate}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pl-11 sm:pl-0 mt-1 sm:mt-0">
                                    <div className={`font-semibold ${isPositive ? 'text-emerald-400' : 'text-gray-100'}`}>
                                        {isPositive ? '+' : ''}{Number(tx.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(tx.id)}
                                        className="sm:opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                                        title="Delete transaction"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RecentTransactions;
