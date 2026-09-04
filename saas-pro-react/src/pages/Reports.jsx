import { useState } from 'react';
import FilterTabs from '../../components/Reports/FilterTabs/FilterTabs';
import KPICards from '../../components/Reports/KPICards/KPICards';
import ReportsTable from '../../components/Reports/ReportsTable/ReportsTable';
import ExportSection from '../../components/Reports/ExportSection/ExportSection';
import './Reports.css';

export default function Reports() {
  const [filter, setFilter] = useState('month');

  return (
    <div className="page reports-page">
      <div className="reports-header">
        <h1>Relatórios</h1>
        <div className="reports-actions">
          <button className="btn-secondary">Exportar CSV</button>
          <button className="btn-primary">Novo Relatório</button>
        </div>
      </div>

      <FilterTabs filter={filter} onFilterChange={setFilter} />

      <KPICards />

      <ReportsTable />

      <ExportSection />
    </div>
  );
}
