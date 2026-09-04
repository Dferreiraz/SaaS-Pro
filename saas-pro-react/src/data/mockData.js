export const services = [
  { id: 1, cat: 'Design', icon: 'wrench', color: 'blue', name: 'Consultoria de UX', desc: 'Análise profunda da jornada do usuário e otimização de fluxos de...', duration: '60 min', price: 450 },
  { id: 2, cat: 'Dev', icon: 'code', color: 'purple', name: 'Desenvolvimento API', desc: 'Criação de endpoints RESTful seguros e escaláveis com...', duration: '120 min', price: 800 },
  { id: 3, cat: 'Mkt', icon: 'trend', color: 'green', name: 'SEO Mensal', desc: 'Otimização recorrente para motores de busca com relatórios de...', duration: 'Mensal', price: 1200 },
  { id: 4, cat: 'Segurança', icon: 'shield', color: 'amber', name: 'Auditoria de Segurança', desc: 'Verificação completa de vulnerabilidades em infraestrutura...', duration: '180 min', price: 1500 },
  { id: 5, cat: 'AI', icon: 'sparkle', color: 'blue', name: 'Integração LLM', desc: 'Implementação de modelos de linguagem para suporte ao cliente...', duration: '90 min', price: 650 },
];

export const appointments = [
  { id: 1, time: '09:00', day: 'Hoje', client: 'Beatriz Oliveira', service: 'Consultoria Estratégica', color: 'blue' },
  { id: 2, time: '10:30', day: 'Hoje', client: 'Carlos Eduardo', service: 'Análise de Dados', color: 'green' },
  { id: 3, time: '14:00', day: 'Hoje', client: 'Dra. Mariana Luz', service: 'Revisão de Projeto', color: 'red' },
  { id: 4, time: '16:15', day: 'Amanhã', client: 'Roberto Alves', service: 'Workshop de UI', color: 'blue' },
];

export const activities = [
  { id: 1, client: 'Ana Costa', service: 'Consultoria UX', status: 'success', date: '15/06/2024', value: 450 },
  { id: 2, client: 'Bruno Dias', service: 'Dev API', status: 'warning', date: '14/06/2024', value: 800 },
  { id: 3, client: 'Carla Mendes', service: 'SEO Mensal', status: 'success', date: '14/06/2024', value: 1200 },
  { id: 4, client: 'Daniel Rocha', service: 'Auditoria', status: 'danger', date: '13/06/2024', value: 1500 },
];

export const transactions = [
  { id: 1, desc: 'Consultoria UX - Ana Costa', date: '15/06/2024', value: 450, type: 'income' },
  { id: 2, desc: 'Dev API - Bruno Dias', date: '14/06/2024', value: 800, type: 'income' },
  { id: 3, desc: 'SEO Mensal - Carla Mendes', date: '14/06/2024', value: 1200, type: 'income' },
  { id: 4, desc: 'Servidor Cloud', date: '10/06/2024', value: 250, type: 'expense' },
];

export const calendarEvents = [
  { id: 1, title: 'Consultoria UX', time: '09:00-10:00', type: 'Design', color: 'blue', day: 0, slot: 1 },
  { id: 2, title: 'Reunião Cliente', time: '11:00-12:00', type: 'Geral', color: 'gray', day: 0, slot: 3 },
  { id: 3, title: 'Dev API', time: '14:00-16:00', type: 'Dev', color: 'purple', day: 1, slot: 6 },
  { id: 4, title: 'SEO Review', time: '10:00-11:00', type: 'Mkt', color: 'green', day: 2, slot: 2 },
  { id: 5, title: 'Auditoria', time: '15:00-18:00', type: 'Segurança', color: 'red', day: 3, slot: 7 },
];

export const gainsStats = {
  today: 1250,
  week: 8420,
  month: 34500,
  year: 285000,
  goal: 350000,
};

export const revenueByService = [
  { name: 'Consultoria UX', value: 85 },
  { name: 'Dev API', value: 72 },
  { name: 'SEO Mensal', value: 65 },
  { name: 'Auditoria', value: 48 },
  { name: 'Integração LLM', value: 35 },
];

export const kpiData = {
  totalRevenue: 62000,
  activeServices: 24,
  avgTicket: 890,
  newClients: 18,
};

export const reportRecords = [
  { id: 1, client: 'Tech Solutions', service: 'Dev Full Stack', value: 5500, date: '15/06/2024', status: 'success' },
  { id: 2, client: 'Marketing Pro', service: 'SEO Avançado', value: 2200, date: '14/06/2024', status: 'success' },
  { id: 3, client: 'Startup X', service: 'Consultoria UX', value: 1800, date: '13/06/2024', status: 'warning' },
  { id: 4, client: 'E-commerce Plus', service: 'Auditoria', value: 3200, date: '12/06/2024', status: 'success' },
];

export const userProfile = {
  name: 'Ricardo Silva',
  email: 'ricardo@saaspro.com',
  phone: '(11) 98765-4321',
  role: 'Administrador',
  avatar: null,
};
