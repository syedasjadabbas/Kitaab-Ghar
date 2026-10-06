// SITE FOOTER COMPONENT
// Simple footer at the bottom of every page.
// It has no state or functions, only JSX.

export default function SiteFooter() {
  return (
    <footer className="mt-20 bg-slate-900 px-6 py-10 text-center text-slate-400">
      <p className="font-semibold text-white">KitabGhar Digital Bookstore</p>
      <p className="mt-2 text-sm">Web Technologies (FA26) &middot; Lab Task 1</p>
      <p className="mt-4 text-xs">&copy; 2026 Built with ReactJS &amp; Tailwind CSS</p>
    </footer>
  );
}
