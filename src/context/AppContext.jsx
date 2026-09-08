import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [openModals, setOpenModals] = useState(new Set());
  const [toasts, setToasts] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const navigate = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const openModal = useCallback((modalId) => {
    setOpenModals(prev => new Set([...prev, modalId]));
  }, []);

  const closeModal = useCallback((modalId) => {
    setOpenModals(prev => {
      const next = new Set(prev);
      next.delete(modalId);
      return next;
    });
  }, []);

  const isModalOpen = useCallback((modalId) => {
    return openModals.has(modalId);
  }, [openModals]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const value = {
    currentPage,
    navigate,
    openModals,
    openModal,
    closeModal,
    isModalOpen,
    toasts,
    addToast,
    removeToast,
    darkMode,
    toggleDarkMode
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
