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

