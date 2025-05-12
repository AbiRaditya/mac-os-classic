'use client';

import WindowComponent from '@/components/Window';
import MenuBar from '@/components/MenuBar';
import React, { useState, useCallback } from 'react';

interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  initialPosition: { x: number; y: number };
  initialWidth: number;
  initialHeight: number;
  zIndex: number;
}

const initialWindows: WindowState[] = [
  {
    id: 'welcome',
    title: 'Welcome to Mac OS Classic',
    content: (
      <>
        <p className="mb-2">Welcome to this Next.js Mac OS Classic recreation!</p>
        <p className="mb-2">You can drag this window by its title bar.</p>
        {/* Button to open another window will be handled by a function */}
      </>
    ),
    initialPosition: { x: 50, y: 30 },
    initialWidth: 380,
    initialHeight: 150,
    zIndex: 2,
  },
];

let windowCounter = 0;

export default function HomePage() {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(initialWindows.length > 0 ? initialWindows[0].id : null);

  const bringToFront = useCallback((id: string) => {
    setWindows(prevWindows =>
      prevWindows.map(win => ({ ...win, zIndex: win.id === id ? prevWindows.length : win.zIndex }))
                 .sort((a, b) => a.zIndex - b.zIndex) // Re-sort might not be strictly necessary if zIndex is managed well
    );
    setActiveWindowId(id);
  }, []);

  const openNewWindow = () => {
    windowCounter++;
    const newWindow: WindowState = {
      id: `new-window-${windowCounter}`,
      title: `New Window ${windowCounter}`,
      content: <p>This is another draggable window. You can add any content here!</p>,
      initialPosition: { x: 100 + windowCounter * 20, y: 80 + windowCounter * 20 },
      initialWidth: 300,
      initialHeight: 180,
      zIndex: windows.length + 1, // Ensure new window is on top
    };
    setWindows(prevWindows => [...prevWindows, newWindow]);
    bringToFront(newWindow.id);
  };

  const closeWindow = useCallback((id: string) => {
    setWindows(prevWindows => prevWindows.filter(win => win.id !== id));
    if (activeWindowId === id) {
      // If the closed window was active, try to set the top-most remaining window as active
      const remainingWindows = windows.filter(win => win.id !== id);
      if (remainingWindows.length > 0) {
        const topWindow = remainingWindows.reduce((prev, current) => (prev.zIndex > current.zIndex ? prev : current));
        setActiveWindowId(topWindow.id);
      }
    }
  }, [activeWindowId, windows]);

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

  return (
    <main className="relative w-screen h-screen overflow-hidden pt-[20px]" id="desktop">
      <MenuBar />

      {windows.map(win => (
        <WindowComponent
          key={win.id}
          title={win.id === activeWindowId ? `■ ${win.title}` : win.title} // Add a square or similar to active window title
          initialPosition={win.initialPosition}
          initialWidth={win.initialWidth}
          initialHeight={win.initialHeight}
          onClose={() => closeWindow(win.id)}
          zIndex={win.zIndex}
          onFocus={() => bringToFront(win.id)}
        >
          {win.id === 'welcome' ? welcomeWindowContent : win.content}
        </WindowComponent>
      ))}

      {/* Desktop Icons could be added here */}
      {/* Example: */}
      {/* <div className=\"absolute top-10 left-10 flex flex-col items-center cursor-pointer\"> */}
      {/*   <img src=\"/file.svg\" alt=\"File Icon\" width={32} height={32} /> */}
      {/*   <span className=\"text-xs mt-1 text-white\">My File.txt</span> */}
      {/* </div> */}
    </main>
  );
}
