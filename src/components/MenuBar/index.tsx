"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Show from "../Show"; // Import the Show component

const menuData: Record<string, string[]> = {
  File: ["New", "Open", "Close", "Save", "Quit"],
  Edit: ["Undo", "Cut", "Copy", "Paste", "Clear"],
  View: ["Icons", "List", "Details"],
  Special: ["Calculator", "Resume", "Empty Trash", "Restart", "Shut Down"],
};

interface MenuBarProps {
  onMenuItemClick: (menuTitle: string, itemTitle: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ onMenuItemClick }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutesStr = minutes < 10 ? "0" + minutes : minutes;
      setCurrentTime(`${hours}:${minutesStr} ${ampm}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000 * 30);

    return () => clearInterval(timer);
  }, []);

  const handleMenuTitleMouseEnter = (menuTitle: string) => {
    setActiveMenu(menuTitle);
  };

  const handleMenuTitleMouseLeave = () => {
  };

  const handleItemClick = (menuTitle: string, itemTitle: string) => {
    if (onMenuItemClick) {
      onMenuItemClick(menuTitle, itemTitle);
    }
    setActiveMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeMenu &&
        !(event.target as HTMLElement).closest(".menu-title-container")
      ) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[22px] bg-neutral-100 border-b border-black flex items-center px-1 shadow-sm z-50 select-none text-black menubar-font text-[11px]"
      onMouseLeave={handleMenuTitleMouseLeave}
    >
      <div className="mx-2 font-normal text-base menubar-font">
        <Image
          src="/icons/banana-logo.png"
          alt="banintosh"
          width={24}
          height={24}
        />
      </div>
      {Object.entries(menuData).map(([menuTitle, items]) => (
        <div
          key={menuTitle}
          className="menu-title-container px-2 py-0.5 cursor-default relative"
          onMouseEnter={() => handleMenuTitleMouseEnter(menuTitle)}
          onClick={() =>
            setActiveMenu(activeMenu === menuTitle ? null : menuTitle)
          }
        >
          <span className="menubar-font">{menuTitle}</span>
          <Show when={activeMenu === menuTitle}>
            <div
              className="absolute left-0 mt-1 w-auto min-w-[150px] bg-neutral-100 border border-neutral-400 shadow-md py-0.5 z-50 menubar-font"
              onMouseLeave={() => setActiveMenu(null)}
            >
              {items.map((item) => (
                <div
                  key={item}
                  className="px-3 py-[1px] text-[11px] whitespace-nowrap hover:bg-blue-600 hover:text-white menubar-font"
                  onClick={() => handleItemClick(menuTitle, item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </Show>
        </div>
      ))}
      <div className="ml-auto flex items-center">
        <div className="text-[11px] px-2 menubar-font">{currentTime}</div>
      </div>
    </div>
  );
};

export default MenuBar;
