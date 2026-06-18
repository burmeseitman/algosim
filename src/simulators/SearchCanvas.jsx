import React, { useRef, useEffect, useCallback } from 'react';

const TILE_W = 60;
const TILE_H = 32;
const TILE_DEPTH = 16;
const COLORS = {
  default:   { top: '#1a2a3a', face: '#0f1a24', side: '#080e16', label: 'rgba(255,255,255,0.6)', glow: 'transparent' },
  current:   { top: '#8a6000', face: '#5a3e00', side: '#2a1e00', label: '#f0aa00', glow: 'rgba(240,170,0,0.7)' },
  eliminated:{ top: '#1a1a2e', face: '#0f0f1e', side: '#060610', label: 'rgba(255,255,255,0.2)', glow: 'transparent' },
  found:     { top: '#0f5a30', face: '#083d20', side: '#042010', label: '#34d399', glow: 'rgba(52,211,153,0.8)' },
  range:     { top: '#1a2a4a', face: '#0f1a30', side: '#080e18', label: 'rgba(56,189,248,0.9)', glow: 'rgba(56,189,248,0.3)' },
  mid:       { top: '#6a2800', face: '#4a1e00', side: '#2a1000', label: '#fb923c', glow: 'rgba(251,146,60,0.7)' },
};

function drawTile(ctx, cx, cy, colorSet, label, idx) {
  const dx = TILE_DEPTH * 0.7;
  const dy = TILE_DEPTH * 0.35;

  ctx.shadowColor = colorSet.glow;
  ctx.shadowBlur = colorSet.glow !== 'transparent' ? 18 : 0;

  // Top face
  const topGrad = ctx.createLinearGradient(cx, cy, cx + TILE_W, cy + TILE_H);
  topGrad.addColorStop(0, colorSet.top);
  topGrad.addColorStop(1, colorSet.face);
  ctx.fillStyle = topGrad;
  ctx.beginPath();
  ctx.moveTo(cx + TILE_W / 2, cy);
  ctx.lineTo(cx + TILE_W, cy + TILE_H / 2);
  ctx.lineTo(cx + TILE_W / 2, cy + TILE_H);
  ctx.lineTo(cx, cy + TILE_H / 2);
  ctx.closePath();
  ctx.fill();

  // Left face
  ctx.fillStyle = colorSet.face;
  ctx.beginPath();
  ctx.moveTo(cx, cy + TILE_H / 2);
  ctx.lineTo(cx + TILE_W / 2, cy + TILE_H);
  ctx.lineTo(cx + TILE_W / 2, cy + TILE_H + dy);
  ctx.lineTo(cx, cy + TILE_H / 2 + dy);
  ctx.closePath();
  ctx.fill();

  // Right face
  ctx.fillStyle = colorSet.side;
  ctx.beginPath();
  ctx.moveTo(cx + TILE_W / 2, cy + TILE_H);
  ctx.lineTo(cx + TILE_W, cy + TILE_H / 2);
  ctx.lineTo(cx + TILE_W, cy + TILE_H / 2 + dy);
  ctx.lineTo(cx + TILE_W / 2, cy + TILE_H + dy);
  ctx.closePath();
  ctx.fill();

  ctx.shadowBlur = 0;

  // Value label
  ctx.fillStyle = colorSet.label;
  ctx.font = 'bold 11px Inter, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, cx + TILE_W / 2, cy + TILE_H / 2 - 2);

  // Index below
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '9px monospace';
  ctx.fillText(idx, cx + TILE_W / 2, cy + TILE_H + dy + 10);
}

const SearchCanvas = ({ steps, stepIndex }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const step = steps[stepIndex];
    if (!step) return;

    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#05080e');
    bg.addColorStop(1, '#07090f');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Dot grid
    for (let x = 0; x < W; x += 40) {
      for (let y = 0; y < H; y += 40) {
        ctx.fillStyle = 'rgba(255,255,255,0.025)';
        ctx.fillRect(x, y, 1, 1);
      }
    }

    const arr = step.array || [];
    const n = arr.length;
    const spacing = TILE_W + 8;
    const totalW = n * spacing;
    const startX = (W - totalW) / 2;
    const centerY = H / 2 - TILE_H / 2;

    // "Found" beam effect
    if (step.found !== null && step.found >= 0) {
      const fx = startX + step.found * spacing;
      const fy = centerY;
      const beam = ctx.createRadialGradient(fx + TILE_W / 2, fy + TILE_H / 2, 0, fx + TILE_W / 2, fy + TILE_H / 2, 100);
      beam.addColorStop(0, 'rgba(52,211,153,0.25)');
      beam.addColorStop(1, 'transparent');
      ctx.fillStyle = beam;
      ctx.fillRect(fx - 80, fy - 80, 260, 260);
    }

    // Draw tiles
    arr.forEach((val, i) => {
      const tx = startX + i * spacing;
      const ty = centerY;

      let colorSet;
      if (step.found === i) colorSet = COLORS.found;
      else if (step.mid === i) colorSet = COLORS.mid;
      else if ((step.current || []).includes(i)) colorSet = COLORS.current;
      else if ((step.eliminated || []).includes(i)) colorSet = COLORS.eliminated;
      else if (i >= (step.low || 0) && i <= (step.high ?? arr.length - 1)) colorSet = COLORS.range;
      else colorSet = COLORS.default;

      drawTile(ctx, tx, ty, colorSet, val, i);
    });

    // Target label
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = 'bold 13px Inter';
    ctx.fillText(`Search Target: ${step.target}`, W / 2, centerY - 50);

    // Pointer arrow for current
    if ((step.current || []).length > 0 && step.found === null) {
      const ci = step.current[0];
      const ax = startX + ci * spacing + TILE_W / 2;
      const ay = centerY - 30;
      ctx.fillStyle = '#f0aa00';
      ctx.shadowColor = 'rgba(240,170,0,0.6)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(ax, ay + 14);
      ctx.lineTo(ax - 8, ay);
      ctx.lineTo(ax + 8, ay);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Legend
    const legend = [
      { label: 'In Range', color: '#38bdf8' },
      { label: 'Current', color: '#f0aa00' },
      { label: 'Mid / Pivot', color: '#fb923c' },
      { label: 'Found', color: '#34d399' },
      { label: 'Eliminated', color: '#1a1a2e' },
    ];
    ctx.textAlign = 'left';
    let lx = W / 2 - 200;
    const ly = centerY + TILE_H + 60;
    legend.forEach((item, i) => {
      ctx.fillStyle = item.color;
      ctx.fillRect(lx, ly, 10, 10);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px Inter';
      ctx.fillText(item.label, lx + 14, ly + 9);
      lx += 82;
    });

    animRef.current = requestAnimationFrame(draw);
  }, [steps, stepIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
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

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
};

export default SearchCanvas;
