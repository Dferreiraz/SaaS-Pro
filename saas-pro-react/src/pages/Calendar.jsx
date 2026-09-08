import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './Calendar.css';

export default function Calendar() {
  const { openModal } = useApp();
  const [view, setView] = useState('week');

  return (
    <div className="page calendar-page">
      <div className="calendar-header">
        <h1>Calendário</h1>
        <div className="calendar-actions">
          <div className="view-switcher">
            <button className={view === 'day' ? 'active' : ''} onClick={() => setView('day')}>Dia</button>
            <button className={view === 'week' ? 'active' : ''} onClick={() => setView('week')}>Semana</button>
            <button className={view === 'month' ? 'active' : ''} onClick={() => setView('month')}>Mês</button>
          </div>
          <button className="btn-primary" onClick={() => openModal('appt')}>
            Novo Agendamento
          </button>
        </div>
      </div>

      <div className="calendar-body">
        <div className="calendar-grid">
          <div className="calendar-times">
            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(time => (
              <div key={time} className="time-slot">{time}</div>
            ))}
          </div>
          <div className="calendar-days">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, i) => (
              <div key={day} className="day-column">
                <div className="day-header">{day}</div>
                <div className="day-slots"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
