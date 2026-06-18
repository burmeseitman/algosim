import React from 'react';
import WelcomeView from './WelcomeView';
import ParamView from './ParamView';
import SimulationView from './SimulationView';

const Dashboard = ({ phase, activeAlgorithm, simulationParams, onRunSimulation, onBackToParams }) => {
  if (phase === 'welcome' || !activeAlgorithm) {
    return <WelcomeView />;
  }
  if (phase === 'params') {
    return <ParamView algorithm={activeAlgorithm} onRun={onRunSimulation} />;
  }
  if (phase === 'simulation') {
    return (
      <SimulationView
        algorithm={activeAlgorithm}
        params={simulationParams}
        onBack={onBackToParams}
      />
    );
  }
  return <WelcomeView />;
};

export default Dashboard;
