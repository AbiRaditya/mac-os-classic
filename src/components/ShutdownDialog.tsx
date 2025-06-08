"use client";

import React from "react";

interface ShutdownDialogProps {
  isOpen: boolean;
  onShutdown: () => void;
  onRestart: () => void;
  onCancel: () => void;
}

const ShutdownDialog: React.FC<ShutdownDialogProps> = ({
  isOpen,
  onShutdown,
  onRestart,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="shutdown-dialog">
        <div className="dialog-header">
          <div className="dialog-title">Shut Down Windows</div>
        </div>
        <div className="dialog-content">
          <div className="shutdown-icon">⚡</div>
          <div className="shutdown-text">
            <p>What do you want the computer to do?</p>
            <div className="shutdown-options">
              <div className="option-group">
                <input
                  type="radio"
                  id="shutdown-option"
                  name="shutdown-action"
                  defaultChecked
                />
                <label htmlFor="shutdown-option">Shut down</label>
              </div>
              <div className="option-group">
                <input
                  type="radio"
                  id="restart-option"
                  name="shutdown-action"
                />
                <label htmlFor="restart-option">Restart</label>
              </div>
            </div>
          </div>
        </div>
        <div className="dialog-buttons">
          <button className="xp-button" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="xp-button primary"
            onClick={() => {
              const shutdownRadio = document.getElementById(
                "shutdown-option"
              ) as HTMLInputElement;
              if (shutdownRadio?.checked) {
                onShutdown();
              } else {
                onRestart();
              }
            }}
          >
            OK
          </button>
        </div>
      </div>

      <style jsx>{`
        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          font-family: "Tahoma", "MS Sans Serif", sans-serif;
        }

        .shutdown-dialog {
          background: #ece9d8;
          border: 2px outset #ece9d8;
          border-radius: 0;
          width: 400px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
        }

        .dialog-header {
          background: linear-gradient(to bottom, #0054e3 0%, #0040dc 100%);
          color: white;
          padding: 4px 8px;
          font-size: 11px;
          font-weight: bold;
        }

        .dialog-title {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .dialog-content {
          padding: 16px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .shutdown-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .shutdown-text {
          flex: 1;
        }

        .shutdown-text p {
          margin: 0 0 16px 0;
          font-size: 11px;
        }

        .shutdown-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .option-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .option-group input[type="radio"] {
          margin: 0;
        }

        .option-group label {
          font-size: 11px;
          cursor: pointer;
        }

        .dialog-buttons {
          padding: 12px 16px;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          border-top: 1px solid #c0c0c0;
        }

        .xp-button {
          background: #ece9d8;
          border: 1px outset #ece9d8;
          padding: 4px 16px;
          font-size: 11px;
          font-family: "Tahoma", "MS Sans Serif", sans-serif;
          cursor: pointer;
          min-width: 75px;
        }

        .xp-button:hover {
          background: #e6e2d6;
        }

        .xp-button:active {
          border: 1px inset #ece9d8;
        }

        .xp-button.primary {
          background: #ece9d8;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default ShutdownDialog;
