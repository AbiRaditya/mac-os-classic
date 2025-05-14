"use client";

import WindowComponent from "@/components/Window";
import MenuBar from "@/components/MenuBar";
import React, { useState, useCallback } from "react";
import Calculator from "@/components/Calculator";
import Image from "next/image";
import Each from "@/components/Each"; // Import the Each component

interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  initialPosition: { x: number; y: number };
  initialWidth: number;
  initialHeight: number;
  zIndex: number;
  isResizable?: boolean;
  rounded?: boolean;
}

const initialWindows: WindowState[] = [];

let windowCounter = 0;

export default function HomePage() {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(
    initialWindows.length > 0 ? initialWindows[0].id : null
  );
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const bringToFront = useCallback((id: string) => {
    setWindows(
      (prevWindows) =>
        prevWindows
          .map((win) => ({
            ...win,
            zIndex: win.id === id ? prevWindows.length : win.zIndex,
          }))
          .sort((a, b) => a.zIndex - b.zIndex)
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
      zIndex: windows.length + 1,
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
      initialWidth: 215,
      initialHeight: 310,
      zIndex: windows.length + 1,
      isResizable: false,
      rounded: true,
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
  };

  const handleIconClick = (iconId: string) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      if (iconId === "calculator-icon") {
        openCalculatorWindow();
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

  return (
    <main
      className="relative w-screen h-screen overflow-hidden pt-[22px]"
      id="desktop"
      onClick={(e) => {
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
      <MenuBar onMenuItemClick={handleMenuItemClick} />
      <Each
        of={windows}
        render={(win) => (
          <WindowComponent
            key={win.id}
            isFocused={win.id === activeWindowId}
            title={win.id === activeWindowId ? `■ ${win.title}` : win.title}
            initialPosition={win.initialPosition}
            initialWidth={win.initialWidth}
            initialHeight={win.initialHeight}
            onClose={() => closeWindow(win.id)}
            zIndex={win.zIndex}
            onFocus={() => bringToFront(win.id)}
            isResizable={win.isResizable !== undefined ? win.isResizable : true}
            rounded={win.rounded}
          >
            {win.id === "welcome" ? welcomeWindowContent : win.content}
          </WindowComponent>
        )}
      />
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
        aria-pressed={selectedIconId === "calculator-icon"}
      >
        <Image src="/file.svg" alt="Calculator Icon" width={32} height={32} />
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
        aria-pressed={selectedIconId === "resume-icon"}
      >
        <Image src="/file.svg" alt="Resume Icon" width={32} height={32} />
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
