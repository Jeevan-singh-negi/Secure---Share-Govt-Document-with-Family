import React from "react";
import clsx from "clsx";

/**
 * Reusable Label component (ShadCN-style)
 * - Accessible, consistent with Tailwind & dark mode
 * - Works seamlessly with input, select, textarea
 */

export default function Label({ htmlFor, className, children, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        "text-sm font-medium text-zinc-700 dark:text-zinc-200 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
