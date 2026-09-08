export const mockServices = [
  {
    id: 1,
    name: 'Consultoria Empresarial',
    price: 350,
    duration: '2h',
    category: 'Consultoria',
    active: true,
    description: 'Análise completa de processos empresariais'
  },
  {
    id: 2,
    name: 'Desenvolvimento Web',
    price: 1500,
    duration: '40h',
    category: 'Tecnologia',
    active: true,
    description: 'Criação de sites e aplicações web'
  },
  {
    id: 3,
    name: 'Marketing Digital',
    price: 800,
    duration: '8h',
    category: 'Marketing',
    active: true,
    description: 'Gestão de redes sociais e tráfego pago'
  },
  {
    id: 4,
    name: 'Design Gráfico',
    price: 450,
    duration: '6h',
    category: 'Design',
    active: true,
    description: 'Criação de identidade visual e materiais'
  },
  {
    id: 5,
    name: 'Treinamento Corporativo',
    price: 600,
    duration: '4h',
    category: 'Educação',
    active: false,
    description: 'Capacitação de equipes em diversas áreas'
  }
];

export const mockTransactions = [
  { id: 1, description: 'Consultoria - Empresa ABC', amount: 350, date: '2024-01-15', type: 'income', category: 'Serviços' },
  { id: 2, description: 'Desenvolvimento Site XYZ', amount: 1500, date: '2024-01-14', type: 'income', category: 'Tecnologia' },
  { id: 3, description: 'Marketing - Cliente DEF', amount: 800, date: '2024-01-13', type: 'income', category: 'Marketing' },
  { id: 4, description: 'Design Logo GHI', amount: 450, date: '2024-01-12', type: 'income', category: 'Design' },
  { id: 5, description: 'Treinamento JKL', amount: 600, date: '2024-01-11', type: 'income', category: 'Educação' },
  { id: 6, description: 'Software License', amount: 99, date: '2024-01-10', type: 'expense', category: 'Ferramentas' },
  { id: 7, description: 'Hosting Anual', amount: 299, date: '2024-01-09', type: 'expense', category: 'Infraestrutura' },
  { id: 8, description: 'Consultoria MNO', amount: 350, date: '2024-01-08', type: 'income', category: 'Serviços' }
];

export const mockAppointments = [
  {
    id: 1,
    client: 'João Silva',
    service: 'Consultoria Empresarial',
    date: '2024-01-16',
    time: '09:00',
    status: 'confirmed',
    duration: 120
  },
  {
    id: 2,
    client: 'Maria Santos',
    service: 'Marketing Digital',
    date: '2024-01-16',
    time: '11:00',
    status: 'pending',
    duration: 60
  },
  {
    id: 3,
    client: 'Pedro Oliveira',
    service: 'Desenvolvimento Web',
    date: '2024-01-16',
    time: '14:00',
    status: 'confirmed',
    duration: 180
  },
  {
    id: 4,
    client: 'Ana Costa',
    service: 'Design Gráfico',
    date: '2024-01-17',
    time: '10:00',
    status: 'confirmed',
    duration: 90
  },
  {
    id: 5,
    client: 'Carlos Ferreira',
    service: 'Treinamento Corporativo',
    date: '2024-01-17',
    time: '15:00',
    status: 'pending',
    duration: 240
  }
];

export const mockActivities = [
  { id: 1, client: 'João Silva', service: 'Consultoria', status: 'completed', date: '2024-01-15', value: 350 },
  { id: 2, client: 'Maria Santos', service: 'Marketing', status: 'pending', date: '2024-01-16', value: 800 },
  { id: 3, client: 'Pedro Oliveira', service: 'Desenvolvimento', status: 'in-progress', date: '2024-01-16', value: 1500 },
  { id: 4, client: 'Ana Costa', service: 'Design', status: 'completed', date: '2024-01-15', value: 450 }
];

export const mockClients = [
  { id: 1, name: 'João Silva', email: 'joao@empresa.com', phone: '(11) 99999-9999', company: 'Empresa ABC' },
  { id: 2, name: 'Maria Santos', email: 'maria@startup.com', phone: '(11) 98888-8888', company: 'Startup XYZ' },
  { id: 3, name: 'Pedro Oliveira', email: 'pedro@tech.com', phone: '(11) 97777-7777', company: 'Tech Solutions' },
  { id: 4, name: 'Ana Costa', email: 'ana@design.com', phone: '(11) 96666-6666', company: 'Design Studio' },
  { id: 5, name: 'Carlos Ferreira', email: 'carlos@corp.com', phone: '(11) 95555-5555', company: 'Corp Ltda' }
];

export const monthlyRevenueData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  data: [4200, 3800, 5100, 4700, 6200, 5800, 7100, 6900, 8200, 7800, 9100, 8900]
};

export const performanceData = {
  labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
  data: [85, 92, 78, 96]
};

export const revenueByService = [
  { service: 'Consultoria', percentage: 35, value: 12500 },
  { service: 'Desenvolvimento', percentage: 28, value: 9800 },
  { service: 'Marketing', percentage: 20, value: 7000 },
  { service: 'Design', percentage: 12, value: 4200 },
  { service: 'Treinamento', percentage: 5, value: 1750 }
];

export const calendarEvents = [
  { id: 1, title: 'Reunião Cliente ABC', start: '09:00', end: '10:30', day: 1, category: 'meeting', color: '#4CAF50' },
  { id: 2, title: 'Entrega Projeto XYZ', start: '11:00', end: '12:00', day: 1, category: 'deadline', color: '#FF5722' },
  { id: 3, title: 'Workshop Marketing', start: '14:00', end: '16:00', day: 2, category: 'workshop', color: '#2196F3' },
  { id: 4, title: 'Call Semanal', start: '10:00', end: '11:00', day: 3, category: 'meeting', color: '#4CAF50' },
  { id: 5, title: 'Apresentação Resultados', start: '15:00', end: '17:00', day: 4, category: 'presentation', color: '#9C27B0' },
  { id: 6, title: 'Planejamento Q2', start: '09:00', end: '12:00', day: 5, category: 'planning', color: '#FF9800' }
];

export const kpiData = {
  totalRevenue: 52350,
  activeServices: 12,
  avgTicket: 487,
  newClients: 23
};

export const reportsData = [
  { id: 1, date: '2024-01-15', client: 'Empresa ABC', service: 'Consultoria', value: 350, status: 'completed' },
  { id: 2, date: '2024-01-14', client: 'Startup XYZ', service: 'Marketing', value: 800, status: 'completed' },
  { id: 3, date: '2024-01-13', client: 'Tech Solutions', service: 'Desenvolvimento', value: 1500, status: 'in-progress' },
  { id: 4, date: '2024-01-12', client: 'Design Studio', service: 'Design', value: 450, status: 'completed' },
  { id: 5, date: '2024-01-11', client: 'Corp Ltda', service: 'Treinamento', value: 600, status: 'pending' },
  { id: 6, date: '2024-01-10', client: 'Empresa ABC', service: 'Consultoria', value: 350, status: 'completed' },
  { id: 7, date: '2024-01-09', client: 'Startup XYZ', service: 'Marketing', value: 800, status: 'completed' },
  { id: 8, date: '2024-01-08', client: 'Tech Solutions', service: 'Desenvolvimento', value: 1500, status: 'completed' }
];
