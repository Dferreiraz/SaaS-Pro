import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [openModal, setOpenModal] = useState(null);
  const [toasts, setToasts] = useState([]);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const openModalFn = (modalId) => setOpenModal(modalId);
  const closeModalFn = () => setOpenModal(null);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const value = {
    currentPage,
    navigate,
    openModal: openModalFn,
    closeModal: closeModalFn,
    isModalOpen: (id) => openModal === id,
    addToast,
    toasts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
