#!/usr/bin/env ts-node

import * as readline from 'readline';

// Welcome Message
console.log("\n\tWelcome To 'Muhammad Bolda' Calculator\n");

class Calculator {
  private currentInput: number = 0;
  private memory: number = 0;
  private operator: string | null = null;

  constructor() {}

  // Set the current input value
  setInput(value: number) {
    this.currentInput = value;
  }

  // Add the current input to the memory
  addToMemory() {
    this.memory += this.currentInput;
  }

  // Subtract the current input from the memory
  subtractFromMemory() {
    this.memory -= this.currentInput;
  }

  // Set the operator for the pending operation
  setOperator(operator: string) {
    this.operator = operator;
  }

  // Perform the pending operation
  performOperation() {
    if (this.operator === '+') {
      this.currentInput += this.memory;
    } else if (this.operator === '-') {
      this.currentInput = this.memory - this.currentInput;
    } else if (this.operator === '*') {
      this.currentInput *= this.memory;
    } else if (this.operator === '/') {
      if (this.currentInput !== 0) {
        this.currentInput = this.memory / this.currentInput;
      } else {
        throw new Error("Division by zero is not allowed.");
      }
    }
    this.operator = null;
    this.memory = 0;
  }

  // Clear the calculator
  clear() {
    this.currentInput = 0;
    this.memory = 0;
    this.operator = null;
  }

  // Get the current result
  getResult() {
    return this.currentInput;
  }
}

const calculator = new Calculator();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askInput() {
  rl.question('Enter a number: ', (num: string) => {
    calculator.setInput(parseFloat(num));
    askOperator();
  });
}

function askOperator() {
  rl.question('Enter an operator (+, -, *, /): ', (op: string) => {
    if (['+', '-', '*', '/'].includes(op)) {
      calculator.setOperator(op);
      calculator.addToMemory();
      askNextInput();
    } else {
      console.log('Invalid operator. Please try again.');
      askOperator();
    }
  });
}

function askNextInput() {
  rl.question('Enter next number: ', (num: string) => {
    calculator.setInput(parseFloat(num));
    try {
      calculator.performOperation();
      console.log("Result:", calculator.getResult());
    } catch (e) {
      console.log((e as Error).message);
    }
    rl.question('Do you want to continue? (yes/no): ', (answer: string) => {
      if (answer.toLowerCase() === 'yes') {
        askOperator();
      } else {
        console.log("Final Result:", calculator.getResult());
        rl.close();
      }
    });
  });
}

// Start the calculator
askInput();
