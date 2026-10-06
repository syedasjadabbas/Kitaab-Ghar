// FEATURES GRID COMPONENT
// Same pattern as BookCard: an array of objects -> map() -> one card each.

const features = [
  { icon: '🎧', title: 'Audio Books', text: 'Listen to narrated books directly in your browser.' },
  { icon: '🔤', title: 'Unicode Urdu', text: 'Clean Nastaliq text that you can search and copy.' },
  { icon: '📄', title: 'PDF Books', text: 'Open or download the original PDF editions.' },
  { icon: '⚡', title: 'Fast & Free', text: 'Built with React and Vite, so pages load instantly.' }
];

export default function FeaturesGrid() {
  return (
    <section id="about" className="mt-16" aria-labelledby="features-title">
      <h2 id="features-title" className="mb-6 text-2xl font-bold text-slate-900">Why KitabGhar?</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl" aria-hidden="true">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-slate-800">{feature.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
