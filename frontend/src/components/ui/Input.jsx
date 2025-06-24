import React from "react";
import clsx from "clsx";

/**
 * Reusable Input component (ShadCN-style)
 * - Supports label, error display, custom styles
 * - Works with react-hook-form or standalone
 * - Dark mode compatible
 */

const baseStyles =
  "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition disabled:opacity-50 disabled:pointer-events-none text-sm md:text-base dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700";

export default function Input({
  label,
  id,
  error,
  className,
  type = "text",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        className={clsx(
          baseStyles,
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />

      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
