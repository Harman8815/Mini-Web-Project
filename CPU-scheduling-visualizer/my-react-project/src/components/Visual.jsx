import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";

const Visual = (props) => {
  const data = props.data;
  const [visibleItems, setVisibleItems] = useState([]);
  const [allDisplayed, setAllDisplayed] = useState(false);
  const [taskSegments, setTaskSegments] = useState([]);

  useEffect(() => {
    // Sort tasks by arrival time
    const sortedData = [...data].sort((a, b) => a.arrivalTime - b.arrivalTime);
    
    // Divide tasks into segments
    const segments = [];
    let currentTime = 0;

    sortedData.forEach((item) => {
      // If the task arrives after the current time, it should be on hold
      if (item.arrivalTime > currentTime) {
        // Add hold period (this part is where the task waits)
        segments.push({ name: "X", type: "hold", startTime: currentTime, endTime: item.arrivalTime });
        currentTime = item.arrivalTime;
      }

      // Add the task's execution period (the actual burst time)
      segments.push({
        name: item.name,
        type: "execute",
        startTime: currentTime,
        endTime: currentTime + item.burstTime,
        color: item.color,
      });

      // Update the current time
      currentTime += item.burstTime;
    });

    setTaskSegments(segments);

    // Trigger the task display sequence after a delay
    const timers = [];
    segments.forEach((segment, index) => {
      const timer = setTimeout(() => {
        setVisibleItems((prev) => {
          const updatedList = [...prev, segment];
          if (updatedList.length === segments.length) setAllDisplayed(true);
          return updatedList;
        });
      }, index * 1000);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [data]);

  const block = (segment, index) => {
    const width = (segment.endTime - segment.startTime) * 3.5 + "%";
    const taskStyle =
      segment.type === "execute" ? { backgroundColor: segment.color } : { backgroundColor: "black", color: "white" };

    return (
      <div
        key={`${segment.name}-${index}`}
        className="border-2 rounded-xl border-amber-800 max-w-[20vw] min-w-24 min-h-20 flex flex-col justify-between p-1 text-black"
        style={{ width }}
      >
        <div
          className="head text-center rounded-md text-xl font-bold py-3"
          style={taskStyle}
        ><strong>
          {segment.name}</strong>
        </div>
        <div className="info flex flex-row justify-between px-4 mt-2">
          <span
            data-tooltip-id={`tooltip-arrival-${index}`}
            data-tooltip-content="Arrival Time"
          >
            {segment.startTime}
          </span>
          <Tooltip id={`tooltip-arrival-${index}`} />
          <span
            data-tooltip-id={`tooltip-completion-${index}`}
            data-tooltip-content="Completion Time"
          >
            {segment.endTime}
          </span>
          <Tooltip id={`tooltip-completion-${index}`} />
        </div>
      </div>
    );
  };

  return (
    <section id="visual" className="visual px-4 py-12 flex flex-wrap gap-4">
      {visibleItems.map((element, index) => block(element, index))}
      {allDisplayed && (
        <div className="w-full text-center text-green-600 font-bold mt-4">
          All items displayed!
        </div>
      )}
    </section>
  );
};

export default Visual;
