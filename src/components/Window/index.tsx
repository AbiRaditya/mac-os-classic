"use client";

import React, { useState, useRef, useEffect } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { Resizable, ResizeDirection } from "re-resizable";
import Show from "../Show";
import styles from "./Window.module.css";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialWidth?: number;
  initialHeight?: number;
  onClose?: () => void;
  onMaximize?: () => void;
  onMinimize?: () => void;
  onRestore?: () => void;
  zIndex?: number;
  onFocus?: () => void;
  isResizable?: boolean;
  minWidth?: number;
  minHeight?: number;
  isFocused?: boolean;
  isMaximized?: boolean;
  isMinimized?: boolean;
}

const WindowComponent: React.FC<WindowProps> = ({
  title,
  children,
  initialPosition = { x: 50, y: 50 },
  initialWidth = 300,
  initialHeight = 200,
  onClose,
  onMaximize,
  onMinimize,
  onRestore,
  zIndex,
  onFocus,
  isResizable = true,
  minWidth = 150,
  minHeight = 100,
  isFocused = false,
  isMaximized = false,
  isMinimized = false,
}) => {
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const [position, setPosition] = useState(initialPosition);
  const [isResizing, setIsResizing] = useState(false);
  const [restoreState, setRestoreState] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

  const draggableNodeRef = useRef<HTMLDivElement>(null);
  const resizableRef = useRef<Resizable>(null);

  // Store state before maximizing
  useEffect(() => {
    if (isMaximized && !restoreState) {
      setRestoreState({
        width: size.width,
        height: size.height,
        x: position.x,
        y: position.y,
      });
    } else if (!isMaximized && restoreState) {
      setSize({ width: restoreState.width, height: restoreState.height });
      setPosition({ x: restoreState.x, y: restoreState.y });
      setRestoreState(null);
    }
  }, [isMaximized, restoreState, size, position]);

  const handleResizeStart = () => {
    setIsResizing(true);
    if (onFocus) onFocus();
  };

  const handleResizeStop = (
    _e: MouseEvent | TouchEvent,
    _direction: ResizeDirection,
    _refToElement: HTMLElement,
    delta: {
      width: number;
      height: number;
    }
  ) => {
    setSize((prevSize) => ({
      width: prevSize.width + delta.width,
      height: prevSize.height + delta.height,
    }));
    setIsResizing(false);
  };

  const handleDragStop = (_e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  useEffect(() => {
    if (isResizing) {
      document.body.style.cursor = "nw-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  // Don't render if minimized
  if (isMinimized) {
    return null;
  }

  const windowStyle = isMaximized
    ? {
        width: "100vw",
        height: "calc(100vh - 30px)",
        top: 0,
        left: 0,
        zIndex: zIndex,
        transform: "none",
      }
    : {
        width: size.width,
        height: size.height,
        zIndex: zIndex,
      };

  return (
    <Draggable
      handle=".xp-title-bar"
      position={isMaximized ? { x: 0, y: 0 } : position}
      nodeRef={draggableNodeRef as React.RefObject<HTMLElement>}
      bounds="parent"
      onStart={onFocus}
      onStop={handleDragStop}
      disabled={isMaximized}
    >
      <div
        ref={draggableNodeRef}
        className={`absolute xp-window ${
          isResizing ? styles.windowIsResizing : ""
        }`}
        style={windowStyle}
        onMouseDown={(e) => {
          if (onFocus) onFocus();
          e.stopPropagation();
        }}
      >
        <Resizable
          ref={resizableRef}
          size={{
            width: isMaximized ? window.innerWidth : size.width,
            height: isMaximized ? window.innerHeight - 30 : size.height,
          }}
          minWidth={minWidth}
          minHeight={minHeight}
          onResizeStart={handleResizeStart}
          onResizeStop={handleResizeStop}
          enable={{
            top: !isMaximized,
            right: !isMaximized,
            bottom: !isMaximized,
            left: !isMaximized,
            topRight: !isMaximized,
            bottomRight: !isMaximized && isResizable,
            bottomLeft: !isMaximized,
            topLeft: !isMaximized,
          }}
          handleStyles={{
            bottomRight: {
              width: "12px",
              height: "12px",
              bottom: "0px",
              right: "0px",
              cursor: "nw-resize",
              background: "transparent",
            },
          }}
          handleClasses={{ bottomRight: "xp-resize-handle" }}
        >
          {/* XP Title Bar */}
          <div className={`xp-title-bar ${isFocused ? "active" : ""}`}>
            <div className="xp-title-text">{title}</div>

            <div className="xp-window-controls">
              <Show when={!!onMinimize}>
                <div
                  className="xp-control-button xp-minimize-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onMinimize) onMinimize();
                  }}
                  title="Minimize"
                />
              </Show>

              <Show when={!!onMaximize}>
                <div
                  className={`xp-control-button xp-maximize-btn ${
                    isMaximized ? "restore" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isMaximized && onRestore) {
                      onRestore();
                    } else if (onMaximize) {
                      onMaximize();
                    }
                  }}
                  title={isMaximized ? "Restore" : "Maximize"}
                />
              </Show>

              <Show when={!!onClose}>
                <div
                  className="xp-control-button xp-close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onClose) onClose();
                  }}
                  title="Close"
                />
              </Show>
            </div>
          </div>

          {/* XP Content Area */}
          <div className="xp-content">{children}</div>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default WindowComponent;
