"use client";

import React from "react";

interface TaskbarProps {
  openWindows: Array<{
    id: string;
    title: string;
    isFocused: boolean;
    isMinimized?: boolean;
  }>;
  onTaskClick: (id: string) => void;
  onStartClick: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  onTaskClick,
  onStartClick,
}) => {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="xp-taskbar">
      <button className="xp-start-button" onClick={onStartClick}>
        <span style={{ marginRight: "4px" }}>🪟</span>
        start
      </button>

      <div className="xp-taskbar-tasks">
        {openWindows.map((window) => (
          <button
            key={window.id}
            className={`xp-task-button ${window.isFocused ? "active" : ""} ${
              window.isMinimized ? "minimized" : ""
            }`}
            onClick={() => onTaskClick(window.id)}
            title={window.title}
          >
            {window.title}
          </button>
        ))}
      </div>

      <div className="xp-system-tray">
        <span>{getCurrentTime()}</span>
      </div>
    </div>
  );
};

export default Taskbar;
