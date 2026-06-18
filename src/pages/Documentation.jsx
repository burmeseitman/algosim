import React, { useState } from 'react';
import { DOCUMENTATION_DATA } from '../data/documentationData';
import './Documentation.css';

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

const Documentation = ({ onLaunch }) => {
  const [selectedAlgo, setSelectedAlgo] = useState('Bubble Sort');
  const [expanded, setExpanded] = useState(categories.map(c => c.title));

  const toggleCategory = (title) => {
    setExpanded(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const doc = DOCUMENTATION_DATA[selectedAlgo];

  if (!doc) {
    return (
      <div className="docs-container">
        <div style={{ padding: 40, color: 'var(--text-muted)' }}>Documentation not found.</div>
      </div>
    );
  }

  return (
    <div className="docs-container">
      {/* Docs Sidebar Table of Contents */}
      <aside className="docs-sidebar">
        <div className="sidebar-header">
          <h3>Documentation</h3>
        </div>
        <div className="sidebar-nav">
          {categories.map(cat => (
            <div key={cat.title} className="nav-group">
              <div className="nav-group-title" onClick={() => toggleCategory(cat.title)}>
                <span className={`chevron ${expanded.includes(cat.title) ? 'open' : ''}`}>›</span>
                <span>{cat.title}</span>
              </div>
              {expanded.includes(cat.title) && (
                <div className="nav-group-items">
                  {cat.items.map(item => (
                    <div
                      key={item}
                      className={`nav-item ${selectedAlgo === item ? 'active' : ''}`}
                      onClick={() => setSelectedAlgo(item)}
                    >
                      <span className="doc-bullet">○</span>
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Docs Main Content Panel */}
      <main className="docs-main">
        <div className="docs-header">
          <div>
            <div className="category-tag">Reference Guide</div>
            <h2>{selectedAlgo}</h2>
          </div>
          <button 
            className="docs-run-btn"
            onClick={() => onLaunch(selectedAlgo)}
          >
            ▶ Launch Simulator
          </button>
        </div>

        <div className="docs-content">
          {/* Description Section */}
          <section className="docs-section">
            <p className="description-text">{doc.description}</p>
          </section>

          {/* Complexity Table Section */}
          <section className="docs-section">
            <h3>Complexity Analysis</h3>
            <div className="complexity-grid">
              <div className="complexity-card">
                <div className="card-label">Best Case</div>
                <div className="card-val best">{doc.complexity.best}</div>
              </div>
              <div className="complexity-card">
                <div className="card-label">Average Case</div>
                <div className="card-val average">{doc.complexity.average}</div>
              </div>
              <div className="complexity-card">
                <div className="card-label">Worst Case</div>
                <div className="card-val worst">{doc.complexity.worst}</div>
              </div>
              <div className="complexity-card">
                <div className="card-label">Space Complexity</div>
                <div className="card-val space">{doc.complexity.space}</div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="docs-section">
            <h3>Common Use Cases</h3>
            <ul className="use-cases-list">
              {doc.useCases.map((useCase, idx) => (
                <li key={idx}>
                  <span className="list-icon">✓</span>
                  {useCase}
                </li>
              ))}
            </ul>
          </section>

          {/* Advantages / Disadvantages */}
          <section className="docs-section pros-cons-section">
            <div className="pros-cons-grid">
              <div className="pro-card">
                <h4>Advantages</h4>
                <ul>
                  {doc.advantages.map((adv, idx) => (
                    <li key={idx}>
                      <span className="bullet pro">+</span>
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="con-card">
                <h4>Disadvantages</h4>
                <ul>
                  {doc.disadvantages.map((dis, idx) => (
                    <li key={idx}>
                      <span className="bullet con">-</span>
                      {dis}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Pseudocode Block */}
          <section className="docs-section">
            <h3>Pseudocode</h3>
            <div className="pseudocode-container">
              <pre className="pseudocode-pre">
                <code>{doc.pseudocode}</code>
              </pre>
            </div>
          </section>

          {/* Related Algorithms */}
          {doc.related && doc.related.length > 0 && (
            <section className="docs-section related-section">
              <h3>Related Algorithms</h3>
              <div className="related-links">
                {doc.related.map(relatedAlgoName => (
                  <button
                    key={relatedAlgoName}
                    className="related-link-btn"
                    onClick={() => setSelectedAlgo(relatedAlgoName)}
                  >
                    {relatedAlgoName} →
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Documentation;
