import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceChart from "@/components/dashboard/BalanceChart";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { Bell, Search, Wallet, Menu } from "lucide-react";
import LoginWrapper from "@/components/auth/LoginWrapper";

export default function Home() {
  return (
    <LoginWrapper>
      <div className="min-h-screen bg-gray-950 p-4 md:p-8">
        {/* Mobile Header (replaces sidebar) */}
        <div className="flex md:hidden items-center justify-between mb-6 pb-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">FinDash</h1>
          </div>
          <button className="p-2 text-gray-400 hover:bg-gray-800 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-50">Dashboard Overview</h1>
            <p className="text-gray-400">Welcome back, here's your financial summary.</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64 md:flex-none">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-900 border border-gray-800 text-gray-200 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
            <button className="p-2 relative bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors shrink-0">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg ml-2 cursor-pointer border-2 border-transparent hover:border-gray-700 transition-all hidden sm:block"></div>
          </div>
        </header>

        {/* Main Content */}
        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BalanceChart />
          <ExpenseChart />
        </div>

        <RecentTransactions />
      </div>
    </LoginWrapper>
  );
}
