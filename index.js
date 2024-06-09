#!/usr/bin/env ts-node
import * as readline from 'readline';
// Welcome Message
console.log("\n\tWelcome To 'Muhammad Bolda' Calculator\n");
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
const calculator = new Calculator();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askInput() {
    rl.question('Enter a number: ', (num) => {
        calculator.setInput(parseFloat(num));
        askOperator();
    });
}
function askOperator() {
    rl.question('Enter an operator (+, -, *, /): ', (op) => {
        if (['+', '-', '*', '/'].includes(op)) {
            calculator.setOperator(op);
            calculator.addToMemory();
            askNextInput();
        }
        else {
            console.log('Invalid operator. Please try again.');
            askOperator();
        }
    });
}
function askNextInput() {
    rl.question('Enter next number: ', (num) => {
        calculator.setInput(parseFloat(num));
        try {
            calculator.performOperation();
            console.log("Result:", calculator.getResult());
        }
        catch (e) {
            console.log(e.message);
        }
        rl.question('Do you want to continue? (yes/no): ', (answer) => {
            if (answer.toLowerCase() === 'yes') {
                askOperator();
            }
            else {
                console.log("Final Result:", calculator.getResult());
                rl.close();
            }
        });
    });
}
// Start the calculator
askInput();
