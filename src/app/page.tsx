"use client";

import WindowComponent from "@/components/Window/index";
import React, { useState, useCallback } from "react";
import Calculator from "@/components/Calculator";
import Notepad from "@/components/Notepad";
import Taskbar from "@/components/Taskbar";
import Each from "@/components/Each";
import ResumeContent from "@/components/ResumeContent";
import BootScreen from "@/components/BootScreen";

interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  initialPosition: { x: number; y: number };
  initialWidth: number;
  initialHeight: number;
  zIndex: number;
  isResizable?: boolean;
  isMaximized?: boolean;
  isMinimized?: boolean;
}

const initialWindows: WindowState[] = [];

let windowCounter = 0;

export default function HomePage() {
  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(
    initialWindows.length > 0 ? initialWindows[0].id : null
  );
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showStartMenu, setShowStartMenu] = useState<boolean>(false);

  const bringToFront = useCallback((id: string) => {
    setWindows((prevWindows) =>
      prevWindows
        .map((win) => ({
          ...win,
          zIndex: win.id === id ? prevWindows.length + 1 : win.zIndex,
        }))
        .sort((a, b) => a.zIndex - b.zIndex)
    );
    setActiveWindowId(id);
  }, []);

  const openCalculatorWindow = useCallback(() => {
    const existingCalculatorWindow = windows.find(
      (win) => win.title === "Calculator"
    );

    if (existingCalculatorWindow) {
      bringToFront(existingCalculatorWindow.id);
      return;
    }

    windowCounter++;
    const calculatorWindowId = `calculator-${windowCounter}`;
    const newWindow: WindowState = {
      id: calculatorWindowId,
      title: "Calculator",
      content: <Calculator />,
      initialPosition: {
        x: 150 + windowCounter * 10,
        y: 120 + windowCounter * 10,
      },
      initialWidth: 240,
      initialHeight: 320,
      zIndex: windows.length + 1,
      isResizable: false,
    };
    setWindows((prevWindows) => [...prevWindows, newWindow]);
    bringToFront(newWindow.id);
  }, [windows, bringToFront]);

  const openNotepadWindow = useCallback(() => {
    const existingNotepadWindow = windows.find(
      (win) => win.title === "Untitled - Notepad"
    );

    if (existingNotepadWindow) {
      bringToFront(existingNotepadWindow.id);
      return;
    }

    windowCounter++;
    const notepadWindowId = `notepad-${windowCounter}`;
    const newWindow: WindowState = {
      id: notepadWindowId,
      title: "Untitled - Notepad",
      content: <Notepad />,
      initialPosition: {
        x: 200 + windowCounter * 15,
        y: 100 + windowCounter * 15,
      },
      initialWidth: 500,
      initialHeight: 400,
      zIndex: windows.length + 1,
      isResizable: true,
    };
    setWindows((prevWindows) => [...prevWindows, newWindow]);
    bringToFront(newWindow.id);
  }, [windows, bringToFront]);

  const openResumeWindow = useCallback(() => {
    const existingResumeWindow = windows.find((win) => win.title === "Resume");

    if (existingResumeWindow) {
      bringToFront(existingResumeWindow.id);
      return;
    }

    windowCounter++;
    const resumeWindowId = `resume-${windowCounter}`;
    const newWindow: WindowState = {
      id: resumeWindowId,
      title: "Resume",
      content: <ResumeContent />,
      initialPosition: {
        x: 180 + windowCounter * 10,
        y: 140 + windowCounter * 10,
      },
      initialWidth: 600,
      initialHeight: 500,
      zIndex: windows.length + 1,
      isResizable: true,
    };
    setWindows((prevWindows) => [...prevWindows, newWindow]);
    bringToFront(newWindow.id);
  }, [windows, bringToFront]);

  const closeWindow = useCallback(
    (id: string) => {
      setWindows((prevWindows) => prevWindows.filter((win) => win.id !== id));
      if (activeWindowId === id) {
        const remainingWindows = windows.filter((win) => win.id !== id);
        if (remainingWindows.length > 0) {
          const topWindow = remainingWindows.reduce((prev, current) =>
            prev.zIndex > current.zIndex ? prev : current
          );
          setActiveWindowId(topWindow.id);
        } else {
          setActiveWindowId(null);
        }
      }
    },
    [activeWindowId, windows]
  );

  const maximizeWindow = useCallback(
    (id: string) => {
      setWindows((prevWindows) =>
        prevWindows.map((win) =>
          win.id === id
            ? { ...win, isMaximized: !win.isMaximized, isMinimized: false }
            : win
        )
      );
      bringToFront(id);
    },
    [bringToFront]
  );

  const restoreWindow = useCallback(
    (id: string) => {
      setWindows((prevWindows) =>
        prevWindows.map((win) =>
          win.id === id
            ? { ...win, isMaximized: false, isMinimized: false }
            : win
        )
      );
      bringToFront(id);
    },
    [bringToFront]
  );

  const minimizeWindow = useCallback(
    (id: string) => {
      setWindows((prevWindows) =>
        prevWindows.map((win) =>
          win.id === id
            ? { ...win, isMinimized: true, isMaximized: false }
            : win
        )
      );
      // If the minimized window was active, find the next active window
      if (activeWindowId === id) {
        const remainingVisible = windows.filter(
          (win) => win.id !== id && !win.isMinimized
        );
        if (remainingVisible.length > 0) {
          const topWindow = remainingVisible.reduce((prev, current) =>
            prev.zIndex > current.zIndex ? prev : current
          );
          setActiveWindowId(topWindow.id);
        } else {
          setActiveWindowId(null);
        }
      }
    },
    [activeWindowId, windows]
  );

  const handleIconClick = (iconId: string) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      if (iconId === "calculator-icon") {
        openCalculatorWindow();
      }
      if (iconId === "notepad-icon") {
        openNotepadWindow();
      }
      if (iconId === "resume-icon") {
        openResumeWindow();
      }
      setSelectedIconId(null);
    } else {
      setSelectedIconId(iconId);
      const timeout = setTimeout(() => {
        setClickTimeout(null);
      }, 300);
      setClickTimeout(timeout);
    }
  };

  const handleStartClick = () => {
    setShowStartMenu(!showStartMenu);
  };

  const handleTaskClick = (id: string) => {
    const window = windows.find((win) => win.id === id);
    if (window?.isMinimized) {
      // Restore the window if it's minimized
      restoreWindow(id);
    } else {
      // Just bring to front if it's already visible
      bringToFront(id);
    }
  };

  const handleStartMenuAction = (action: string) => {
    setShowStartMenu(false);
    switch (action) {
      case "calculator":
        openCalculatorWindow();
        break;
      case "notepad":
        openNotepadWindow();
        break;
      case "resume":
        openResumeWindow();
        break;
    }
  };

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  // Show boot screen if still booting
  if (isBooting) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  return (
    <main
      className="relative w-screen h-screen overflow-hidden"
      style={{ paddingBottom: "30px" }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest(".xp-taskbar, .xp-start-menu")) {
          return;
        }
        setSelectedIconId(null);
        setShowStartMenu(false);
        if (clickTimeout) {
          clearTimeout(clickTimeout);
          setClickTimeout(null);
        }
      }}
    >
      {/* Windows */}
      <Each
        of={windows}
        render={(win) => (
          <WindowComponent
            key={win.id}
            isFocused={win.id === activeWindowId}
            title={win.title}
            initialPosition={win.initialPosition}
            initialWidth={win.initialWidth}
            initialHeight={win.initialHeight}
            onClose={() => closeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onRestore={() => restoreWindow(win.id)}
            zIndex={win.zIndex}
            onFocus={() => bringToFront(win.id)}
            isResizable={win.isResizable !== undefined ? win.isResizable : true}
            isMaximized={win.isMaximized || false}
            isMinimized={win.isMinimized || false}
          >
            {win.content}
          </WindowComponent>
        )}
      />

      {/* Desktop Icons */}
      <div
        className={`absolute top-4 left-4 xp-desktop-icon ${
          selectedIconId === "calculator-icon" ? "selected" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleIconClick("calculator-icon");
        }}
        onDoubleClick={() => openCalculatorWindow()}
      >
        <div className="xp-icon-image">🔢</div>
        <div className="xp-icon-label">Calculator</div>
      </div>

      <div
        className={`absolute top-4 left-20 xp-desktop-icon ${
          selectedIconId === "notepad-icon" ? "selected" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleIconClick("notepad-icon");
        }}
        onDoubleClick={() => openNotepadWindow()}
      >
        <div className="xp-icon-image">📝</div>
        <div className="xp-icon-label">Notepad</div>
      </div>

      <div
        className={`absolute top-4 left-36 xp-desktop-icon ${
          selectedIconId === "resume-icon" ? "selected" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleIconClick("resume-icon");
        }}
        onDoubleClick={() => openResumeWindow()}
      >
        <div className="xp-icon-image">📄</div>
        <div className="xp-icon-label">Resume</div>
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <div
          className="xp-menu absolute bottom-8 left-2 w-64 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="xp-menuitem"
            onClick={() => handleStartMenuAction("calculator")}
          >
            🔢 Calculator
          </div>
          <div
            className="xp-menuitem"
            onClick={() => handleStartMenuAction("notepad")}
          >
            📝 Notepad
          </div>
          <div
            className="xp-menuitem"
            onClick={() => handleStartMenuAction("resume")}
          >
            📄 Resume
          </div>
          <hr style={{ margin: "4px 0", border: "1px inset #716f64" }} />
          <div className="xp-menuitem">⚙️ Control Panel</div>
          <div className="xp-menuitem">🔍 Search</div>
        </div>
      )}

      {/* Taskbar */}
      <Taskbar
        openWindows={windows.map((win) => ({
          id: win.id,
          title: win.title,
          isFocused: win.id === activeWindowId && !win.isMinimized,
          isMinimized: win.isMinimized,
        }))}
        onTaskClick={handleTaskClick}
        onStartClick={handleStartClick}
      />
    </main>
  );
}
