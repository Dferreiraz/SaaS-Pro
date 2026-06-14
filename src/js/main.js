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

