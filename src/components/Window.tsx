"use client";

import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizeDirection } from "re-resizable";
import Show from "./Show";

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
  const [currentResizeSize, setCurrentResizeSize] = useState({ width: initialWidth, height: initialHeight }); // For live update during resize
  const [isResizing, setIsResizing] = useState(false);
  const draggableNodeRef = useRef<HTMLDivElement>(null);
  const resizableRef = useRef<Resizable>(null);

  const classicHandleStyle = {
    width: "16px",
    height: "16px",
    bottom: "0px",
    right: "0px",
    cursor: "nwse-resize",
  };

  const windowOuterBorderStyle = rounded
    ? "rounded-lg border border-neutral-400"
    : "border-t-neutral-100 border-l-neutral-100 border-r-neutral-700 border-b-neutral-700";
  const windowInnerWrapperStyle = rounded
    ? "rounded-lg"
    : "p-0.5 border-t-white border-l-white border-r-neutral-500 border-b-neutral-500";
  const titleBarStripeClass = !isFocused && !rounded ? "window-title-bar-stripe absolute inset-0" : "hidden";
  const contentWrapperStyle = rounded
    ? "border-t border-neutral-300"
    : "border-t-neutral-700 border-l-neutral-700 border-r-white border-b-white";

  const handleResizeStart = (
    // _e: React.MouseEvent<Element> | React.TouchEvent<Element>, 
    // _dir: ResizeDirection
  ) => {
    setIsResizing(true);
    setCurrentResizeSize({ width: size.width, height: size.height }); // Initialize with current size
    if (onFocus) onFocus();
  };

  const handleResizing = (
    _event: MouseEvent | TouchEvent,
    _direction: ResizeDirection,
    elementRef: HTMLElement,
    // _delta: {
    //     width: number;
    //     height: number;
    // }
) => {
    // The re-resizable library updates the elementRef's style directly during resize.
    // We can read from it if needed, or use delta if onResizeStop provides final.
    // For an "outline" effect, we let re-resizable handle the visual size change of the Resizable component itself.
    // We just need to ensure its actual children are hidden and the Resizable component is styled.
    setCurrentResizeSize({ width: parseFloat(elementRef.style.width), height: parseFloat(elementRef.style.height) });
};


  const handleResizeStop = (
    _e: MouseEvent | TouchEvent,
    _direction: ResizeDirection,
    refToElement: HTMLElement,
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

  useEffect(() => {
    // Cleanup previous class if it exists
    document.body.classList.remove('window-resizing-active');

    if (isResizing) {
      document.body.classList.add('window-resizing-active');
    } else {
      document.body.classList.remove('window-resizing-active');
    }
    return () => {
      document.body.classList.remove('window-resizing-active');
    };
  }, [isResizing]);

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
        className={`absolute flex flex-col shadow-md ${windowOuterBorderStyle}`}
        style={{
          width: isResizing ? currentResizeSize.width : size.width,
          height: isResizing ? currentResizeSize.height : size.height,
          zIndex: zIndex,
        }}
        onMouseDown={(e) => {
          if (onFocus) onFocus();
          e.stopPropagation();
        }}
      >
        <div className={`flex flex-col flex-grow bg-neutral-200 ${windowInnerWrapperStyle}`}>
          <Resizable
            ref={resizableRef}
            size={{ width: size.width, height: size.height }} // Initial size for Resizable
            minWidth={minWidth}
            minHeight={minHeight}
            onResizeStart={handleResizeStart}
            onResize={handleResizing} // Add the onResize handler
            onResizeStop={handleResizeStop}
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
            // Apply a class to Resizable itself for styling, and another to hide its children via CSS
            className={`flex flex-col flex-grow ${isResizing ? 'window-is-resizing resizable-content-hidden' : ''}`}
          >
            {/* These children will be hidden by CSS when 'resizable-content-hidden' is active */}
            <div
              className={`window-title-bar flex items-center justify-between px-1 relative h-[22px] select-none
                ${isFocused ? "bg-blue-600 text-white" : "bg-neutral-300 text-neutral-800"}
                ${rounded ? (isFocused ? "rounded-t-md" : "rounded-t-md") : ""}
              `}
            >
              <div className={titleBarStripeClass}></div>
              <div className="relative z-10 flex items-center">
                <Show when={!!onClose}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onClose) onClose();
                    }}
                    className={`mac-button window-close-button ${isFocused ? 'focused' : ''}`}
                    aria-label="Close"
                    style={{ marginRight: "auto" }}
                  >
                    <div className={`window-close-box ${isFocused ? 'bg-white' : 'bg-neutral-700'}`}></div>
                  </button>
                </Show>
                <Show when={!onClose}>
                  <div style={{ width: "14px", flexShrink: 0 }}></div>
                </Show>
              </div>

              <div className="relative z-10 window-title-text truncate text-center flex-grow mx-1">
                {title}
              </div>

              <div className="relative z-10 flex items-center">
                <Show when={!!onZoom}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onZoom) onZoom();
                    }}
                    className={`mac-button window-zoom-button ${isFocused ? 'focused' : ''}`}
                    aria-label="Zoom"
                    style={{ marginLeft: "auto" }}
                  >
                    <div className={`window-zoom-box ${isFocused ? 'bg-white' : 'bg-neutral-700'}`}></div>
                  </button>
                </Show>
                <Show when={!onZoom}>
                  <div style={{ width: "14px", flexShrink: 0 }}></div>
                </Show>
              </div>
            </div>

            <div className={`window-content-wrapper flex-grow overflow-hidden m-px ${contentWrapperStyle} ${rounded && !isFocused ? "rounded-b-md" : rounded && isFocused ? "rounded-b-md" : ""}`}>
              <div className={`bg-white h-full w-full overflow-auto p-1 ${rounded ? "rounded-b-sm" : ""}`}>
                {children}
              </div>
            </div>
          </Resizable>
        </div>
      </div>
    </Draggable>
  );
};

export default WindowComponent;
