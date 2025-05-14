"use client";

import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import Show from "./Show"; // Import the Show component

interface WindowProps {
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialWidth?: number;
  initialHeight?: number;
  onClose?: () => void;
  onZoom?: () => void;
  zIndex?: number;
  onFocus?: () => void;
  isResizable?: boolean;
  minWidth?: number;
  minHeight?: number;
  rounded?: boolean;
  isFocused?: boolean;
}

const WindowComponent: React.FC<WindowProps> = ({
  title,
  children,
  initialPosition = { x: 50, y: 50 },
  initialWidth = 300,
  initialHeight = 200,
  onClose,
  onZoom,
  zIndex,
  onFocus,
  isResizable = true,
  minWidth = 150,
  minHeight = 100,
  rounded = false,
  isFocused = false,
}) => {
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const draggableNodeRef = useRef<HTMLDivElement>(null);

  const classicHandleStyle = {
    width: "16px",
    height: "16px",
    bottom: "0px",
    right: "0px",
    cursor: "nwse-resize",
  };

  return (
    <Draggable
      handle=".window-title-bar"
      defaultPosition={initialPosition}
      nodeRef={draggableNodeRef as React.RefObject<HTMLElement>}
      bounds="parent"
      onStart={onFocus}
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
        }}
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
            if (onFocus) onFocus();
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
          handleStyles={{ bottomRight: classicHandleStyle }}
          handleClasses={{ bottomRight: "resize-handle-bottom-right" }}
          className="flex flex-col flex-grow"
        >
          <div className="window-title-bar flex items-center justify-between px-1 relative">
            <div className="window-title-bar-stripe"></div>
            <Show when={!!onClose}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClose) onClose();
                }}
                className="mac-button window-close-button z-10"
                aria-label="Close"
                style={{ marginRight: "auto" }}
              >
                <div className="window-close-box"></div>
              </button>
            </Show>
            <Show when={!onClose}>
              <div style={{ width: "14px", flexShrink: 0 }}></div>
            </Show>

            <div
              className="window-title-text truncate z-10 text-center flex-grow"
              style={{
                color: isFocused ? "black" : "gray",
                backgroundColor: isFocused ? "white" : "transparent",
              }}
            >
              {title}
            </div>

            <Show when={!!onZoom}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onZoom) onZoom();
                }}
                className="mac-button window-zoom-button z-10"
                aria-label="Zoom"
                style={{ marginLeft: "auto" }}
              >
                <div className="window-zoom-box"></div>
              </button>
            </Show>
            <Show when={!onZoom}>
              <div style={{ width: "14px", flexShrink: 0 }}></div>
            </Show>
          </div>

          <div className="window-content flex-grow overflow-auto">
            {children}
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default WindowComponent;
