import Link from 'next/link';
import { LayoutDashboard, Receipt, LineChart, Wallet, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          FinDash
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-emerald-400 bg-gray-800/50 rounded-xl transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-100 hover:bg-gray-800/30 rounded-xl transition-colors">
          <Receipt className="w-5 h-5" />
          <span className="font-medium">Transactions</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-100 hover:bg-gray-800/30 rounded-xl transition-colors">
          <LineChart className="w-5 h-5" />
          <span className="font-medium">Analytics</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-100 hover:bg-gray-800/30 rounded-xl transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl w-full transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
