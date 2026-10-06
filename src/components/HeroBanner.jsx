// HERO BANNER COMPONENT
// Features an atmospheric library background image, dark ambient gradient overlay,
// authentic Urdu calligraphy accent, dual CTAs, and interactive glass feature pills.

import { useStore } from '../context/StoreContext';

const highlights = [
  { icon: '🎧', title: 'Audio Books', desc: 'Narrated audiobooks', filter: 'AUDIO' },
  { icon: '🔤', title: 'Unicode Urdu', desc: 'Searchable Nastaliq text', filter: 'UNICODE' },
  { icon: '📄', title: 'PDF Editions', desc: 'Original scans & copies', filter: 'PDF' },
  { icon: '⚡', title: 'Instant Access', desc: '100% free in your browser', filter: 'ALL' }
];

export default function HeroBanner() {
  const { setFilterAndScroll } = useStore();

  function scrollToSection(id) {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24 md:py-32"
    >
      {/* Background Library Image */}
      <img
        src="/hero-bg.jpg"
        alt="Grand classical library with towering arched bookshelves and warm ambient lanterns"
        className="absolute inset-0 h-full w-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        loading="eager"
      />

      {/* Atmospheric Multi-layer Gradient Overlay for high text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/95 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      {/* Ambient warm light accent highlight */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-indigo-600/15 blur-3xl"
        aria-hidden="true"
      />

      {/* Hero Content Container */}
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Top Tag / Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-amber-200 backdrop-blur-md shadow-lg shadow-amber-950/30">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span>کتاب گھر · Digital Urdu Bookstore &amp; Audio Library</span>
        </div>

        {/* Main Heading */}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12]">
          Read, Listen &amp; Explore{' '}
          <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100 bg-clip-text text-transparent drop-shadow-sm">
            Urdu Literature
          </span>
        </h1>

        {/* Urdu Calligraphy Accent */}
        <p
          dir="rtl"
          className="font-urdu mt-4 text-2xl font-normal text-amber-200/90 drop-shadow md:text-3xl"
        >
          علم، ادب اور شاعری کا ڈیجیٹل خزانہ
        </p>

        {/* Subtitle / Description */}
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg leading-relaxed">
          Immerse yourself in authentic classical manuscripts, high-fidelity narrated audiobooks,
          and searchable Unicode Urdu editions — curated for passionate readers and learners.
        </p>

        {/* Interactive Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollToSection('library')}
            className="group cursor-pointer inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition-all duration-200 hover:from-amber-300 hover:to-amber-400 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>📖 Explore Library</span>
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('featured')}
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/15 hover:border-white/35 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>⭐ Book of the Week</span>
          </button>
        </div>

        {/* Highlight Feature Badges - Clickable to filter collection */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {highlights.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setFilterAndScroll(item.filter)}
              className="group cursor-pointer flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md transition-all duration-200 hover:border-amber-400/40 hover:bg-white/15 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 active:scale-95 text-left w-full"
            >
              <span className="text-2xl transition-transform duration-200 group-hover:scale-110" aria-hidden="true">
                {item.icon}
              </span>
              <span className="mt-2 text-sm font-semibold text-white group-hover:text-amber-200 transition">
                {item.title}
              </span>
              <span className="text-xs text-slate-400">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subtle bottom fade transition towards the page content */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-50 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}


