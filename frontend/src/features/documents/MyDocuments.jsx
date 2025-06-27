import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/ui/Card";
import DotBounceLoader from "@/components/ui/DotBounceLoader";
import Button from "@/components/ui/Button";
import DocumentPreview from "./DocumentPreview";
import ShareDocument from "./ShareDocument";

/**
 * MyDocuments component
 * - Fetches and displays the user's uploaded documents
 * - Supports preview, delete, and share actions
 * - Uses modals for preview and sharing
 */

export default function MyDocuments() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // For modals
  const [previewDoc, setPreviewDoc] = useState(null);
  const [shareDoc, setShareDoc] = useState(null);

  useEffect(() => {
    fetchDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDocuments = async () => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await axios.get("/api/documents", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDocuments(data);
    } catch (err) {
      setError(err.response?.data?.message || "❌ Failed to fetch documents.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (docId) => {
    const confirm = window.confirm("Are you sure you want to delete this document?");
    if (!confirm) return;

    setDeletingId(docId);
    try {
      await axios.delete(`/api/documents/${docId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDocuments((prev) => prev.filter((doc) => doc._id !== docId));
    } catch (err) {
      alert(err.response?.data?.message || "❌ Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
        My Documents
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <DotBounceLoader />
        </div>
      ) : error ? (
        <div
          className="text-red-600 font-medium py-10 text-center"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      ) : documents.length === 0 ? (
        <div
          className="text-zinc-500 dark:text-zinc-400 text-center py-8"
          role="status"
          aria-live="polite"
        >
          📂 No documents found. Start by uploading your first one!
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
              >
                View / Download
              </a>
              <div className="flex gap-2 pt-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewDoc(doc)}
                >
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShareDoc(doc)}
                >
                  Share
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(doc._id)}
                  disabled={deletingId === doc._id}
                >
                  {deletingId === doc._id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <DocumentPreview
          open={!!previewDoc}
          onClose={() => setPreviewDoc(null)}
          fileUrl={previewDoc.fileUrl}
          fileName={previewDoc.fileName}
        />
      )}

      {/* Share Modal */}
      {shareDoc && (
        <ShareDocument
          docId={shareDoc._id}
          open={!!shareDoc}
          onClose={() => setShareDoc(null)}
        />
      )}
    </div>
  );
}
