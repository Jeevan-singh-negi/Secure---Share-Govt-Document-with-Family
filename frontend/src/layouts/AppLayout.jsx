import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

/**
 * AppLayout component
 * - Combines Navbar, Sidebar, and main content area
 * - Responsive & accessible
 * - Sticky header and scrollable content
 */

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header role="banner" className="z-50">
        <Navbar />
      </header>

      {/* Layout body */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar (desktop only) */}
        <aside role="navigation" className="hidden md:flex">
          <Sidebar />
        </aside>

        {/* Main content area */}
        <main
          role="main"
          className="flex-1 overflow-y-auto p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 transition-colors"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
