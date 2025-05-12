"use client";

import WindowComponent from "@/components/Window";
import MenuBar from "@/components/MenuBar";
import React, { useState, useCallback } from "react";
import Calculator from "@/components/Calculator"; // Added import

interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  initialPosition: { x: number; y: number };
  initialWidth: number;
  initialHeight: number;
  zIndex: number;
  isResizable?: boolean; // Added optional isResizable property
  rounded?: boolean; // Added optional rounded property
}

const initialWindows: WindowState[] = [
  // {
  //   id: "welcome",
  //   title: "Welcome to Mac OS Classic",
  //   content: (
  //     <>
  //       <p className="mb-2">
  //         Welcome to this Next.js Mac OS Classic recreation!
  //       </p>
  //       <p className="mb-2">You can drag this window by its title bar.</p>
  //       {/* Button to open another window will be handled by a function */}
  //     </>
  //   ),
  //   initialPosition: { x: 50, y: 30 },
  //   initialWidth: 380,
  //   initialHeight: 150,
  //   zIndex: 2,
  // },
];

let windowCounter = 0;

export default function HomePage() {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(
    initialWindows.length > 0 ? initialWindows[0].id : null
  );
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null); // Added for icon selection
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null); // For double click detection

  const bringToFront = useCallback((id: string) => {
    setWindows(
      (prevWindows) =>
        prevWindows
          .map((win) => ({
            ...win,
            zIndex: win.id === id ? prevWindows.length : win.zIndex,
          }))
          .sort((a, b) => a.zIndex - b.zIndex) // Re-sort might not be strictly necessary if zIndex is managed well
    );
    setActiveWindowId(id);
  }, []);

  const openNewWindow = () => {
    windowCounter++;
    const newWindow: WindowState = {
      id: `new-window-${windowCounter}`,
      title: `New Window ${windowCounter}`,
      content: (
        <p>This is another draggable window. You can add any content here!</p>
      ),
      initialPosition: {
        x: 100 + windowCounter * 20,
        y: 80 + windowCounter * 20,
      },
      initialWidth: 300,
      initialHeight: 180,
      zIndex: windows.length + 1, // Ensure new window is on top
    };
    setWindows((prevWindows) => [...prevWindows, newWindow]);
    bringToFront(newWindow.id);
  };

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
      initialWidth: 215, // Adjusted for calculator size + padding
      initialHeight: 310, // Adjusted for calculator size + padding + title bar
      zIndex: windows.length + 1,
      isResizable: false, // Added to disable resizing for calculator
      rounded: true, // Added to make the calculator window rounded
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
      content: (
        <div className="p-4 flex justify-center items-center h-full">
          <h1 className="text-2xl font-bold">Abi Raditya Putra Falaki</h1>
        </div>
      ),
      initialPosition: {
        x: 180 + windowCounter * 10,
        y: 140 + windowCounter * 10,
      },
      initialWidth: 350,
      initialHeight: 200,
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
        // If the closed window was active, try to set the top-most remaining window as active
        const remainingWindows = windows.filter((win) => win.id !== id);
        if (remainingWindows.length > 0) {
          const topWindow = remainingWindows.reduce((prev, current) =>
            prev.zIndex > current.zIndex ? prev : current
          );
          setActiveWindowId(topWindow.id);
        }
      }
    },
    [activeWindowId, windows]
  );

  // Add button to welcome window content dynamically
  const welcomeWindowContent = (
    <>
      <p className="mb-2">Welcome to this Next.js Mac OS Classic recreation!</p>
      <p className="mb-2">You can drag this window by its title bar.</p>
      <button className="mac-button" onClick={openNewWindow}>
        Open Another Window
      </button>
    </>
  );

  const handleMenuItemClick = (menuTitle: string, itemTitle: string) => {
    console.log(`Menu item clicked: ${menuTitle} > ${itemTitle}`);
    if (menuTitle === "Special" && itemTitle === "Calculator") {
      openCalculatorWindow();
    }
    if (menuTitle === "Special" && itemTitle === "Resume") {
      openResumeWindow();
    }
    // Handle other menu item actions here
  };

  const handleIconClick = (iconId: string) => {
    if (clickTimeout) {
      // Double click
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      if (iconId === "calculator-icon") {
        openCalculatorWindow();
      }
      if (iconId === "resume-icon") {
        openResumeWindow();
      }
      setSelectedIconId(null); // Deselect after opening
    } else {
      // Single click
      setSelectedIconId(iconId);
      const timeout = setTimeout(() => {
        // If no second click, it's a single click
        setClickTimeout(null);
        // If you want to deselect on clicking away, you'd handle that here or in a desktop click handler
      }, 300); // Standard double click timeout
      setClickTimeout(timeout);
    }
  };

  return (
    <main
      className="relative w-screen h-screen overflow-hidden pt-[22px]"
      id="desktop"
      onClick={(e) => {
        // Deselect icon if clicking on the desktop background
        if ((e.target as HTMLElement).id === "desktop") {
          setSelectedIconId(null);
          if (clickTimeout) {
            clearTimeout(clickTimeout);
            setClickTimeout(null);
          }
        }
      }}
    >
      {" "}
      {/* Adjusted pt for menu bar height */}
      <MenuBar onMenuItemClick={handleMenuItemClick} />
      {windows.map((win) => (
        <WindowComponent
          key={win.id}
          title={win.id === activeWindowId ? `■ ${win.title}` : win.title} // Add a square or similar to active window title
          initialPosition={win.initialPosition}
          initialWidth={win.initialWidth}
          initialHeight={win.initialHeight}
          onClose={() => closeWindow(win.id)}
          zIndex={win.zIndex}
          onFocus={() => bringToFront(win.id)}
          isResizable={win.isResizable !== undefined ? win.isResizable : true} // Pass isResizable prop
          minWidth={win.title === "Calculator" ? 194 : undefined} // Optional: set minWidth for calc if needed
          minHeight={win.title === "Calculator" ? 280 : undefined} // Optional: set minHeight for calc if needed
          rounded={win.rounded} // Pass rounded prop from WindowState
        >
          {win.id === "welcome" ? welcomeWindowContent : win.content}
        </WindowComponent>
      ))}
      {/* Calculator Icon */}
      <div
        id="calculator-icon"
        className={`absolute top-10 left-10 flex flex-col items-center cursor-default group ${
          selectedIconId === "calculator-icon" ? "selected-icon" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleIconClick("calculator-icon");
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openCalculatorWindow();
            setSelectedIconId(null);
          }
        }}
        aria-label="Open Calculator"
        aria-selected={selectedIconId === "calculator-icon"}
      >
        <img src="/file.svg" alt="Calculator Icon" width={32} height={32} />
        <span
          className={`text-xs mt-1 text-white rounded-sm px-1 group-focus:ring-2 group-focus:ring-blue-500 group-hover:bg-opacity-75 ${
            selectedIconId === "calculator-icon"
              ? "bg-blue-700 bg-opacity-75"
              : "bg-black bg-opacity-50"
          }`}
        >
          Calculator
        </span>
      </div>
      {/* Resume Icon */}
      <div
        id="resume-icon"
        className={`absolute top-10 left-24 flex flex-col items-center cursor-default group ${
          selectedIconId === "resume-icon" ? "selected-icon" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleIconClick("resume-icon");
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openResumeWindow();
            setSelectedIconId(null);
          }
        }}
        aria-label="Open Resume"
        aria-selected={selectedIconId === "resume-icon"}
      >
        <img src="/file.svg" alt="Resume Icon" width={32} height={32} />
        <span
          className={`text-xs mt-1 text-white rounded-sm px-1 group-focus:ring-2 group-focus:ring-blue-500 group-hover:bg-opacity-75 ${
            selectedIconId === "resume-icon"
              ? "bg-blue-700 bg-opacity-75"
              : "bg-black bg-opacity-50"
          }`}
        >
          Resume
        </span>
      </div>
    </main>
  );
}
