/* =============================================
   SAAS PRO — Main Application JS
   ============================================= */

'use strict';

// ── Router ──────────────────────────────────────────────────────────────────

const Router = (() => {
  function navigate(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const page = document.getElementById('page-' + pageId);
    if (page) page.classList.add('active');

    const nav = document.querySelector(`[data-nav="${pageId}"]`);
    if (nav) nav.classList.add('active');

    const titles = {
      dashboard: 'Dashboard',
      calendario: 'Calendário',
      servicos: 'Serviços',
      ganhos: 'Analytics de Ganhos',
      relatorios: 'Relatórios',
      configuracoes: 'Configurações',
    };
    document.getElementById('topbar-title').textContent = titles[pageId] || '';
    window.scrollTo(0, 0);
    const content = document.querySelector('.page-content');
    if (content) content.scrollTop = 0;
    ChartManager.renderForPage(pageId);
  }

  function init() {
    document.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.nav));
    });
    navigate('dashboard');
  }

  return { init, navigate };
})();

// ── Toast ────────────────────────────────────────────────────────────────────

const Toast = (() => {
  function show(msg, type = '') {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="${type === 'success' ? 'M5 13l4 4L19 7' : type === 'error' ? 'M6 18L18 6M6 6l12 12' : 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'}"/></svg>${msg}`;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3200);
  }
  return { show };
})();

// ── Modal ────────────────────────────────────────────────────────────────────

const Modal = (() => {
  function open(id) {
    document.getElementById(id)?.classList.add('open');
  }
  function close(id) {
    document.getElementById(id)?.classList.remove('open');
  }
  function init() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.classList.remove('open');
      });
    });
    document.querySelectorAll('.modal-close, [data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal-overlay')?.classList.remove('open');
      });
    });
  }
  return { open, close, init };
})();

// ── Chart Manager ─────────────────────────────────────────────────────────────

const ChartManager = (() => {
  const rendered = new Set();

  const monthLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const monthData   = [42800, 38500, 41200, 55600, 51000, 48900];
  const profitData  = [18200, 15400, 19800, 27000, 23500, 22100];

  function renderDashboardChart() {
    const canvas = document.getElementById('chart-desempenho');
    if (!canvas || rendered.has('dashboard-main')) return;
    rendered.add('dashboard-main');
    const ctx = canvas.getContext('2d');
    const W = canvas.width  = canvas.parentElement.offsetWidth;
    const H = canvas.height = 200;
    const pad = { t: 10, r: 20, b: 32, l: 56 };
    const iW = W - pad.l - pad.r;
    const iH = H - pad.t - pad.b;
    const max = Math.max(...monthData) * 1.15;
    const x = i => pad.l + (i / (monthData.length - 1)) * iW;
    const y = v => pad.t + iH - (v / max) * iH;

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = '#E5E7EB'; ctx.lineWidth = 1;
    [0, .25, .5, .75, 1].forEach(t => {
      const yy = pad.t + iH * (1 - t);
      ctx.beginPath(); ctx.moveTo(pad.l, yy); ctx.lineTo(pad.l + iW, yy); ctx.stroke();
      ctx.fillStyle = '#9CA3AF'; ctx.font = '11px Inter';
      ctx.textAlign = 'right';
      ctx.fillText(((max * t) / 1000).toFixed(0) + 'k', pad.l - 8, yy + 4);
    });

    // Bars
    const bw = 18;
    monthData.forEach((v, i) => {
      const xx = x(i);
      const yy = y(v);
      const barH = iH - (yy - pad.t);
      const grad = ctx.createLinearGradient(0, yy, 0, pad.t + iH);
      grad.addColorStop(0, '#3B7CF6');
      grad.addColorStop(1, '#93C5FD');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(xx - bw / 2, yy, bw, barH, [4, 4, 0, 0]);
      ctx.fill();
    });

    // Profit line
    ctx.strokeStyle = '#10B981'; ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath();
    profitData.forEach((v, i) => {
      if (i === 0) ctx.moveTo(x(i), y(v));
      else ctx.lineTo(x(i), y(v));
    });
    ctx.stroke();

    // Dots on profit line
    profitData.forEach((v, i) => {
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(x(i), y(v), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x(i), y(v), 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // X labels
    ctx.fillStyle = '#9CA3AF'; ctx.font = '11px Inter'; ctx.textAlign = 'center';
    monthLabels.forEach((l, i) => ctx.fillText(l, x(i), H - 8));
  }

  function renderGanhosChart() {
    const canvas = document.getElementById('chart-ganhos');
    if (!canvas || rendered.has('ganhos-main')) return;
    rendered.add('ganhos-main');
    const ctx = canvas.getContext('2d');
    const W = canvas.width  = canvas.parentElement.offsetWidth;
    const H = canvas.height = 220;
    const pad = { t: 10, r: 20, b: 32, l: 56 };
    const iW = W - pad.l - pad.r;
    const iH = H - pad.t - pad.b;
    const data = [48000, 62000, 57000, 76000, 70000, 68000];
    const max = Math.max(...data) * 1.15;
    const x = i => pad.l + (i / (data.length - 1)) * iW;
    const y = v => pad.t + iH - (v / max) * iH;

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = '#E5E7EB'; ctx.lineWidth = 1;
    [0, .25, .5, .75, 1].forEach(t => {
      const yy = pad.t + iH * (1 - t);
      ctx.beginPath(); ctx.moveTo(pad.l, yy); ctx.lineTo(pad.l + iW, yy); ctx.stroke();
      ctx.fillStyle = '#9CA3AF'; ctx.font = '11px Inter'; ctx.textAlign = 'right';
      ctx.fillText(((max * t) / 1000).toFixed(0) + 'k', pad.l - 8, yy + 4);
    });

    // Gradient fill
    const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + iH);
    grad.addColorStop(0, 'rgba(59,124,246,.25)');
    grad.addColorStop(1, 'rgba(59,124,246,.01)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(x(0), pad.t + iH);
    data.forEach((v, i) => ctx.lineTo(x(i), y(v)));
    ctx.lineTo(x(data.length - 1), pad.t + iH);
    ctx.closePath(); ctx.fill();

    // Line
    ctx.strokeStyle = '#3B7CF6'; ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath();
    data.forEach((v, i) => { if (i === 0) ctx.moveTo(x(i), y(v)); else ctx.lineTo(x(i), y(v)); });
    ctx.stroke();

    // Highlight current (index 3 = Abr)
    const hi = 3;
    ctx.fillStyle = '#3B7CF6';
    ctx.beginPath(); ctx.arc(x(hi), y(data[hi]), 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(x(hi), y(data[hi]), 2.5, 0, Math.PI * 2); ctx.fill();

    // X labels
    ctx.fillStyle = '#9CA3AF'; ctx.font = '11px Inter'; ctx.textAlign = 'center';
    monthLabels.forEach((l, i) => {
      ctx.fillStyle = i === 3 ? '#3B7CF6' : '#9CA3AF';
      ctx.font = i === 3 ? 'bold 11px Inter' : '11px Inter';
      ctx.fillText(l, x(i), H - 8);
    });
  }

  function renderReportChart() {
    const canvas = document.getElementById('chart-report');
    if (!canvas || rendered.has('report-main')) return;
    rendered.add('report-main');
    const ctx = canvas.getContext('2d');
    const W = canvas.width  = canvas.parentElement.offsetWidth;
    const H = canvas.height = 180;
    const pad = { t: 10, r: 10, b: 10, l: 10 };
    const iW = W - pad.l - pad.r;
    const iH = H - pad.t - pad.b;
    const data = [32000, 41000, 38000, 51000, 49000, 62000, 58000];
    const max = Math.max(...data) * 1.1;
    const bw = iW / data.length * 0.55;

    ctx.clearRect(0, 0, W, H);
    data.forEach((v, i) => {
      const xx = pad.l + (i + .5) * (iW / data.length);
      const barH = (v / max) * iH;
      const yy = pad.t + iH - barH;
      const grad = ctx.createLinearGradient(0, yy, 0, pad.t + iH);
      const isLast = i === data.length - 1;
      grad.addColorStop(0, isLast ? '#1A56DB' : '#93C5FD');
      grad.addColorStop(1, isLast ? '#3B7CF6' : '#BFDBFE');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(xx - bw / 2, yy, bw, barH, [4, 4, 0, 0]);
      ctx.fill();
    });
  }

  function renderForPage(pageId) {
    setTimeout(() => {
      if (pageId === 'dashboard') renderDashboardChart();
      if (pageId === 'ganhos')    renderGanhosChart();
      if (pageId === 'relatorios') renderReportChart();
    }, 60);
  }

  return { renderForPage, renderDashboardChart, renderGanhosChart };
})();

// ── Calendario ────────────────────────────────────────────────────────────────
 
const CalendarView = (() => {
  let view = 'semana';
 
  function setView(v) {
    view = v;
    document.querySelectorAll('.vsw').forEach(b => b.classList.toggle('active', b.dataset.view === v));
  }
 
  function init() {
    document.querySelectorAll('.vsw').forEach(btn => {
      btn.addEventListener('click', () => setView(btn.dataset.view));
    });
  }
 
  return { init };
})();

// ── Services ──────────────────────────────────────────────────────────────────

const Services = (() => {
  let services = [
    { id: 1, cat: 'Design',     icon: 'wrench',  color: 'blue',   name: 'Consultoria de UX',       desc: 'Análise profunda da jornada do usuário e otimização de fluxos de...', duration: '60 min',   price: 450 },
    { id: 2, cat: 'Dev',        icon: 'code',    color: 'purple', name: 'Desenvolvimento API',      desc: 'Criação de endpoints RESTful seguros e escaláveis com...', duration: '120 min',  price: 800 },
    { id: 3, cat: 'Mkt',        icon: 'trend',   color: 'green',  name: 'SEO Mensal',               desc: 'Otimização recorrente para motores de busca com relatórios de...', duration: 'Mensal',   price: 1200 },
    { id: 4, cat: 'Segurança',  icon: 'shield',  color: 'amber',  name: 'Auditoria de Segurança',   desc: 'Verificação completa de vulnerabilidades em infraestrutura...', duration: '180 min',  price: 1500 },
    { id: 5, cat: 'AI',         icon: 'sparkle', color: 'blue',   name: 'Integração LLM',           desc: 'Implementação de modelos de linguagem para suporte ao cliente...', duration: '90 min',   price: 650 },
  ];

  const ICONS = {
    wrench:  `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/></svg>`,
    code:    `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/></svg>`,
    trend:   `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg>`,
    shield:  `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>`,
    sparkle: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>`,
  };

  function fmt(n) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }); }

  function renderGrid() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    const avg = services.length ? services.reduce((a, s) => a + s.price, 0) / services.length : 0;
    document.getElementById('svc-total').textContent = services.length;
    document.getElementById('svc-avg').textContent   = fmt(avg);
    document.getElementById('svc-ativos').textContent = services.filter((_, i) => i < 8).length;

    const cards = services.map(s => `
      <div class="service-card" data-id="${s.id}">
        <div class="sc-top">
          <div class="sc-icon ${s.color}">${ICONS[s.icon] || ICONS.sparkle}</div>
          <span class="sc-cat">${s.cat}</span>
        </div>
        <div class="sc-name">${s.name}</div>
        <div class="sc-desc">${s.desc}</div>
        <div class="sc-meta">
          <span>
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 6v6l4 2"/></svg>
            ${s.duration}
          </span>
          <span class="sc-price">${fmt(s.price)}</span>
        </div>
        <hr class="sc-divider">
        <div class="sc-actions">
          <button class="btn-sm ghost edit-btn" data-id="${s.id}">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"/></svg>
            Editar
          </button>
          <button class="btn-sm danger del-btn" data-id="${s.id}">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
            Excluir
          </button>
        </div>
      </div>
    `).join('');

    const dashed = `
      <div class="service-card dashed" id="new-service-card">
        <svg width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span>Novo Serviço</span>
      </div>`;

    grid.innerHTML = cards + dashed;

    grid.querySelectorAll('.edit-btn').forEach(b => {
      b.addEventListener('click', e => { e.stopPropagation(); openEditModal(+b.dataset.id); });
    });
    grid.querySelectorAll('.del-btn').forEach(b => {
      b.addEventListener('click', e => {
        e.stopPropagation();
        services = services.filter(s => s.id !== +b.dataset.id);
        renderGrid();
        Toast.show('Serviço removido.', 'error');
      });
    });
    grid.querySelector('#new-service-card')?.addEventListener('click', () => openAddModal());
  }

  let editingId = null;
  function openAddModal() {
    editingId = null;
    document.getElementById('modal-svc-title').textContent = 'Adicionar Serviço';
    document.getElementById('svc-form').reset();
    Modal.open('modal-service');
  }
  function openEditModal(id) {
    const s = services.find(sv => sv.id === id);
    if (!s) return;
    editingId = id;
    document.getElementById('modal-svc-title').textContent = 'Editar Serviço';
    document.getElementById('svc-name').value     = s.name;
    document.getElementById('svc-cat').value      = s.cat;
    document.getElementById('svc-price').value    = s.price;
    document.getElementById('svc-duration').value = s.duration;
    Modal.open('modal-service');
  }

  function saveService() {
    const name  = document.getElementById('svc-name').value.trim();
    const cat   = document.getElementById('svc-cat').value.trim();
    const price = parseFloat(document.getElementById('svc-price').value);
    const dur   = document.getElementById('svc-duration').value.trim();
    if (!name || !price) { Toast.show('Preencha todos os campos.', 'error'); return; }

    if (editingId) {
      const s = services.find(sv => sv.id === editingId);
      if (s) { s.name = name; s.cat = cat; s.price = price; s.duration = dur; }
      Toast.show('Serviço atualizado!', 'success');
    } else {
      services.push({ id: Date.now(), cat, icon: 'sparkle', color: 'blue', name, desc: '', duration: dur, price });
      Toast.show('Serviço adicionado!', 'success');
    }
    Modal.close('modal-service');
    renderGrid();
  }

  function init() {
    renderGrid();
    document.getElementById('btn-add-service')?.addEventListener('click', openAddModal);
    document.getElementById('btn-save-service')?.addEventListener('click', saveService);
  }

  return { init };
})();

// ── Settings ──────────────────────────────────────────────────────────────────

const Settings = (() => {
  function init() {
    document.querySelectorAll('.snav-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.snav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });

    document.getElementById('settings-save')?.addEventListener('click', () => {
      Toast.show('Alterações salvas com sucesso!', 'success');
    });
    document.getElementById('settings-cancel')?.addEventListener('click', () => {
      Toast.show('Alterações canceladas.');
    });
  }
  return { init };
})();

// ── New Appointment Modal ─────────────────────────────────────────────────────

const Appointments = (() => {
  function init() {
    document.getElementById('btn-save-appt')?.addEventListener('click', () => {
      const client  = document.getElementById('appt-client').value.trim();
      const service = document.getElementById('appt-service').value;
      if (!client || !service) { Toast.show('Preencha cliente e serviço.', 'error'); return; }
      Modal.close('modal-appt');
      Toast.show(`Agendamento criado para ${client}!`, 'success');
    });
  }
  return { init };
})();

// ── Ganhos Actions ───────────────────────────────────────────────────────────

const GanhosPage = (() => {
  function init() {
    document.getElementById('btn-add-transacao')?.addEventListener('click', () => {
      Modal.open('modal-transacao');
    });
    document.getElementById('btn-save-transacao')?.addEventListener('click', () => {
      const cliente = document.getElementById('trans-cliente').value.trim();
      const valor   = document.getElementById('trans-valor').value;
      if (!cliente || !valor) { Toast.show('Preencha todos os campos.', 'error'); return; }
      Modal.close('modal-transacao');
      Toast.show('Transação registrada!', 'success');
    });
  }
  return { init };
})();

// ── Filter Tabs ──────────────────────────────────────────────────────────────

function initFilterTabs() {
  document.querySelectorAll('.filter-tabs').forEach(group => {
    group.querySelectorAll('.ftab').forEach(tab => {
      tab.addEventListener('click', () => {
        group.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  });
}

// ── FAB ─────────────────────────────────────────────────────────────────────

function initFAB() {
  document.getElementById('global-fab')?.addEventListener('click', () => {
    Modal.open('modal-appt');
  });
}

// ── Boot ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  Router.init();
  Modal.init();
  Services.init();
  Settings.init();
  CalendarView.init();
  Appointments.init();
  GanhosPage.init();
  initFilterTabs();
  initFAB();
});



