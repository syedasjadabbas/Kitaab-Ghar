import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import BookCard from './components/BookCard';
import BookCardClone from './components/BookCardClone';
import FeaturesGrid from './components/FeaturesGrid';
import SiteFooter from './components/SiteFooter';

import './App.css';

// App is the main component. It only arranges the other components in order.
// Capitalised tags like <Header /> are OUR components; lowercase tags like
// <main> and <div> are normal HTML elements.
export default function App() {

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <HeroBanner />

      <main className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <div id="library">
          <BookCard />
        </div>

        <div id="featured">
          <BookCardClone />
        </div>

        <FeaturesGrid />
      </main>

      <SiteFooter />
    </div>
  );
}
