import { useEffect, useRef } from 'react';
import './ChartCard.css';

export default function ChartCard() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width = canvas.parentElement.offsetWidth;
    const H = canvas.height = 200;
    const pad = { t: 10, r: 20, b: 32, l: 56 };
    const iW = W - pad.l - pad.r;
    const iH = H - pad.t - pad.b;

    const monthData = [42800, 38500, 41200, 55600, 51000, 48900];
    const profitData = [18200, 15400, 19800, 27000, 23500, 22100];
    const monthLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    const max = Math.max(...monthData) * 1.15;

    const x = (i) => pad.l + (i / (monthData.length - 1)) * iW;
    const y = (v) => pad.t + iH - (v / max) * iH;

    ctx.clearRect(0, 0, W, H);

    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    [0, .25, .5, .75, 1].forEach(t => {
      const yy = pad.t + iH * (1 - t);
      ctx.beginPath();
      ctx.moveTo(pad.l, yy);
      ctx.lineTo(pad.l + iW, yy);
      ctx.stroke();
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '11px Inter';
      ctx.textAlign = 'right';
      ctx.fillText(((max * t) / 1000).toFixed(0) + 'k', pad.l - 8, yy + 4);
    });

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

    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    profitData.forEach((v, i) => {
      if (i === 0) ctx.moveTo(x(i), y(v));
      else ctx.lineTo(x(i), y(v));
    });
    ctx.stroke();

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

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '11px Inter';
    ctx.textAlign = 'center';
    monthLabels.forEach((l, i) => ctx.fillText(l, x(i), H - 8));
  }, []);

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <div>
          <div className="chart-title">Desempenho Mensal</div>
          <div className="chart-sub">Comparativo de lucros e volume de serviços</div>
        </div>
        <span className="chart-year-badge">2024</span>
      </div>
      <div className="chart-wrapper">
        <canvas ref={canvasRef} id="chart-desempenho"></canvas>
      </div>
    </div>
  );
}
