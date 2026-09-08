import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';
import './Layout.css';

const pageTitles = {
  dashboard: 'Dashboard',
  calendario: 'Calendário',
  servicos: 'Serviços',
  ganhos: 'Ganhos',
  relatorios: 'Relatórios',
  configuracoes: 'Configurações'
};

export default function Layout({ children }) {
  const currentPage = localStorage.getItem('currentPage') || 'dashboard';
  const title = pageTitles[currentPage] || 'Dashboard';

  return (
    <div className="app-layout">
      <Sidebar />
      <Topbar title={title} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
