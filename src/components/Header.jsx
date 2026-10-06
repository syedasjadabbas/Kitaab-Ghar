// HEADER COMPONENT
// A new component made the same way as BookCard: a function that returns JSX.
// It has no state, it only shows the top bar of the website.
// "md:sticky md:top-0" keeps it at the top while scrolling (on tablets and laptops).

const navLinks = ['Home', 'Library', 'Featured', 'About'];

export default function Header() {
  return (
    <header className="z-50 md:sticky md:top-0 bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">

        {/* Logo + store name */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-white/15 bg-white/10 p-2 text-3xl leading-none" aria-hidden="true">
            📚
          </div>
          <div>
            <p className="text-xl font-extrabold tracking-tight">KitabGhar</p>
            <p className="text-xs text-slate-400">Digital, Audio &amp; Unicode Bookstore</p>
          </div>
        </div>

        {/* Navigation links made with map(), same idea as the book cards */}
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-1">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Cart button (just for show for now, no cart logic yet) */}
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
        >
          🛒 Cart
          <span className="rounded-full bg-rose-500 px-2 text-xs font-bold">0</span>
        </button>
      </div>
    </header>
  );
}
