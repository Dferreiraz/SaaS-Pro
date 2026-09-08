import { useMemo } from 'react';
import { appointments, activities } from '../data/mockData';
import StatCard from '../components/Dashboard/StatCard/StatCard';
import ChartCard from '../components/Dashboard/ChartCard/ChartCard';
import UpcomingCard from '../components/Dashboard/UpcomingCard/UpcomingCard';
import ActivityTable from '../components/Dashboard/ActivityTable/ActivityTable';
import './Dashboard.css';

const statsData = [
  { label: 'Agendamentos', value: '42', badge: { type: 'up', text: '+12%' }, icon: 'calendar', color: 'blue' },
  { label: 'Serviços Realizados', value: '128', badge: { type: 'today', text: 'Hoje' }, icon: 'check', color: 'green' },
  { label: 'Ganhos do Mês', value: 'R$ 14.250', badge: { type: 'down', text: '−2.4%' }, icon: 'wallet', color: 'red' },
  { label: 'Clientes Atendidos', value: '892', badge: { type: 'new', text: 'Novo' }, icon: 'users', color: 'purple' },
];

export default function Dashboard() {
  const upcomingAppointments = useMemo(() => appointments.slice(0, 4), []);
  const recentActivities = useMemo(() => activities.slice(0, 4), []);

  return (
    <div className="page dashboard-page">
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="two-col" style={{ marginBottom: 0 }}>
        <ChartCard />
        <UpcomingCard appointments={upcomingAppointments} />
      </div>

      <ActivityTable activities={recentActivities} />
    </div>
  );
}
