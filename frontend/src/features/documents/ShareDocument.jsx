import React, { useState } from "react";
import axios from "axios";
import Button from "@/components/ui/Button";
import DotBounceLoader from "@/components/ui/DotBounceLoader";
import Card from "@/components/ui/Card";

/**
 * ShareDocument component
 * - Allows sharing a document by email
 * - Shows loading, success, and error states
 * - Expects a prop: docId (the document's ID to share)
 * - Optional: onSuccess callback
 */

export default function ShareDocument({ docId, onSuccess }) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleShare = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    setError("");

    try {
      await axios.post(
        `/api/documents/share/${docId}`,
        { recipientEmail },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess(true);
      setRecipientEmail("");
      onSuccess?.(); // Trigger parent action if needed
    } catch (err) {
      setError(err.response?.data?.message || "Share failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto space-y-4">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        Share Document
      </h3>

      <form onSubmit={handleShare} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1"
          >
            Recipient Email
          </label>
          <input
            id="email"
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            disabled={isLoading}
            required
            placeholder="someone@example.com"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-zinc-400 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700 transition"
          />
        </div>

        <Button type="submit" disabled={isLoading || !recipientEmail}>
          {isLoading ? "Sharing..." : "Share"}
        </Button>

        {isLoading && (
          <div className="flex justify-center pt-2">
            <DotBounceLoader />
          </div>
        )}

        <div className="min-h-[1.5rem]">
          {success && (
            <p
              className="text-green-600 text-sm font-medium"
              role="status"
              aria-live="polite"
            >
              ✅ Document shared successfully!
            </p>
          )}
          {error && (
            <p
              className="text-red-600 text-sm font-medium"
              role="alert"
              aria-live="assertive"
            >
              ❌ {error}
            </p>
          )}
        </div>
      </form>
    </Card>
  );
}
