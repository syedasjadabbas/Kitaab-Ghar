// HERO BANNER COMPONENT
// The big welcome area under the header. It is "presentational":
// no state, no functions, just HTML (JSX) + Tailwind classes.

const highlights = ['🎧 Audio Books', '🔤 Unicode Urdu', '📄 PDF Books'];

export default function HeroBanner() {
  return (
    <section id="home" className="bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-700 px-6 py-16 text-center text-white">
      <div className="mx-auto max-w-3xl">
        <span className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1 text-sm font-semibold text-indigo-100">
          ✨ ReactJS Book Store
        </span>

        <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">
          Read, Listen &amp; Explore Urdu Literature
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
          A step-by-step ReactJS component demonstration: PDF books, searchable
          Unicode editions and audiobooks in one place.
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {highlights.map((item) => (
            <li key={item} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
