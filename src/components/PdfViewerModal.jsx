import { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { baseUrl } from '../data/booksData';

export default function PdfViewerModal() {
  const { activePdfBook, closePdfViewer, addToCart } = useStore();

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') closePdfViewer();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closePdfViewer]);

  if (!activePdfBook) return null;

  const pdfUrl = `${baseUrl}${activePdfBook.fileUri}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-viewer-title"
      onClick={closePdfViewer}
    >
      <div
        className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-950 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-400">
              PDF READER
            </span>
            <h2 id="pdf-viewer-title" dir="rtl" className="font-urdu text-lg font-bold">
              {activePdfBook.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => addToCart(activePdfBook)}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              🛒 Save
            </button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-rose-500"
            >
              <span>↗ Open in New Tab</span>
            </a>
            <button
              type="button"
              onClick={closePdfViewer}
              aria-label="Close reader"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-white/20 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Embedded PDF iframe / fallback */}
        <div className="relative flex-1 bg-slate-800">
          <iframe
            src={`${pdfUrl}#toolbar=1`}
            title={activePdfBook.title}
            className="h-full w-full border-none"
          />
        </div>
      </div>
    </div>
  );
}
