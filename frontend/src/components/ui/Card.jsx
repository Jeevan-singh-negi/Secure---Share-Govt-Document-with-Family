import React from "react";
import clsx from "clsx";

/**
 * Reusable Card component (ShadCN-style)
 * - Padded, rounded, shadowed container
 * - Optionally supports header, description, and footer
 * - Dark mode & responsive spacing
 */

export default function Card({ className, children, ...props }) {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-4 md:p-6 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
