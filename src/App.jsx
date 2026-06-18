import React, { useState } from 'react';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AlgorithmHub from './pages/AlgorithmHub';
import CodeEditor from './pages/CodeEditor';
import Documentation from './pages/Documentation';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('simulator'); // 'simulator' | 'hub' | 'editor' | 'docs'
  const [activeAlgorithm, setActiveAlgorithm] = useState(null);
  const [phase, setPhase] = useState('welcome'); // 'welcome' | 'params' | 'simulation'
  const [simulationParams, setSimulationParams] = useState({});

  const handleSelectAlgorithm = (algo) => {
    setActiveAlgorithm(algo);
    setPhase('params');
    setActiveView('simulator');
  };

  const handleRunSimulation = (params) => {
    setSimulationParams(params);
    setPhase('simulation');
  };

  const handleBackToParams = () => setPhase('params');

  const handleLaunchFromHub = (algo) => {
    setActiveAlgorithm(algo);
    setPhase('params');
    setActiveView('simulator');
  };

  const isSimulator = activeView === 'simulator';

  return (
    <>
      <TopNav activeView={activeView} setActiveView={setActiveView} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar only shown in simulator view */}
        {isSimulator && (
          <Sidebar
            activeAlgorithm={activeAlgorithm}
            setActiveAlgorithm={handleSelectAlgorithm}
          />
        )}

        {/* Main content area */}
        {isSimulator && (
          <Dashboard
            phase={phase}
            activeAlgorithm={activeAlgorithm}
            simulationParams={simulationParams}
            onRunSimulation={handleRunSimulation}
            onBackToParams={handleBackToParams}
          />
        )}
        {activeView === 'hub' && (
          <AlgorithmHub onLaunch={handleLaunchFromHub} />
        )}
        {activeView === 'editor' && (
          <CodeEditor onLaunch={handleLaunchFromHub} />
        )}
        {activeView === 'docs' && (
          <Documentation onLaunch={handleLaunchFromHub} />
        )}
      </div>
    </>
  );
}

export default App;
