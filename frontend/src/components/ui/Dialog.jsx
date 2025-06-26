import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

/**
 * Reusable Dialog (Modal) component (ShadCN-style)
 * - Accessible, animated, and responsive
 * - Closes on backdrop click or ESC
 * - Dark mode compatible
 */

export default function Dialog({ open, onClose, children, className }) {
  // Close on ESC key
  React.useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={clsx(
              "relative w-full max-w-md rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-xl transition-colors",
              className
            )}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {children}

            <button
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 text-2xl leading-none"
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
