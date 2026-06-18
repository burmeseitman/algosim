import React, { useRef, useEffect, useCallback } from 'react';

const COLORS = {
  default: { face: '#1e4976', top: '#2a6aad', side: '#122e4a', glow: 'rgba(56,189,248,0.0)' },
  comparing: { face: '#7c5a00', top: '#f0aa00', side: '#4a3600', glow: 'rgba(240,170,0,0.7)' },
  swapping: { face: '#7c1e1e', top: '#ef4444', side: '#4a1010', glow: 'rgba(239,68,68,0.7)' },
  sorted: { face: '#0f4a2e', top: '#10b981', side: '#063020', glow: 'rgba(52,211,153,0.6)' },
  pivot: { face: '#5a1a7a', top: '#a855f7', side: '#380f50', glow: 'rgba(168,85,247,0.7)' },
};

function lerp(a, b, t) { return a + (b - a) * t; }

function drawBar(ctx, cx, baseY, w, h, depth, colorSet, value, maxH) {
  const dx = depth * 0.7;
  const dy = depth * 0.4;

  // Drop shadow
  ctx.shadowColor = colorSet.glow;
  ctx.shadowBlur = 24;

  // Front face gradient
  const grad = ctx.createLinearGradient(cx, baseY - h, cx, baseY);
  grad.addColorStop(0, colorSet.top);
  grad.addColorStop(0.4, colorSet.face);
  grad.addColorStop(1, colorSet.side);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(cx, baseY - h, w, h, [3, 3, 0, 0]);
  ctx.fill();

  // Top face
  ctx.fillStyle = colorSet.top;
  ctx.beginPath();
  ctx.moveTo(cx, baseY - h);
  ctx.lineTo(cx + w, baseY - h);
  ctx.lineTo(cx + w + dx, baseY - h - dy);
  ctx.lineTo(cx + dx, baseY - h - dy);
  ctx.closePath();
  ctx.fill();

  // Right side face
  const sideGrad = ctx.createLinearGradient(cx + w, 0, cx + w + dx, 0);
  sideGrad.addColorStop(0, colorSet.face);
  sideGrad.addColorStop(1, colorSet.side);
  ctx.fillStyle = sideGrad;
  ctx.beginPath();
  ctx.moveTo(cx + w, baseY - h);
  ctx.lineTo(cx + w + dx, baseY - h - dy);
  ctx.lineTo(cx + w + dx, baseY - dy);
  ctx.lineTo(cx + w, baseY);
  ctx.closePath();
  ctx.fill();

  // Reset shadow
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // Value label
  ctx.fillStyle = colorSet.top;
  ctx.font = `bold 11px Inter, monospace`;
  ctx.textAlign = 'center';
  ctx.fillText(value, cx + w / 2, baseY - h - dy - 8);
}

function drawGrid(ctx, w, h) {
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  const spacing = 40;
  for (let x = 0; x < w; x += spacing) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += spacing) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
}

const SortingCanvas = ({ steps, stepIndex }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const renderStateRef = useRef({ displayHeights: null, targetHeights: null });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const step = steps[stepIndex];
    if (!step) return;

    const arr = step.array;
    const n = arr.length;
    const maxVal = Math.max(...arr);
    const padX = 60, padY = 60;
    const availW = W - padX * 2;
    const availH = H - padY * 2 - 40;
    const barW = Math.floor((availW / n) * 0.6);
    const barSpacing = Math.floor(availW / n);
    const depth = 18;
    const baseY = H - padY;

    // Init display heights on first render or when array length changes
    const rs = renderStateRef.current;
    if (!rs.displayHeights || rs.displayHeights.length !== n) {
      rs.displayHeights = arr.map(v => (v / maxVal) * availH);
      rs.targetHeights = [...rs.displayHeights];
    }

    // Update targets
    rs.targetHeights = arr.map(v => (v / maxVal) * availH);

    // Smoothly interpolate
    rs.displayHeights = rs.displayHeights.map((h, i) => lerp(h, rs.targetHeights[i], 0.18));

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#05080e');
    bg.addColorStop(1, '#080d18');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Grid
    drawGrid(ctx, W, H);

    // Ground line
    ctx.strokeStyle = 'rgba(56,189,248,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(padX - 20, baseY); ctx.lineTo(W - padX + 40, baseY); ctx.stroke();

    // Glow under the baseline
    const grd = ctx.createLinearGradient(0, baseY, 0, baseY + 20);
    grd.addColorStop(0, 'rgba(56,189,248,0.15)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(padX - 20, baseY, W - padX * 2 + 60, 20);

    // Draw bars
    for (let i = 0; i < n; i++) {
      const cx = padX + i * barSpacing + (barSpacing - barW) / 2;
      const h = Math.max(rs.displayHeights[i], 4);

      let colorSet;
      if ((step.sorted || []).includes(i)) colorSet = COLORS.sorted;
      else if (step.pivot === i) colorSet = COLORS.pivot;
      else if ((step.swapping || []).includes(i)) colorSet = COLORS.swapping;
      else if ((step.comparing || []).includes(i)) colorSet = COLORS.comparing;
      else colorSet = COLORS.default;

      drawBar(ctx, cx, baseY, barW, h, depth, colorSet, arr[i], maxVal);
    }

    // Title overlay
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('ARRAY STATE', padX, 28);

    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '11px monospace';
    ctx.fillText(`[${arr.join(', ')}]`, padX, 48);

    // Legend
    const legend = [
      { label: 'Default', color: COLORS.default.top },
      { label: 'Comparing', color: COLORS.comparing.top },
      { label: 'Swapping', color: COLORS.swapping.top },
      { label: 'Sorted', color: COLORS.sorted.top },
      { label: 'Pivot', color: COLORS.pivot.top },
    ];
    let lx = W - 20;
    ctx.textAlign = 'right';
    legend.reverse().forEach(item => {
      ctx.fillStyle = item.color;
      ctx.fillRect(lx - 36, 18, 12, 12);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px Inter';
      ctx.fillText(item.label, lx - 44, 28);
      lx -= (ctx.measureText(item.label).width + 56);
    });

    animRef.current = requestAnimationFrame(draw);
  }, [steps, stepIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default SortingCanvas;
