import React, { useState } from 'react';
import { ALGORITHM_CONFIG, ALGORITHM_DESCRIPTIONS } from '../data/algorithmData';
import './ParamView.css';

const PARAM_DEFS = {
  sorting: (algo) => [
    { key: 'inputType', label: 'Input Array Type', type: 'select', options: ['Random Array', 'Nearly Sorted', 'Reversed'], default: 'Random Array' },
    ...(algo === 'Quick Sort' ? [{ key: 'pivotStrategy', label: 'Pivot Strategy', type: 'select', options: ['Last Element', 'Random', 'Median of 3'], default: 'Last Element' }] : []),
    { key: 'speed', label: 'Playback Speed', type: 'range', min: 0.5, max: 5, step: 0.5, default: 1.5, unit: 'x' },
  ],
  search: (algo) => [
    {
      key: 'target', label: 'Search Target', type: 'numberInput',
      default: algo === 'Linear Search' ? 22 : algo === 'Jump Search' ? 55 : 55,
      min: 0, max: 99,
      hint: algo === 'Binary Search' ? 'Pre-sorted array: [7,11,13,22,34,45,55,90]'
          : algo === 'Jump Search' ? 'Sorted array: [0,1,1,2,3,5,8,13,21,34,55,89]'
          : 'Unsorted array: [11,34,7,55,22,90,45,13]',
    },
    { key: 'speed', label: 'Playback Speed', type: 'range', min: 0.5, max: 5, step: 0.5, default: 1.5, unit: 'x' },
  ],
  graph: () => [
    { key: 'showWeights', label: 'Show Edge Weights', type: 'toggle', default: true },
    { key: 'speed', label: 'Playback Speed', type: 'range', min: 0.5, max: 3, step: 0.5, default: 1, unit: 'x' },
  ],
  datastructure: () => [
    { key: 'speed', label: 'Playback Speed', type: 'range', min: 0.5, max: 5, step: 0.5, default: 1.5, unit: 'x' },
  ],
  dp: (algo) => [
    ...(algo === 'Fibonacci DP' ? [{ key: 'n', label: 'Compute F(n)', type: 'range', min: 5, max: 15, step: 1, default: 10, unit: '' }] : []),
    ...(algo === 'Coin Change' ? [{ key: 'amount', label: 'Target Amount', type: 'range', min: 4, max: 12, step: 1, default: 6, unit: '' }] : []),
    { key: 'speed', label: 'Playback Speed', type: 'range', min: 0.5, max: 5, step: 0.5, default: 1.5, unit: 'x' },
  ],
};

const ParamView = ({ algorithm, onRun }) => {
  const config = ALGORITHM_CONFIG[algorithm];
  const paramDefs = (PARAM_DEFS[config?.category] || PARAM_DEFS.sorting)(algorithm);

  const [params, setParams] = useState(() =>
    Object.fromEntries(paramDefs.map((p) => [p.key, p.default]))
  );

  const set = (key, val) => setParams((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="paramview">
      {/* Left: Info */}
      <div className="paramview-info">
        <div className="paramview-badge">{config?.icon} {config?.category?.toUpperCase()}</div>
        <h2 className="paramview-title">{algorithm}</h2>
        <div className="complexity-row">
          <div className="complexity-chip">
            <span className="complexity-label">Time</span>
            <span className="complexity-value">{config?.complexity}</span>
          </div>
          <div className="complexity-chip">
            <span className="complexity-label">Space</span>
            <span className="complexity-value">{config?.space}</span>
          </div>
        </div>
        <p className="paramview-desc">
          {getDescription(algorithm)}
        </p>
        <div className="paramview-instructions">
          <div className="instruction-step">
            <div className="step-num">1</div>
            <span>Configure the parameters on the right</span>
          </div>
          <div className="instruction-step">
            <div className="step-num">2</div>
            <span>Click <strong>Run Simulation</strong> to launch</span>
          </div>
          <div className="instruction-step">
            <div className="step-num">3</div>
            <span>Use Play / Pause / Step to control the animation</span>
          </div>
        </div>
      </div>

      {/* Right: Parameters */}
      <div className="paramview-form">
        <div className="form-card">
          <div className="form-card-header">
            <h3>Simulation Parameters</h3>
            <span className="form-algo-tag">{algorithm}</span>
          </div>
          <div className="form-fields">
            {paramDefs.map((def) => (
              <div key={def.key} className="field-group">
                <label className="field-label">
                  {def.label}
                  {def.unit && <span className="field-value">{params[def.key]}{def.unit}</span>}
                </label>

                {def.type === 'range' && (
                  <input
                    type="range"
                    className="range-slider blue"
                    min={def.min} max={def.max} step={def.step || 1}
                    value={params[def.key]}
                    onChange={(e) => set(def.key, parseFloat(e.target.value))}
                  />
                )}

                {def.type === 'select' && (
                  <div className="radio-group">
                    {def.options.map((opt) => (
                      <button
                        key={opt}
                        className={`radio-btn ${params[def.key] === opt ? 'active' : ''}`}
                        onClick={() => set(def.key, opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {def.type === 'numberInput' && (
                  <>
                    <input
                      type="number"
                      className="number-input"
                      min={def.min} max={def.max}
                      value={params[def.key]}
                      onChange={(e) => set(def.key, parseInt(e.target.value) || def.default)}
                    />
                    {def.hint && <p className="field-hint">{def.hint}</p>}
                  </>
                )}

                {def.type === 'toggle' && (
                  <button
                    className={`toggle-btn ${params[def.key] ? 'active' : ''}`}
                    onClick={() => set(def.key, !params[def.key])}
                  >
                    <span className="toggle-knob" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button className="run-btn" onClick={() => onRun(params)}>
            <span>Run Simulation</span>
            <span className="run-btn-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

function getDescription(algo) {
  return ALGORITHM_DESCRIPTIONS[algo] || 'An important computer science algorithm.';
}

export default ParamView;
