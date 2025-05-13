"use client";

import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialWidth?: number;
  initialHeight?: number;
  onClose?: () => void;
  zIndex?: number;
  onFocus?: () => void;
  isResizable?: boolean;
  minWidth?: number;
  minHeight?: number;
  rounded?: boolean; // Added rounded prop
}

const WindowComponent: React.FC<WindowProps> = ({
  title,
  children,
  initialPosition = { x: 50, y: 50 },
  initialWidth = 300,
  initialHeight = 200,
  onClose,
  zIndex,
  onFocus,
  isResizable = true,
  minWidth = 150,
  minHeight = 100,
  rounded = false, // Added rounded prop with default value
}) => {
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const draggableNodeRef = useRef<HTMLDivElement>(null);

  const handleStyle = {
    width: "10px",
    height: "10px",
    bottom: "-5px",
    right: "-5px",
    cursor: "nwse-resize",
    backgroundColor: "var(--classic-window-title-bg)",
    border: "1px solid var(--classic-border-dark)",
    borderRadius: "2px",
    zIndex: 10, // Ensure handle is clickable
  };

  return (
    <Draggable
      handle=".window-title-bar"
      defaultPosition={initialPosition}
      nodeRef={draggableNodeRef as React.RefObject<HTMLElement>} // Applied type assertion here
      bounds="parent"
      onStart={onFocus} // Changed from onMouseDown and onTouchStart to onStart
    >
      <div
        ref={draggableNodeRef}
        className={`window absolute flex flex-col ${
          rounded ? "rounded-lg overflow-hidden" : ""
        }`}
        style={{
          width: size.width,
          height: size.height,
          zIndex: zIndex,
          // Position is set by Draggable
        }}
        // onMouseDown and onTouchStart are moved to Draggable for better focus handling
      >
        <Resizable
          size={{ width: size.width, height: size.height }}
          minWidth={minWidth}
          minHeight={minHeight}
          onResizeStop={(e, direction, ref, d) => {
            setSize((prevSize) => ({
              width: prevSize.width + d.width,
              height: prevSize.height + d.height,
            }));
            if (onFocus) onFocus(); // Call onFocus after resize
          }}
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: isResizable,
            bottomLeft: false,
            topLeft: false,
          }}
          handleStyles={{ bottomRight: handleStyle }}
          handleClasses={{ bottomRight: "resize-handle-bottom-right" }}
          style={{
            width: "100%",
            height: "100%",
            borderBottom: "1px dashed black",
            borderRight: "1px dashed black",
          }}
          // Apply flex and overflow to the div rendered by Resizable
          className={`flex flex-col overflow-hidden ${
            rounded ? "rounded-lg" : ""
          }`}
        >
          {/* Children of Resizable */}
          <div className="window-title-bar relative flex-shrink-0">
            <span className="window-title-text truncate ml-1">{title}</span>
            {onClose && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent drag/resize interference
                  onClose();
                }}
                className="mac-button window-close-button"
                aria-label="Close"
              >
                <div className="window-close-box"></div>
              </button>
            )}
          </div>
          {children}
        </Resizable>
      </div>
    </Draggable>
  );
};

export default WindowComponent;
