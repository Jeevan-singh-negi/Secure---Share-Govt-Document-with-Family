import React from "react";
import clsx from "clsx";

/**
 * DotBounceLoader (ShadCN-style)
 * - Three bouncing dots
 * - Smooth motion and dark mode support
 * - Lightweight, customizable, and accessible
 */

export default function DotBounceLoader({
  className,
  size = "0.75rem", // equivalent to h-3 w-3
  color = "text-blue-600 dark:text-blue-400",
  ...props
}) {
  return (
    <div
      className={clsx("flex items-center justify-center gap-1", className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={clsx(
            "inline-block rounded-full",
            color
          )}
          style={{
            width: size,
            height: size,
            animation: `dotBounce 1s infinite ease-in-out`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}

      {/* Add custom animation style */}
      <style>
        {`
          @keyframes dotBounce {
            0%, 80%, 100% {
              transform: scale(0);
              opacity: 0.4;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}
