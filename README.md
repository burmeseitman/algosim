# AlgoSim 3D — Volumetric Algorithm Simulator & CS Learning Hub

AlgoSim 3D is a modern, responsive, and visually stunning web application built to visualize computer science algorithms. It features interactive HTML5 Canvas simulators, a searchable algorithm hub, a custom-styled multi-language code editor, and comprehensive documentation guides.

---

## 🎨 Key Features

1. **22 Supported Algorithms**: Spanning Sorting, Searching, Graph Theory, Data Structures, and Dynamic Programming.
2. **Transforming Simulation Canvas**: Custom 2D/3D visual styles for each category:
   - **Sorting**: Volumetric 3D isometric bar charts with smooth interpolation.
   - **Graph Theory**: Glowing nodes with customizable weighted edges and search frontiers.
   - **Searching**: Diamond grid pathfinding and linear block highlights.
   - **Data Structures**: BST layouts, linked list pointers, stacks, queues, and hash slots.
   - **Dynamic Programming**: 1D memoization arrays and 2D tabulation grid structures.
3. **Interactive Parameter Control**: Dynamic control fields to adjust input array types (Random, Nearly Sorted, Reversed), pivot strategies, search targets, graph density, DP values, and animation playback speeds.
4. **Code Library & Syntax-Highlighted Editor**: In-app code viewer supporting JavaScript, Python, and C++ with custom token coloring and a clipboard copy function.
5. **Interactive Reference Guides**: Comprehensive documentation complete with complexity grids, use cases, pros/cons, pseudocode, and algorithm cross-links.

---

## 🛠️ Supported Algorithms & Complexity Matrix

| Category | Algorithm | Time Complexity (Avg) | Space Complexity |
| :--- | :--- | :--- | :--- |
| **Sorting** | Bubble Sort | $O(n^2)$ | $O(1)$ |
| | Insertion Sort | $O(n^2)$ | $O(1)$ |
| | Selection Sort | $O(n^2)$ | $O(1)$ |
| | Merge Sort | $O(n \log n)$ | $O(n)$ |
| | Quick Sort | $O(n \log n)$ | $O(\log n)$ |
| | Heap Sort | $O(n \log n)$ | $O(1)$ |
| **Search** | Linear Search | $O(n)$ | $O(1)$ |
| | Binary Search | $O(\log n)$ | $O(1)$ |
| | Jump Search | $O(\sqrt{n})$ | $O(1)$ |
| **Graph Theory** | Dijkstra's Algorithm | $O(E \log V)$ | $O(V)$ |
| | BFS (Breadth-First Search) | $O(V + E)$ | $O(V)$ |
| | DFS (Depth-First Search) | $O(V + E)$ | $O(V)$ |
| | Prim's MST Algorithm | $O(E \log V)$ | $O(V)$ |
| | Bellman-Ford Algorithm | $O(V E)$ | $O(V)$ |
| | A* Pathfinding | $O(E \log V)$ | $O(V)$ |
| **Data Structures** | Binary Search Tree | $O(\log n)$ | $O(n)$ |
| | Linked List | $O(n)$ | $O(n)$ |
| | Hash Table | $O(1)$ avg | $O(n)$ |
| | Stack (LIFO) | $O(1)$ | $O(n)$ |
| | Queue (FIFO) | $O(1)$ | $O(n)$ |
| **Dynamic Programming** | Fibonacci DP | $O(n)$ | $O(n)$ |
| | 0/1 Knapsack | $O(n W)$ | $O(n W)$ |
| | Coin Change | $O(A \times C)$ | $O(A)$ |

---

## 💻 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/) (Vite HMR)
- **Styling**: Vanilla CSS (sleek dark mode variables, glassmorphism, responsive grids, orbital rings)
- **Simulation**: High-performance HTML5 Canvas APIs
- **Icons & Badges**: Volumetric Unicode styling

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (recommended version >= 18).

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd algosim
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser to view the application.

### Build
Generate the production bundle:
```bash
npm run build
```
The static build will be output to the `dist/` directory.
