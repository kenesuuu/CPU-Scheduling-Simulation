import React, { useState } from 'react';

const PriorityPreemptive: React.FC = () => {
  const [processes, setProcesses] = useState<any[]>([{ id: 1, arrivalTime: 0, burstTime: 0, priority: 0, completionTime: 0, turnaroundTime: 0, waitingTime: 0 }]);
  const [processId, setProcessId] = useState<number>(2);

  const addProcess = () => {
    setProcesses([...processes, { id: processId, arrivalTime: 0, burstTime: 0, priority: 0, completionTime: 0, turnaroundTime: 0, waitingTime: 0 }]);
    setProcessId(prevId => prevId + 1);
  };

  const resetProcesses = () => {
    setProcesses([{ id: 1, arrivalTime: 0, burstTime: 0, priority: 0, completionTime: 0, turnaroundTime: 0, waitingTime: 0 }]);
    setProcessId(2);
  };

  const runPriorityPreemptive = () => {
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let currentTime = 0;
    const remainingBurstTimes = sortedProcesses.map(process => process.burstTime);
    const completionTimes = new Array<number>(sortedProcesses.length).fill(0);
    while (true) {
      let idx = -1;
      let highestPriority = Number.MAX_VALUE;
      for (let i = 0; i < sortedProcesses.length; i++) {
        if (sortedProcesses[i].arrivalTime <= currentTime && remainingBurstTimes[i] > 0 && sortedProcesses[i].priority < highestPriority) {
          idx = i;
          highestPriority = sortedProcesses[i].priority;
        }
      }
      if (idx === -1) {
        // No process to execute at current time
        let nextProcessArrival = Number.MAX_VALUE;
        for (let i = 0; i < sortedProcesses.length; i++) {
          if (sortedProcesses[i].arrivalTime > currentTime && sortedProcesses[i].arrivalTime < nextProcessArrival) {
            nextProcessArrival = sortedProcesses[i].arrivalTime;
          }
        }
        currentTime = nextProcessArrival;
      } else {
        remainingBurstTimes[idx]--;
        currentTime++;
        completionTimes[idx] = currentTime;
        if (remainingBurstTimes[idx] === 0) {
          sortedProcesses[idx].completionTime = completionTimes[idx];
          sortedProcesses[idx].turnaroundTime = completionTimes[idx] - sortedProcesses[idx].arrivalTime;
          sortedProcesses[idx].waitingTime = sortedProcesses[idx].turnaroundTime - sortedProcesses[idx].burstTime;
        }
      }
      if (remainingBurstTimes.every(bt => bt === 0)) break;
    }
    setProcesses(sortedProcesses);
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
      <h2 className="text-4xl font-bold mb-8">Priority Preemptive Algorithm</h2>

      {/* Input form */}
      <button onClick={addProcess} className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 mb-4">
        Add Process
      </button>

      {/* Table of processes */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-2 px-4">Process ID</th>
              <th className="border border-gray-300 py-2 px-4">Arrival Time</th>
              <th className="border border-gray-300 py-2 px-4">Burst Time</th>
              <th className="border border-gray-300 py-2 px-4">Priority</th>
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
                <td className="border border-gray-300 py-2 px-4">
                  <input
                    type="number"
                    value={process.priority}
                    onChange={(e) => handleEdit(process.id, 'priority', parseInt(e.target.value))}
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
      <button onClick={runPriorityPreemptive} className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 mt-4 mr-2">
        Run Priority Preemptive
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

export default PriorityPreemptive;
