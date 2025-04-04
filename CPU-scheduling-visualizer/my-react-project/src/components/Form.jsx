import React, { useState } from "react";
import Visual from "./Visual.jsx";
const Form = () => {
  const [algo, setAlgo] = useState(""); // Selected algorithm
  const [table, setTable] = useState([]); // User input table
  const [outputTable, setOutputTable] = useState([]); // Generated output table
  const [quantum, setQuantum] = useState(2); // Time quantum for Round Robin
  const [process, setProcess] = useState({
    name: "",
    arrivalTime: "",
    burstTime: "",
    priority: "",
    color: "",
  });

  // Handle changes in dropdown and reset tables
  const handleAlgoChange = (e) => {
    setAlgo(e.target.value);
    setTable([]);
    setOutputTable([]);
  };

  // Handle process input changes
const handleInputChange = (e) => {
  const { id, value } = e.target;
  setProcess((prevProcess) => ({
    ...prevProcess,
    [id]: value,
    color: getRandomHexColor(), // Call the function to generate a new color
  }));
};


  // Add process to the table
  const generateTable = () => {
    setTable((prevTable) => [...prevTable, process]);
    setProcess({ name: "", arrivalTime: "", burstTime: "", priority: "" });
  };

  // Algorithm-specific logic
  const generateOutput = () => {
    const sortedProcesses = [...table].map((p) => ({
      ...p,
      arrivalTime: parseInt(p.arrivalTime),
      burstTime: parseInt(p.burstTime),
      priority: parseInt(p.priority || 0),
    }));
    console.log(sortedProcesses);
    let result = [];
    let currentTime = 0;

    switch (algo) {
      case "FCFS":
        result = sortedProcesses
          .sort((a, b) => a.arrivalTime - b.arrivalTime)
          .map((p) => {
            currentTime = Math.max(currentTime, p.arrivalTime) + p.burstTime;
            const completionTime = currentTime;
            const turnaroundTime = completionTime - p.arrivalTime;
            const waitingTime = turnaroundTime - p.burstTime;
            return { ...p, completionTime, turnaroundTime, waitingTime };
          });
        break;

      case "SJF":
        // Sort processes by arrival time initially
        sortedProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime);

        while (sortedProcesses.length) {
          // Get all processes that have arrived by the current time
          const available = sortedProcesses.filter(
            (p) => p.arrivalTime <= currentTime
          );

          // If no process is available, increment current time to the next process's arrival
          if (available.length === 0) {
            currentTime = sortedProcesses[0].arrivalTime;
            continue;
          }

          // Find the shortest job among the available processes
          const shortestJob = available.sort(
            (a, b) => a.burstTime - b.burstTime
          )[0];

          // Update current time and calculate metrics
          currentTime =
            Math.max(currentTime, shortestJob.arrivalTime) +
            shortestJob.burstTime;
          const completionTime = currentTime;
          const turnaroundTime = completionTime - shortestJob.arrivalTime;
          const waitingTime = turnaroundTime - shortestJob.burstTime;

          // Add the completed process to the result
          result.push({
            ...shortestJob,
            completionTime,
            turnaroundTime,
            waitingTime,
          });

          // Remove the shortest job from the list
          sortedProcesses.splice(sortedProcesses.indexOf(shortestJob), 1);
        }
        break;

      case "RRS":
        const queue = [...sortedProcesses];
        while (queue.length) {
          const process = queue.shift();
          const executionTime = Math.min(process.burstTime, quantum);
          currentTime =
            Math.max(currentTime, process.arrivalTime) + executionTime;
          process.burstTime -= executionTime;

          if (process.burstTime > 0) {
            queue.push(process);
          } else {
            const completionTime = currentTime;
            const turnaroundTime = completionTime - process.arrivalTime;
            const waitingTime = turnaroundTime - process.originalBurstTime;
            result.push({
              ...process,
              completionTime,
              turnaroundTime,
              waitingTime,
            });
          }
        }
        break;

      case "LJF":
        sortedProcesses.sort((a, b) => a.burstTime - b.burstTime);
        result = sortedProcesses.map((p) => {
          currentTime = Math.max(currentTime, p.arrivalTime) + p.burstTime;
          const completionTime = currentTime;
          const turnaroundTime = completionTime - p.arrivalTime;
          const waitingTime = turnaroundTime - p.burstTime;
          return { ...p, completionTime, turnaroundTime, waitingTime };
        });
        break;

      case "Priority CPU Scheduling":
        sortedProcesses.sort((a, b) => a.priority - b.priority);
        result = sortedProcesses.map((p) => {
          currentTime = Math.max(currentTime, p.arrivalTime) + p.burstTime;
          const completionTime = currentTime;
          const turnaroundTime = completionTime - p.arrivalTime;
          const waitingTime = turnaroundTime - p.burstTime;
          return { ...p, completionTime, turnaroundTime, waitingTime };
        });
        break;

      case "SRTF":
        let remainingProcesses = sortedProcesses.map((p) => ({
          ...p,
          remainingTime: p.burstTime, // Track remaining burst time for each process
        }));

        while (remainingProcesses.length) {
          // Get all processes that have arrived by the current time
          const available = remainingProcesses.filter(
            (p) => p.arrivalTime <= currentTime
          );

          if (available.length === 0) {
            currentTime = remainingProcesses[0].arrivalTime; // Skip to the next arrival time
            continue;
          }

          // Find the process with the shortest remaining time
          const shortest = available.sort(
            (a, b) => a.remainingTime - b.remainingTime
          )[0];

          // Execute the process for one unit of time
          currentTime += 1;
          shortest.remainingTime -= 1;

          // If the process is completed, calculate its metrics and remove it
          if (shortest.remainingTime === 0) {
            const completionTime = currentTime;
            const turnaroundTime = completionTime - shortest.arrivalTime;
            const waitingTime = turnaroundTime - shortest.burstTime;
            result.push({
              ...shortest,
              completionTime,
              turnaroundTime,
              waitingTime,
            });
            remainingProcesses = remainingProcesses.filter(
              (p) => p !== shortest
            );
          }
        }
        break;
      case "LRTF":
        let remainingProcessesLRTF = sortedProcesses.map((p) => ({
          ...p,
          remainingTime: p.burstTime, // Track remaining burst time for each process
        }));

        while (remainingProcessesLRTF.length) {
          // Get all processes that have arrived by the current time
          const available = remainingProcessesLRTF.filter(
            (p) => p.arrivalTime <= currentTime
          );

          if (available.length === 0) {
            currentTime = remainingProcessesLRTF[0].arrivalTime; // Skip to the next arrival time
            continue;
          }

          // Find the process with the longest remaining time
          const longest = available.sort(
            (a, b) => b.remainingTime - a.remainingTime
          )[0];

          // Execute the process for one unit of time
          currentTime += 1;
          longest.remainingTime -= 1;

          // If the process is completed, calculate its metrics and remove it
          if (longest.remainingTime === 0) {
            const completionTime = currentTime;
            const turnaroundTime = completionTime - longest.arrivalTime;
            const waitingTime = turnaroundTime - longest.burstTime;
            result.push({
              ...longest,
              completionTime,
              turnaroundTime,
              waitingTime,
            });
            remainingProcessesLRTF = remainingProcessesLRTF.filter(
              (p) => p !== longest
            );
          }
        }
        break;

      default:
        break;
    }

    setOutputTable(result);
    console.log(outputTable);
  };
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  }
  return (
    <section id="form" className="bg-primary py-14">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl text-center text-textprimary mb-10">
          Select Algo
        </h1>

        {/* Dropdown for selecting CPU scheduling algorithm */}
        <div className="flex justify-center mb-8 text-black">
          <select
            value={algo}
            onChange={handleAlgoChange}
            className="p-3 bg-white rounded-md"
          >
            <option value="">Select Scheduling Algorithm</option>
            <option value="FCFS">FCFS (First Come First Serve)</option>
            <option value="SJF">SJF (Shortest Job First)</option>
            <option value="RRS">RRS (Round Robin Scheduling)</option>
            <option value="LJF">LJF (Longest Job First)</option>
            <option value="Priority CPU Scheduling">
              Priority CPU Scheduling
            </option>
            <option value="SRTF">SRTF (Shortest Remaining Time First)</option>
            <option value="LRTF">LRTF (Longest Remaining Time First)</option>
          </select>
        </div>

        {algo === "RRS" && (
          <div className="mb-4 text-center">
            <label className="mr-2">Quantum:</label>
            <input
              type="number"
              value={quantum}
              onChange={(e) => setQuantum(parseInt(e.target.value))}
              className="p-2 border rounded"
            />
          </div>
        )}

        {/* Display corresponding input and button when an algorithm is selected */}
        {algo && (
          <div className="flex flex-col items-center">
            <label className="text-xl mb-4">
              Enter Process Details for {algo}
            </label>
            <div className="flex flex-row justify-between items-center gap-4">
              <div className="flex flex-col">
                <label htmlFor="name">Process Name</label>
                <input
                  id="name"
                  type="text"
                  value={process.name}
                  onChange={handleInputChange}
                  placeholder="Enter process name"
                  className="p-3 mb-4 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="arrivalTime">Arrival Time</label>
                <input
                  id="arrivalTime"
                  type="text"
                  value={process.arrivalTime}
                  onChange={handleInputChange}
                  placeholder="Enter arrival time"
                  className="p-3 mb-4 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="burstTime">Burst Time</label>
                <input
                  id="burstTime"
                  type="text"
                  value={process.burstTime}
                  onChange={handleInputChange}
                  placeholder="Enter burst time"
                  className="p-3 mb-4 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="priority">Priority</label>
                <input
                  id="priority"
                  type="text"
                  value={process.priority}
                  onChange={handleInputChange}
                  placeholder="Enter priority"
                  className="p-3 mb-4 border rounded-md"
                />
              </div>
            </div>
            <button
              onClick={generateTable}
              className="bg-blue-500 text-white py-2 px-6 rounded-md"
            >
              Add Task
            </button>
          </div>
        )}

        {/* Display the table */}
        {table.length > 0 && (
          <div className="mt-8 flex flex-col items-center">
            <h2 className="text-2xl text-center mb-4">
              Generated Table for {algo}
            </h2>
            <table className="table-auto mx-auto rounded-2xl">
              <caption>
                <strong>CPU SCHEDULING TABLE</strong>
              </caption>
              <thead>
                <tr>
                  <th className="border p-3">Process Name</th>
                  <th className="border p-3">Arrival Time</th>
                  <th className="border p-3">Burst Time</th>
                  <th className="border p-3">Priority</th>
                </tr>
              </thead>
              <tbody>
                {table.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-4" style={{ backgroundColor: item.color }}>{item.name}</td>
                    <td className="border p-3">{item.arrivalTime}</td>
                    <td className="border p-3">{item.burstTime}</td>
                    <td className="border p-3">{item.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={generateOutput}
              className="bg-blue-500 text-white py-2 px-6 rounded-md mt-4 max-w-[300px]"
            >
              Generate Output
            </button>
          </div>
        )}

        {/* Display the output table */}
        {outputTable.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl text-center mb-4">
              Generated output table for {algo}
            </h2>
            <table className="table-auto mx-auto rounded-2xl">
              <thead>
                <tr>
                  <th className="border p-3">Process Name</th>
                  <th className="border p-3">Arrival Time</th>
                  <th className="border p-3">Burst Time</th>
                  <th className="border p-3">Completion Time</th>
                  <th className="border p-3">Turnaround Time</th>
                  <th className="border p-3">Waiting Time</th>
                </tr>
              </thead>
              <tbody>
                {outputTable.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-4" style={{ backgroundColor: item.color }}>{item.name}</td>
                    <td className="border p-3">{item.arrivalTime}</td>
                    <td className="border p-3">{item.burstTime}</td>
                    <td className="border p-3">{item.completionTime}</td>
                    <td className="border p-3">{item.turnaroundTime}</td>
                    <td className="border p-3">{item.waitingTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <h2 className="text-2xl text-center mt-12 mb-4">Vizualization</h2>
              <Visual data={outputTable} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Form;
