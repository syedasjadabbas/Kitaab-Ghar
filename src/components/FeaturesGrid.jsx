// FEATURES GRID COMPONENT
// Interactive feature cards that scroll to and filter the library when clicked.

import { useStore } from '../context/StoreContext';

const features = [
  {
    icon: '🎧',
    title: 'Audio Books',
    text: 'Listen to narrated books directly in your browser with our built-in audio player.',
    filter: 'AUDIO',
    actionText: 'Listen Now →'
  },
  {
    icon: '🔤',
    title: 'Unicode Urdu',
    text: 'Clean Nastaliq text that you can search, copy, resize, and read chapter by chapter.',
    filter: 'UNICODE',
    actionText: 'Read Unicode →'
  },
  {
    icon: '📄',
    title: 'PDF Books',
    text: 'Open the original PDF manuscripts in our built-in reader or in a new browser tab.',
    filter: 'PDF',
    actionText: 'View PDFs →'
  },
  {
    icon: '⚡',
    title: 'Fast & Free',
    text: 'Built with modern React & Vite, 100% free digital access for all readers.',
    filter: 'ALL',
    actionText: 'Explore All →'
  }
];

export default function FeaturesGrid() {
  const { setFilterAndScroll } = useStore();

  return (
    <section id="about" className="mt-20" aria-labelledby="features-title">
      <div className="flex flex-col items-center text-center">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
          Core Features
        </span>
        <h2 id="features-title" className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
          Why Choose KitabGhar?
        </h2>
        <p className="mt-2 max-w-xl text-slate-500">
          Click any feature card below to instantly jump to the corresponding collection in our library.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <button
            key={feature.title}
            type="button"
            onClick={() => setFilterAndScroll(feature.filter)}
            className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl active:scale-95"
          >
            <div>
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl transition duration-200 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white"
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{feature.text}</p>
            </div>

            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
              <span>{feature.actionText}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
