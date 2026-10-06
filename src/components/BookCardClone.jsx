import { useState } from 'react';

const initialBooks = [
  {
    _id: '663b818f38df668685b8d31d',
    title: 'زندگی بعد موت',
    description: 'Books By Syed Abul Ala Maududi',
    isPublished: true,
    isArabic: false,
    author: {
      _id: '65ba1bab57e3e988e6740cfb',
      name: 'مولانا سید ابو الاعلیٰ مودودیؒ',
      createdAt: '2024-01-31T10:06:35.438Z',
      updatedAt: '2024-01-31T10:06:35.438Z',
      __v: 0
    },
    coverPhotoUri: 'books/زندگی بعد موت_1715175823931/زندگی بعد موت.jpeg',
    fileUri: 'books/زندگی بعد موت_1715175823931/زندگی بعد موت.pdf',
    chapters: [],
    bookType: 'PDF',
    category: {
      _id: '65ba1bb257e3e988e6740cff',
      name: 'Literature App Books',
      createdAt: '2024-01-31T10:06:42.636Z',
      updatedAt: '2024-02-06T12:41:15.502Z',
      __v: 0
    },
    tags: [],
    averageRating: null,
    createdAt: '2024-05-08T13:43:44.006Z',
    updatedAt: '2024-05-08T13:43:44.006Z'
  }
];

// This component is a COPY of BookCard, but its return() was changed so it
// looks different: a dark "Featured Book" banner with one wide card
// (cover on the left, details on the right) and tab-style buttons.
export default function BookCardClone() {

  const baseUrl = 'http://159.65.157.115/';
  const [realBooks, setRealBooks] = useState(initialBooks);
  const [activeFilter, setActiveFilter] = useState('ALL');

  function loadAllBooks() {
    setRealBooks(initialBooks);
    setActiveFilter('ALL');
  }

  function loadPdfBooks() {
    const pdfBooks = initialBooks.filter((book) => book.bookType === 'PDF');
    setRealBooks(pdfBooks);
    setActiveFilter('PDF');
  }

  function loadUnicodeBooks() {
    const unicodeBooks = initialBooks.filter((book) => book.bookType === 'UNICODE');
    setRealBooks(unicodeBooks);
    setActiveFilter('UNICODE');
  }

  function loadAudioBooks() {
    const audioBooks = initialBooks.filter((book) => book.bookType === 'AUDIO');
    setRealBooks(audioBooks);
    setActiveFilter('AUDIO');
  }

  function findBook() {
    const found = initialBooks.find((book) => book.title === 'خطبات');
    setRealBooks(found ? [found] : []);
    setActiveFilter('FIND');
  }

  // Tab style: the active tab is white, the others are see-through.
  function tabStyle(filterName) {
    const base = 'cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition duration-150';
    return activeFilter === filterName
      ? `${base} bg-white text-indigo-900 shadow`
      : `${base} text-indigo-100 hover:bg-white/10`;
  }

  return (
    <section
      className="mt-16 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-900 p-6 text-white shadow-xl md:p-10"
      aria-labelledby="featured-title"
    >
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">Book of the Week</p>
      <h2 id="featured-title" className="mt-1 text-2xl font-bold">Featured Book</h2>

      {/* Tab-style buttons inside a see-through bar */}
      <div className="mt-6 inline-flex flex-wrap gap-1 rounded-xl bg-white/10 p-1">
        <button type="button" onClick={loadAllBooks} className={tabStyle('ALL')}>All</button>
        <button type="button" onClick={loadPdfBooks} className={tabStyle('PDF')}>PDF</button>
        <button type="button" onClick={loadUnicodeBooks} className={tabStyle('UNICODE')}>Unicode</button>
        <button type="button" onClick={loadAudioBooks} className={tabStyle('AUDIO')}>Audio</button>
        <button type="button" onClick={findBook} className={tabStyle('FIND')}>Find</button>
      </div>

      {/* If the filter finds nothing, show a friendly message instead of an empty space */}
      {realBooks.length === 0 && (
        <p className="mt-8 rounded-xl border border-dashed border-white/30 p-8 text-center text-indigo-100">
          No featured book in this category. Try &ldquo;All&rdquo;.
        </p>
      )}

      {realBooks.map((book) => (
        <article
          key={book._id}
          className="mt-8 flex flex-col overflow-hidden rounded-2xl bg-white text-slate-800 shadow-lg md:flex-row"
        >
          <img
            src={`${baseUrl}${book.coverPhotoUri}`}
            alt={`Cover of ${book.title}`}
            className="h-72 w-full bg-slate-800 object-contain p-4 md:h-auto md:w-64"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = '/book-placeholder.svg'; }}
          />

          <div className="flex flex-1 flex-col justify-center gap-3 p-6 md:p-10">
            <span className="w-fit rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
              {book.bookType}
            </span>
            <h3 dir="rtl" className="font-urdu text-3xl leading-loose text-slate-900">{book.title}</h3>
            <p dir="rtl" className="font-urdu leading-loose text-slate-500">{book.author?.name}</p>
            <p className="text-slate-600">{book.description}</p>
            {book.fileUri && (
            <a
              href={`${baseUrl}${book.fileUri}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 w-fit rounded-full bg-indigo-600 px-6 py-2 font-semibold text-white transition hover:bg-indigo-700"
            >
              Read PDF
            </a>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
