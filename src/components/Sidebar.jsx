import React, { useState } from 'react';
import './Sidebar.css';

const categories = [
  {
    title: 'Sorting Algorithms',
    items: ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort'],
  },
  {
    title: 'Search Algorithms',
    items: ['Linear Search', 'Binary Search', 'Jump Search'],
  },
  {
    title: 'Graph Theory',
    items: ["Dijkstra's", 'BFS', 'DFS', "Prim's MST", 'Bellman-Ford', 'A* Pathfinding'],
  },
  {
    title: 'Data Structures',
    items: ['Binary Tree', 'Linked List', 'Hash Table', 'Stack', 'Queue'],
  },
  {
    title: 'Dynamic Programming',
    items: ['Fibonacci DP', '0/1 Knapsack', 'Coin Change'],
  },
];

const Sidebar = ({ activeAlgorithm, setActiveAlgorithm }) => {
  const [expanded, setExpanded] = useState(categories.map(c => c.title));

  const toggleCategory = (title) => {
    setExpanded(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const totalCount = categories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div>
          <h2>Algorithms</h2>
          <span className="sidebar-count">{totalCount} available</span>
        </div>
        <button className="icon-btn">«</button>
      </div>
      <div className="sidebar-nav">
        {categories.map(cat => (
          <div key={cat.title} className="nav-group">
            <div className="nav-group-title" onClick={() => toggleCategory(cat.title)}>
              <span className={`chevron ${expanded.includes(cat.title) ? 'open' : ''}`}>›</span>
              <span>{cat.title}</span>
              <span className="cat-count">{cat.items.length}</span>
            </div>
            {expanded.includes(cat.title) && (
              <div className="nav-group-items">
                {cat.items.map(item => (
                  <div
                    key={item}
                    className={`nav-item ${activeAlgorithm === item ? 'active' : ''}`}
                    onClick={() => setActiveAlgorithm(item)}
                  >
                    <span className="dot"></span>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
