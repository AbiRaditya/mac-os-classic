'use client';

import React, { useState, useEffect } from 'react';

// Basic data structure for menu items
// In a real app, this would be more complex, with actions, submenus, etc.
const menuData = {
  File: ['New', 'Open', 'Close', 'Save', 'Quit'],
  Edit: ['Undo', 'Cut', 'Copy', 'Paste', 'Clear'],
  View: ['Icons', 'List', 'Details'],
  Special: ['Empty Trash', 'Restart', 'Shut Down'],
};

const MenuBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[20px] bg-neutral-200 border-b border-black flex items-center px-2 shadow-md z-50 select-none">
      {/* Apple Logo Placeholder - you could use an SVG or image here */}
      <div className="mr-4 font-bold text-lg"></div>
      {Object.keys(menuData).map((menuTitle) => (
        <div key={menuTitle} className="px-2 py-0.5 hover:bg-blue-600 hover:text-white cursor-default">
          {menuTitle}
          {/* Dropdown logic would go here - for simplicity, just showing titles */}
        </div>
      ))}
      {/* Clock placeholder - could be a real-time clock component */}
      <div className="ml-auto text-xs">
        {currentTime}
      </div>
    </div>
  );
};

export default MenuBar;
