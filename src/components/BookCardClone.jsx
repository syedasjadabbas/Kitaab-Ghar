import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { baseUrl, booksData, typeBadgeColors } from '../data/booksData';

export default function BookCardClone() {
  const { addToCart, cart, openAudioPlayer, openUnicodeReader, openPdfViewer } = useStore();
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Filter books specifically for the Featured showcase
  function getFilteredBooks() {
    if (activeFilter === 'PDF') {
      return booksData.filter((b) => b.bookType === 'PDF');
    }
    if (activeFilter === 'UNICODE') {
      return booksData.filter((b) => b.bookType === 'UNICODE');
    }
    if (activeFilter === 'AUDIO') {
      return booksData.filter((b) => b.bookType === 'AUDIO');
    }
    if (activeFilter === 'FIND') {
      const found = booksData.find((b) => b.title === 'خطبات');
      return found ? [found] : [];
    }
    // 'ALL': show top featured selection (the first 2 prominent books)
    return [booksData[0], booksData[booksData.length - 1]];
  }

  const featuredBooks = getFilteredBooks();

  function tabStyle(filterName) {
    const base =
      'cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition duration-150 active:scale-95';
    return activeFilter === filterName
      ? `${base} bg-white text-indigo-950 shadow-md`
      : `${base} text-indigo-100 hover:bg-white/10`;
  }

  function isInCart(bookId) {
    return cart.some((item) => item.book._id === bookId);
  }

  return (
    <section
      className="mt-16 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-2xl md:p-10"
      aria-labelledby="featured-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
            ⭐ Curated Highlights
          </p>
          <h2 id="featured-title" className="mt-1 text-2xl font-black md:text-3xl">
            Featured Book of the Week
          </h2>
        </div>

        {/* Tab-style filter bar */}
        <div className="inline-flex flex-wrap gap-1 rounded-2xl border border-white/10 bg-white/10 p-1.5 backdrop-blur-md">
          <button type="button" onClick={() => setActiveFilter('ALL')} className={tabStyle('ALL')}>
            All
          </button>
          <button type="button" onClick={() => setActiveFilter('PDF')} className={tabStyle('PDF')}>
            PDF
          </button>
          <button type="button" onClick={() => setActiveFilter('UNICODE')} className={tabStyle('UNICODE')}>
            Unicode
          </button>
          <button type="button" onClick={() => setActiveFilter('AUDIO')} className={tabStyle('AUDIO')}>
            Audio
          </button>
          <button type="button" onClick={() => setActiveFilter('FIND')} className={tabStyle('FIND')}>
            Find
          </button>
        </div>
      </div>

      {/* Empty State */}
      {featuredBooks.length === 0 && (
        <p className="mt-8 rounded-2xl border border-dashed border-white/20 p-8 text-center text-indigo-200">
          No featured book in this category. Try &ldquo;All&rdquo;.
        </p>
      )}

      {/* Featured Book Cards */}
      <div className="mt-8 flex flex-col gap-8">
        {featuredBooks.map((book) => {
          const inCart = isInCart(book._id);

          return (
            <article
              key={book._id}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/95 text-slate-800 shadow-xl transition hover:shadow-2xl md:flex-row"
            >
              {/* Cover Art */}
              <div className="relative flex items-center justify-center bg-slate-900 p-6 md:w-80">
                <img
                  src={`${baseUrl}${book.coverPhotoUri}`}
                  alt={`Cover of ${book.title}`}
                  className="max-h-80 w-full object-contain drop-shadow-2xl transition hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/book-placeholder.svg';
                  }}
                />
                <span
                  className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-bold shadow ${
                    typeBadgeColors[book.bookType] || 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {book.bookType}
                </span>
              </div>

              {/* Information & Action Buttons */}
              <div className="flex flex-1 flex-col justify-between p-6 md:p-10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                      Editor&apos;s Pick
                    </span>
                    {book.narrator && (
                      <span className="text-xs text-slate-500">
                        Narrated by <strong className="text-slate-800">{book.narrator}</strong>
                      </span>
                    )}
                  </div>

                  <h3
                    dir="rtl"
                    className="font-urdu mt-4 text-3xl font-bold leading-loose text-slate-900 md:text-4xl"
                  >
                    {book.title}
                  </h3>
                  <p dir="rtl" className="font-urdu mt-1 text-lg leading-loose text-slate-500">
                    {book.author?.name}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {book.description}
                  </p>

                  {/* Chapter preview tags if available */}
                  {book.chapters?.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-400">Chapters:</span>
                      {book.chapters.slice(0, 4).map((c) => (
                        <span
                          key={c}
                          dir="rtl"
                          className="font-urdu rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                        >
                          {c}
                        </span>
                      ))}
                      {book.chapters.length > 4 && (
                        <span className="text-xs text-slate-400">+{book.chapters.length - 4} more</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Interactive Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">
                  {book.bookType === 'PDF' && (
                    <>
                      <button
                        type="button"
                        onClick={() => openPdfViewer(book)}
                        className="cursor-pointer rounded-xl bg-rose-600 px-6 py-2.5 text-sm font-bold text-white shadow transition hover:bg-rose-700 active:scale-95"
                      >
                        📄 Read PDF Viewer
                      </button>
                      <a
                        href={`${baseUrl}${book.fileUri}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        ↗ Open in New Tab
                      </a>
                    </>
                  )}

                  {book.bookType === 'UNICODE' && (
                    <button
                      type="button"
                      onClick={() => openUnicodeReader(book)}
                      className="cursor-pointer rounded-xl bg-teal-600 px-6 py-2.5 text-sm font-bold text-white shadow transition hover:bg-teal-700 active:scale-95"
                    >
                      📖 Read Unicode Chapters
                    </button>
                  )}

                  {book.bookType === 'AUDIO' && (
                    <button
                      type="button"
                      onClick={() => openAudioPlayer(book)}
                      className="cursor-pointer rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-bold text-white shadow transition hover:bg-violet-700 active:scale-95"
                    >
                      ▶ Listen to Audiobook
                    </button>
                  )}

                  {/* Add to Cart button */}
                  <button
                    type="button"
                    onClick={() => addToCart(book)}
                    className={`cursor-pointer rounded-xl border px-5 py-2.5 text-sm font-bold transition active:scale-95 ${
                      inCart
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {inCart ? '✓ In Your Cart' : '🛒 Save to Cart'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
