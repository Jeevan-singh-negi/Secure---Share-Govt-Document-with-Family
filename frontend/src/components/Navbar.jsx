import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import DarkModeToggle from "@/components/DarkModeToggle";

/**
 * Responsive Navbar component (ShadCN-style)
 * - Branding, navigation, dark mode toggle, and user actions
 * - Mobile-friendly with hamburger menu
 * - Dark mode & accessible
 */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/documents", label: "Documents" },
    { to: "/about", label: "About" },
  ];

  // Close menu on ESC
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:px-8" aria-label="Main navigation">
        
        {/* Branding */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400"
        >
          <img src="/assets/logo.svg" alt="Logo" className="h-8 w-8" />
          SecureDocShare
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors font-medium ${
                location.pathname === link.to
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-zinc-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          {/* Optional: Add auth buttons or avatar dropdown */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-4 pb-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 font-medium ${
                location.pathname === link.to
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-zinc-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
