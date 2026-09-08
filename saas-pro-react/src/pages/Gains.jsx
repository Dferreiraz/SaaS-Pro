import { useApp } from '../../context/AppContext';
import GainsStats from '../../components/Gains/GainsStats/GainsStats';
import RevenueChart from '../../components/Gains/RevenueChart/RevenueChart';
import RevenueByService from '../../components/Gains/RevenueByService/RevenueByService';
import TransactionTable from '../../components/Gains/TransactionTable/TransactionTable';
import './Gains.css';

export default function Gains() {
  const { openModal } = useApp();

  return (
    <div className="page gains-page">
      <div className="gains-header">
        <h1>Ganhos</h1>
        <button className="btn-fab" onClick={() => openModal('transacao')}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <GainsStats />

      <div className="gains-content">
        <RevenueChart />
        <RevenueByService />
      </div>

      <TransactionTable />
    </div>
  );
}
