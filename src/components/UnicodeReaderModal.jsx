import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { baseUrl } from '../data/booksData';

export default function UnicodeReaderModal() {
  const { activeUnicodeBook, closeUnicodeReader, addToCart, showToast } = useStore();
  const [selectedChapter, setSelectedChapter] = useState('');
  const [fontSize, setFontSize] = useState(20);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') closeUnicodeReader();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeUnicodeReader]);

  useEffect(() => {
    if (activeUnicodeBook?.chapters?.length) {
      setSelectedChapter(activeUnicodeBook.chapters[0]);
    }
  }, [activeUnicodeBook]);

  if (!activeUnicodeBook) return null;

  const currentContent =
    activeUnicodeBook.chapterContents?.[selectedChapter] ||
    activeUnicodeBook.description ||
    'اس باب کا متن دستیاب ہے۔ مطالعہ جاری رکھیں۔';

  function copyText() {
    navigator.clipboard.writeText(currentContent);
    showToast('Chapter text copied to clipboard!');
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="unicode-reader-title"
      onClick={closeUnicodeReader}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-700 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-teal-900 to-indigo-950 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-teal-400/20 px-3 py-1 text-xs font-bold text-teal-300">
              UNICODE URDU READER
            </span>
            <h2 id="unicode-reader-title" dir="rtl" className="font-urdu text-xl font-bold">
              {activeUnicodeBook.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => addToCart(activeUnicodeBook)}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              🛒 Save
            </button>
            <button
              type="button"
              onClick={closeUnicodeReader}
              aria-label="Close reader"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-white/20 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Toolbar: Chapter selector + Font controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Font Size:</span>
            <button
              type="button"
              onClick={() => setFontSize((s) => Math.max(16, s - 2))}
              className="rounded border border-slate-300 bg-white px-2 py-0.5 font-bold hover:bg-slate-100"
            >
              A-
            </button>
            <span className="font-semibold text-slate-800">{fontSize}px</span>
            <button
              type="button"
              onClick={() => setFontSize((s) => Math.min(32, s + 2))}
              className="rounded border border-slate-300 bg-white px-2 py-0.5 font-bold hover:bg-slate-100"
            >
              A+
            </button>
          </div>

          <button
            type="button"
            onClick={copyText}
            className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 hover:bg-teal-100"
          >
            📋 Copy Text
          </button>
        </div>

        {/* Chapters Tab List */}
        {activeUnicodeBook.chapters?.length > 0 && (
          <div className="border-b border-slate-200 bg-slate-100/70 px-6 py-2.5">
            <p className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              فہرستِ ابواب (Chapters)
            </p>
            <div className="flex flex-wrap gap-2">
              {activeUnicodeBook.chapters.map((chap) => (
                <button
                  key={chap}
                  type="button"
                  dir="rtl"
                  onClick={() => setSelectedChapter(chap)}
                  className={`font-urdu cursor-pointer rounded-xl px-4 py-1.5 text-sm transition ${
                    selectedChapter === chap
                      ? 'bg-teal-600 font-bold text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {chap}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Area with Nastaliq text */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto max-w-2xl">
            {selectedChapter && (
              <h3
                dir="rtl"
                className="font-urdu mb-6 border-b border-slate-100 pb-3 text-2xl font-bold text-teal-900"
              >
                باب: {selectedChapter}
              </h3>
            )}
            <p
              dir="rtl"
              style={{ fontSize: `${fontSize}px` }}
              className="font-urdu rounded-2xl bg-slate-50/80 p-6 leading-[2.6] text-slate-800 shadow-inner"
            >
              {currentContent}
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-3 text-xs text-slate-500">
          <span dir="rtl" className="font-urdu">
            مصنف: {activeUnicodeBook.author?.name}
          </span>
          {activeUnicodeBook.fileUri && (
            <a
              href={`${baseUrl}${activeUnicodeBook.fileUri}`}
              target="_blank"
              rel="noreferrer"
              className="text-teal-700 hover:underline"
            >
              📄 View Raw Text File
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
