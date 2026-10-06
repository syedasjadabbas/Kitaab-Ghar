// HEADER COMPONENT
// Top navigation bar with live cart count, cart drawer toggle, and smooth anchor navigation.

import { useStore } from '../context/StoreContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Library', href: '#library' },
  { label: 'Featured', href: '#featured' },
  { label: 'About', href: '#about' },
];

export default function Header() {
  const { totalCartItems, setIsCartOpen } = useStore();

  function handleNavClick(e, href) {
    e.preventDefault();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 text-white backdrop-blur-md shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">

        {/* Logo + store name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-3 transition"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-2xl transition group-hover:scale-105 group-hover:bg-amber-400/20" aria-hidden="true">
            📚
          </div>
          <div>
            <p className="text-xl font-extrabold tracking-tight group-hover:text-amber-300 transition">
              KitabGhar
            </p>
            <p className="text-xs text-slate-400">Digital, Audio &amp; Unicode Bookstore</p>
          </div>
        </a>

        {/* Navigation links */}
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Interactive Cart Button */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="flex cursor-pointer items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20 hover:border-amber-400/40 active:scale-95"
          aria-label={`Open cart with ${totalCartItems} books`}
        >
          <span>🛒 Cart</span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-xs font-bold text-white shadow-sm">
            {totalCartItems}
          </span>
        </button>
      </div>
    </header>
  );
}

