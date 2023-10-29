"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Calculator {
    currentInput = 0;
    memory = 0;
    operator = null;
    constructor() { }
    // Set the current input value
    setInput(value) {
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
    setOperator(operator) {
        this.operator = operator;
    }
    // Perform the pending operation
    performOperation() {
        if (this.operator === '+') {
            this.currentInput += this.memory;
        }
        else if (this.operator === '-') {
            this.currentInput = this.memory - this.currentInput;
        }
        else if (this.operator === '*') {
            this.currentInput *= this.memory;
        }
        else if (this.operator === '/') {
            if (this.currentInput !== 0) {
                this.currentInput = this.memory / this.currentInput;
            }
            else {
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
// Usage
const calculator = new Calculator();
calculator.setInput(67);
calculator.setOperator('+');
calculator.addToMemory();
calculator.setInput(3);
calculator.performOperation();
console.log("Result:", calculator.getResult()); // Should output 3
