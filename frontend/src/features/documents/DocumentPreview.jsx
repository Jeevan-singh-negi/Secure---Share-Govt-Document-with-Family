import React, { useState } from "react";
import Dialog from "@/components/ui/Dialog";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

/**
 * DocumentPreview component
 * - Displays a PDF or image inside a modal Dialog
 * - Props: open, onClose, fileUrl, fileName
 */
export default function DocumentPreview({ open, onClose, fileUrl, fileName }) {
  const isPdf = fileUrl?.toLowerCase().endsWith(".pdf");
  const [numPages, setNumPages] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoadError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF load error:", error);
    setLoadError("Failed to load PDF file.");
  };

  return (
    <Dialog open={open} onClose={onClose} className="max-w-3xl">
      <h2
        className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100"
        role="heading"
        aria-level={2}
      >
        {fileName}
      </h2>

      <div
        className="max-h-[70vh] overflow-auto bg-white dark:bg-zinc-900 rounded shadow"
        role="document"
      >
        {isPdf ? (
          loadError ? (
            <div className="text-red-600 p-4 text-sm">{loadError}</div>
          ) : (
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            >
              <Page pageNumber={1} width={500} />
              {/* Optional: add loop for multiple pages */}
              {/* {[...Array(numPages)].map((_, i) => (
                <Page key={i + 1} pageNumber={i + 1} width={500} />
              ))} */}
            </Document>
          )
        ) : (
          <img
            src={fileUrl}
            alt={fileName}
            className="max-w-full max-h-[60vh] rounded"
          />
        )}
      </div>
    </Dialog>
  );
}
