import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Services from './pages/Services';
import Gains from './pages/Gains';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Modal from './components/UI/Modal/Modal';
import ToastContainer from './components/UI/Toast/ToastContainer';
import { useApp } from './context/AppContext';

function AppContent() {
  const { currentPage, isModalOpen, closeModal, toasts } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'calendario':
        return <Calendar />;
      case 'servicos':
        return <Services />;
      case 'ganhos':
        return <Gains />;
      case 'relatorios':
        return <Reports />;
      case 'configuracoes':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout>
        {renderPage()}
      </Layout>
      
      {isModalOpen('appt') && (
        <Modal 
          modalId="appt" 
          title="Novo Agendamento" 
          onClose={closeModal}
        >
          <div className="modal-appt-content">
            <p>Formulário de agendamento aqui</p>
          </div>
        </Modal>
      )}
      
      {isModalOpen('service') && (
        <Modal 
          modalId="service" 
          title="Adicionar Serviço" 
          onClose={closeModal}
        >
          <div className="modal-service-content">
            <p>Formulário de serviço aqui</p>
          </div>
        </Modal>
      )}
      
      {isModalOpen('transacao') && (
        <Modal 
          modalId="transacao" 
          title="Nova Transação" 
          onClose={closeModal}
        >
          <div className="modal-transacao-content">
            <p>Formulário de transação aqui</p>
          </div>
        </Modal>
      )}
      
      <ToastContainer toasts={toasts} />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
