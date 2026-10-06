import { createContext, useContext, useState } from 'react';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeAudioBook, setActiveAudioBook] = useState(null);
  const [activeUnicodeBook, setActiveUnicodeBook] = useState(null);
  const [activePdfBook, setActivePdfBook] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 3500);
  }

  function addToCart(book) {
    setCart((prev) => {
      const existing = prev.find((item) => item.book._id === book._id);
      if (existing) {
        showToast(`Increased quantity for "${book.title}"`);
        return prev.map((item) =>
          item.book._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showToast(`Added "${book.title}" to Cart`);
      return [...prev, { book, quantity: 1 }];
    });
  }

  function removeFromCart(bookId) {
    setCart((prev) => prev.filter((item) => item.book._id !== bookId));
    showToast('Item removed from Cart', 'info');
  }

  function updateQuantity(bookId, delta) {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.book._id === bookId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  }

  function clearCart() {
    setCart([]);
    showToast('Cart has been cleared', 'info');
  }

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  function openAudioPlayer(book) {
    setActiveAudioBook(book);
  }

  function closeAudioPlayer() {
    setActiveAudioBook(null);
  }

  function openUnicodeReader(book) {
    setActiveUnicodeBook(book);
  }

  function closeUnicodeReader() {
    setActiveUnicodeBook(null);
  }

  function openPdfViewer(book) {
    setActivePdfBook(book);
  }

  function closePdfViewer() {
    setActivePdfBook(null);
  }

  function setFilterAndScroll(filter) {
    setActiveFilter(filter);
    const elem = document.getElementById('library');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <StoreContext.Provider
      value={{
        cart,
        totalCartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        activeAudioBook,
        openAudioPlayer,
        closeAudioPlayer,
        activeUnicodeBook,
        openUnicodeReader,
        closeUnicodeReader,
        activePdfBook,
        openPdfViewer,
        closePdfViewer,
        activeFilter,
        setActiveFilter,
        searchQuery,
        setSearchQuery,
        setFilterAndScroll,
        toast,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
