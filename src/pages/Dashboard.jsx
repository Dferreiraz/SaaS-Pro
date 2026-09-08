import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { performanceData, revenueByService } from '../../../data/mockData';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement);

export default function Dashboard() {
  const [stats] = useState({
    appointments: 24,
    servicesCompleted: 156,
    monthlyRevenue: 12450,
    clientsServed: 89
  });

  const lineChartData = {
    labels: performanceData.labels,
    datasets: [
      {
        label: 'Desempenho',
        data: performanceData.data,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Agendamentos</h3>
            <i className="bx bx-calendar"></i>
          </div>
          <div className="stat-value">{stats.appointments}</div>
          <div className="stat-badge badge-success">
            <i className="bx bx-up-arrow-alt"></i>
            +12%
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Serviços Realizados</h3>
            <i className="bx bx-check-circle"></i>
          </div>
          <div className="stat-value">{stats.servicesCompleted}</div>
          <div className="stat-badge badge-success">
            <i className="bx bx-up-arrow-alt"></i>
            +8%
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Ganhos do Mês</h3>
            <i className="bx bx-dollar"></i>
          </div>
          <div className="stat-value">R$ {stats.monthlyRevenue.toLocaleString('pt-BR')}</div>
          <div className="stat-badge badge-success">
            <i className="bx bx-up-arrow-alt"></i>
            +15%
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Clientes Atendidos</h3>
            <i className="bx bx-user"></i>
          </div>
          <div className="stat-value">{stats.clientsServed}</div>
          <div className="stat-badge badge-warning">
            <i className="bx bx-down-arrow-alt"></i>
            -3%
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <div className="section-header">
            <h2>Desempenho Mensal</h2>
          </div>
          <div className="chart-container">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        <div className="revenue-section">
          <div className="section-header">
            <h2>Receita por Serviço</h2>
          </div>
          <div className="revenue-bars">
            {revenueByService.map((item) => (
              <div key={item.service} className="revenue-bar-item">
                <div className="revenue-bar-label">{item.service}</div>
                <div className="revenue-bar-track">
                  <div 
                    className="revenue-bar-fill" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="revenue-bar-value">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
