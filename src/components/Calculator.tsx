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
      setDisplay(String(parseFloat(result.toFixed(7))));
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
          setDisplay("Error");
          setCurrentValue(null);
          setOperator(null);
          setWaitingForOperand(true);
          return 0;
        }
        return prevValue / nextValue;
      default:
        return nextValue;
    }
  };

  const handleEquals = () => {
    if (currentValue === null || !operator || waitingForOperand) return;
    const inputValue = parseFloat(display);
    if (display === "Error") return;

    const result = calculate(currentValue, inputValue, operator);
    if (display === "Error") return;

    setDisplay(String(parseFloat(result.toFixed(7))));
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    if (display === "Error") return;
    const currentValueFloat = parseFloat(display);
    if (currentValueFloat === 0 && !display.startsWith("-")) return;
    setDisplay(String(currentValueFloat * -1));
  };

  const inputPercent = () => {
    if (display === "Error") return;
    const currentValueFloat = parseFloat(display);
    if (operator && currentValue !== null) {
      const percentOfValue = (currentValue * currentValueFloat) / 100;
      setDisplay(String(parseFloat(percentOfValue.toFixed(7))));
    } else {
      setDisplay(String(parseFloat((currentValueFloat / 100).toFixed(7))));
    }
    setWaitingForOperand(true);
  };

  const buttonClass =
    "mac-button text-black bg-white text-lg w-10 h-10 flex items-center justify-center m-0.5 focus:outline-none active:bg-neutral-400 !shadow-[5px_3px_0px_var(--classic-border-dark)]";
  const zeroButtonClass = buttonClass + " w-auto";
  const operatorButtonClass = buttonClass + " bg-white";
  const functionButtonClass = buttonClass + " bg-white";

  return (
    <div className="bg-[#b4b8dd] p-2 border border-black shadow-md w-full select-none window-content flex-grow overflow-auto">
      <div className="bg-white text-right h-8 mb-2 p-1 border-2 border-neutral-400 text-xl font-mono overflow-hidden">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-0.5">
        <button onClick={clearDisplay} className={`${functionButtonClass}`}>
          C
        </button>{" "}
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
          *
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
          -
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
