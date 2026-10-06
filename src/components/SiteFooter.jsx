// SITE FOOTER COMPONENT
// Footer with smooth section jump links and copyright information.

export default function SiteFooter() {
  function scrollTo(id) {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <footer className="mt-24 border-t border-slate-800 bg-slate-950 px-6 py-12 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="text-lg font-bold text-white">KitabGhar</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Digital, Audio &amp; Unicode Urdu Literature Bookstore &middot; Lab Task 1
          </p>
        </div>

        {/* Quick jump links */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => scrollTo('home')}
            className="cursor-pointer text-slate-300 hover:text-white transition"
          >
            ↑ Back to Top
          </button>
          <button
            type="button"
            onClick={() => scrollTo('library')}
            className="cursor-pointer text-slate-300 hover:text-white transition"
          >
            Complete Library
          </button>
          <button
            type="button"
            onClick={() => scrollTo('featured')}
            className="cursor-pointer text-slate-300 hover:text-white transition"
          >
            Featured Book
          </button>
          <button
            type="button"
            onClick={() => scrollTo('about')}
            className="cursor-pointer text-slate-300 hover:text-white transition"
          >
            About
          </button>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-slate-900 pt-6 text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} KitabGhar &middot; Built with ReactJS &amp; Tailwind CSS
      </div>
    </footer>
  );
}
