import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <Topbar />
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
}
