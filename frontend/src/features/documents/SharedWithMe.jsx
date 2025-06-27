import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/ui/Card";
import DotBounceLoader from "@/components/ui/DotBounceLoader";

/**
 * SharedWithMe component
 * - Lists documents shared with the logged-in user
 * - Displays loading, error, and empty states
 */

export default function SharedWithMe() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedDocs = async () => {
      setIsLoading(true);
      setError("");
      try {
        const { data } = await axios.get("/api/documents/shared", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDocuments(data);
      } catch (err) {
        setError(err.response?.data?.message || "❌ Failed to fetch shared documents.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSharedDocs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <DotBounceLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="text-red-600 font-medium py-10 text-center"
        role="alert"
        aria-live="assertive"
      >
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
        Shared With Me
      </h2>

      {documents.length === 0 ? (
        <div
          className="text-zinc-500 dark:text-zinc-400 text-center py-8"
          role="status"
          aria-live="polite"
        >
          📭 No documents have been shared with you yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <Card key={doc._id} className="flex flex-col gap-2">
              <div className="font-semibold truncate">{doc.fileName}</div>
              <div className="text-xs text-zinc-500">{doc.category || "Uncategorized"}</div>
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline text-sm"
                aria-label={`View or download ${doc.fileName}`}
              >
                View / Download
              </a>
              <div className="text-xs text-zinc-400 italic">
                Shared by: {doc.sharedBy?.email || "Unknown"}
              </div>
              {doc.sharedAt && (
                <div className="text-[10px] text-zinc-400">
                  On: {new Date(doc.sharedAt).toLocaleString()}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
