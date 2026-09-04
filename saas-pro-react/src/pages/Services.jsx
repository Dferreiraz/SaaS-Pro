import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { services } from '../../data/mockData';
import ServiceCard from '../../components/Services/ServiceCard/ServiceCard';
import ServicesStats from '../../components/Services/ServicesStats/ServicesStats';
import Pagination from '../../components/Services/Pagination/Pagination';
import './Services.css';

export default function Services() {
  const { openModal } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentServices = services.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="page services-page">
      <div className="services-header">
        <h1>Serviços</h1>
        <button className="btn-primary" onClick={() => openModal('service')}>
          Adicionar Serviço
        </button>
      </div>

      <ServicesStats />

      <div className="services-grid">
        {currentServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
