"use client";

import React, { useState, useEffect } from "react";

interface ShutdownScreenProps {
  type: "shutdown" | "restart";
  onComplete: () => void;
}

const ShutdownScreen: React.FC<ShutdownScreenProps> = ({
  type,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const [showLogo, setShowLogo] = useState(false);

  const shutdownSteps = [
    "Saving your settings...",
    "Closing programs...",
    "Logging off...",
    type === "shutdown"
      ? "Windows is shutting down..."
      : "Windows is restarting...",
  ];

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentStep === 0) {
          // Show logo first
          setShowLogo(true);
          setCurrentStep(1);
        } else if (currentStep === 1) {
          // Start typewriter animation
          const text = shutdownSteps[0];
          let index = 0;
          const typewriterInterval = setInterval(() => {
            if (index <= text.length) {
              setTypewriterText(text.slice(0, index));
              index++;
            } else {
              clearInterval(typewriterInterval);
              setCurrentStep(2);
            }
          }, 80);
        } else if (currentStep === 2) {
          // Next message
          const text = shutdownSteps[1];
          let index = 0;
          const typewriterInterval = setInterval(() => {
            if (index <= text.length) {
              setTypewriterText(text.slice(0, index));
              index++;
            } else {
              clearInterval(typewriterInterval);
              setCurrentStep(3);
            }
          }, 80);
        } else if (currentStep === 3) {
          // Final message
          const text = shutdownSteps[3];
          let index = 0;
          const typewriterInterval = setInterval(() => {
            if (index <= text.length) {
              setTypewriterText(text.slice(0, index));
              index++;
            } else {
              clearInterval(typewriterInterval);
              setTimeout(() => {
                if (type === "restart") {
                  onComplete();
                } else {
                  // For shutdown, just show black screen
                  setCurrentStep(4);
                }
              }, 2000);
            }
          }, 80);
        }
      },
      currentStep === 0
        ? 500
        : currentStep === 1
        ? 1500
        : currentStep === 2
        ? 1500
        : 100
    );

    return () => clearTimeout(timer);
  }, [currentStep, type, onComplete]);

  if (currentStep === 4 && type === "shutdown") {
    // Black screen for shutdown
    return (
      <div className="shutdown-screen black">
        <div className="shutdown-message">
          <h2>It's now safe to turn off your computer.</h2>
        </div>
        <style jsx>{`
          .shutdown-screen.black {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000000;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            font-family: "Tahoma", "MS Sans Serif", sans-serif;
          }

          .shutdown-message {
            text-align: center;
            color: white;
          }

          .shutdown-message h2 {
            font-size: 24px;
            font-weight: normal;
            margin: 0;
            animation: fadeIn 2s ease-in;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="shutdown-screen">
      <div className="shutdown-content">
        {/* Windows XP Logo */}
        {showLogo && (
          <div className="shutdown-logo">
            <div className="xp-logo">
              <div className="windows-flag">
                <div className="flag-red"></div>
                <div className="flag-green"></div>
                <div className="flag-blue"></div>
                <div className="flag-yellow"></div>
              </div>
              <div className="xp-text">
                <div className="microsoft-text">Microsoft</div>
                <div className="windows-text">
                  Windows<span className="xp-super">XP</span>
                </div>
                <div className="professional-text">Professional</div>
              </div>
            </div>
          </div>
        )}

        {/* Typewriter Text */}
        {currentStep >= 1 && (
          <div className="shutdown-message">
            <div className="typewriter-text">
              {typewriterText}
              <span className="cursor">|</span>
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="shutdown-footer">
          <div className="copyright-text">
            Copyright © Microsoft Corporation
          </div>
        </div>
      </div>

      <style jsx>{`
        .shutdown-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          font-family: "Tahoma", "MS Sans Serif", sans-serif;
        }

        .shutdown-content {
          text-align: center;
          color: white;
          max-width: 600px;
          padding: 40px;
        }

        .shutdown-logo {
          margin-bottom: 60px;
          animation: fadeInUp 1s ease-out;
        }

        .xp-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .windows-flag {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 60px;
          height: 60px;
          gap: 4px;
          transform: rotate(-10deg);
        }

        .flag-red {
          background: #ff0000;
          border-radius: 4px 0 0 0;
        }

        .flag-green {
          background: #00ff00;
          border-radius: 0 4px 0 0;
        }

        .flag-blue {
          background: #0000ff;
          border-radius: 0 0 0 4px;
        }

        .flag-yellow {
          background: #ffff00;
          border-radius: 0 0 4px 0;
        }

        .xp-text {
          text-align: left;
        }

        .microsoft-text {
          font-size: 24px;
          font-weight: normal;
          margin-bottom: 5px;
          letter-spacing: 1px;
        }

        .windows-text {
          font-size: 36px;
          font-weight: normal;
          letter-spacing: 2px;
          margin-bottom: 5px;
        }

        .xp-super {
          font-size: 24px;
          vertical-align: super;
          margin-left: 2px;
        }

        .professional-text {
          font-size: 16px;
          font-weight: normal;
          opacity: 0.9;
          letter-spacing: 1px;
        }

        .shutdown-message {
          margin: 40px 0;
          min-height: 30px;
        }

        .typewriter-text {
          font-size: 18px;
          font-weight: normal;
          letter-spacing: 1px;
        }

        .cursor {
          animation: blink 1s infinite;
          font-weight: normal;
        }

        .shutdown-footer {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        }

        .copyright-text {
          font-size: 12px;
          opacity: 0.7;
          letter-spacing: 0.5px;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ShutdownScreen;
