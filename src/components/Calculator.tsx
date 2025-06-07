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
      if (operator === "÷" && inputValue === 0) {
        setDisplay("Cannot divide by zero");
        setCurrentValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }

      const prevValue = currentValue || 0;
      let result: number;

      switch (operator) {
        case "+":
          result = prevValue + inputValue;
          break;
        case "-":
          result = prevValue - inputValue;
          break;
        case "×":
          result = prevValue * inputValue;
          break;
        case "÷":
          result = prevValue / inputValue;
          break;
        default:
          return;
      }

      setCurrentValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    if (operator && currentValue !== null) {
      performOperation("=");
      setOperator(null);
      setCurrentValue(null);
      setWaitingForOperand(true);
    }
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  return (
    <div className="xp-calculator">
      <div className="xp-calculator-display">{display}</div>

      <div className="xp-calculator-buttons">
        <button className="xp-calc-button" onClick={clearDisplay}>
          C
        </button>
        <button className="xp-calc-button" onClick={clearDisplay}>
          CE
        </button>
        <button className="xp-calc-button" onClick={backspace}>
          ⌫
        </button>
        <button
          className="xp-calc-button"
          onClick={() => performOperation("÷")}
        >
          ÷
        </button>

        <button className="xp-calc-button" onClick={() => inputDigit("7")}>
          7
        </button>
        <button className="xp-calc-button" onClick={() => inputDigit("8")}>
          8
        </button>
        <button className="xp-calc-button" onClick={() => inputDigit("9")}>
          9
        </button>
        <button
          className="xp-calc-button"
          onClick={() => performOperation("×")}
        >
          ×
        </button>

        <button className="xp-calc-button" onClick={() => inputDigit("4")}>
          4
        </button>
        <button className="xp-calc-button" onClick={() => inputDigit("5")}>
          5
        </button>
        <button className="xp-calc-button" onClick={() => inputDigit("6")}>
          6
        </button>
        <button
          className="xp-calc-button"
          onClick={() => performOperation("-")}
        >
          -
        </button>

        <button className="xp-calc-button" onClick={() => inputDigit("1")}>
          1
        </button>
        <button className="xp-calc-button" onClick={() => inputDigit("2")}>
          2
        </button>
        <button className="xp-calc-button" onClick={() => inputDigit("3")}>
          3
        </button>
        <button
          className="xp-calc-button"
          onClick={() => performOperation("+")}
        >
          +
        </button>

        <button
          className="xp-calc-button"
          style={{ gridColumn: "1 / span 2" }}
          onClick={() => inputDigit("0")}
        >
          0
        </button>
        <button className="xp-calc-button" onClick={inputDecimal}>
          .
        </button>
        <button className="xp-calc-button" onClick={calculate}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
