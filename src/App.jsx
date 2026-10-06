import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import BookCard from './components/BookCard';
import BookCardClone from './components/BookCardClone';
import FeaturesGrid from './components/FeaturesGrid';
import SiteFooter from './components/SiteFooter';
import AudioPlayerModal from './components/AudioPlayerModal';
import UnicodeReaderModal from './components/UnicodeReaderModal';
import PdfViewerModal from './components/PdfViewerModal';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import { StoreProvider } from './context/StoreContext';

import './App.css';

// App is the main root component wrapped in the global StoreProvider.
export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-amber-400 selection:text-slate-900">
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

        {/* Global Interactive Overlays & Modals */}
        <AudioPlayerModal />
        <UnicodeReaderModal />
        <PdfViewerModal />
        <CartDrawer />
        <Toast />
      </div>
    </StoreProvider>
  );
}
