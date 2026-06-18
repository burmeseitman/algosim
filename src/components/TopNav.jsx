import React from 'react';
import './TopNav.css';

const NAV_ITEMS = [
  { key: 'simulator', label: 'Dashboard', icon: '⊞' },
  { key: 'hub',       label: 'Algorithm Hub', icon: '◈' },
  { key: 'editor',    label: 'Code Editor', icon: '⌨' },
  { key: 'docs',      label: 'Documentation', icon: '≡' },
];

const TopNav = ({ activeView, setActiveView }) => {
  return (
    <header className="topnav">
      <div className="topnav-logo">
        <div className="topnav-icon"></div>
        <h1>AlgoSim 3D: Interactive Algorithm Visualizer</h1>
      </div>
      <div className="topnav-links">
        {NAV_ITEMS.map(({ key, label, icon }) => (
          <button
            key={key}
            id={`nav-${key}`}
            className={`topnav-link ${activeView === key ? 'active' : ''}`}
            onClick={() => setActiveView(key)}
          >
            <span className="nav-icon">{icon}</span>
            {label}
          </button>
        ))}
      </div>
      <div className="topnav-profile">
        <div className="avatar"></div>
      </div>
    </header>
  );
};

export default TopNav;
