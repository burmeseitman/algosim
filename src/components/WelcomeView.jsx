import React from 'react';
import './WelcomeView.css';

const WelcomeView = () => {
  return (
    <div className="welcome-view">
      <div className="welcome-bg">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="welcome-particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }} />
        ))}
      </div>
      <div className="welcome-content">
        <div className="welcome-logo">
          <div className="logo-ring outer" />
          <div className="logo-ring inner" />
          <div className="logo-core">3D</div>
        </div>
        <h1 className="welcome-title">AlgoSim <span>3D</span></h1>
        <p className="welcome-subtitle">Interactive Algorithm Visualizer</p>
        <div className="welcome-divider" />
        <p className="welcome-hint">
          Select an algorithm from the <span>left sidebar</span> to configure and launch an interactive 3D simulation.
        </p>
        <div className="welcome-categories">
          {[
            { icon: '↕', label: 'Sorting', desc: 'Bubble · Merge · Quick' },
            { icon: '⌖', label: 'Search', desc: 'Linear · Binary · A*' },
            { icon: '⊕', label: 'Graph Theory', desc: "Dijkstra · BFS · DFS" },
            { icon: '⬦', label: 'Data Structures', desc: 'Tree · List · Hash' },
          ].map(c => (
            <div key={c.label} className="welcome-card">
              <div className="welcome-card-icon">{c.icon}</div>
              <div className="welcome-card-label">{c.label}</div>
              <div className="welcome-card-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
