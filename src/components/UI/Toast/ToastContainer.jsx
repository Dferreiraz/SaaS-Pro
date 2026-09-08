import './ToastContainer.css';

export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <i className={`bx ${toast.type === 'success' ? 'bx-check-circle' : toast.type === 'error' ? 'bx-error-circle' : 'bx-info-circle'}`}></i>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
