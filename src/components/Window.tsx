'use client';

import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialWidth?: number;
  initialHeight?: number;
  onClose?: () => void;
  zIndex?: number;
  onFocus?: () => void;
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
}) => {
  const [position, setPosition] = useState(initialPosition);
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      handle=".window-title-bar"
      defaultPosition={position}
      onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
      nodeRef={nodeRef}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className="window absolute flex flex-col"
        style={{
          width: initialWidth,
          height: initialHeight,
          zIndex: zIndex,
        }}
        onMouseDown={onFocus}
        onTouchStart={onFocus}
      >
        <div className="window-title-bar relative flex-shrink-0">
          <span className="window-title-text truncate ml-1">{title}</span>
          {onClose && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="mac-button window-close-button"
              aria-label="Close"
            >
              <div className="window-close-box"></div>
            </button>
          )}
        </div>
        <div className="window-content flex-grow">
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default WindowComponent;
