import { useApp } from '../../../context/AppContext';
import './Topbar.css';

const titles = {
  dashboard: 'Dashboard',
  calendario: 'Calendário',
  servicos: 'Serviços',
  ganhos: 'Analytics de Ganhos',
  relatorios: 'Relatórios',
  configuracoes: 'Configurações',
};

export default function Topbar() {
  const { currentPage } = useApp();

  return (
    <header className="topbar">
      <span className="topbar-title" id="topbar-title">{titles[currentPage] || ''}</span>
      <div className="topbar-actions">
        <button className="icon-btn" title="Notificações">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="notif-dot"></span>
        </button>
        <div className="avatar avatar-btn" style={{ width: '34px', height: '34px', border: '2px solid #BFDBFE', cursor: 'pointer', fontSize: '13px' }}>RS</div>
      </div>
    </header>
  );
}
