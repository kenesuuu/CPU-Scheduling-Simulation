import React, { useState } from 'react';

const RoundRobinPreemptive: React.FC = () => {
  const [processes, setProcesses] = useState<any[]>([{ id: 1, arrivalTime: 0, burstTime: 0, completionTime: 0, turnaroundTime: 0, waitingTime: 0 }]);
  const [processId, setProcessId] = useState<number>(2);
  const [timeQuantum, setTimeQuantum] = useState<number>(1);

  const addProcess = () => {
    setProcesses([...processes, { id: processId, arrivalTime: 0, burstTime: 0, completionTime: 0, turnaroundTime: 0, waitingTime: 0 }]);
    setProcessId(prevId => prevId + 1);
  };

  const resetProcesses = () => {
    setProcesses([{ id: 1, arrivalTime: 0, burstTime: 0, completionTime: 0, turnaroundTime: 0, waitingTime: 0 }]);
    setProcessId(2);
  };

  const runRoundRobinPreemptive = () => {
    let currentTime = 0;
    const remainingBurstTimes = processes.map(process => process.burstTime);
    while (true) {
      let allProcessesCompleted = true;
      for (let i = 0; i < processes.length; i++) {
        if (remainingBurstTimes[i] > 0) {
          allProcessesCompleted = false;
          const executionTime = Math.min(timeQuantum, remainingBurstTimes[i]);
          remainingBurstTimes[i] -= executionTime;
          currentTime += executionTime;
          processes[i].completionTime = currentTime;
          if (remainingBurstTimes[i] === 0) {
            processes[i].turnaroundTime = processes[i].completionTime - processes[i].arrivalTime;
            processes[i].waitingTime = processes[i].turnaroundTime - processes[i].burstTime;
          }
        }
      }
      if (allProcessesCompleted) break;
    }
    setProcesses([...processes]);
  };

  const handleEdit = (id: number, key: string, value: number) => {
    const updatedProcesses = processes.map(process => {
      if (process.id === id) {
        return { ...process, [key]: value };
      }
      return process;
    });
    setProcesses(updatedProcesses);
  };

  const calculateAverages = () => {
    const totalTurnaroundTime = processes.reduce((acc, curr) => acc + curr.turnaroundTime, 0);
    const totalWaitingTime = processes.reduce((acc, curr) => acc + curr.waitingTime, 0);
    return {
      averageTurnaroundTime: totalTurnaroundTime / processes.length,
      averageWaitingTime: totalWaitingTime / processes.length
    };
  };

  return (
    <div className="container mx-auto px-4 py-8 font-inter">
      <h2 className="text-4xl font-bold mb-8">Round Robin Preemptive Algorithm</h2>

      {/* Input form */}
      <button onClick={addProcess} className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 mb-4">
        Add Process
      </button>

      {/* Time Quantum input */}
      <div className="mb-4">
        <label htmlFor="timeQuantum" className="mb-2 text-lg font-semibold">Time Quantum:</label>
        <input
          type="number"
          id="timeQuantum"
          value={timeQuantum}
          onChange={(e) => setTimeQuantum(parseInt(e.target.value))}
          className="border border-gray-300 rounded p-2"
          min="1"
          inputMode="numeric"
          step="1"
        />
      </div>

      {/* Table of processes */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-2 px-4">Process ID</th>
              <th className="border border-gray-300 py-2 px-4">Arrival Time</th>
              <th className="border border-gray-300 py-2 px-4">Burst Time</th>
              <th className="border border-gray-300 py-2 px-4">Completion Time</th>
              <th className="border border-gray-300 py-2 px-4">Turn around Time</th>
              <th className="border border-gray-300 py-2 px-4">Waiting Time</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 py-2 px-4">{process.id}</td>
                <td className="border border-gray-300 py-2 px-4">
                  <input
                    type="number"
                    value={process.arrivalTime}
                    onChange={(e) => handleEdit(process.id, 'arrivalTime', parseInt(e.target.value))}
                    className="border border-gray-300 rounded p-1 w-20 text-center"
                  />
                </td>
                <td className="border border-gray-300 py-2 px-4">
                  <input
                    type="number"
                    value={process.burstTime}
                    onChange={(e) => handleEdit(process.id, 'burstTime', parseInt(e.target.value))}
                    className="border border-gray-300 rounded p-1 w-20 text-center"
                  />
                </td>
                <td className="border border-gray-300 py-2 px-4">{process.completionTime}</td>
                <td className="border border-gray-300 py-2 px-4">{process.turnaroundTime}</td>
                <td className="border border-gray-300 py-2 px-4">{process.waitingTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to run simulation */}
      <button onClick={runRoundRobinPreemptive} className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 mt-4 mr-2">
        Run Round Robin Preemptive
      </button>

      {/* Button to reset processes */}
      <button onClick={resetProcesses} className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 mt-4 ml-2">
        Reset Processes
      </button>

      {/* Display averages */}
      {processes.length > 0 && (
        <div className="mt-8">
          <p className="mb-2">Average Turnaround Time: {calculateAverages().averageTurnaroundTime.toFixed(2)}</p>
          <p>Average Waiting Time: {calculateAverages().averageWaitingTime.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default RoundRobinPreemptive;
