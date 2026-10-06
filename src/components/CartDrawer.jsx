import { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { baseUrl, typeBadgeColors } from '../data/booksData';

export default function CartDrawer() {
  const {
    cart,
    totalCartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    openAudioPlayer,
    openUnicodeReader,
    openPdfViewer,
  } = useStore();

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsCartOpen(false);
    }
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  function handleOpenBook(book) {
    setIsCartOpen(false);
    if (book.bookType === 'AUDIO') {
      openAudioPlayer(book);
    } else if (book.bookType === 'UNICODE') {
      openUnicodeReader(book);
    } else {
      openPdfViewer(book);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="flex h-full w-full max-w-md flex-col bg-white text-slate-900 shadow-2xl transition-transform sm:border-l sm:border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <h2 id="cart-title" className="text-lg font-bold">Your Saved Books</h2>
            <span className="rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-slate-950">
              {totalCartItems}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-white/20 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="rounded-full bg-indigo-50 p-6 text-4xl">📚</div>
              <h3 className="mt-4 text-lg font-bold text-slate-800">Your Cart is empty</h3>
              <p className="mt-2 text-sm text-slate-500">
                Browse our collection below and add your favorite books, audiobooks, or Unicode editions.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
              >
                Explore Library
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map(({ book, quantity }) => (
                <div
                  key={book._id}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:border-slate-300"
                >
                  <img
                    src={`${baseUrl}${book.coverPhotoUri}`}
                    alt={book.title}
                    className="h-20 w-16 flex-shrink-0 rounded-lg bg-slate-800 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/book-placeholder.svg';
                    }}
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 dir="rtl" className="font-urdu text-base font-bold text-slate-900">
                          {book.title}
                        </h4>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                            typeBadgeColors[book.bookType] || 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {book.bookType}
                        </span>
                      </div>
                      <p dir="rtl" className="font-urdu text-xs text-slate-500">
                        {book.author?.name}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(book._id, -1)}
                          className="text-xs font-bold text-slate-600 hover:text-slate-900"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-xs font-semibold">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(book._id, 1)}
                          className="text-xs font-bold text-slate-600 hover:text-slate-900"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Direct read / listen action */}
                      <button
                        type="button"
                        onClick={() => handleOpenBook(book)}
                        className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-bold text-white transition hover:bg-indigo-700"
                      >
                        {book.bookType === 'AUDIO' ? '▶ Play' : '📖 Read'}
                      </button>

                      {/* Remove item */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(book._id)}
                        className="text-xs text-rose-500 transition hover:text-rose-700"
                        aria-label="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="border-t border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Total Selected:</span>
              <span className="font-bold text-slate-900">{totalCartItems} books</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-slate-600">Access:</span>
              <span className="font-bold text-emerald-600">100% Free &amp; Digital</span>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={clearCart}
                className="w-1/3 rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Clear Cart
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 py-2.5 text-xs font-bold text-white shadow-md transition hover:from-indigo-500 hover:to-indigo-600"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
