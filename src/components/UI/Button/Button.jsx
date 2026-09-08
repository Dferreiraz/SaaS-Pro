import './Button.css';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick, 
  type = 'button',
  className = '',
  icon,
  disabled = false
}) {
  return (
    <button 
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <i className={`bx ${icon}`}></i>}
      {children}
    </button>
  );
}
