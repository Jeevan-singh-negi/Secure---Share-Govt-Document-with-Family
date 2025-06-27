import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import DotBounceLoader from "@/components/ui/DotBounceLoader";
import { FilePlus, FileText } from "lucide-react";

/**
 * Dashboard component
 * - Shows welcome, stats, and quick actions
 * - Responsive and uses Card for layout
 */

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/documents/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Welcome to SecureDocShare!
      </h1>

      {error && (
        <div className="text-red-600 font-medium" role="alert" aria-live="assertive">
          ❌ {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Documents */}
        <Card>
          <div className="flex items-center gap-4">
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="text-2xl font-bold">
                {loading ? <DotBounceLoader size="1.25rem" /> : stats?.totalDocs ?? 0}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Total Documents
              </div>
            </div>
          </div>
        </Card>

        {/* Upload Shortcut */}
        <Card>
          <div className="flex items-center gap-4">
            <FilePlus className="w-8 h-8 text-green-600 dark:text-green-400" />
            <div>
              <Link
                to="/documents/upload"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Upload a Document
              </Link>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Start by uploading your important files
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Documents */}
        <Card className="md:col-span-2 lg:col-span-1">
          <div className="mb-2 font-semibold text-zinc-800 dark:text-zinc-100">
            Recent Documents
          </div>
          {loading ? (
            <DotBounceLoader size="1rem" />
          ) : stats?.recentDocs?.length > 0 ? (
            <ul className="space-y-1">
              {stats.recentDocs.map((doc) => (
                <li key={doc._id} className="truncate">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    📄 {doc.fileName}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              No recent documents.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
