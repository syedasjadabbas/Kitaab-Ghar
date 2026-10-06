import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { baseUrl, booksData, typeBadgeColors } from '../data/booksData';

export default function BookCard() {
  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    addToCart,
    cart,
    openAudioPlayer,
    openUnicodeReader,
    openPdfViewer,
  } = useStore();

  // Filter handlers
  function loadAllBooks() {
    setActiveFilter('ALL');
  }

  function loadPdfBooks() {
    setActiveFilter('PDF');
  }

  function loadUnicodeBooks() {
    setActiveFilter('UNICODE');
  }

  function loadAudioBooks() {
    setActiveFilter('AUDIO');
  }

  function findBook() {
    setActiveFilter('FIND');
  }

  // Filter logic based on activeFilter and searchQuery
  const displayedBooks = booksData.filter((book) => {
    // 1. Filter type check
    let matchesType = true;
    if (activeFilter === 'PDF') matchesType = book.bookType === 'PDF';
    else if (activeFilter === 'UNICODE') matchesType = book.bookType === 'UNICODE';
    else if (activeFilter === 'AUDIO') matchesType = book.bookType === 'AUDIO';
    else if (activeFilter === 'FIND') matchesType = book.title === 'خطبات';

    if (!matchesType) return false;

    // 2. Search query check
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const titleMatch = book.title.toLowerCase().includes(q);
    const authorMatch = book.author?.name?.toLowerCase().includes(q) || false;
    const descMatch = book.description?.toLowerCase().includes(q) || false;
    const typeMatch = book.bookType.toLowerCase().includes(q);

    return titleMatch || authorMatch || descMatch || typeMatch;
  });

  // Check if item is already in cart
  function isInCart(bookId) {
    return cart.some((item) => item.book._id === bookId);
  }

  // Button styling helper
  const buttonBase =
    'cursor-pointer rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition duration-150 active:scale-95';

  function buttonStyle(filterName, solidColor, lightColor) {
    return activeFilter === filterName
      ? `${buttonBase} ${solidColor} text-white shadow-md`
      : `${buttonBase} border ${lightColor} bg-white`;
  }

  return (
    <section className="mt-12" aria-labelledby="books-title">
      {/* Section heading + count */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Catalog &amp; Archive
          </span>
          <h2 id="books-title" className="text-2xl font-bold text-slate-900 md:text-3xl">
            Complete Library
          </h2>
          <p className="mt-1 text-slate-500">
            Filter by format, search titles, or listen to audiobooks in one click
          </p>
        </div>
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm">
          {displayedBooks.length} {displayedBooks.length === 1 ? 'book' : 'books'} found
        </span>
      </div>

      {/* Control Toolbar: Filter Buttons + Real-time Search */}
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        {/* Five filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={loadAllBooks}
            className={buttonStyle(
              'ALL',
              'bg-indigo-600 hover:bg-indigo-700',
              'border-indigo-200 text-indigo-700 hover:bg-indigo-50'
            )}
          >
            All Books
          </button>

          <button
            type="button"
            onClick={loadPdfBooks}
            className={buttonStyle(
              'PDF',
              'bg-rose-600 hover:bg-rose-700',
              'border-rose-200 text-rose-700 hover:bg-rose-50'
            )}
          >
            PDF Books
          </button>

          <button
            type="button"
            onClick={loadUnicodeBooks}
            className={buttonStyle(
              'UNICODE',
              'bg-teal-600 hover:bg-teal-700',
              'border-teal-200 text-teal-700 hover:bg-teal-50'
            )}
          >
            Unicode Books
          </button>

          <button
            type="button"
            onClick={loadAudioBooks}
            className={buttonStyle(
              'AUDIO',
              'bg-violet-600 hover:bg-violet-700',
              'border-violet-200 text-violet-700 hover:bg-violet-50'
            )}
          >
            Audio Books
          </button>

          <button
            type="button"
            onClick={findBook}
            className={buttonStyle(
              'FIND',
              'bg-amber-500 hover:bg-amber-600',
              'border-amber-200 text-amber-700 hover:bg-amber-50'
            )}
          >
            Find Book
          </button>
        </div>

        {/* Search input with clear button */}
        <div className="relative min-w-[260px] flex-1 lg:max-w-xs">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by title, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-300 bg-slate-50 py-2 pl-9 pr-9 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {displayedBooks.length === 0 && (
        <div className="my-12 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <span className="text-4xl">📚</span>
          <h3 className="mt-4 text-lg font-bold text-slate-800">No books found</h3>
          <p className="mt-1 text-sm text-slate-500">
            No books match the selected filter or search term &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('ALL');
              setSearchQuery('');
            }}
            className="mt-5 rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-700"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Book Cards Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {displayedBooks.map((book) => {
          const inCart = isInCart(book._id);

          return (
            <article
              key={book._id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Cover image container */}
              <div className="relative overflow-hidden bg-slate-800">
                <img
                  src={`${baseUrl}${book.coverPhotoUri}`}
                  alt={`Cover of ${book.title}`}
                  className="h-64 w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/book-placeholder.svg';
                  }}
                />
                <span
                  className={`absolute left-3 top-3 rounded-full border px-3 py-1 text-xs font-bold shadow-sm ${
                    typeBadgeColors[book.bookType] || 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {book.bookType}
                </span>

                {/* Quick action badge for audio */}
                {book.bookType === 'AUDIO' && (
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-slate-950/80 px-2.5 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-sm">
                    🎧 Audio Available
                  </span>
                )}
              </div>

              {/* Book Details */}
              <div className="flex flex-1 flex-col p-6">
                <h3
                  dir="rtl"
                  className="font-urdu text-xl font-bold leading-loose text-slate-900 group-hover:text-indigo-600 transition-colors"
                >
                  {book.title}
                </h3>
                <p dir="rtl" className="font-urdu mt-1 text-sm leading-loose text-slate-500">
                  {book.author?.name}
                </p>
                <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                  {book.description}
                </p>

                {/* Card Action Buttons Bar */}
                <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
                  {/* Primary Format Action */}
                  {book.bookType === 'PDF' && (
                    <button
                      type="button"
                      onClick={() => openPdfViewer(book)}
                      className="cursor-pointer flex-1 rounded-xl bg-rose-600 px-4 py-2 text-center text-xs font-bold text-white shadow-sm transition hover:bg-rose-700 active:scale-95"
                    >
                      📄 Read PDF
                    </button>
                  )}

                  {book.bookType === 'UNICODE' && (
                    <button
                      type="button"
                      onClick={() => openUnicodeReader(book)}
                      className="cursor-pointer flex-1 rounded-xl bg-teal-600 px-4 py-2 text-center text-xs font-bold text-white shadow-sm transition hover:bg-teal-700 active:scale-95"
                    >
                      📖 Read Chapters
                    </button>
                  )}

                  {book.bookType === 'AUDIO' && (
                    <button
                      type="button"
                      onClick={() => openAudioPlayer(book)}
                      className="cursor-pointer flex-1 rounded-xl bg-violet-600 px-4 py-2 text-center text-xs font-bold text-white shadow-sm transition hover:bg-violet-700 active:scale-95"
                    >
                      ▶ Listen Audio
                    </button>
                  )}

                  {/* Add to Cart button */}
                  <button
                    type="button"
                    onClick={() => addToCart(book)}
                    className={`cursor-pointer rounded-xl border px-3 py-2 text-xs font-bold transition active:scale-95 ${
                      inCart
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                    title={inCart ? 'Item in Cart (Click to add another)' : 'Add to Cart'}
                    aria-label={`Add ${book.title} to Cart`}
                  >
                    {inCart ? '✓ Saved' : '🛒 Save'}
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
