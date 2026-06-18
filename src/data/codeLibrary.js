export const CODE_LIBRARY = {
  'Bubble Sort': {
    javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    cpp: `#include <vector>
#include <algorithm>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}`
  },

  'Insertion Sort': {
    javascript: `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    cpp: `#include <vector>

void insertionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
  },

  'Selection Sort': {
    javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // Swap with minimum
    const temp = arr[minIdx];
    arr[minIdx] = arr[i];
    arr[i] = temp;
  }
  return arr;
}`,
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    cpp: `#include <vector>
#include <algorithm>

void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        std::swap(arr[i], arr[minIdx]);
    }
}`
  },

  'Merge Sort': {
    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [], l = 0, r = 0;
  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) result.push(left[l++]);
    else result.push(right[r++]);
  }
  return result.concat(left.slice(l)).concat(right.slice(r));
}`,
    python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    l = r = 0
    while l < len(left) and r < len(right):
        if left[l] < right[r]:
            result.append(left[l])
            l += 1
        else:
            result.append(right[r])
            r += 1
    result.extend(left[l:])
    result.extend(right[r:])
    return result`,
    cpp: `#include <vector>

void merge(std::vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    std::vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`
  },

  'Quick Sort': {
    javascript: `function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return arr;
  const pivotIdx = partition(arr, left, right);
  quickSort(arr, left, pivotIdx - 1);
  quickSort(arr, pivotIdx + 1, right);
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  const temp = arr[i + 1];
  arr[i + 1] = arr[right];
  arr[right] = temp;
  return i + 1;
}`,
    python: `def quick_sort(arr, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    if left >= right:
        return arr
    pivot_idx = partition(arr, left, right)
    quick_sort(arr, left, pivot_idx - 1)
    quick_sort(arr, pivot_idx + 1, right)
    return arr

def partition(arr, left, right):
    pivot = arr[right]
    i = left - 1
    for j in range(left, right):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[right] = arr[right], arr[i + 1]
    return i + 1`,
    cpp: `#include <vector>
#include <algorithm>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
  },

  'Heap Sort': {
    javascript: `function heapSort(arr) {
  const n = arr.length;
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    const swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    heapify(arr, n, largest);
  }
}`,
    python: `def heap_sort(arr):
    n = len(arr)
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
    cpp: `#include <vector>
#include <algorithm>

void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`
  },

  'Linear Search': {
    javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return index of match
    }
  }
  return -1; // Target not found
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    cpp: `#include <vector>

int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`
  },

  'Binary Search': {
    javascript: `function binarySearch(sortedArr, target) {
  let low = 0;
  let high = sortedArr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const val = sortedArr[mid];

    if (val === target) return mid;
    else if (val < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
    python: `def binary_search(sorted_arr, target):
    low = 0
    high = len(sorted_arr) - 1
    while low <= high:
        mid = (low + high) // 2
        val = sorted_arr[mid]
        if val == target:
            return mid
        elif val < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    cpp: `#include <vector>

int binarySearch(const std::vector<int>& sortedArr, int target) {
    int low = 0;
    int high = sortedArr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (sortedArr[mid] == target) return mid;
        else if (sortedArr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
  },

  'Jump Search': {
    javascript: `function jumpSearch(arr, target) {
  const n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;

  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }

  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) return -1;
  }

  if (arr[prev] === target) return prev;
  return -1;
}`,
    python: `import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    while arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1
    while arr[prev] < target:
        prev += 1
        if prev == min(step, n):
            return -1
    if arr[prev] == target:
        return prev
    return -1`,
    cpp: `#include <vector>
#include <cmath>
#include <algorithm>

int jumpSearch(const std::vector<int>& arr, int target) {
    int n = arr.size();
    int step = std::sqrt(n);
    int prev = 0;
    while (arr[std::min(step, n) - 1] < target) {
        prev = step;
        step += std::sqrt(n);
        if (prev >= n) return -1;
    }
    while (arr[prev] < target) {
        prev++;
        if (prev == std::min(step, n)) return -1;
    }
    if (arr[prev] == target) return prev;
    return -1;
}`
  },

  "Dijkstra's": {
    javascript: `function dijkstra(graph, startNode) {
  const distances = {};
  const visited = new Set();
  const nodes = Object.keys(graph);

  for (let node of nodes) {
    distances[node] = Infinity;
  }
  distances[startNode] = 0;

  while (visited.size < nodes.length) {
    // Find unvisited node with minimum distance
    let minNode = null;
    for (let node of nodes) {
      if (!visited.has(node)) {
        if (minNode === null || distances[node] < distances[minNode]) {
          minNode = node;
        }
      }
    }

    if (minNode === null || distances[minNode] === Infinity) break;

    visited.add(minNode);

    // Update distances to neighbors
    for (let neighbor in graph[minNode]) {
      const alt = distances[minNode] + graph[minNode][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
      }
    }
  }
  return distances;
}`,
    python: `import heapq

def dijkstra(graph, start):
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    priority_queue = [(0, start)]
    
    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)
        
        if current_distance > distances[current_node]:
            continue
            
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))
                
    return distances`,
    cpp: `#include <vector>
#include <queue>
#include <utility>
#include <climits>

using namespace std;

vector<int> dijkstra(int n, vector<vector<pair<int, int>>>& adj, int start) {
    vector<int> dist(n, INT_MAX);
    dist[start] = 0;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, start});
    
    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto edge : adj[u]) {
            int v = edge.first;
            int w = edge.second;
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`
  },

  'BFS': {
    javascript: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const order = [];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
    python: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    order = []
    
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order`,
    cpp: `#include <vector>
#include <queue>

using namespace std;

vector<int> bfs(int start, const vector<vector<int>>& adj) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    vector<int> order;
    
    visited[start] = true;
    q.push(start);
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        order.push_back(node);
        
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    return order;
}`
  },

  'DFS': {
    javascript: `function dfs(graph, start, visited = new Set(), order = []) {
  visited.add(start);
  order.push(start);

  for (let neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited, order);
    }
  }
  return order;
}`,
    python: `def dfs(graph, node, visited=None, order=None):
    if visited is None:
        visited = set()
    if order is None:
        order = []
        
    visited.add(node)
    order.append(node)
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited, order)
    return order`,
    cpp: `#include <vector>

using namespace std;

void dfsHelper(int node, const vector<vector<int>>& adj, vector<bool>& visited, vector<int>& order) {
    visited[node] = true;
    order.push_back(node);
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfsHelper(neighbor, adj, visited, order);
        }
    }
}

vector<int> dfs(int start, const vector<vector<int>>& adj) {
    vector<bool> visited(adj.size(), false);
    vector<int> order;
    dfsHelper(start, adj, visited, order);
    return order;
}`
  },

  "Prim's MST": {
    javascript: `function primMST(graph) {
  const vertices = Object.keys(graph);
  const parent = {};
  const key = {};
  const inMST = {};

  for (let v of vertices) {
    key[v] = Infinity;
    inMST[v] = false;
  }

  const startNode = vertices[0];
  key[startNode] = 0;
  parent[startNode] = null;

  for (let i = 0; i < vertices.length - 1; i++) {
    // Pick minimum key node
    let u = null;
    for (let v of vertices) {
      if (!inMST[v] && (u === null || key[v] < key[u])) {
        u = v;
      }
    }

    inMST[u] = true;

    // Update keys of adjacent vertices
    for (let v in graph[u]) {
      const weight = graph[u][v];
      if (!inMST[v] && weight < key[v]) {
        parent[v] = u;
        key[v] = weight;
      }
    }
  }
  return parent; // Returns edge connections
}`,
    python: `import heapq

def prim_mst(graph):
    start_node = list(graph.keys())[0]
    visited = set([start_node])
    mst = []
    edges = [(weight, start_node, neighbor) for neighbor, weight in graph[start_node].items()]
    heapq.heapify(edges)
    
    while edges:
        weight, u, v = heapq.heappop(edges)
        if v not in visited:
            visited.add(v)
            mst.append((u, v, weight))
            for neighbor, next_weight in graph[v].items():
                if neighbor not in visited:
                    heapq.heappush(edges, (next_weight, v, neighbor))
    return mst`,
    cpp: `#include <vector>
#include <queue>
#include <utility>
#include <climits>

using namespace std;

int primMST(int V, const vector<vector<pair<int, int>>>& adj) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> key(V, INT_MAX);
    vector<bool> inMST(V, false);
    
    int src = 0;
    pq.push({0, src});
    key[src] = 0;
    
    int mstWeight = 0;
    while (!pq.empty()) {
        int u = pq.top().second;
        int d = pq.top().first;
        pq.pop();
        
        if (inMST[u]) continue;
        
        inMST[u] = true;
        mstWeight += d;
        
        for (auto edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;
            if (!inMST[v] && key[v] > weight) {
                key[v] = weight;
                pq.push({key[v], v});
            }
        }
    }
    return mstWeight;
}`
  },

  'Bellman-Ford': {
    javascript: `function bellmanFord(edges, numVertices, startNode) {
  const distances = Array(numVertices).fill(Infinity);
  distances[startNode] = 0;

  // Relax edges |V| - 1 times
  for (let i = 0; i < numVertices - 1; i++) {
    for (let edge of edges) {
      const { u, v, w } = edge;
      if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
        distances[v] = distances[u] + w;
      }
    }
  }

  // Check for negative-weight cycles
  for (let edge of edges) {
    const { u, v, w } = edge;
    if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
      throw new Error("Graph contains negative weight cycle");
    }
  }

  return distances;
}`,
    python: `def bellman_ford(edges, num_vertices, start):
    distances = [float('inf')] * num_vertices
    distances[start] = 0
    
    for _ in range(num_vertices - 1):
        for u, v, w in edges:
            if distances[u] != float('inf') and distances[u] + w < distances[v]:
                distances[v] = distances[u] + w
                
    for u, v, w in edges:
        if distances[u] != float('inf') and distances[u] + w < distances[v]:
            raise ValueError("Graph contains negative weight cycle")
            
    return distances`,
    cpp: `#include <vector>
#include <climits>
#include <stdexcept>

using namespace std;

struct Edge {
    int u, v, w;
};

vector<int> bellmanFord(const vector<Edge>& edges, int V, int start) {
    vector<int> dist(V, INT_MAX);
    dist[start] = 0;
    
    for (int i = 0; i < V - 1; i++) {
        for (auto edge : edges) {
            if (dist[edge.u] != INT_MAX && dist[edge.u] + edge.w < dist[edge.v]) {
                dist[edge.v] = dist[edge.u] + edge.w;
            }
        }
    }
    
    for (auto edge : edges) {
        if (dist[edge.u] != INT_MAX && dist[edge.u] + edge.w < dist[edge.v]) {
            throw invalid_argument("Graph contains negative-weight cycle");
        }
    }
    
    return dist;
}`
  },

  'A* Pathfinding': {
    javascript: `function aStar(start, goal, heuristicFn, getNeighbors) {
  const openSet = new Set([start]);
  const gScore = new Map();
  const fScore = new Map();
  const cameFrom = new Map();

  gScore.set(start, 0);
  fScore.set(start, heuristicFn(start, goal));

  while (openSet.size > 0) {
    // Find node in openSet with lowest fScore
    let current = null;
    for (let node of openSet) {
      if (current === null || fScore.get(node) < fScore.get(current)) {
        current = node;
      }
    }

    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }

    openSet.delete(current);

    for (let neighbor of getNeighbors(current)) {
      const tentativeG = gScore.get(current) + neighbor.cost;
      const neighborG = gScore.has(neighbor.node) ? gScore.get(neighbor.node) : Infinity;

      if (tentativeG < neighborG) {
        cameFrom.set(neighbor.node, current);
        gScore.set(neighbor.node, tentativeG);
        fScore.set(neighbor.node, tentativeG + heuristicFn(neighbor.node, goal));
        openSet.add(neighbor.node);
      }
    }
  }
  return null; // No path found
}`,
    python: `import heapq

def a_star(start, goal, h_func, get_neighbors):
    open_set = []
    heapq.heappush(open_set, (h_func(start, goal), 0, start))
    came_from = {}
    g_score = {start: 0}
    
    while open_set:
        f, g, current = heapq.heappop(open_set)
        
        if current == goal:
            return reconstruct_path(came_from, current)
            
        for neighbor, cost in get_neighbors(current):
            tentative_g = g_score[current] + cost
            if tentative_g < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score = tentative_g + h_func(neighbor, goal)
                heapq.heappush(open_set, (f_score, tentative_g, neighbor))
                
    return None`,
    cpp: `#include <vector>
#include <queue>
#include <unordered_map>
#include <utility>
#include <cmath>

using namespace std;

struct Node {
    int id;
    double f, g;
    bool operator>(const Node& other) const { return f > other.f; }
};

vector<int> aStar(int start, int goal, const vector<vector<pair<int, double>>>& adj, const vector<double>& h) {
    priority_queue<Node, vector<Node>, greater<Node>> pq;
    unordered_map<int, int> cameFrom;
    unordered_map<int, double> gScore;
    
    gScore[start] = 0;
    pq.push({start, h[start], 0});
    
    while (!pq.empty()) {
        int curr = pq.top().id;
        pq.pop();
        
        if (curr == goal) {
            // Reconstruct path
            vector<int> path;
            int temp = goal;
            while (temp != start) {
                path.insert(path.begin(), temp);
                temp = cameFrom[temp];
            }
            path.insert(path.begin(), start);
            return path;
        }
        
        for (auto edge : adj[curr]) {
            int nextNode = edge.first;
            double cost = edge.second;
            double tentativeG = gScore[curr] + cost;
            
            if (gScore.find(nextNode) == gScore.end() || tentativeG < gScore[nextNode]) {
                cameFrom[nextNode] = curr;
                gScore[nextNode] = tentativeG;
                pq.push({nextNode, tentativeG + h[nextNode], tentativeG});
            }
        }
    }
    return {}; // Empty path (not found)
}`
  },

  'Binary Tree': {
    javascript: `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
}`,
    python: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
        
    def insert(self, value):
        new_node = Node(value)
        if not self.root:
            self.root = new_node
            return
        curr = self.root
        while True:
            if value == curr.value:
                return
            if value < curr.value:
                if not curr.left:
                    curr.left = new_node
                    break
                curr = curr.left
            else:
                if not curr.right:
                    curr.right = new_node
                    break
                curr = curr.right`,
    cpp: `struct Node {
    int value;
    Node* left = nullptr;
    Node* right = nullptr;
    Node(int val) : value(val) {}
};

class BST {
public:
    Node* root = nullptr;
    
    void insert(int val) {
        Node* newNode = new Node(val);
        if (!root) {
            root = newNode;
            return;
        }
        Node* curr = root;
        while (true) {
            if (val == curr->value) return;
            if (val < curr->value) {
                if (!curr->left) {
                    curr->left = newNode;
                    break;
                }
                curr = curr->left;
            } else {
                if (!curr->right) {
                    curr->right = newNode;
                    break;
                }
                curr = curr->right;
            }
        }
    }
};`
  },

  'Linked List': {
    javascript: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
}`,
    python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node`,
    cpp: `struct Node {
    int data;
    Node* next = nullptr;
    Node(int val) : data(val) {}
};

class LinkedList {
public:
    Node* head = nullptr;
    
    void append(int val) {
        Node* newNode = new Node(val);
        if (!head) {
            head = newNode;
            return;
        }
        Node* curr = head;
        while (curr->next) {
            curr = curr->next;
        }
        curr->next = newNode;
    }
};`
  },

  'Hash Table': {
    javascript: `class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    let index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }
}`,
    python: `class HashTable:
    def __init__(self, size=53):
        self.size = size
        self.key_map = [[] for _ in range(size)]
        
    def _hash(self, key):
        total = 0
        for char in key[:100]:
            total = (total * 31 + ord(char)) % self.size
        return total
        
    def set(self, key, value):
        index = self._hash(key)
        self.key_map[index].append((key, value))`,
    cpp: `#include <string>
#include <vector>
#include <list>
#include <utility>

class HashTable {
    int size;
    std::vector<std::list<std::pair<std::string, std::string>>> keyMap;
    
    int hash(const std::string& key) {
        int total = 0;
        for (int i = 0; i < std::min((int)key.length(), 100); i++) {
            total = (total * 31 + key[i]) % size;
        }
        return total;
    }
public:
    HashTable(int s = 53) : size(s), keyMap(s) {}
    
    void set(const std::string& key, const std::string& value) {
        int index = hash(key);
        keyMap[index].push_back({key, value});
    }
};`
  },

  'Stack': {
    javascript: `class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) return "Underflow";
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`,
    python: `class Stack:
    def __init__(self):
        self.items = []
        
    def push(self, val):
        self.items.append(val)
        
    def pop(self):
        if self.is_empty():
            return None
        return self.items.pop()
        
    def peek(self):
        return self.items[-1] if not self.is_empty() else None
        
    def is_empty(self):
        return len(self.items) == 0`,
    cpp: `#include <vector>
#include <stdexcept>

class Stack {
    std::vector<int> items;
public:
    void push(int val) {
        items.push_back(val);
    }
    
    int pop() {
        if (items.empty()) throw std::underflow_error("Stack is empty");
        int val = items.back();
        items.pop_back();
        return val;
    }
    
    int peek() const {
        if (items.empty()) throw std::underflow_error("Stack is empty");
        return items.back();
    }
    
    bool isEmpty() const {
        return items.empty();
    }
};`
  },

  'Queue': {
    javascript: `class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`,
    python: `from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
        
    def enqueue(self, val):
        self.items.append(val)
        
    def dequeue(self):
        if self.is_empty():
            return None
        return self.items.popleft()
        
    def front(self):
        return self.items[0] if not self.is_empty() else None
        
    def is_empty(self):
        return len(self.items) == 0`,
    cpp: `#include <list>
#include <stdexcept>

class Queue {
    std::list<int> items;
public:
    void enqueue(int val) {
        items.push_back(val);
    }
    
    int dequeue() {
        if (items.empty()) throw std::underflow_error("Queue is empty");
        int val = items.front();
        items.pop_front();
        return val;
    }
    
    int front() const {
        if (items.empty()) throw std::underflow_error("Queue is empty");
        return items.front();
    }
    
    bool isEmpty() const {
        return items.empty();
    }
};`
  },

  'Fibonacci DP': {
    javascript: `function fibonacciDP(n) {
  if (n <= 1) return n;
  const fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
}`,
    python: `def fibonacci_dp(n):
    if n <= 1:
        return n
    fib = [0] * (n + 1)
    fib[1] = 1
    for i in range(2, n + 1):
        fib[i] = fib[i - 1] + fib[i - 2]
    return fib[n]`,
    cpp: `#include <vector>

long long fibonacciDP(int n) {
    if (n <= 1) return n;
    std::vector<long long> fib(n + 1);
    fib[0] = 0;
    fib[1] = 1;
    for (int i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n];
}`
  },

  '0/1 Knapsack': {
    javascript: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][capacity];
}`,
    python: `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                )
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][capacity]`,
    cpp: `#include <vector>
#include <algorithm>

int knapsack(const std::vector<int>& weights, const std::vector<int>& values, int capacity) {
    int n = weights.size();
    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(capacity + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = std::max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][capacity];
}`
  },

  'Coin Change': {
    javascript: `function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    python: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if i - coin >= 0:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
    cpp: `#include <vector>
#include <algorithm>
#include <climits>

int coinChange(const std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (i - coin >= 0 && dp[i - coin] != INT_MAX) {
                dp[i] = std::min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}`
  }
};
