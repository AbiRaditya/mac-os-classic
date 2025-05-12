"use client";

import React, { useState } from "react";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = calculate(currentValue, inputValue, operator);
      setDisplay(String(parseFloat(result.toFixed(7)))); // Limit precision
      setCurrentValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (
    prevValue: number,
    nextValue: number,
    op: string
  ): number => {
    switch (op) {
      case "+":
        return prevValue + nextValue;
      case "-":
        return prevValue - nextValue;
      case "*":
        return prevValue * nextValue;
      case "/":
        if (nextValue === 0) {
          // Handle division by zero: display an error or reset
          setDisplay("Error");
          setCurrentValue(null);
          setOperator(null);
          setWaitingForOperand(true);
          return 0; // Or throw an error
        }
        return prevValue / nextValue;
      default:
        return nextValue;
    }
  };

  const handleEquals = () => {
    if (currentValue === null || !operator || waitingForOperand) return;
    const inputValue = parseFloat(display);
    if (display === "Error") return; // Don't calculate if already in error state

    const result = calculate(currentValue, inputValue, operator);
    if (display === "Error") return; // Check again if calculate resulted in error

    setDisplay(String(parseFloat(result.toFixed(7))));
    setCurrentValue(null);
    setOperator(null);
    // setWaitingForOperand(true); // Keep false to allow chaining operations on the result
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    if (display === "Error") return;
    const currentValueFloat = parseFloat(display);
    if (currentValueFloat === 0 && !display.startsWith("-")) return;
    setDisplay(String(currentValueFloat * -1));
  };

  // Classic Mac OS calculator didn't typically have a percent key that worked this way.
  // Usually it was for tax/discount calculations in conjunction with other operations.
  // This is a simplified version.
  const inputPercent = () => {
    if (display === "Error") return;
    const currentValueFloat = parseFloat(display);
    // If there's an operator and a current value, calculate percentage of the current value
    if (operator && currentValue !== null) {
      const percentOfValue = (currentValue * currentValueFloat) / 100;
      setDisplay(String(parseFloat(percentOfValue.toFixed(7))));
    } else {
      // Otherwise, just convert the display to its percentage (e.g., 50 -> 0.5)
      setDisplay(String(parseFloat((currentValueFloat / 100).toFixed(7))));
    }
    setWaitingForOperand(true);
  };

  const buttonClass =
    "mac-button text-black text-lg w-10 h-10 flex items-center justify-center m-0.5 focus:outline-none active:bg-neutral-400";
  const zeroButtonClass = buttonClass + " w-auto";
  const operatorButtonClass = buttonClass + " bg-neutral-300";
  const functionButtonClass = buttonClass + " bg-neutral-300"; // For C, +/-, %

  return (
    <div className="bg-neutral-200 p-2 border border-black shadow-md w-[188px] select-none">
      {/* Display */}
      <div className="bg-white text-right h-8 mb-2 p-1 border-2 border-neutral-400 text-xl font-mono overflow-hidden">
        {display}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-0.5">
        <button onClick={clearDisplay} className={`${functionButtonClass}`}>
          AC
        </button>{" "}
        {/* Changed C to AC for All Clear */}
        <button onClick={toggleSign} className={functionButtonClass}>
          +/-
        </button>
        <button onClick={inputPercent} className={functionButtonClass}>
          %
        </button>
        <button
          onClick={() => performOperation("/")}
          className={operatorButtonClass}
        >
          ÷
        </button>
        <button onClick={() => inputDigit("7")} className={buttonClass}>
          7
        </button>
        <button onClick={() => inputDigit("8")} className={buttonClass}>
          8
        </button>
        <button onClick={() => inputDigit("9")} className={buttonClass}>
          9
        </button>
        <button
          onClick={() => performOperation("*")}
          className={operatorButtonClass}
        >
          ×
        </button>
        <button onClick={() => inputDigit("4")} className={buttonClass}>
          4
        </button>
        <button onClick={() => inputDigit("5")} className={buttonClass}>
          5
        </button>
        <button onClick={() => inputDigit("6")} className={buttonClass}>
          6
        </button>
        <button
          onClick={() => performOperation("-")}
          className={operatorButtonClass}
        >
          −
        </button>
        <button onClick={() => inputDigit("1")} className={buttonClass}>
          1
        </button>
        <button onClick={() => inputDigit("2")} className={buttonClass}>
          2
        </button>
        <button onClick={() => inputDigit("3")} className={buttonClass}>
          3
        </button>
        <button
          onClick={() => performOperation("+")}
          className={operatorButtonClass}
        >
          +
        </button>
        <button
          onClick={() => inputDigit("0")}
          className={`${zeroButtonClass} col-span-2`}
        >
          0
        </button>
        <button onClick={inputDecimal} className={buttonClass}>
          .
        </button>
        <button onClick={handleEquals} className={operatorButtonClass}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
