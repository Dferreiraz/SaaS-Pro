import './Topbar.css';
import { useApp } from '../../../context/AppContext';

export default function Topbar({ title }) {
  const { darkMode, toggleDarkMode } = useApp();

  return (
    <header className="topbar">
      <div className="topbar-content">
        <h1 className="page-title">{title}</h1>
        <div className="topbar-actions">
          <button 
            className="theme-toggle-btn" 
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            <i className={`bx ${darkMode ? 'bx-sun' : 'bx-moon'}`}></i>
          </button>
          <button className="notification-btn">
            <i className="bx bx-bell"></i>
            <span className="notification-badge">3</span>
          </button>
        </div>
      </div>
    </header>
  );
}
