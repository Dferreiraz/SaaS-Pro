import './Toast.css';

export default function ToastContainer({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={
              toast.type === 'success' ? 'M5 13l4 4L19 7' :
              toast.type === 'error' ? 'M6 18L18 6M6 6l12 12' :
              'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            } />
          </svg>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
