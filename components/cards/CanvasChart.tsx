'use client';
import { useRef, useEffect } from 'react';

interface CanvasChartProps {
  data: { label: string; value: number; color: string }[];
  title?: string;
}

export function CanvasChart({ data, title = 'Task Progress' }: CanvasChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const padding = { top: 20, bottom: 40, left: 10, right: 10 };
    const barArea = H - padding.top - padding.bottom;
    const total = data.reduce((s, d) => s + d.value, 0);
    const maxVal = Math.max(...data.map(d => d.value), 1);

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (barArea / 4) * i;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.moveTo(padding.left, y);
      ctx.lineTo(W - padding.right, y);
      ctx.stroke();
    }

    if (data.length === 0) return;

    const barCount = data.length;
    const totalW = W - padding.left - padding.right;
    const barWidth = Math.floor((totalW / barCount) * 0.55);
    const gap = Math.floor((totalW / barCount) * 0.45);

    data.forEach((item, i) => {
      const x = padding.left + i * (barWidth + gap) + gap / 2;
      const barH = (item.value / maxVal) * barArea;
      const y = padding.top + barArea - barH;

      // Bar gradient
      const grad = ctx.createLinearGradient(x, y, x, y + barH);
      grad.addColorStop(0, item.color);
      grad.addColorStop(1, item.color + '44');
      ctx.fillStyle = grad;
      ctx.beginPath();
      const r = 4;
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + barWidth - r, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + r);
      ctx.lineTo(x + barWidth, y + barH);
      ctx.lineTo(x, y + barH);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();

      // Value label
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '11px DM Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(item.value), x + barWidth / 2, y - 5);

      // X label
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px DM Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, x + barWidth / 2, H - padding.bottom + 15);
    });
  }, [data]);

  return (
    <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <p className="text-white/40 text-xs uppercase tracking-wider mb-3">{title}</p>
      <canvas ref={canvasRef} className="w-full h-36" style={{ display: 'block' }} />
    </div>
  );
}
