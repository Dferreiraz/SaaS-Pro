import './Sidebar.css';
import { useApp } from '../../../context/AppContext';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'bx-home-alt-2' },
  { id: 'calendario', label: 'Calendário', icon: 'bx-calendar' },
  { id: 'servicos', label: 'Serviços', icon: 'bx-briefcase-alt' },
  { id: 'ganhos', label: 'Ganhos', icon: 'bx-dollar' },
  { id: 'relatorios', label: 'Relatórios', icon: 'bx-bar-chart-alt-2' },
  { id: 'configuracoes', label: 'Configurações', icon: 'bx-cog' }
];

export default function Sidebar() {
  const { currentPage, navigate } = useApp();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <i className="bx bxs-component"></i>
          <span>SaaS Pro</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => navigate(item.id)}
                data-nav={item.id}
              >
                <i className={`bx ${item.icon}`}></i>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            <i className="bx bx-user"></i>
          </div>
          <div className="user-details">
            <span className="user-name">Admin</span>
            <span className="user-role">Administrador</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
