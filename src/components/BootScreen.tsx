"use client";

import React, { useState, useEffect } from "react";

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const [showLogo, setShowLogo] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);

  const bootSteps = [
    "Microsoft Windows XP",
    "Professional",
    "",
    "Starting Windows...",
    "Loading system drivers...",
    "Initializing hardware...",
    "Loading user profile...",
    "Preparing desktop...",
  ];

  const typewriterStep = bootSteps[3]; // "Starting Windows..." will have typewriter effect

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentStep === 0) {
          // Show logo first
          setShowLogo(true);
          setCurrentStep(1);
        } else if (currentStep === 1) {
          // Wait a bit then start typewriter
          setCurrentStep(2);
        } else if (currentStep === 2) {
          // Start typewriter animation for "Starting Windows..."
          const text = typewriterStep;
          let index = 0;
          const typewriterInterval = setInterval(() => {
            if (index <= text.length) {
              setTypewriterText(text.slice(0, index));
              index++;
            } else {
              clearInterval(typewriterInterval);
              setCurrentStep(3);
            }
          }, 100);
        } else if (currentStep === 3) {
          // Show progress bar
          setShowProgressBar(true);
          setCurrentStep(4);
        } else if (currentStep === 4) {
          // Animate progress bar
          const progressInterval = setInterval(() => {
            setProgress((prev) => {
              if (prev >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                  onBootComplete();
                }, 500);
                return 100;
              }
              return prev + 2;
            });
          }, 60);
        }
      },
      currentStep === 0
        ? 500
        : currentStep === 1
        ? 1000
        : currentStep === 2
        ? 100
        : currentStep === 3
        ? 800
        : 0
    );

    return () => clearTimeout(timer);
  }, [currentStep, onBootComplete, typewriterStep]);

  return (
    <div className="boot-screen">
      <div className="boot-content">
        {/* Windows XP Logo */}
        {showLogo && (
          <div className="boot-logo">
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
        {currentStep >= 2 && (
          <div className="boot-message">
            <div className="typewriter-text">
              {typewriterText}
              <span className="cursor">|</span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {showProgressBar && (
          <div className="boot-progress">
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="boot-footer">
          <div className="copyright-text">
            Copyright © Microsoft Corporation
          </div>
        </div>
      </div>

      <style jsx>{`
        .boot-screen {
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

        .boot-content {
          text-align: center;
          color: white;
          max-width: 600px;
          padding: 40px;
        }

        .boot-logo {
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

        .boot-message {
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

        .boot-progress {
          margin: 40px 0;
          opacity: 0;
          animation: fadeIn 0.5s ease-in 0.5s forwards;
        }

        .progress-container {
          width: 300px;
          margin: 0 auto;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%);
          transition: width 0.3s ease;
          border-radius: 3px;
        }

        .boot-footer {
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

export default BootScreen;
