import React, { useState, useEffect, useRef } from 'react';
import { ALGORITHM_CONFIG } from '../data/algorithmData';
import SortingCanvas from '../simulators/SortingCanvas';
import GraphCanvas from '../simulators/GraphCanvas';
import SearchCanvas from '../simulators/SearchCanvas';
import DataStructureCanvas from '../simulators/DataStructureCanvas';
import DPCanvas from '../simulators/DPCanvas';
import './SimulationView.css';

const SimulationView = ({ algorithm, params, onBack }) => {
  const config = ALGORITHM_CONFIG[algorithm];
  const steps = config?.getSteps(params) || [];
  const totalSteps = steps.length;

  const [stepIndex, setStepIndex] = useState(0);
  const [playState, setPlayState] = useState('paused');
  const intervalRef = useRef(null);

  const speed = params?.speed || 1;

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (playState === 'playing') {
      intervalRef.current = setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setPlayState('paused');
            return prev;
          }
          return prev + 1;
        });
      }, Math.max(200, 1200 / speed));
    }
    return () => clearInterval(intervalRef.current);
  }, [playState, speed, totalSteps]);

  const handleStepForward = () => {
    setPlayState('paused');
    setStepIndex((p) => Math.min(p + 1, totalSteps - 1));
  };
  const handleStepBack = () => {
    setPlayState('paused');
    setStepIndex((p) => Math.max(p - 1, 0));
  };
  const handleReset = () => {
    setPlayState('paused');
    setStepIndex(0);
  };
  const togglePlay = () => {
    if (stepIndex >= totalSteps - 1) {
      setStepIndex(0);
    }
    setPlayState((p) => (p === 'playing' ? 'paused' : 'playing'));
  };

  const currentStep = steps[stepIndex] || {};
  const isComplete = stepIndex >= totalSteps - 1;
  const progress = totalSteps > 1 ? (stepIndex / (totalSteps - 1)) * 100 : 0;

  const renderCanvas = () => {
    const props = { steps, stepIndex, algorithm };
    if (config?.category === 'sorting') return <SortingCanvas {...props} />;
    if (config?.category === 'graph') return <GraphCanvas {...props} />;
    if (config?.category === 'search') return <SearchCanvas {...props} />;
    if (config?.category === 'datastructure') return <DataStructureCanvas {...props} />;
    if (config?.category === 'dp') return <DPCanvas {...props} />;
    return null;
  };

  return (
    <div className="simview">
      {/* Header bar */}
      <div className="simview-header">
        <button className="back-btn" onClick={onBack}>
          ← Parameters
        </button>
        <div className="simview-title">
          <span className="simview-algo">{algorithm}</span>
          <span className="simview-sep">·</span>
          <span className="simview-category">{config?.category}</span>
        </div>
        <div className="simview-stats">
          <span className="stat-chip">Step {stepIndex + 1} / {totalSteps}</span>
          <span className={`status-pill ${isComplete ? 'complete' : playState === 'playing' ? 'running' : 'paused'}`}>
            {isComplete ? '✓ Complete' : playState === 'playing' ? '● Running' : '⏸ Paused'}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Main area */}
      <div className="simview-body">
        {/* Canvas viewport */}
        <div className="simview-canvas-wrap">
          {renderCanvas()}
        </div>

        {/* Trace log */}
        <div className="simview-log">
          <div className="log-header">Real-time Trace Log</div>
          <div className="log-body">
            {steps.slice(0, stepIndex + 1).map((step, i) => {
              const log = step.log || '';
              return (
                <div key={i} className={`log-entry ${i === stepIndex ? 'current' : ''}`}>
                  <span className="log-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="log-text">{log}</span>
                </div>
              );
            })}
          </div>

          {/* Complexity info */}
          <div className="log-footer">
            <div className="info-row">
              <span className="info-key">Time Complexity</span>
              <span className="info-val">{config?.complexity}</span>
            </div>
            <div className="info-row">
              <span className="info-key">Space Complexity</span>
              <span className="info-val">{config?.space}</span>
            </div>
            <div className="info-row">
              <span className="info-key">Playback Speed</span>
              <span className="info-val">{speed}x</span>
            </div>
          </div>
        </div>
      </div>

      {/* Playback controls */}
      <div className="simview-controls">
        <button className="ctrl-btn" onClick={handleReset} title="Reset">↻</button>
        <button className="ctrl-btn" onClick={handleStepBack} title="Step Back" disabled={stepIndex === 0}>⏮</button>
        <button className={`ctrl-btn play-btn ${playState === 'playing' ? 'active' : ''}`} onClick={togglePlay}>
          {playState === 'playing' ? '⏸' : '▶'}
        </button>
        <button className="ctrl-btn" onClick={handleStepForward} title="Step Forward" disabled={isComplete}>⏭</button>
        <div className="speed-display">
          <span className="speed-label">Speed</span>
          <span className="speed-val">{speed}x</span>
        </div>
      </div>
    </div>
  );
};

export default SimulationView;
