import React, { useRef, useEffect, useCallback } from 'react';

const ACCENT_BLUE   = '#38bdf8';
const ACCENT_GREEN  = '#34d399';
const ACCENT_YELLOW = '#f0aa00';
const ACCENT_PURPLE = '#a855f7';

function drawGrid(ctx, w, h) {
  for (let x = 0; x < w; x += 50) { for (let y = 0; y < h; y += 50) { ctx.fillStyle = 'rgba(255,255,255,0.02)'; ctx.fillRect(x, y, 1, 1); } }
}

// ─── FIBONACCI 1D BAR ─────────────────────────────────────────────────────────
function renderFibonacci(ctx, step, W, H) {
  const { table, highlight, using } = step;
  const n = table.length;
  const CELL_W = Math.min(64, (W - 80) / n);
  const CELL_H = 56;
  const startX = (W - n * CELL_W) / 2;
  const startY = H / 2 - CELL_H / 2 - 30;

  // Title
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.font = 'bold 13px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('FIBONACCI MEMOIZATION TABLE', 20, 24);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '11px monospace';
  ctx.fillText(`F(n) = F(n-1) + F(n-2)   |   dp[${step.n}] = ?`, 20, 42);

  // Draw cells
  for (let i = 0; i < n; i++) {
    const cx = startX + i * CELL_W;
    const val = table[i];
    const isHighlight = highlight === i;
    const isUsing = (using || []).includes(i);

    // Glow
    if (isHighlight) { ctx.shadowColor = ACCENT_YELLOW; ctx.shadowBlur = 20; }
    else if (isUsing) { ctx.shadowColor = ACCENT_BLUE; ctx.shadowBlur = 16; }
    else { ctx.shadowBlur = 0; }

    // Cell body
    const grad = ctx.createLinearGradient(cx, startY, cx, startY + CELL_H);
    if (isHighlight) { grad.addColorStop(0, '#5a3e00'); grad.addColorStop(1, '#2a1e00'); }
    else if (isUsing) { grad.addColorStop(0, '#1a3d5c'); grad.addColorStop(1, '#0a1e30'); }
    else if (val !== null && val !== Infinity) { grad.addColorStop(0, '#0f2a1e'); grad.addColorStop(1, '#070f10'); }
    else { grad.addColorStop(0, '#0e121c'); grad.addColorStop(1, '#080b14'); }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(cx + 2, startY, CELL_W - 4, CELL_H, 4);
    ctx.fill();

    ctx.strokeStyle = isHighlight ? ACCENT_YELLOW : isUsing ? ACCENT_BLUE : val !== null && val !== Infinity ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.06)';
    ctx.lineWidth = isHighlight || isUsing ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(cx + 2, startY, CELL_W - 4, CELL_H, 4);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Value
    ctx.fillStyle = isHighlight ? ACCENT_YELLOW : isUsing ? ACCENT_BLUE : val !== null && val !== Infinity ? ACCENT_GREEN : 'rgba(255,255,255,0.15)';
    ctx.font = `bold ${CELL_W < 44 ? 10 : 13}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(val !== null && val !== Infinity ? val : '?', cx + CELL_W / 2, startY + CELL_H / 2);

    // Index label below
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = '9px monospace';
    ctx.fillText(`F(${i})`, cx + CELL_W / 2, startY + CELL_H + 14);
  }

  // Arrow connecting "using" cells to highlight
  if ((using || []).length > 0 && highlight !== null) {
    const hx = startX + highlight * CELL_W + CELL_W / 2;
    const hy = startY;
    using.forEach(u => {
      const ux = startX + u * CELL_W + CELL_W / 2;
      ctx.strokeStyle = ACCENT_BLUE;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(ux, hy + CELL_H);
      ctx.bezierCurveTo(ux, hy + CELL_H + 30, hx, hy + CELL_H + 30, hx, hy);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  // Legend
  const legend = [{ label: 'Current', color: ACCENT_YELLOW }, { label: 'Used in formula', color: ACCENT_BLUE }, { label: 'Computed', color: ACCENT_GREEN }];
  let lx = W / 2 - 140;
  legend.forEach(item => {
    ctx.fillStyle = item.color;
    ctx.fillRect(lx, H - 40, 8, 8);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '10px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(item.label, lx + 12, H - 33);
    lx += 100;
  });
}

// ─── KNAPSACK 2D TABLE ─────────────────────────────────────────────────────────
function renderKnapsack(ctx, step, W, H) {
  const { table, highlight, items = [], W: cap = 5 } = step;
  const rows = table.length;
  const cols = table[0]?.length || 0;
  const CELL_W = Math.min(60, (W - 120) / cols);
  const CELL_H = Math.min(44, (H - 120) / rows);
  const startX = (W - cols * CELL_W) / 2;
  const startY = 80;

  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.font = 'bold 13px Inter';
  ctx.textAlign = 'left';
  ctx.fillText('0/1 KNAPSACK DP TABLE', 20, 24);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '11px monospace';
  ctx.fillText(`Rows = items (0..${rows-1})  |  Cols = capacity (0..${cap})`, 20, 42);

  // Column headers (capacity)
  for (let j = 0; j < cols; j++) {
    ctx.fillStyle = 'rgba(56,189,248,0.5)';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${j}`, startX + j * CELL_W + CELL_W / 2, startY - 6);
  }

  // Row headers (items)
  for (let i = 0; i < rows; i++) {
    ctx.fillStyle = 'rgba(52,211,153,0.5)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(i === 0 ? '∅' : (items[i-1]?.name || `i${i}`).slice(0, 6), startX - 6, startY + i * CELL_H + CELL_H / 2 + 3);
  }

  // Table cells
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cx = startX + j * CELL_W;
      const cy = startY + i * CELL_H;
      const isHL = highlight && highlight.row === i && highlight.col === j;
      const val = table[i]?.[j] ?? 0;

      if (isHL) { ctx.shadowColor = ACCENT_YELLOW; ctx.shadowBlur = 16; }
      else { ctx.shadowBlur = 0; }

      const grad = ctx.createLinearGradient(cx, cy, cx, cy + CELL_H);
      if (isHL) { grad.addColorStop(0, '#5a3e00'); grad.addColorStop(1, '#2a1e00'); }
      else if (val > 0) { grad.addColorStop(0, '#0f2a1e'); grad.addColorStop(1, '#070f10'); }
      else { grad.addColorStop(0, '#0d1220'); grad.addColorStop(1, '#080910'); }

      ctx.fillStyle = grad;
      ctx.fillRect(cx + 1, cy + 1, CELL_W - 2, CELL_H - 2);
      ctx.strokeStyle = isHL ? ACCENT_YELLOW : 'rgba(255,255,255,0.07)';
      ctx.lineWidth = isHL ? 2 : 1;
      ctx.strokeRect(cx + 1, cy + 1, CELL_W - 2, CELL_H - 2);
      ctx.shadowBlur = 0;

      ctx.fillStyle = isHL ? ACCENT_YELLOW : val > 0 ? ACCENT_GREEN : 'rgba(255,255,255,0.2)';
      ctx.font = `bold ${CELL_W < 40 ? 9 : 12}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(val, cx + CELL_W / 2, cy + CELL_H / 2);
    }
  }
}

// ─── COIN CHANGE 1D TABLE ─────────────────────────────────────────────────────
function renderCoinChange(ctx, step, W, H) {
  const { table, highlight, coins = [], amount = 6 } = step;
  const n = table.length;
  const CELL_W = Math.min(70, (W - 100) / n);
  const CELL_H = 56;
  const startX = (W - n * CELL_W) / 2;
  const startY = H / 2 - CELL_H / 2 - 30;

  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.font = 'bold 13px Inter';
  ctx.textAlign = 'left';
  ctx.fillText('COIN CHANGE DP TABLE', 20, 24);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '11px monospace';
  ctx.fillText(`Coins: [${coins.join(', ')}]   |   Target: ${amount}   |   dp[i] = min coins for amount i`, 20, 42);

  for (let i = 0; i < n; i++) {
    const cx = startX + i * CELL_W;
    const val = table[i];
    const isHL = highlight === i;
    const inf = val === Infinity || val === null;

    if (isHL) { ctx.shadowColor = ACCENT_PURPLE; ctx.shadowBlur = 18; }
    else { ctx.shadowBlur = 0; }

    const grad = ctx.createLinearGradient(cx, startY, cx, startY + CELL_H);
    if (isHL) { grad.addColorStop(0, '#4a1a5a'); grad.addColorStop(1, '#200d2a'); }
    else if (!inf) { grad.addColorStop(0, '#0f2a1e'); grad.addColorStop(1, '#070f10'); }
    else { grad.addColorStop(0, '#0d1220'); grad.addColorStop(1, '#080910'); }

    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.roundRect(cx + 2, startY, CELL_W - 4, CELL_H, 4); ctx.fill();
    ctx.strokeStyle = isHL ? ACCENT_PURPLE : !inf ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.06)';
    ctx.lineWidth = isHL ? 2 : 1;
    ctx.beginPath(); ctx.roundRect(cx + 2, startY, CELL_W - 4, CELL_H, 4); ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = isHL ? ACCENT_PURPLE : !inf ? ACCENT_GREEN : 'rgba(255,255,255,0.15)';
    ctx.font = `bold 13px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(inf ? '∞' : val, cx + CELL_W / 2, startY + CELL_H / 2);

    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '9px monospace';
    ctx.fillText(`amt=${i}`, cx + CELL_W / 2, startY + CELL_H + 14);
  }
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const DPCanvas = ({ steps, stepIndex }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const step = steps[stepIndex];
    if (!step) return;

    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#05080e'); bg.addColorStop(1, '#07090f');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    drawGrid(ctx, W, H);

    if (step.subtype === 'fibonacci') renderFibonacci(ctx, step, W, H);
    else if (step.subtype === 'knapsack') renderKnapsack(ctx, step, W, H);
    else if (step.subtype === 'coinchange') renderCoinChange(ctx, step, W, H);

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

export default DPCanvas;
