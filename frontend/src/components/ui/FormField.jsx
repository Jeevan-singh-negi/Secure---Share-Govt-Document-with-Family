import React from "react";
import clsx from "clsx";
import Label from "./Label";

/**
 * FormField component (ShadCN-style)
 * - Consistent wrapper for label, input, error, and description
 * - Keeps spacing, dark mode, and accessibility correct
 * - Use inside forms with controlled or uncontrolled inputs
 */

export default function FormField({
  label,
  id,
  children,
  error,
  description,
  className = "",
  required = false,
}) {
  return (
    <div className={clsx("mb-4 w-full", className)}>
      {label && (
        <Label htmlFor={id}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      {description && (
        <p className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      )}

      {children}

      {error && (
        <p className="mt-1 text-xs text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
