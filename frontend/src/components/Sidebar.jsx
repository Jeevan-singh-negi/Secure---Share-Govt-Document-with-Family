import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, User, LogOut } from "lucide-react";
import clsx from "clsx";

/**
 * Sidebar component (ShadCN-style)
 * - Persistent vertical navigation for dashboard
 * - Responsive: collapses/hides on mobile
 * - Supports active link highlighting, icons, and dark mode
 */

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
  { to: "/documents", label: "Documents", icon: <FileText className="w-5 h-5" /> },
  { to: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  // Add more links as needed
];

export default function Sidebar({ className = "" }) {
  const location = useLocation();

  return (
    <aside
      className={clsx(
        "hidden md:flex flex-col w-64 min-h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 py-6 px-4 transition-colors",
        className
      )}
    >
      {/* Branding */}
      <Link to="/" className="flex items-center gap-2 mb-8 font-bold text-xl text-blue-600 dark:text-blue-400">
        <img src="/assets/logo.svg" alt="Logo" className="h-8 w-8" />
        SecureDocShare
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={clsx(
              "flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors",
              location.pathname === link.to
                ? "bg-blue-50 text-blue-700 dark:bg-zinc-800 dark:text-blue-400"
                : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      {/* User actions (optional) */}
      <div className="mt-auto flex flex-col gap-2">
        {/* Example: Logout button */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 transition-colors font-medium">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
