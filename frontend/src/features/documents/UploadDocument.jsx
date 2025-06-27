import React, { useState } from "react";
import axios from "axios";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DotBounceLoader from "@/components/ui/DotBounceLoader";

/**
 * UploadDocument component
 * - Uploads a file with category and tags using Axios
 * - Shows loading, success, and error states
 */

export default function UploadDocument() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file.");
      return;
    }

    setIsLoading(true);
    setSuccess(false);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      formData.append("tags", tags);

      await axios.post("/api/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccess(true);
      setFile(null);
      setCategory("");
      setTags("");
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">Upload Document</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            Select File <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:border-zinc-300 file:bg-white file:text-sm file:font-medium dark:file:bg-zinc-900 dark:file:text-zinc-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. ID, education, financial"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            Tags
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="comma separated (e.g. aadhaar, personal)"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Uploading..." : "Upload"}
        </Button>

        {isLoading && (
          <div className="flex justify-center pt-2">
            <DotBounceLoader />
          </div>
        )}
        {success && (
          <div className="text-sm text-green-600 font-medium">✅ Upload successful!</div>
        )}
        {error && (
          <div className="text-sm text-red-600 font-medium">❌ {error}</div>
        )}
      </form>
    </Card>
  );
}
