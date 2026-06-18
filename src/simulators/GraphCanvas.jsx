import React, { useRef, useEffect, useCallback } from 'react';

const NODE_RADIUS = 22;
const ACCENT_BLUE = '#38bdf8';
const ACCENT_GREEN = '#34d399';
const ACCENT_PURPLE = '#a855f7';
const ACCENT_YELLOW = '#f0aa00';

function drawGrid(ctx, w, h) {
  for (let x = 0; x < w; x += 50) {
    for (let y = 0; y < h; y += 50) {
      ctx.fillStyle = 'rgba(255,255,255,0.025)';
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function drawEdge(ctx, x1, y1, x2, y2, active, inPath, directed) {
  const color = inPath ? ACCENT_GREEN : active ? ACCENT_BLUE : 'rgba(255,255,255,0.12)';
  ctx.strokeStyle = color;
  ctx.lineWidth = inPath ? 3 : active ? 2 : 1.5;
  if (active || inPath) {
    ctx.shadowColor = inPath ? ACCENT_GREEN : ACCENT_BLUE;
    ctx.shadowBlur = inPath ? 14 : 10;
  }
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Arrowhead for directed graphs
  if (directed) {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowX = x2 - Math.cos(angle) * (NODE_RADIUS + 4);
    const arrowY = y2 - Math.sin(angle) * (NODE_RADIUS + 4);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(arrowX - 10 * Math.cos(angle - 0.4), arrowY - 10 * Math.sin(angle - 0.4));
    ctx.lineTo(arrowX - 10 * Math.cos(angle + 0.4), arrowY - 10 * Math.sin(angle + 0.4));
    ctx.closePath();
    ctx.fill();
  }
}

function drawEdgeWeight(ctx, x1, y1, x2, y2, weight) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const offsetX = -Math.sin(angle) * 14;
  const offsetY = Math.cos(angle) * 14;
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = 'bold 10px Inter, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(weight, mx + offsetX, my + offsetY);
}

function drawNode(ctx, x, y, label, visited, current, inPath, time) {
  const R = NODE_RADIUS;

  // Outer glow ring
  if (current) {
    ctx.beginPath();
    ctx.arc(x, y, R + 10 + Math.sin(time * 0.05) * 4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(240,170,0,0.12)`;
    ctx.fill();
  }

  // Shadow / glow
  if (inPath) { ctx.shadowColor = ACCENT_GREEN; ctx.shadowBlur = 30; }
  else if (current) { ctx.shadowColor = ACCENT_YELLOW; ctx.shadowBlur = 20; }
  else if (visited) { ctx.shadowColor = ACCENT_BLUE; ctx.shadowBlur = 15; }
  else { ctx.shadowBlur = 0; }

  // Node body
  const nodeGrad = ctx.createRadialGradient(x - R * 0.3, y - R * 0.3, 0, x, y, R);
  if (inPath) {
    nodeGrad.addColorStop(0, '#1a7a50');
    nodeGrad.addColorStop(1, '#0a4a30');
  } else if (current) {
    nodeGrad.addColorStop(0, '#7c5a00');
    nodeGrad.addColorStop(1, '#3a2800');
  } else if (visited) {
    nodeGrad.addColorStop(0, '#1a3d5c');
    nodeGrad.addColorStop(1, '#0a1e30');
  } else {
    nodeGrad.addColorStop(0, '#1e2a3a');
    nodeGrad.addColorStop(1, '#0f1520');
  }
  ctx.fillStyle = nodeGrad;
  ctx.beginPath();
  ctx.arc(x, y, R, 0, Math.PI * 2);
  ctx.fill();

  // Ring
  ctx.strokeStyle = inPath ? ACCENT_GREEN : current ? ACCENT_YELLOW : visited ? ACCENT_BLUE : 'rgba(255,255,255,0.15)';
  ctx.lineWidth = inPath ? 2.5 : current ? 2.5 : 1.5;
  ctx.beginPath();
  ctx.arc(x, y, R, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Label
  ctx.fillStyle = inPath ? ACCENT_GREEN : current ? ACCENT_YELLOW : visited ? ACCENT_BLUE : 'rgba(255,255,255,0.7)';
  ctx.font = `bold 14px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x, y);
}

const GraphCanvas = ({ steps, stepIndex }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const step = steps[stepIndex];
    if (!step) return;

    timeRef.current += 1;
    const t = timeRef.current;

    ctx.clearRect(0, 0, W, H);

    // Background
    const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
    bg.addColorStop(0, '#080e1a');
    bg.addColorStop(1, '#04060d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    drawGrid(ctx, W, H);

    if (!step.nodes) return;

    // Map relative positions to canvas coords
    const pad = 60;
    const npos = step.nodes.map(n => ({
      ...n,
      px: pad + n.x * (W - pad * 2),
      py: pad + n.y * (H - pad * 2),
    }));

    const visited = step.visited || [];
    const current = step.current;
    const path = step.path || [];
    const activeEdges = step.activeEdges || [];

    // Draw edges first
    (step.edges || []).forEach(edge => {
      const a = npos[edge.from];
      const b = npos[edge.to];
      if (!a || !b) return;
      const isActive = activeEdges.some(e => e.from === edge.from && e.to === edge.to);
      const inPath = path.includes(edge.from) && path.includes(edge.to);
      drawEdge(ctx, a.px, a.py, b.px, b.py, isActive, inPath, false);
      if (edge.weight != null) drawEdgeWeight(ctx, a.px, a.py, b.px, b.py, edge.weight);
    });

    // Draw nodes
    npos.forEach(node => {
      drawNode(
        ctx, node.px, node.py, node.label,
        visited.includes(node.id),
        current === node.id,
        path.includes(node.id),
        t
      );
    });

    // Distance table (for Dijkstra)
    if (step.distances && Object.keys(step.distances).length > 0) {
      const entries = Object.entries(step.distances);
      const tableX = 16, tableY = 16;
      ctx.fillStyle = 'rgba(5,8,20,0.85)';
      ctx.fillRect(tableX, tableY, 130, 14 + entries.length * 18 + 10);
      ctx.strokeStyle = 'rgba(56,189,248,0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(tableX, tableY, 130, 14 + entries.length * 18 + 10);
      ctx.fillStyle = ACCENT_BLUE;
      ctx.font = 'bold 10px Inter';
      ctx.textAlign = 'left';
      ctx.fillText('DISTANCES', tableX + 8, tableY + 12);
      entries.forEach(([label, dist], i) => {
        const iy = tableY + 24 + i * 18;
        ctx.fillStyle = dist === 0 ? ACCENT_GREEN : dist === '∞' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.7)';
        ctx.font = '11px monospace';
        ctx.fillText(`${label}: ${dist}`, tableX + 8, iy + 10);
      });
    }

    // Queue / Stack display
    if (step.queue && step.queue.length > 0) {
      const qNodes = step.queue.map(id => step.nodes[id]?.label || id);
      ctx.fillStyle = 'rgba(5,8,20,0.85)';
      const qW = 120;
      ctx.fillRect(W - qW - 16, 16, qW, 44);
      ctx.strokeStyle = 'rgba(52,211,153,0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(W - qW - 16, 16, qW, 44);
      ctx.fillStyle = ACCENT_GREEN;
      ctx.font = 'bold 10px Inter';
      ctx.textAlign = 'left';
      ctx.fillText('QUEUE / STACK', W - qW - 8, 30);
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '11px monospace';
      ctx.fillText(`[${qNodes.join(', ')}]`, W - qW - 8, 48);
    }

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

export default GraphCanvas;
