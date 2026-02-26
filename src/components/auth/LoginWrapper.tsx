"use client";

import { useState, useEffect } from "react";
import { Lock, LogOut } from "lucide-react";

export default function LoginWrapper({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const storedAuth = localStorage.getItem("dashboard_authenticated");
        if (storedAuth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const expectedPassword = process.env.NEXT_PUBLIC_APP_PASSWORD;

        if (!password || !expectedPassword) {
            setError("Incorrect password");
            return;
        }

        if (password === expectedPassword) {
            setIsAuthenticated(true);
            localStorage.setItem("dashboard_authenticated", "true");
            setError("");
        } else {
            setError("Incorrect password");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword("");
        localStorage.removeItem("dashboard_authenticated");
    };

    if (!isMounted) return null; // Avoid hydration errors

    if (isAuthenticated) {
        return (
            <div className="relative">
                <button
                    onClick={handleLogout}
                    className="absolute top-8 right-8 z-50 flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all text-sm font-medium"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
                {children}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl w-full max-w-md shadow-xl">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                        <Lock className="w-8 h-8 text-indigo-500" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-50 mb-2 text-center">Protected Access</h2>
                <p className="text-gray-400 text-center mb-6 text-sm">
                    Please enter the password to view your financial dashboard.
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm font-medium" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-950 border border-gray-800 text-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            placeholder="Enter your password"
                            autoFocus
                        />
                    </div>
                    {error && <p className="text-rose-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl px-4 py-3 transition-colors shadow-lg shadow-indigo-500/20"
                    >
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
