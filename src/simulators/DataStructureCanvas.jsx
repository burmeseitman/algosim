import React, { useRef, useEffect, useCallback } from 'react';

const ACCENT_BLUE = '#38bdf8';
const ACCENT_GREEN = '#34d399';
const ACCENT_YELLOW = '#f0aa00';

function drawGrid(ctx, w, h) {
  for (let x = 0; x < w; x += 50) {
    for (let y = 0; y < h; y += 50) {
      ctx.fillStyle = 'rgba(255,255,255,0.02)';
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

// --------------- BINARY TREE ---------------
function getTreeLayout(values, W, H) {
  if (!values.length) return { positions: {}, edges: [] };
  const positions = {};
  const edges = [];
  // BST insert to find positions
  const tree = {};
  const insert = (node, val, depth = 0, minX = 0, maxX = W) => {
    if (!tree[node]) {
      tree[node] = { val, left: null, right: null, depth };
      positions[node] = { x: (minX + maxX) / 2, y: 70 + depth * 80 };
    } else {
      if (val < tree[node].val) {
        const childKey = node + 'L';
        edges.push({ from: node, to: childKey });
        insert(childKey, val, depth + 1, minX, (minX + maxX) / 2);
        tree[node].left = childKey;
      } else {
        const childKey = node + 'R';
        edges.push({ from: node, to: childKey });
        insert(childKey, val, depth + 1, (minX + maxX) / 2, maxX);
        tree[node].right = childKey;
      }
    }
  };
  values.forEach(v => insert('root', v));
  return { positions, tree, edges };
}

function drawTreeNode(ctx, x, y, val, highlighted, t) {
  const R = 22;
  const isHl = highlighted === val;
  if (isHl) {
    ctx.shadowColor = ACCENT_YELLOW;
    ctx.shadowBlur = 25 + Math.sin(t * 0.1) * 6;
  }
  const grad = ctx.createRadialGradient(x - 6, y - 6, 0, x, y, R);
  if (isHl) {
    grad.addColorStop(0, '#8a5e00');
    grad.addColorStop(1, '#3a2800');
  } else {
    grad.addColorStop(0, '#1a2e4a');
    grad.addColorStop(1, '#0a1826');
  }
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, R, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = isHl ? ACCENT_YELLOW : ACCENT_BLUE;
  ctx.lineWidth = isHl ? 2.5 : 1.5;
  ctx.beginPath();
  ctx.arc(x, y, R, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = isHl ? ACCENT_YELLOW : ACCENT_BLUE;
  ctx.font = 'bold 13px Inter, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(val, x, y);
}

function renderBinaryTree(ctx, step, W, H, t) {
  const values = step.nodes || [];
  if (!values.length) return;
  const { positions, tree, edges } = getTreeLayout(values, W, H);

  // Draw edges
  ctx.strokeStyle = 'rgba(56,189,248,0.2)';
  ctx.lineWidth = 1.5;
  edges.forEach(e => {
    const a = positions[e.from];
    const b = positions[e.to];
    if (a && b) {
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
  });

  // Draw nodes
  Object.entries(positions).forEach(([key, pos]) => {
    const val = tree[key]?.val;
    if (val != null) drawTreeNode(ctx, pos.x, pos.y, val, step.highlight, t);
  });

  // Title
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.font = 'bold 13px Inter';
  ctx.textAlign = 'left';
  ctx.fillText('BINARY SEARCH TREE', 20, 26);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '11px monospace';
  ctx.fillText(`Nodes: ${values.length}  |  Inserting: ${step.highlight ?? '—'}`, 20, 44);
}

// --------------- LINKED LIST ---------------
const LL_BOX_W = 72;
const LL_BOX_H = 44;
const LL_ARROW_W = 30;

function renderLinkedList(ctx, step, W, H, t) {
  const nodes = step.nodes || [];
  const n = nodes.length;
  if (!n) return;
  const totalW = n * (LL_BOX_W + LL_ARROW_W) - LL_ARROW_W;
  const startX = (W - totalW) / 2;
  const cy = H / 2 - LL_BOX_H / 2;

  // HEAD label
  ctx.fillStyle = 'rgba(56,189,248,0.5)';
  ctx.font = 'bold 11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('HEAD', startX + LL_BOX_W / 2, cy - 22);
  // Arrow from HEAD
  ctx.strokeStyle = 'rgba(56,189,248,0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(startX + LL_BOX_W / 2, cy - 14);
  ctx.lineTo(startX + LL_BOX_W / 2, cy);
  ctx.stroke();

  nodes.forEach((val, i) => {
    const bx = startX + i * (LL_BOX_W + LL_ARROW_W);
    const isHl = step.traverseIdx === i;
    const isActive = step.highlight === val;

    // Glow
    if (isHl || isActive) {
      ctx.shadowColor = isActive ? ACCENT_YELLOW : ACCENT_BLUE;
      ctx.shadowBlur = 20;
    }

    // Box
    const boxGrad = ctx.createLinearGradient(bx, cy, bx, cy + LL_BOX_H);
    boxGrad.addColorStop(0, isHl ? '#1a3d5c' : isActive ? '#5a3e00' : '#111d2c');
    boxGrad.addColorStop(1, isHl ? '#0a1e30' : isActive ? '#2a1e00' : '#070e18');
    ctx.fillStyle = boxGrad;
    ctx.beginPath();
    ctx.roundRect(bx, cy, LL_BOX_W, LL_BOX_H, 6);
    ctx.fill();

    ctx.strokeStyle = isHl ? ACCENT_BLUE : isActive ? ACCENT_YELLOW : 'rgba(255,255,255,0.1)';
    ctx.lineWidth = isHl ? 2 : 1.5;
    ctx.beginPath();
    ctx.roundRect(bx, cy, LL_BOX_W, LL_BOX_H, 6);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Value
    ctx.fillStyle = isHl ? ACCENT_BLUE : isActive ? ACCENT_YELLOW : 'rgba(255,255,255,0.75)';
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(val, bx + LL_BOX_W / 2, cy + LL_BOX_H / 2);

    // Pointer arrow
    if (i < n - 1) {
      const ax = bx + LL_BOX_W;
      const ay = cy + LL_BOX_H / 2;
      ctx.strokeStyle = isHl ? ACCENT_BLUE : 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ax, ay); ctx.lineTo(ax + LL_ARROW_W - 8, ay); ctx.stroke();
      ctx.fillStyle = isHl ? ACCENT_BLUE : 'rgba(255,255,255,0.2)';
      ctx.beginPath();
      ctx.moveTo(ax + LL_ARROW_W, ay);
      ctx.lineTo(ax + LL_ARROW_W - 8, ay - 5);
      ctx.lineTo(ax + LL_ARROW_W - 8, ay + 5);
      ctx.closePath();
      ctx.fill();
    } else {
      // NULL terminator
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('→ null', bx + LL_BOX_W + 4, cy + LL_BOX_H / 2 + 4);
    }
  });

  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.font = 'bold 13px Inter';
  ctx.textAlign = 'left';
  ctx.fillText('LINKED LIST', 20, 26);
}

// --------------- HASH TABLE ---------------
const BUCKET_W = 140;
const BUCKET_H = 36;

function renderHashTable(ctx, step, W, H) {
  const table = step.table || [];
  const n = table.length;
  const cols = 2;
  const rows = Math.ceil(n / cols);
  const totalH = rows * (BUCKET_H + 8);
  const startY = (H - totalH) / 2;
  const colW = BUCKET_W + 20;
  const startX = W / 2 - colW;
  const hl = step.highlight;

  table.forEach((val, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const bx = startX + col * (colW + 20);
    const by = startY + row * (BUCKET_H + 8);
    const isHl = hl && hl.idx === i;

    if (isHl) { ctx.shadowColor = ACCENT_GREEN; ctx.shadowBlur = 20; }

    // Bucket
    const bg = ctx.createLinearGradient(bx, by, bx, by + BUCKET_H);
    bg.addColorStop(0, isHl ? '#0f4a2e' : val ? '#1a2a3a' : '#0d1520');
    bg.addColorStop(1, isHl ? '#063020' : val ? '#0f1a26' : '#070c14');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.roundRect(bx, by, BUCKET_W, BUCKET_H, 4);
    ctx.fill();
    ctx.strokeStyle = isHl ? ACCENT_GREEN : val ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(bx, by, BUCKET_W, BUCKET_H, 4);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Bucket index
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`[${i}]`, bx + 8, by + BUCKET_H / 2);

    // Value
    ctx.fillStyle = isHl ? ACCENT_GREEN : val ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)';
    ctx.font = val ? '12px monospace' : '11px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(val || 'empty', bx + BUCKET_W - 10, by + BUCKET_H / 2);
  });

  // Hash arrow
  if (hl) {
    const col = hl.idx % cols;
    const row = Math.floor(hl.idx / cols);
    const bx = startX + col * (colW + 20);
    const by = startY + row * (BUCKET_H + 8);
    ctx.fillStyle = ACCENT_GREEN;
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`hash("${hl.key}") = ${hl.idx}`, W / 2, startY - 30);
    ctx.strokeStyle = ACCENT_GREEN;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(W / 2, startY - 16);
    ctx.lineTo(bx + BUCKET_W / 2, by);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.font = 'bold 13px Inter';
  ctx.textAlign = 'left';
  ctx.fillText('HASH TABLE', 20, 26);
}

// --------------- STACK RENDERER ---------------
const STACK_BOX_W = 140;
const STACK_BOX_H = 44;

function renderStack(ctx, step, W, H, t) {
  const { items, operation, operationValue } = step;
  const maxVisible = 8;
  const visItems = items.slice(-maxVisible);
  const totalH = Math.max(visItems.length, 1) * (STACK_BOX_H + 6);
  const startX = (W - STACK_BOX_W) / 2;
  const startY = H / 2 - totalH / 2;

  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.font = 'bold 13px Inter';
  ctx.textAlign = 'left';
  ctx.fillText('STACK — LIFO (Last In, First Out)', 20, 26);

  // Base plate
  ctx.fillStyle = 'rgba(56,189,248,0.1)';
  ctx.fillRect(startX - 10, startY + totalH, STACK_BOX_W + 20, 8);
  ctx.fillStyle = ACCENT_BLUE;
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BOTTOM', startX + STACK_BOX_W / 2, startY + totalH + 22);

  visItems.forEach((val, i) => {
    const by = startY + (visItems.length - 1 - i) * (STACK_BOX_H + 6);
    const isTop = i === visItems.length - 1;
    const isPeek = operation === 'peek' && isTop;
    const isPop = operation === 'pop' && isTop;
    const isPush = operation === 'push' && i === visItems.length - 1;

    if (isTop) { ctx.shadowColor = isPeek ? '#f0aa00' : isPop ? '#ef4444' : ACCENT_BLUE; ctx.shadowBlur = 20; }

    const grad = ctx.createLinearGradient(startX, by, startX, by + STACK_BOX_H);
    if (isPeek) { grad.addColorStop(0, '#5a3e00'); grad.addColorStop(1, '#2a1e00'); }
    else if (isPop) { grad.addColorStop(0, '#5a1010'); grad.addColorStop(1, '#2a0808'); }
    else if (isTop) { grad.addColorStop(0, '#1a3d5c'); grad.addColorStop(1, '#0a1e30'); }
    else { grad.addColorStop(0, '#111d2c'); grad.addColorStop(1, '#070e18'); }
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.roundRect(startX, by, STACK_BOX_W, STACK_BOX_H, 6); ctx.fill();
    ctx.strokeStyle = isPeek ? ACCENT_YELLOW : isPop ? '#ef4444' : isTop ? ACCENT_BLUE : 'rgba(255,255,255,0.1)';
    ctx.lineWidth = isTop ? 2 : 1;
    ctx.beginPath(); ctx.roundRect(startX, by, STACK_BOX_W, STACK_BOX_H, 6); ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = isPeek ? ACCENT_YELLOW : isPop ? '#ef4444' : isTop ? ACCENT_BLUE : 'rgba(255,255,255,0.7)';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(val, startX + STACK_BOX_W / 2, by + STACK_BOX_H / 2);

    if (isTop) {
      ctx.fillStyle = isPeek ? ACCENT_YELLOW : ACCENT_BLUE;
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('← TOP', startX + STACK_BOX_W + 8, by + STACK_BOX_H / 2 + 3);
    }
  });

  // Incoming push item
  if (operation === 'push' && operationValue !== null) {
    const topY = startY - STACK_BOX_H - 20;
    ctx.shadowColor = ACCENT_GREEN; ctx.shadowBlur = 20;
    ctx.fillStyle = 'rgba(15,75,45,0.7)';
    ctx.beginPath(); ctx.roundRect(startX, topY, STACK_BOX_W, STACK_BOX_H, 6); ctx.fill();
    ctx.strokeStyle = ACCENT_GREEN; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(startX, topY, STACK_BOX_W, STACK_BOX_H, 6); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = ACCENT_GREEN; ctx.font = 'bold 18px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(operationValue, startX + STACK_BOX_W / 2, topY + STACK_BOX_H / 2);
    ctx.fillStyle = ACCENT_GREEN; ctx.font = 'bold 9px monospace';
    ctx.fillText('← PUSH', startX + STACK_BOX_W + 8, topY + STACK_BOX_H / 2 + 3);
    // Arrow down
    ctx.strokeStyle = ACCENT_GREEN; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(startX + STACK_BOX_W / 2, topY + STACK_BOX_H); ctx.lineTo(startX + STACK_BOX_W / 2, topY + STACK_BOX_H + 18); ctx.stroke();
    ctx.fillStyle = ACCENT_GREEN; ctx.beginPath();
    ctx.moveTo(startX + STACK_BOX_W / 2, topY + STACK_BOX_H + 18);
    ctx.lineTo(startX + STACK_BOX_W / 2 - 6, topY + STACK_BOX_H + 8);
    ctx.lineTo(startX + STACK_BOX_W / 2 + 6, topY + STACK_BOX_H + 8);
    ctx.closePath(); ctx.fill();
  }
}

// --------------- QUEUE RENDERER ---------------
const Q_BOX_W = 70;
const Q_BOX_H = 52;

function renderQueue(ctx, step, W, H) {
  const { items, operation, operationValue } = step;
  const maxVisible = 7;
  const visItems = items.slice(0, maxVisible);
  const totalW = visItems.length * (Q_BOX_W + 6);
  const startX = (W - totalW) / 2;
  const startY = H / 2 - Q_BOX_H / 2;

  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.font = 'bold 13px Inter';
  ctx.textAlign = 'left';
  ctx.fillText('QUEUE — FIFO (First In, First Out)', 20, 26);

  // Front/rear labels
  if (visItems.length > 0) {
    ctx.fillStyle = ACCENT_GREEN; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center';
    ctx.fillText('FRONT', startX + Q_BOX_W / 2, startY - 16);
    ctx.fillStyle = ACCENT_BLUE;
    ctx.fillText('REAR', startX + visItems.length * (Q_BOX_W + 6) - Q_BOX_W / 2, startY - 16);
  }

  visItems.forEach((val, i) => {
    const bx = startX + i * (Q_BOX_W + 6);
    const isFront = i === 0;
    const isRear = i === visItems.length - 1;
    const isDQ = operation === 'dequeue' && isFront;

    if (isFront || isRear) { ctx.shadowColor = isDQ ? '#ef4444' : isFront ? ACCENT_GREEN : ACCENT_BLUE; ctx.shadowBlur = 18; }

    const grad = ctx.createLinearGradient(bx, startY, bx, startY + Q_BOX_H);
    if (isDQ) { grad.addColorStop(0, '#5a1010'); grad.addColorStop(1, '#2a0808'); }
    else if (isFront) { grad.addColorStop(0, '#0f4a2e'); grad.addColorStop(1, '#063020'); }
    else if (isRear) { grad.addColorStop(0, '#1a3d5c'); grad.addColorStop(1, '#0a1e30'); }
    else { grad.addColorStop(0, '#111d2c'); grad.addColorStop(1, '#070e18'); }
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.roundRect(bx, startY, Q_BOX_W, Q_BOX_H, 6); ctx.fill();
    ctx.strokeStyle = isDQ ? '#ef4444' : isFront ? ACCENT_GREEN : isRear ? ACCENT_BLUE : 'rgba(255,255,255,0.1)';
    ctx.lineWidth = (isFront || isRear) ? 2 : 1;
    ctx.beginPath(); ctx.roundRect(bx, startY, Q_BOX_W, Q_BOX_H, 6); ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = isDQ ? '#ef4444' : isFront ? ACCENT_GREEN : isRear ? ACCENT_BLUE : 'rgba(255,255,255,0.7)';
    ctx.font = 'bold 16px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(val, bx + Q_BOX_W / 2, startY + Q_BOX_H / 2);

    // Connector arrow
    if (i < visItems.length - 1) {
      const ax = bx + Q_BOX_W + 3;
      ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(ax, startY + Q_BOX_H / 2); ctx.lineTo(ax + 3, startY + Q_BOX_H / 2); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath(); ctx.moveTo(ax + 6, startY + Q_BOX_H / 2); ctx.lineTo(ax, startY + Q_BOX_H / 2 - 4); ctx.lineTo(ax, startY + Q_BOX_H / 2 + 4); ctx.closePath(); ctx.fill();
    }
  });

  // Incoming enqueue
  if (operation === 'enqueue' && operationValue !== null && visItems.length > 0) {
    const bx = startX + visItems.length * (Q_BOX_W + 6);
    ctx.shadowColor = ACCENT_BLUE; ctx.shadowBlur = 18;
    ctx.fillStyle = 'rgba(10,30,60,0.7)';
    ctx.beginPath(); ctx.roundRect(bx, startY, Q_BOX_W, Q_BOX_H, 6); ctx.fill();
    ctx.strokeStyle = ACCENT_BLUE; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(bx, startY, Q_BOX_W, Q_BOX_H, 6); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = ACCENT_BLUE; ctx.font = 'bold 16px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(operationValue, bx + Q_BOX_W / 2, startY + Q_BOX_H / 2);
    ctx.fillStyle = ACCENT_BLUE; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('ENQUEUE →', bx + Q_BOX_W / 2, startY - 16);
  }
}

// --------------- MAIN COMPONENT ---------------
const DataStructureCanvas = ({ steps, stepIndex }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const tRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const step = steps[stepIndex];
    if (!step) return;
    tRef.current += 1;

    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#05080e');
    bg.addColorStop(1, '#07090f');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    drawGrid(ctx, W, H);

    if (step.type === 'tree') renderBinaryTree(ctx, step, W, H, tRef.current);
    else if (step.type === 'linkedlist') renderLinkedList(ctx, step, W, H, tRef.current);
    else if (step.type === 'hashtable') renderHashTable(ctx, step, W, H);
    else if (step.type === 'stack') renderStack(ctx, step, W, H, tRef.current);
    else if (step.type === 'queue') renderQueue(ctx, step, W, H);

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

export default DataStructureCanvas;
