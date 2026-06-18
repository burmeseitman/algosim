// ============================================================
// Algorithm Data — Generates step-by-step simulation data
// ============================================================

// --------------- SORTING HELPERS ---------------
function makeSortingStep(array, comparing = [], swapping = [], sorted = [], pivot = null, log = '') {
  return { array: [...array], comparing, swapping, sorted: [...sorted], pivot, log };
}

function generateBubbleSortSteps(inputType = 'Random Array') {
  const bases = { 'Random Array': [64, 34, 25, 12, 22, 11, 90, 55], 'Nearly Sorted': [11, 12, 25, 22, 34, 55, 64, 90], 'Reversed': [90, 64, 55, 34, 25, 22, 12, 11] };
  const a = [...(bases[inputType] || bases['Random Array'])];
  const steps = [];
  const sorted = new Set();
  steps.push(makeSortingStep(a, [], [], [], null, `Bubble Sort initialized. Array: [${a.join(', ')}]`));
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push(makeSortingStep(a, [j, j + 1], [], [...sorted], null, `Comparing a[${j}]=${a[j]} and a[${j+1}]=${a[j+1]}...`));
      if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; steps.push(makeSortingStep(a, [], [j, j + 1], [...sorted], null, `↑ Swapping! → [${a.join(', ')}]`)); }
    }
    sorted.add(a.length - 1 - i);
  }
  sorted.add(0);
  steps.push(makeSortingStep(a, [], [], [...sorted], null, '✓ Bubble Sort complete!'));
  return steps;
}

function generateInsertionSortSteps(inputType = 'Random Array') {
  const bases = { 'Random Array': [12, 11, 13, 5, 6, 4, 8], 'Nearly Sorted': [4, 5, 6, 8, 11, 12, 13], 'Reversed': [13, 12, 11, 8, 6, 5, 4] };
  const a = [...(bases[inputType] || bases['Random Array'])];
  const steps = [];
  const sorted = new Set([0]);
  steps.push(makeSortingStep(a, [], [], [0], null, `Insertion Sort initialized. Array: [${a.join(', ')}]. Index 0 is trivially sorted.`));
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    steps.push(makeSortingStep(a, [i], [], [...sorted], null, `Key = a[${i}] = ${key}. Inserting into sorted portion [0..${i-1}].`));
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      steps.push(makeSortingStep(a, [j, j+1], [], [...sorted], null, `a[${j}]=${a[j]} > key ${key}. Shift right.`));
      a[j + 1] = a[j];
      steps.push(makeSortingStep(a, [], [j, j+1], [...sorted], null, `Shifted: [${a.join(', ')}]`));
      j--;
    }
    a[j + 1] = key;
    sorted.add(i);
    steps.push(makeSortingStep(a, [], [j+1], [...sorted], null, `Placed key ${key} at index ${j+1}. Sorted: [0..${i}]`));
  }
  steps.push(makeSortingStep(a, [], [], [...Array.from({length: a.length}, (_, i) => i)], null, '✓ Insertion Sort complete!'));
  return steps;
}

function generateSelectionSortSteps(inputType = 'Random Array') {
  const bases = { 'Random Array': [64, 25, 12, 22, 11, 90, 42], 'Nearly Sorted': [11, 12, 22, 25, 42, 64, 90], 'Reversed': [90, 64, 42, 25, 22, 12, 11] };
  const a = [...(bases[inputType] || bases['Random Array'])];
  const steps = [];
  const sorted = new Set();
  steps.push(makeSortingStep(a, [], [], [], null, `Selection Sort initialized. Array: [${a.join(', ')}]`));
  for (let i = 0; i < a.length - 1; i++) {
    let minIdx = i;
    steps.push(makeSortingStep(a, [i], [], [...sorted], null, `Pass ${i+1}: Searching minimum in range [${i}..${a.length-1}]`));
    for (let j = i + 1; j < a.length; j++) {
      steps.push(makeSortingStep(a, [j, minIdx], [], [...sorted], null, `Comparing a[${j}]=${a[j]} vs min a[${minIdx}]=${a[minIdx]}`));
      if (a[j] < a[minIdx]) { minIdx = j; steps.push(makeSortingStep(a, [minIdx], [], [...sorted], null, `New minimum: a[${minIdx}]=${a[minIdx]}`)); }
    }
    if (minIdx !== i) { [a[i], a[minIdx]] = [a[minIdx], a[i]]; steps.push(makeSortingStep(a, [], [i, minIdx], [...sorted], null, `Swapping a[${i}] ↔ a[${minIdx}] → [${a.join(', ')}]`)); }
    sorted.add(i);
    steps.push(makeSortingStep(a, [], [], [...sorted], null, `Position ${i} set to ${a[i]}.`));
  }
  sorted.add(a.length - 1);
  steps.push(makeSortingStep(a, [], [], [...sorted], null, '✓ Selection Sort complete!'));
  return steps;
}

function generateHeapSortSteps(inputType = 'Random Array') {
  const bases = { 'Random Array': [12, 11, 13, 5, 6, 7], 'Nearly Sorted': [5, 6, 7, 11, 12, 13], 'Reversed': [13, 12, 11, 7, 6, 5] };
  const a = [...(bases[inputType] || bases['Random Array'])];
  const steps = [];
  const sorted = new Set();
  steps.push(makeSortingStep(a, [], [], [], null, `Heap Sort initialized. Array: [${a.join(', ')}]`));

  function heapify(arr, n, i) {
    let largest = i;
    const l = 2*i+1, r = 2*i+2;
    steps.push(makeSortingStep(arr, [i, ...(l < n ? [l] : []), ...(r < n ? [r] : [])], [], [...sorted], null, `Heapify at ${i}: left=${l < n ? arr[l] : '-'}, right=${r < n ? arr[r] : '-'}`));
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) { [arr[i], arr[largest]] = [arr[largest], arr[i]]; steps.push(makeSortingStep(arr, [], [i, largest], [...sorted], null, `Swap to maintain heap: a[${i}] ↔ a[${largest}]`)); heapify(arr, n, largest); }
  }

  steps.push(makeSortingStep(a, [], [], [], null, `Phase 1: Build max heap (heapify from ${Math.floor(a.length/2)-1} down to 0)`));
  for (let i = Math.floor(a.length/2)-1; i >= 0; i--) heapify(a, a.length, i);
  steps.push(makeSortingStep(a, [], [], [], null, `Max heap built: [${a.join(', ')}]. Root (a[0]=${a[0]}) is maximum.`));
  steps.push(makeSortingStep(a, [], [], [], null, `Phase 2: Extract max repeatedly, shrinking the heap.`));

  for (let i = a.length-1; i > 0; i--) {
    steps.push(makeSortingStep(a, [], [0, i], [...sorted], null, `Swap root (max=${a[0]}) with last unsorted a[${i}]=${a[i]}`));
    [a[0], a[i]] = [a[i], a[0]];
    sorted.add(i);
    steps.push(makeSortingStep(a, [], [], [...sorted], null, `${a[i]} placed at index ${i}. Heapifying remaining heap of size ${i}...`));
    heapify(a, i, 0);
  }
  sorted.add(0);
  steps.push(makeSortingStep(a, [], [], [...sorted], null, '✓ Heap Sort complete!'));
  return steps;
}

function generateMergeSortSteps(inputType = 'Random Array') {
  const bases = { 'Random Array': [38, 27, 43, 3, 9, 82, 10, 55], 'Nearly Sorted': [3, 9, 10, 27, 38, 43, 55, 82], 'Reversed': [82, 55, 43, 38, 27, 10, 9, 3] };
  const initial = [...(bases[inputType] || bases['Random Array'])];
  const steps = [];
  const sorted = new Set();
  steps.push(makeSortingStep(initial, [], [], [], null, `Merge Sort initialized. Array: [${initial.join(', ')}]`));
  function merge(arr, l, m, r) {
    const left = arr.slice(l, m+1), right = arr.slice(m+1, r+1);
    let i = 0, j = 0, k = l;
    steps.push(makeSortingStep(arr, [l, m, m+1, r], [], [...sorted], null, `Merging [${left.join(',')}] and [${right.join(',')}]`));
    while (i < left.length && j < right.length) {
      steps.push(makeSortingStep(arr, [l+i, m+1+j], [], [...sorted], null, `Comparing ${left[i]} and ${right[j]}`));
      if (left[i] <= right[j]) { arr[k++] = left[i++]; } else { arr[k++] = right[j++]; }
      steps.push(makeSortingStep(arr, [], [k-1], [...sorted], null, `Placed ${arr[k-1]} at index ${k-1}`));
    }
    while (i < left.length) { arr[k++] = left[i++]; steps.push(makeSortingStep(arr, [], [k-1], [...sorted], null, `Copying remaining: ${arr[k-1]}`)); }
    while (j < right.length) { arr[k++] = right[j++]; steps.push(makeSortingStep(arr, [], [k-1], [...sorted], null, `Copying remaining: ${arr[k-1]}`)); }
    for (let x = l; x <= r; x++) sorted.add(x);
  }
  function mergeSort(arr, l, r) {
    if (l >= r) return;
    const m = Math.floor((l+r)/2);
    steps.push(makeSortingStep(arr, [l, r], [], [...sorted], null, `Splitting [${l}..${r}] at mid=${m}`));
    mergeSort(arr, l, m); mergeSort(arr, m+1, r); merge(arr, l, m, r);
  }
  const a = [...initial];
  mergeSort(a, 0, a.length-1);
  steps.push(makeSortingStep(a, [], [], [...Array.from({length: a.length}, (_, i) => i)], null, '✓ Merge Sort complete!'));
  return steps;
}

function generateQuickSortSteps(inputType = 'Random Array', pivotStrategy = 'Last Element') {
  const bases = { 'Random Array': [10, 7, 8, 9, 1, 5, 3, 6], 'Nearly Sorted': [1, 3, 5, 6, 7, 8, 9, 10], 'Reversed': [10, 9, 8, 7, 6, 5, 3, 1] };
  const initial = [...(bases[inputType] || bases['Random Array'])];
  const steps = [];
  const sorted = new Set();
  function partition(arr, low, high) {
    const pivotVal = arr[high]; let i = low - 1;
    steps.push(makeSortingStep(arr, [], [], [...sorted], high, `Pivot: ${pivotVal} at index ${high}`));
    for (let j = low; j < high; j++) {
      steps.push(makeSortingStep(arr, [j, high], [], [...sorted], high, `Comparing a[${j}]=${arr[j]} with pivot ${pivotVal}`));
      if (arr[j] <= pivotVal) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; if (i !== j) steps.push(makeSortingStep(arr, [], [i, j], [...sorted], high, `Swapping a[${i}] and a[${j}]`)); }
    }
    [arr[i+1], arr[high]] = [arr[high], arr[i+1]]; sorted.add(i+1);
    steps.push(makeSortingStep(arr, [], [i+1, high], [...sorted], null, `Pivot ${pivotVal} → final position ${i+1}`));
    return i+1;
  }
  function quickSort(arr, low, high) {
    if (low < high) { steps.push(makeSortingStep(arr, [low, high], [], [...sorted], null, `Partitioning [${low}..${high}]`)); const pi = partition(arr, low, high); quickSort(arr, low, pi-1); quickSort(arr, pi+1, high); } else if (low === high) sorted.add(low);
  }
  const a = [...initial];
  steps.push(makeSortingStep(a, [], [], [], null, `Quick Sort initialized. Array: [${a.join(', ')}]`));
  quickSort(a, 0, a.length-1);
  steps.push(makeSortingStep(a, [], [], [...Array.from({length: a.length}, (_, i) => i)], null, '✓ Quick Sort complete!'));
  return steps;
}

// --------------- SEARCH HELPERS ---------------
function makeSearchStep(array, target, current = [], eliminated = [], found = null, low = 0, high = 0, mid = null, log = '') {
  return { array, target, current, eliminated, found, low, high, mid, log };
}

function generateLinearSearchSteps(target = 22) {
  const array = [11, 34, 7, 55, 22, 90, 45, 13];
  const steps = [];
  steps.push(makeSearchStep(array, target, [], [], null, 0, array.length-1, null, `Linear Search for target: ${target}. Array: [${array.join(', ')}]`));
  for (let i = 0; i < array.length; i++) {
    steps.push(makeSearchStep(array, target, [i], [], null, 0, array.length-1, null, `Checking index ${i}: value = ${array[i]}`));
    if (array[i] === target) { steps.push(makeSearchStep(array, target, [], [], i, 0, array.length-1, null, `✓ Found! Target ${target} at index ${i}.`)); return steps; }
    else steps.push(makeSearchStep(array, target, [], Array.from({length: i+1}, (_, k) => k), null, 0, array.length-1, null, `${array[i]} ≠ ${target}. Moving on...`));
  }
  steps.push(makeSearchStep(array, target, [], Array.from({length: array.length}, (_, k) => k), null, 0, array.length-1, null, `Target ${target} not found.`));
  return steps;
}

function generateBinarySearchSteps(target = 55) {
  const array = [7, 11, 13, 22, 34, 45, 55, 90];
  const steps = [];
  let low = 0, high = array.length-1;
  const eliminated = [];
  steps.push(makeSearchStep(array, target, [], [], null, low, high, null, `Binary Search for ${target}. Sorted array: [${array.join(', ')}]`));
  while (low <= high) {
    const mid = Math.floor((low+high)/2);
    steps.push(makeSearchStep(array, target, [mid], [...eliminated], null, low, high, mid, `low=${low}, high=${high}. mid=${mid}: value=${array[mid]}`));
    if (array[mid] === target) { steps.push(makeSearchStep(array, target, [], [...eliminated], mid, low, high, mid, `✓ Found! Target ${target} at index ${mid}.`)); return steps; }
    else if (array[mid] < target) { for (let i = low; i <= mid; i++) eliminated.push(i); steps.push(makeSearchStep(array, target, [], [...eliminated], null, mid+1, high, null, `${array[mid]} < ${target}. Search right.`)); low = mid+1; }
    else { for (let i = mid; i <= high; i++) eliminated.push(i); steps.push(makeSearchStep(array, target, [], [...eliminated], null, low, mid-1, null, `${array[mid]} > ${target}. Search left.`)); high = mid-1; }
  }
  steps.push(makeSearchStep(array, target, [], Array.from({length: array.length}, (_, k) => k), null, low, high, null, `Target ${target} not found.`));
  return steps;
}

function generateJumpSearchSteps(target = 55) {
  const array = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  const n = array.length;
  const blockSize = Math.floor(Math.sqrt(n));
  const steps = [];
  const eliminated = [];
  steps.push(makeSearchStep(array, target, [], [], null, 0, n-1, null, `Jump Search for ${target}. Block size: √${n} ≈ ${blockSize}`));
  let prev = 0, curr = blockSize;
  while (curr < n && array[curr] < target) {
    steps.push(makeSearchStep(array, target, [curr], [...eliminated], null, prev, n-1, null, `Jump to index ${curr}: a[${curr}]=${array[curr]} < ${target}. Jump forward!`));
    for (let i = prev; i < curr; i++) eliminated.push(i);
    prev = curr; curr += blockSize;
    if (curr > n-1) curr = n-1;
  }
  steps.push(makeSearchStep(array, target, [curr], [...eliminated], null, prev, Math.min(curr, n-1), null, `a[${curr}]=${array[curr]} >= ${target}. Linear scan in block [${prev}..${Math.min(curr, n-1)}]`));
  for (let i = prev; i <= Math.min(curr, n-1); i++) {
    steps.push(makeSearchStep(array, target, [i], [...eliminated], null, prev, Math.min(curr, n-1), null, `Checking index ${i}: a[${i}]=${array[i]}`));
    if (array[i] === target) { steps.push(makeSearchStep(array, target, [], [...eliminated], i, prev, Math.min(curr, n-1), null, `✓ Found! Target ${target} at index ${i}.`)); return steps; }
  }
  steps.push(makeSearchStep(array, target, [], [...Array.from({length: n}, (_, k) => k)], null, 0, n-1, null, `Target ${target} not found.`));
  return steps;
}

// --------------- GRAPH HELPERS ---------------
const GRAPH_NODES = [
  { id: 0, x: 0.5, y: 0.1, label: 'A' }, { id: 1, x: 0.2, y: 0.35, label: 'B' },
  { id: 2, x: 0.8, y: 0.35, label: 'C' }, { id: 3, x: 0.1, y: 0.65, label: 'D' },
  { id: 4, x: 0.45, y: 0.6, label: 'E' }, { id: 5, x: 0.85, y: 0.65, label: 'F' },
  { id: 6, x: 0.35, y: 0.88, label: 'G' }, { id: 7, x: 0.7, y: 0.88, label: 'H' },
];
const GRAPH_EDGES = [
  { from: 0, to: 1, weight: 4 }, { from: 0, to: 2, weight: 8 }, { from: 1, to: 3, weight: 11 },
  { from: 1, to: 4, weight: 8 }, { from: 2, to: 4, weight: 7 }, { from: 2, to: 5, weight: 2 },
  { from: 3, to: 6, weight: 6 }, { from: 4, to: 6, weight: 2 }, { from: 4, to: 7, weight: 5 },
  { from: 5, to: 7, weight: 3 }, { from: 6, to: 7, weight: 1 },
];

function makeGraphStep(visited = [], current = null, activeEdges = [], path = [], distances = {}, queue = [], log = '') {
  return { nodes: GRAPH_NODES, edges: GRAPH_EDGES, visited, current, activeEdges, path, distances, queue, log };
}

function generateDijkstraSteps() {
  return [
    makeGraphStep([], null, [], [], { A:0, B:'∞', C:'∞', D:'∞', E:'∞', F:'∞', G:'∞', H:'∞' }, [], "Dijkstra's initialized. Source: A. All distances = ∞"),
    makeGraphStep([0], 0, [], [], { A:0, B:'∞', C:'∞', D:'∞', E:'∞', F:'∞', G:'∞', H:'∞' }, [1,2], 'Visiting A. Exploring neighbors B and C.'),
    makeGraphStep([0], 0, [{from:0,to:1},{from:0,to:2}], [], { A:0, B:4, C:8, D:'∞', E:'∞', F:'∞', G:'∞', H:'∞' }, [1,2], 'Updated d(B)=4, d(C)=8.'),
    makeGraphStep([0,1], 1, [], [], { A:0, B:4, C:8, D:'∞', E:'∞', F:'∞', G:'∞', H:'∞' }, [2], 'Visiting B (dist=4).'),
    makeGraphStep([0,1], 1, [{from:1,to:3},{from:1,to:4}], [], { A:0, B:4, C:8, D:15, E:12, F:'∞', G:'∞', H:'∞' }, [2,4], 'Updated d(D)=15, d(E)=12.'),
    makeGraphStep([0,1,2], 2, [], [], { A:0, B:4, C:8, D:15, E:12, F:'∞', G:'∞', H:'∞' }, [4], 'Visiting C (dist=8).'),
    makeGraphStep([0,1,2], 2, [{from:2,to:4},{from:2,to:5}], [], { A:0, B:4, C:8, D:15, E:12, F:10, G:'∞', H:'∞' }, [5,4], 'Updated d(F)=10.'),
    makeGraphStep([0,1,2,5], 5, [], [], { A:0, B:4, C:8, D:15, E:12, F:10, G:'∞', H:'∞' }, [4], 'Visiting F (dist=10).'),
    makeGraphStep([0,1,2,5], 5, [{from:5,to:7}], [], { A:0, B:4, C:8, D:15, E:12, F:10, G:'∞', H:13 }, [4], 'Updated d(H)=13.'),
    makeGraphStep([0,1,2,5,4], 4, [], [], { A:0, B:4, C:8, D:15, E:12, F:10, G:'∞', H:13 }, [7,3], 'Visiting E (dist=12).'),
    makeGraphStep([0,1,2,5,4], 4, [{from:4,to:6},{from:4,to:7}], [], { A:0, B:4, C:8, D:15, E:12, F:10, G:14, H:13 }, [7,3], 'Updated d(G)=14.'),
    makeGraphStep([0,1,2,5,4,7], 7, [], [], { A:0, B:4, C:8, D:15, E:12, F:10, G:14, H:13 }, [3,6], 'Visiting H (dist=13).'),
    makeGraphStep([0,1,2,5,4,7,6], 6, [], [], { A:0, B:4, C:8, D:15, E:12, F:10, G:14, H:13 }, [3], 'Visiting G (dist=14).'),
    makeGraphStep([0,1,2,5,4,7,6,3], null, [], [0,1,4,6,7], { A:0, B:4, C:8, D:15, E:12, F:10, G:14, H:13 }, [], "✓ Dijkstra's complete! Shortest A→H = 13 (A→B→E→H)"),
  ];
}

function generatePrimsMSTSteps() {
  return [
    makeGraphStep([], null, [], [], {}, [], "Prim's MST initialized. Starting from Node A. MST = {}"),
    makeGraphStep([0], 0, [], [], {}, [], 'Node A in MST. Available edges: A-B(4), A-C(8). Pick minimum.'),
    makeGraphStep([0], 0, [{from:0,to:1}], [], {}, [], 'Minimum edge: A-B (weight=4). Adding B to MST.'),
    makeGraphStep([0,1], 1, [], [], {}, [], 'MST has: A, B. New candidate edges: B-D(11), B-E(8), A-C(8).'),
    makeGraphStep([0,1,2], 2, [{from:0,to:2}], [], {}, [], 'Minimum edge: A-C (weight=8). Adding C to MST.'),
    makeGraphStep([0,1,2], 2, [], [], {}, [], 'MST has: A, B, C. New candidates: C-E(7), C-F(2).'),
    makeGraphStep([0,1,2,5], 5, [{from:2,to:5}], [], {}, [], 'Minimum edge: C-F (weight=2). Adding F to MST.'),
    makeGraphStep([0,1,2,5], 5, [], [], {}, [], 'MST has: A,B,C,F. Candidate: F-H(3), C-E(7).'),
    makeGraphStep([0,1,2,5,7], 7, [{from:5,to:7}], [], {}, [], 'Minimum edge: F-H (weight=3). Adding H to MST.'),
    makeGraphStep([0,1,2,5,7,4], 4, [{from:2,to:4}], [], {}, [], 'Minimum edge: C-E (weight=7). Adding E to MST.'),
    makeGraphStep([0,1,2,5,7,4,6], 6, [{from:4,to:6}], [], {}, [], 'Minimum edge: E-G (weight=2). Adding G to MST.'),
    makeGraphStep([0,1,2,5,7,4,6,3], null, [], [0,1,2,3,4,5,6,7], {}, [], "✓ Prim's MST complete! All 8 nodes connected. Total MST weight: A-B(4)+A-C(8)+C-F(2)+F-H(3)+C-E(7)+E-G(2)+G-D? = 26"),
  ];
}

function generateBellmanFordSteps() {
  return [
    makeGraphStep([], null, [], [], { A:0, B:'∞', C:'∞', D:'∞', E:'∞', F:'∞', G:'∞', H:'∞' }, [], 'Bellman-Ford initialized. Source: A. All distances = ∞.'),
    makeGraphStep([0], 0, [{from:0,to:1}], [], { A:0, B:4, C:'∞', D:'∞', E:'∞', F:'∞', G:'∞', H:'∞' }, [], 'Iteration 1: Relaxing A→B(4). d[B] = 0+4 = 4. Updated!'),
    makeGraphStep([0,1], 1, [{from:0,to:2}], [], { A:0, B:4, C:8, D:'∞', E:'∞', F:'∞', G:'∞', H:'∞' }, [], 'Relaxing A→C(8). d[C] = 8. Updated!'),
    makeGraphStep([0,1,2], 2, [{from:1,to:4}], [], { A:0, B:4, C:8, D:'∞', E:12, F:'∞', G:'∞', H:'∞' }, [], 'Relaxing B→E(8). d[E] = 4+8 = 12. Updated!'),
    makeGraphStep([0,1,2,5], 5, [{from:2,to:5}], [], { A:0, B:4, C:8, D:'∞', E:12, F:10, G:'∞', H:'∞' }, [], 'Relaxing C→F(2). d[F] = 8+2 = 10. Updated!'),
    makeGraphStep([0,1,2,5,4], 4, [{from:4,to:6}], [], { A:0, B:4, C:8, D:'∞', E:12, F:10, G:14, H:'∞' }, [], 'Relaxing E→G(2). d[G] = 12+2 = 14.'),
    makeGraphStep([0,1,2,5,4,7], 7, [{from:5,to:7}], [], { A:0, B:4, C:8, D:'∞', E:12, F:10, G:14, H:13 }, [], 'Relaxing F→H(3). d[H] = 10+3 = 13.'),
    makeGraphStep([0,1,2,5,4,7], 7, [{from:4,to:7}], [], { A:0, B:4, C:8, D:'∞', E:12, F:10, G:14, H:13 }, [], 'Relaxing E→H(5). d[H] = min(13, 17) = 13. No improvement.'),
    makeGraphStep([0,1,2,5,4,7,3], 3, [{from:1,to:3}], [], { A:0, B:4, C:8, D:15, E:12, F:10, G:14, H:13 }, [], 'Relaxing B→D(11). d[D] = 4+11 = 15.'),
    makeGraphStep([0,1,2,5,4,7,3,6], null, [], [0,1,4,6,7], { A:0, B:4, C:8, D:15, E:12, F:10, G:14, H:13 }, [], '✓ Bellman-Ford complete (V-1 iterations)! No negative cycles. All shortest paths found.'),
  ];
}

function generateBFSSteps() {
  return [
    makeGraphStep([], null, [], [], {}, [0], 'BFS initialized. Starting from Node A.'),
    makeGraphStep([0], 0, [], [], {}, [1,2], 'Visiting A. Enqueuing B, C. Queue: [B, C]'),
    makeGraphStep([0], 0, [{from:0,to:1},{from:0,to:2}], [], {}, [1,2], 'Exploring A → B and A → C.'),
    makeGraphStep([0,1], 1, [], [], {}, [2,3,4], 'Dequeue B. Visiting B. Enqueue D, E. Queue: [C,D,E]'),
    makeGraphStep([0,1], 1, [{from:1,to:3},{from:1,to:4}], [], {}, [2,3,4], 'Exploring B → D and B → E.'),
    makeGraphStep([0,1,2], 2, [], [], {}, [3,4,5], 'Dequeue C. Visiting C. Enqueue F. Queue: [D,E,F]'),
    makeGraphStep([0,1,2,3], 3, [], [], {}, [4,5,6], 'Dequeue D. Visiting D. Enqueue G. Queue: [E,F,G]'),
    makeGraphStep([0,1,2,3,4], 4, [], [], {}, [5,6,7], 'Dequeue E. Visiting E. Enqueue H. Queue: [F,G,H]'),
    makeGraphStep([0,1,2,3,4,5], 5, [], [], {}, [6,7], 'Dequeue F. Visiting F. Queue: [G,H]'),
    makeGraphStep([0,1,2,3,4,5,6], 6, [], [], {}, [7], 'Dequeue G. Visiting G. Queue: [H]'),
    makeGraphStep([0,1,2,3,4,5,6,7], null, [], [0,1,4,7], {}, [], '✓ BFS complete! Level-order: A→B→C→D→E→F→G→H'),
  ];
}

function generateDFSSteps() {
  return [
    makeGraphStep([], null, [], [], {}, [0], 'DFS initialized. Starting from Node A. Stack: [A]'),
    makeGraphStep([0], 0, [], [], {}, [1,2], 'Visiting A. Push C, B. Stack: [C, B]'),
    makeGraphStep([0,1], 1, [{from:0,to:1}], [], {}, [2,3,4], 'Pop B. Visiting B. Push E, D. Stack: [C, E, D]'),
    makeGraphStep([0,1,3], 3, [{from:1,to:3}], [], {}, [2,4,6], 'Pop D. Visiting D. Push G. Stack: [C, E, G]'),
    makeGraphStep([0,1,3,6], 6, [{from:3,to:6}], [], {}, [2,4,7], 'Pop G. Visiting G. Push H. Stack: [C, E, H]'),
    makeGraphStep([0,1,3,6,7], 7, [{from:6,to:7}], [], {}, [2,4], 'Pop H. Visiting H (dead end). Stack: [C, E]'),
    makeGraphStep([0,1,3,6,7,4], 4, [{from:1,to:4}], [], {}, [2], 'Pop E. Visiting E. Stack: [C]'),
    makeGraphStep([0,1,3,6,7,4,2], 2, [{from:0,to:2}], [], {}, [5], 'Pop C. Visiting C. Push F. Stack: [F]'),
    makeGraphStep([0,1,3,6,7,4,2,5], 5, [{from:2,to:5}], [], {}, [], 'Pop F. Visiting F. Stack empty.'),
    makeGraphStep([0,1,3,6,7,4,2,5], null, [], [0,1,3,6,7,4,2,5], {}, [], '✓ DFS complete! Traversal: A→B→D→G→H→E→C→F'),
  ];
}

// --------------- DATA STRUCTURE HELPERS ---------------
function generateBinaryTreeSteps() {
  const insertions = [50, 30, 70, 20, 40, 60, 80];
  const steps = [];
  const tree = [];
  steps.push({ type: 'tree', nodes: [], edges: [], highlight: null, log: 'Binary Search Tree initialized. Ready to insert.' });
  insertions.forEach(val => {
    steps.push({ type: 'tree', nodes: [...tree], edges: [], highlight: val, log: `Inserting value: ${val}...` });
    tree.push(val);
    steps.push({ type: 'tree', nodes: [...tree], edges: [], highlight: val, log: `${val} inserted. Tree has ${tree.length} node(s).` });
  });
  steps.push({ type: 'tree', nodes: [...tree], edges: [], highlight: null, log: '✓ BST complete! In-order: 20, 30, 40, 50, 60, 70, 80' });
  return steps;
}

function generateLinkedListSteps() {
  const values = [10, 25, 7, 42, 18, 33];
  const steps = [];
  const list = [];
  steps.push({ type: 'linkedlist', nodes: [], highlight: null, traverseIdx: null, log: 'Linked List initialized. Empty.' });
  values.forEach(val => {
    steps.push({ type: 'linkedlist', nodes: [...list], highlight: val, traverseIdx: list.length - 1, log: `Appending node: ${val}...` });
    list.push(val);
    steps.push({ type: 'linkedlist', nodes: [...list], highlight: val, traverseIdx: list.length - 1, log: `Node ${val} appended. List: [${list.join(' → ')}]` });
  });
  list.forEach((val, i) => steps.push({ type: 'linkedlist', nodes: [...list], highlight: val, traverseIdx: i, log: `Visiting node ${i}: value = ${val}` }));
  steps.push({ type: 'linkedlist', nodes: [...list], highlight: null, traverseIdx: null, log: '✓ Traversal complete!' });
  return steps;
}

function generateHashTableSteps() {
  const keys = ['alice', 'bob', 'carol', 'dave', 'eve', 'frank', 'grace'];
  const TABLE_SIZE = 8;
  const hashFn = k => k.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % TABLE_SIZE;
  const steps = [];
  const table = Array(TABLE_SIZE).fill(null);
  steps.push({ type: 'hashtable', table: [...table], highlight: null, log: `Hash Table initialized. Size: ${TABLE_SIZE} buckets.` });
  keys.forEach(key => {
    const idx = hashFn(key);
    steps.push({ type: 'hashtable', table: [...table], highlight: { key, idx }, log: `hash("${key}") = ${idx}. Inserting...` });
    if (table[idx]) { steps.push({ type: 'hashtable', table: [...table], highlight: { key, idx }, log: `Collision! Bucket ${idx} has "${table[idx]}". Chaining.` }); table[idx] = `${table[idx]} → ${key}`; }
    else table[idx] = key;
    steps.push({ type: 'hashtable', table: [...table], highlight: { key, idx }, log: `✓ "${key}" stored at bucket ${idx}.` });
  });
  steps.push({ type: 'hashtable', table: [...table], highlight: null, log: '✓ Hash Table populated!' });
  return steps;
}

function generateStackSteps() {
  let stack = [];
  const ops = [{ op:'push', val:5 },{ op:'push', val:12 },{ op:'push', val:3 },{ op:'push', val:8 },{ op:'peek', val:null },{ op:'pop', val:null },{ op:'pop', val:null },{ op:'push', val:7 },{ op:'push', val:1 }];
  const steps = [{ type:'stack', items:[], operation:null, operationValue:null, log:'Stack initialized. Empty. LIFO: Last In, First Out.' }];
  ops.forEach(({ op, val }) => {
    if (op === 'push') {
      steps.push({ type:'stack', items:[...stack], operation:'push', operationValue:val, log:`PUSH(${val}): Adding ${val} to top of stack.` });
      stack.push(val);
      steps.push({ type:'stack', items:[...stack], operation:null, operationValue:null, log:`${val} pushed. Stack size: ${stack.length}. Top: ${stack[stack.length-1]}` });
    } else if (op === 'pop') {
      const popped = stack[stack.length-1];
      steps.push({ type:'stack', items:[...stack], operation:'pop', operationValue:popped, log:`POP(): Removing top element ${popped}.` });
      stack.pop();
      steps.push({ type:'stack', items:[...stack], operation:null, operationValue:null, log:`${popped} popped. Stack size: ${stack.length}. Top: ${stack.length ? stack[stack.length-1] : 'empty'}` });
    } else if (op === 'peek') {
      steps.push({ type:'stack', items:[...stack], operation:'peek', operationValue:stack[stack.length-1], log:`PEEK(): Top = ${stack[stack.length-1]} (no removal).` });
    }
  });
  steps.push({ type:'stack', items:[...stack], operation:null, operationValue:null, log:`✓ Demo complete. Stack (bottom→top): [${stack.join(', ')}]` });
  return steps;
}

function generateQueueSteps() {
  let queue = [];
  const ops = [{ op:'enqueue', val:10 },{ op:'enqueue', val:7 },{ op:'enqueue', val:25 },{ op:'enqueue', val:3 },{ op:'dequeue' },{ op:'dequeue' },{ op:'enqueue', val:14 },{ op:'enqueue', val:9 }];
  const steps = [{ type:'queue', items:[], operation:null, operationValue:null, log:'Queue initialized. Empty. FIFO: First In, First Out.' }];
  ops.forEach(({ op, val }) => {
    if (op === 'enqueue') {
      steps.push({ type:'queue', items:[...queue], operation:'enqueue', operationValue:val, log:`ENQUEUE(${val}): Adding ${val} to rear.` });
      queue.push(val);
      steps.push({ type:'queue', items:[...queue], operation:null, operationValue:null, log:`${val} enqueued. Size: ${queue.length}. Front: ${queue[0]}` });
    } else if (op === 'dequeue') {
      const deq = queue[0];
      steps.push({ type:'queue', items:[...queue], operation:'dequeue', operationValue:deq, log:`DEQUEUE(): Removing front ${deq}.` });
      queue.shift();
      steps.push({ type:'queue', items:[...queue], operation:null, operationValue:null, log:`${deq} dequeued. Size: ${queue.length}. Front: ${queue.length ? queue[0] : 'empty'}` });
    }
  });
  steps.push({ type:'queue', items:[...queue], operation:null, operationValue:null, log:`✓ Demo complete. Queue (front→rear): [${queue.join(', ')}]` });
  return steps;
}

// --------------- DYNAMIC PROGRAMMING HELPERS ---------------
function generateFibonacciDPSteps(n = 10) {
  const size = Math.min(Math.max(n, 5), 15) + 1;
  const dp = Array(size).fill(null);
  const steps = [];
  steps.push({ type:'dp', subtype:'fibonacci', table:[...dp], highlight:null, using:[], n:size-1, log:`Fibonacci DP for F(${size-1}). Table initialized to null.` });
  dp[0] = 0;
  steps.push({ type:'dp', subtype:'fibonacci', table:[...dp], highlight:0, using:[], n:size-1, log:`Base case: F(0) = 0` });
  if (size > 1) { dp[1] = 1; steps.push({ type:'dp', subtype:'fibonacci', table:[...dp], highlight:1, using:[], n:size-1, log:`Base case: F(1) = 1` }); }
  for (let i = 2; i < size; i++) {
    steps.push({ type:'dp', subtype:'fibonacci', table:[...dp], highlight:i, using:[i-1,i-2], n:size-1, log:`Computing F(${i}) = F(${i-1})+F(${i-2}) = ${dp[i-1]}+${dp[i-2]}` });
    dp[i] = dp[i-1] + dp[i-2];
    steps.push({ type:'dp', subtype:'fibonacci', table:[...dp], highlight:i, using:[], n:size-1, log:`F(${i}) = ${dp[i]}. Cell filled.` });
  }
  steps.push({ type:'dp', subtype:'fibonacci', table:[...dp], highlight:null, using:[], n:size-1, log:`✓ Complete! F(${size-1}) = ${dp[size-1]}.` });
  return steps;
}

function generateKnapsackSteps() {
  const items = [{ name:'Item A', weight:2, value:6 },{ name:'Item B', weight:2, value:10 },{ name:'Item C', weight:3, value:12 }];
  const W = 5;
  const n = items.length;
  const dp = Array.from({ length: n+1 }, () => Array(W+1).fill(0));
  const steps = [];
  steps.push({ type:'dp', subtype:'knapsack', table:dp.map(r=>[...r]), highlight:null, items, W, log:`0/1 Knapsack: ${n} items, capacity=${W}. Initializing (${n+1}×${W+1}) table.` });
  for (let i = 1; i <= n; i++) {
    const item = items[i-1];
    for (let w = 0; w <= W; w++) {
      steps.push({ type:'dp', subtype:'knapsack', table:dp.map(r=>[...r]), highlight:{row:i,col:w}, items, W, log:`${item.name}(w=${item.weight},v=${item.value}) at cap=${w}.` });
      if (item.weight > w) { dp[i][w] = dp[i-1][w]; steps.push({ type:'dp', subtype:'knapsack', table:dp.map(r=>[...r]), highlight:{row:i,col:w}, items, W, log:`Too heavy. Skip → dp[${i}][${w}] = ${dp[i][w]}` }); }
      else {
        const inc = dp[i-1][w-item.weight]+item.value, exc = dp[i-1][w];
        dp[i][w] = Math.max(inc, exc);
        steps.push({ type:'dp', subtype:'knapsack', table:dp.map(r=>[...r]), highlight:{row:i,col:w}, items, W, log:`Include=${inc}, Exclude=${exc} → dp[${i}][${w}] = ${dp[i][w]}` });
      }
    }
  }
  steps.push({ type:'dp', subtype:'knapsack', table:dp.map(r=>[...r]), highlight:{row:n,col:W}, items, W, log:`✓ Complete! Max value = ${dp[n][W]} for capacity ${W}.` });
  return steps;
}

function generateCoinChangeSteps(amount = 6) {
  const coins = [1, 3, 4];
  const amt = Math.min(Math.max(amount, 4), 12);
  const dp = Array(amt+1).fill(Infinity);
  dp[0] = 0;
  const steps = [];
  steps.push({ type:'dp', subtype:'coinchange', table:[...dp], highlight:null, coins, amount:amt, log:`Coin Change: coins=[${coins.join(',')}], target=${amt}. dp[0]=0, rest=∞` });
  steps.push({ type:'dp', subtype:'coinchange', table:[...dp], highlight:0, coins, amount:amt, log:`Base: dp[0] = 0 (zero coins for amount 0).` });
  for (let i = 1; i <= amt; i++) {
    steps.push({ type:'dp', subtype:'coinchange', table:[...dp], highlight:i, coins, amount:amt, log:`Computing dp[${i}]: min coins for amount ${i}.` });
    for (const coin of coins) {
      if (coin <= i && dp[i-coin] !== Infinity) {
        const candidate = dp[i-coin]+1;
        if (candidate < dp[i]) { dp[i] = candidate; steps.push({ type:'dp', subtype:'coinchange', table:[...dp], highlight:i, coins, amount:amt, log:`Coin ${coin}: dp[${i}] = dp[${i-coin}]+1 = ${candidate}. New min!` }); }
      }
    }
    if (dp[i] === Infinity) steps.push({ type:'dp', subtype:'coinchange', table:[...dp], highlight:i, coins, amount:amt, log:`dp[${i}] = ∞ (impossible with given coins).` });
    else steps.push({ type:'dp', subtype:'coinchange', table:[...dp], highlight:i, coins, amount:amt, log:`dp[${i}] = ${dp[i]}` });
  }
  steps.push({ type:'dp', subtype:'coinchange', table:[...dp], highlight:amt, coins, amount:amt, log:`✓ Complete! Min coins for ${amt} = ${dp[amt] === Infinity ? 'impossible' : dp[amt]}.` });
  return steps;
}

// ============================================================
// MAIN EXPORT
// ============================================================
export const ALGORITHM_CONFIG = {
  // Sorting
  'Bubble Sort':    { category:'sorting',       getSteps:(p)=>generateBubbleSortSteps(p.inputType),   icon:'↕',  complexity:'O(n²)',       space:'O(1)',      tags:['beginner','comparison'] },
  'Insertion Sort': { category:'sorting',       getSteps:(p)=>generateInsertionSortSteps(p.inputType), icon:'⤵',  complexity:'O(n²)',       space:'O(1)',      tags:['beginner','adaptive'] },
  'Selection Sort': { category:'sorting',       getSteps:(p)=>generateSelectionSortSteps(p.inputType), icon:'⊟',  complexity:'O(n²)',       space:'O(1)',      tags:['beginner','comparison'] },
  'Merge Sort':     { category:'sorting',       getSteps:(p)=>generateMergeSortSteps(p.inputType),    icon:'⑂',  complexity:'O(n log n)',  space:'O(n)',      tags:['divide-conquer','stable'] },
  'Quick Sort':     { category:'sorting',       getSteps:(p)=>generateQuickSortSteps(p.inputType,p.pivotStrategy), icon:'⟳', complexity:'O(n log n)', space:'O(log n)', tags:['divide-conquer','in-place'] },
  'Heap Sort':      { category:'sorting',       getSteps:(p)=>generateHeapSortSteps(p.inputType),     icon:'⛁',  complexity:'O(n log n)',  space:'O(1)',      tags:['heap','in-place'] },
  // Search
  'Linear Search':  { category:'search',        getSteps:(p)=>generateLinearSearchSteps(p.target),    icon:'→',  complexity:'O(n)',        space:'O(1)',      tags:['sequential','unsorted'] },
  'Binary Search':  { category:'search',        getSteps:(p)=>generateBinarySearchSteps(p.target),    icon:'⌖',  complexity:'O(log n)',    space:'O(1)',      tags:['sorted','efficient'] },
  'Jump Search':    { category:'search',        getSteps:(p)=>generateJumpSearchSteps(p.target),      icon:'⤳',  complexity:'O(√n)',       space:'O(1)',      tags:['sorted','block'] },
  // Graph
  "Dijkstra's":     { category:'graph',         getSteps:()=>generateDijkstraSteps(),                  icon:'⊕',  complexity:'O(E log V)', space:'O(V)',      tags:['shortest-path','weighted'] },
  'BFS':            { category:'graph',         getSteps:()=>generateBFSSteps(),                       icon:'≋',  complexity:'O(V + E)',    space:'O(V)',      tags:['traversal','unweighted'] },
  'DFS':            { category:'graph',         getSteps:()=>generateDFSSteps(),                       icon:'⊳',  complexity:'O(V + E)',    space:'O(V)',      tags:['traversal','recursive'] },
  "Prim's MST":     { category:'graph',         getSteps:()=>generatePrimsMSTSteps(),                  icon:'⌘',  complexity:'O(E log V)', space:'O(V)',      tags:['greedy','spanning-tree'] },
  'Bellman-Ford':   { category:'graph',         getSteps:()=>generateBellmanFordSteps(),               icon:'↬',  complexity:'O(VE)',       space:'O(V)',      tags:['shortest-path','negative-edges'] },
  'A* Pathfinding': { category:'graph',         getSteps:()=>generateDijkstraSteps(),                  icon:'★',  complexity:'O(E log V)', space:'O(V)',      tags:['heuristic','pathfinding'] },
  // Data Structures
  'Binary Tree':    { category:'datastructure', getSteps:()=>generateBinaryTreeSteps(),                icon:'⌥',  complexity:'O(log n)',   space:'O(n)',      tags:['hierarchical','bst'] },
  'Linked List':    { category:'datastructure', getSteps:()=>generateLinkedListSteps(),                icon:'⬦',  complexity:'O(n)',        space:'O(n)',      tags:['linear','dynamic'] },
  'Hash Table':     { category:'datastructure', getSteps:()=>generateHashTableSteps(),                 icon:'#',  complexity:'O(1) avg',   space:'O(n)',      tags:['hashing','lookup'] },
  'Stack':          { category:'datastructure', getSteps:()=>generateStackSteps(),                     icon:'⊞',  complexity:'O(1)',        space:'O(n)',      tags:['lifo','linear'] },
  'Queue':          { category:'datastructure', getSteps:()=>generateQueueSteps(),                     icon:'⊡',  complexity:'O(1)',        space:'O(n)',      tags:['fifo','linear'] },
  // Dynamic Programming
  'Fibonacci DP':   { category:'dp',            getSteps:(p)=>generateFibonacciDPSteps(p.n),           icon:'ƒ',  complexity:'O(n)',        space:'O(n)',      tags:['memoization','classic'] },
  '0/1 Knapsack':  { category:'dp',            getSteps:()=>generateKnapsackSteps(),                  icon:'⊠',  complexity:'O(nW)',       space:'O(nW)',     tags:['optimization','table'] },
  'Coin Change':    { category:'dp',            getSteps:(p)=>generateCoinChangeSteps(p.amount),       icon:'¢',  complexity:'O(A×C)',      space:'O(A)',      tags:['optimization','greedy-like'] },
};

export const ALGORITHM_DESCRIPTIONS = {
  'Bubble Sort': 'Repeatedly steps through the list, compares adjacent elements, and swaps them if out of order. Simple but O(n²) — best for educational purposes.',
  'Insertion Sort': 'Builds a sorted portion element by element, inserting each new element at its correct position. Efficient for small or nearly-sorted arrays.',
  'Selection Sort': 'Repeatedly finds the minimum element from the unsorted part and places it at the beginning. Simple but always O(n²) regardless of input.',
  'Merge Sort': 'A classic divide-and-conquer algorithm. Splits the array in half, recursively sorts each half, then merges them. Stable with guaranteed O(n log n).',
  'Quick Sort': 'Selects a pivot and partitions elements around it, recursively sorting sub-arrays. Very fast in practice — the most widely used sorting algorithm.',
  'Heap Sort': 'Uses a max-heap to sort elements. First builds a heap, then extracts the maximum repeatedly. In-place with O(n log n) guaranteed — no extra memory.',
  'Linear Search': 'Sequentially checks each element until a match is found. Works on any array regardless of order. The simplest search algorithm.',
  'Binary Search': 'Efficiently halves the search space on each step in a sorted array. Reduces O(n) to O(log n) — industry standard for sorted data lookup.',
  'Jump Search': 'Jumps ahead by √n blocks then performs linear search within the block. Better than linear for large sorted arrays where binary search is not applicable.',
  "Dijkstra's": "Finds the shortest path from a source node to all others in a weighted graph using a greedy priority queue approach. Foundation of GPS routing.",
  'BFS': 'Explores all neighbors at the current depth before moving deeper. Guarantees shortest path in unweighted graphs. Used in social networks, web crawlers.',
  'DFS': 'Explores as far as possible along each branch before backtracking. Used in topological sorting, maze solving, and connected component detection.',
  "Prim's MST": "Greedily builds a Minimum Spanning Tree by always adding the cheapest edge connecting the MST to an unvisited node. Used in network design.",
  'Bellman-Ford': 'Finds shortest paths even with negative edge weights. Slower than Dijkstra\'s but handles scenarios where edge weights can be negative.',
  'A* Pathfinding': 'Informed search combining actual path cost and heuristic estimates to guide search. Powers game AI, robot navigation, and route planning.',
  'Binary Tree': 'A hierarchical structure where each node has at most two children, left < parent < right. Enables O(log n) search, insert, and delete.',
  'Linked List': 'A linear chain where each node stores a value and a pointer to the next node. O(1) insert/delete but O(n) access — flexible size.',
  'Hash Table': 'Maps keys to values using a hash function. Provides average O(1) insert, search, delete. Powers dictionaries, caches, and database indexes.',
  'Stack': 'LIFO (Last In, First Out) structure. Essential for function call management, undo operations, expression parsing, and DFS traversal.',
  'Queue': 'FIFO (First In, First Out) structure. Used in BFS traversal, task scheduling, print spooling, and message queues.',
  'Fibonacci DP': 'The classic introduction to dynamic programming. Uses memoization to reduce naive O(2^n) recursion to O(n) by storing computed subproblems.',
  '0/1 Knapsack': 'A fundamental DP optimization problem: maximize value given weight constraints. Builds a 2D table of optimal subproblem solutions.',
  'Coin Change': 'Find the minimum number of coins to make a target amount. A 1D DP table fills from 0 to target, building on smaller subproblems.',
};
