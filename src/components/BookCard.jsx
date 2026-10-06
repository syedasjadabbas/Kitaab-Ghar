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
  },
  {
    _id: '65ed8cd838df668685b80ac3',
    title: 'معاشياتِ اسلام',
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
    coverPhotoUri: 'books/معاشياتِ اسلام_1710066904500/معاشياتِ اسلام.png',
    fileUri: 'books/معاشياتِ اسلام_1710066904500/معاشياتِ اسلام.pdf',
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
    createdAt: '2024-03-10T10:35:04.755Z',
    updatedAt: '2024-03-10T10:35:04.755Z'
  },
  {
    _id: '65c0f1dcb96e547f60281571',
    title: 'کلمہ طیبہ پر ایمان لانے کا مقصد',
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
    coverPhotoUri: 'books/کلمہ طیبہ پر ایمان لانے کا مقصد_1707143644063/کلمہ طیبہ پر ایمان لانے کا مقصد.png',
    fileUri: 'books/کلمہ طیبہ پر ایمان لانے کا مقصد_1707143644063/کلمہ طیبہ پر ایمان لانے کا مقصد.pdf',
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
    createdAt: '2024-02-05T14:34:04.079Z',
    updatedAt: '2024-02-05T14:34:04.079Z'
  },
  {
    _id: '65c0f1b4b96e547f6028156b',
    title: 'مسئلہِ جبر و قدر',
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
    coverPhotoUri: 'books/مسئلہِ جبر و قدر_1707143604204/مسئلہِ جبر و قدر.png',
    fileUri: 'books/مسئلہِ جبر و قدر_1707143604204/مسئلہِ جبر و قدر.pdf',
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
    createdAt: '2024-02-05T14:33:24.251Z',
    updatedAt: '2024-02-05T14:33:24.251Z'
  },
  {
    _id: '65ba365657e3e988e6740d78',
    title: 'حقیقتِ صوم و صلوٰۃ',
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
    coverPhotoUri: 'books/حقیقتِ صوم و صلوٰۃ_1706702421839/حقیقتِ صوم و صلوٰۃ.png',
    fileUri: 'books/حقیقتِ صوم و صلوٰۃ_1706702421839/حقیقتِ صوم و صلوٰۃ.txt',
    chapters: [
      'عبادت',
      'نماز',
      'نماز میں آپ کیا پڑھتے ہیں؟',
      'نماز باجماعت',
      'نمازیں بے اثر کیوں ہو گئیں؟',
      'روزہ'
    ],
    bookType: 'UNICODE',
    category: {
      _id: '65ba1bb257e3e988e6740cff',
      name: 'Literature App Books',
      createdAt: '2024-01-31T10:06:42.636Z',
      updatedAt: '2024-02-06T12:41:15.502Z',
      __v: 0
    },
    tags: [],
    averageRating: null,
    createdAt: '2024-01-31T12:00:22.151Z',
    updatedAt: '2024-04-17T20:18:09.968Z'
  },
  {
    _id: '65bfba55b96e547f602810e6',
    title: 'خطبات',
    description: 'Books By Syed Abul Ala Maududi',
    narrator: 'Ali',
    isPublished: true,
    author: {
      _id: '65ba1bab57e3e988e6740cfb',
      name: 'مولانا سید ابو الاعلیٰ مودودیؒ',
      createdAt: '2024-01-31T10:06:35.438Z',
      updatedAt: '2024-01-31T10:06:35.438Z',
      __v: 0
    },
    coverPhotoUri: 'audiobooks/خطبات_1707063892678/cover.png',
    audioFilesUri: ['audiobooks/خطبات_1707063892678/1.mp3'],
    bookType: 'AUDIO',
    category: {
      _id: '65ba1bb257e3e988e6740cff',
      name: 'Literature App Books',
      createdAt: '2024-01-31T10:06:42.636Z',
      updatedAt: '2024-02-06T12:41:15.502Z',
      __v: 0
    },
    tags: [],
    averageRating: null,
    createdAt: '2024-02-04T16:24:53.558Z',
    updatedAt: '2024-02-04T16:24:53.558Z',
    timestamps: []
  }
];

// Small helper: the colour of the little badge on each cover, based on bookType.
const typeBadgeColors = {
  PDF: 'bg-rose-100 text-rose-700',
  UNICODE: 'bg-teal-100 text-teal-700',
  AUDIO: 'bg-violet-100 text-violet-700'
};

export default function BookCard() {

  const baseUrl = 'http://159.65.157.115/';
  const [realBooks, setRealBooks] = useState(initialBooks);

  // Second piece of state: remembers which button was clicked last,
  // so we can highlight it (the "active" button).
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

  // find() returns the FIRST book that matches, or undefined if none matches.
  function findBook() {
    const found = initialBooks.find((book) => book.title === 'خطبات');
    setRealBooks(found ? [found] : []);
    setActiveFilter('FIND');
  }

  // Same base look for every button; only the colours change.
  const buttonBase =
    'cursor-pointer rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition duration-150 active:scale-95';

  // If the button is active it gets a solid colour, otherwise a light outline.
  function buttonStyle(filterName, solid, light) {
    return activeFilter === filterName
      ? `${buttonBase} ${solid} text-white shadow-md`
      : `${buttonBase} border ${light} bg-white`;
  }

  return (

    <section className="mt-10" aria-labelledby="books-title">

      {/* Section heading + how many books are on screen right now */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 id="books-title" className="text-2xl font-bold text-slate-900">Complete Library</h2>
          <p className="mt-1 text-slate-500">Filter the collection by book type</p>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
          {realBooks.length} {realBooks.length === 1 ? 'book' : 'books'}
        </span>
      </div>

      {/* Button bar: a white rounded box that holds the five buttons */}
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={loadAllBooks}
          className={buttonStyle('ALL', 'bg-indigo-600 hover:bg-indigo-700', 'border-indigo-200 text-indigo-700 hover:bg-indigo-50')}
        >
          All Books
        </button>

        <button
          type="button"
          onClick={loadPdfBooks}
          className={buttonStyle('PDF', 'bg-rose-600 hover:bg-rose-700', 'border-rose-200 text-rose-700 hover:bg-rose-50')}
        >
          PDF Books
        </button>

        <button
          type="button"
          onClick={loadUnicodeBooks}
          className={buttonStyle('UNICODE', 'bg-teal-600 hover:bg-teal-700', 'border-teal-200 text-teal-700 hover:bg-teal-50')}
        >
          Unicode Books
        </button>

        <button
          type="button"
          onClick={loadAudioBooks}
          className={buttonStyle('AUDIO', 'bg-violet-600 hover:bg-violet-700', 'border-violet-200 text-violet-700 hover:bg-violet-50')}
        >
          Audio Books
        </button>

        <button
          type="button"
          onClick={findBook}
          className={buttonStyle('FIND', 'bg-amber-500 hover:bg-amber-600', 'border-amber-200 text-amber-700 hover:bg-amber-50')}
        >
          Find Book
        </button>
      </div>

      {/* The cards: 1 column on phones, 2 on tablets, 3 on laptops */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {realBooks.map((book) => (
          <article
            key={book._id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Cover image with the book type badge on top of it */}
            <div className="relative bg-slate-800">
              <img
                src={`${baseUrl}${book.coverPhotoUri}`}
                alt={`Cover of ${book.title}`}
                className="h-64 w-full object-contain p-3"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = '/book-placeholder.svg'; }}
              />
              <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${typeBadgeColors[book.bookType]}`}>
                {book.bookType}
              </span>
            </div>

            {/* Text area. Urdu reads right-to-left, so we use dir="rtl" and the
                Nastaliq font with extra line height (leading-loose) so the
                tall Urdu letters do not overlap the next line. */}
            <div className="flex flex-1 flex-col gap-2 p-6">
              <h3 dir="rtl" className="font-urdu text-xl leading-loose text-slate-800">{book.title}</h3>
              <p dir="rtl" className="font-urdu text-sm leading-loose text-slate-500">{book.author?.name}</p>
              <p className="mt-auto border-t border-slate-100 pt-3 text-sm text-slate-600">{book.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
