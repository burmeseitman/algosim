import React, { useState, useMemo } from 'react';
import { ALGORITHM_CONFIG, ALGORITHM_DESCRIPTIONS } from '../data/algorithmData';
import './AlgorithmHub.css';

const CATEGORY_META = {
  sorting:       { label: 'Sorting',       color: '#38bdf8', bg: 'rgba(56,189,248,0.1)',  border: 'rgba(56,189,248,0.3)'  },
  search:        { label: 'Search',         color: '#f0aa00', bg: 'rgba(240,170,0,0.1)',   border: 'rgba(240,170,0,0.3)'   },
  graph:         { label: 'Graph',          color: '#a855f7', bg: 'rgba(168,85,247,0.1)',  border: 'rgba(168,85,247,0.3)'  },
  datastructure: { label: 'Data Struct.',   color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.3)'  },
  dp:            { label: 'Dynamic Prog.',  color: '#fb923c', bg: 'rgba(251,146,60,0.1)',  border: 'rgba(251,146,60,0.3)'  },
};

const FILTERS = ['All', 'Sorting', 'Search', 'Graph', 'Data Struct.', 'Dynamic Prog.'];

const AlgorithmHub = ({ onLaunch }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const algorithms = useMemo(() =>
    Object.entries(ALGORITHM_CONFIG).map(([name, config]) => ({
      name,
      ...config,
      description: ALGORITHM_DESCRIPTIONS[name] || '',
    }))
  , []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return algorithms.filter(a => {
      const meta = CATEGORY_META[a.category];
      const filterMatch = activeFilter === 'All' || meta?.label === activeFilter;
      const queryMatch = !q || a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || (a.tags || []).some(t => t.includes(q));
      return filterMatch && queryMatch;
    });
  }, [algorithms, query, activeFilter]);

  const counts = useMemo(() => {
    const c = { All: algorithms.length };
    algorithms.forEach(a => {
      const label = CATEGORY_META[a.category]?.label;
      if (label) c[label] = (c[label] || 0) + 1;
    });
    return c;
  }, [algorithms]);

  return (
    <div className="hub">
      {/* Header */}
      <div className="hub-header">
        <div>
          <h2 className="hub-title">Algorithm Hub</h2>
          <p className="hub-subtitle">{algorithms.length} algorithms across 5 categories — click any card to launch</p>
        </div>
        <div className="hub-search-wrap">
          <span className="hub-search-icon">⌕</span>
          <input
            className="hub-search"
            placeholder="Search algorithms, tags..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && <button className="hub-search-clear" onClick={() => setQuery('')}>✕</button>}
        </div>
      </div>

      {/* Filter chips */}
      <div className="hub-filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
            <span className="filter-count">{counts[f] || 0}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="hub-grid">
        {filtered.length === 0 ? (
          <div className="hub-empty">
            <span className="hub-empty-icon">⊘</span>
            <p>No algorithms match your search.</p>
          </div>
        ) : filtered.map(algo => {
          const meta = CATEGORY_META[algo.category] || CATEGORY_META.sorting;
          return (
            <div
              key={algo.name}
              className="algo-card"
              style={{ '--card-color': meta.color, '--card-bg': meta.bg, '--card-border': meta.border }}
              onClick={() => onLaunch(algo.name)}
            >
              <div className="algo-card-top">
                <div className="algo-card-icon">{algo.icon}</div>
                <span className="algo-card-category">{meta.label}</span>
              </div>
              <h3 className="algo-card-name">{algo.name}</h3>
              <p className="algo-card-desc">{algo.description}</p>

              <div className="algo-card-complexity">
                <div className="complexity-item">
                  <span className="ci-label">Time</span>
                  <span className="ci-val">{algo.complexity}</span>
                </div>
                <div className="complexity-item">
                  <span className="ci-label">Space</span>
                  <span className="ci-val">{algo.space}</span>
                </div>
              </div>

              {(algo.tags || []).length > 0 && (
                <div className="algo-card-tags">
                  {(algo.tags || []).map(t => <span key={t} className="algo-tag">{t}</span>)}
                </div>
              )}

              <button className="algo-card-launch">
                Launch Simulation →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlgorithmHub;
