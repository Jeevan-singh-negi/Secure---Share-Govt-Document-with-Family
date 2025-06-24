import React from "react";
import clsx from "clsx";

/**
 * Reusable Button component (ShadCN-style)
 * - Supports multiple variants & sizes
 * - Includes loading state & accessibility
 */

const baseStyles = "inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
  outline: "border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
  destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-800",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm md:text-base",
  lg: "px-5 py-3 text-base md:text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  isLoading = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}
