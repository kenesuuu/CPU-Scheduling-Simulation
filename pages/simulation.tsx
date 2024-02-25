import React, { useState } from 'react';
import FCFS from '../components/FCFS';
import PriorityPreemptive from '../components/PriorityPreemptive';
import PriorityNonPreemptive from '../components/PriorityNonPreemptive';
import RoundRobinPreemptive from '../components/RoundRobinPreemptive';
import ShortestJobFirstPreemptive from '../components/ShortestJobFirstPreemptive';

const SimulationPage: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('FCFS');

  const renderSelectedAlgorithm = () => {
    switch (selectedAlgorithm) {
      case 'FCFS':
        return <FCFS />;
      case 'PriorityPreemptive':
        return <PriorityPreemptive />;
      case 'PriorityNonPreemptive':
        return <PriorityNonPreemptive />;
      case 'RoundRobinPreemptive':
        return <RoundRobinPreemptive />;
      case 'ShortestJobFirstPreemptive':
        return <ShortestJobFirstPreemptive />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-4">CPU Scheduling Simulation</h1>
      
      {/* Dropdown to select algorithm */}
      <div className="mb-4">
        <label htmlFor="algorithm" className="block font-semibold mb-2">Select Algorithm:</label>
        <select
          id="algorithm"
          className="border border-gray-300 rounded p-2 w-full"
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
        >
          <option value="FCFS">First Come First Serve (FCFS)</option>
          <option value="PriorityPreemptive">Priority (Preemptive)</option>
          <option value="PriorityNonPreemptive">Priority (Non Preemptive)</option>
          <option value="RoundRobinPreemptive">Round Robin (Preemptive)</option>
          <option value="ShortestJobFirstPreemptive">Shortest Job First (Preemptive)</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        {renderSelectedAlgorithm()}
      </div>
    </div>
  );
};

export default SimulationPage;