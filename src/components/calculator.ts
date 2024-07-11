import { bindable } from 'aurelia';

export class Calculator {
  @bindable() display: string = '0';
  currentValue: number | null = null;
  operation: string | null = null;
  waitingForOperand: boolean = false;

  inputDigit(digit: number): void {
    if (this.waitingForOperand) {
      this.display = String(digit);
      this.waitingForOperand = false;
    } else {
      this.display =
        this.display === '0' ? String(digit) : this.display + digit;
    }
  }

  inputDecimal(): void {
    if (this.waitingForOperand) {
      this.display = '0.';
      this.waitingForOperand = false;
    } else if (this.display.indexOf('.') === -1) {
      this.display += '.';
    }
  }

  clear(): void {
    this.display = '0';
    this.currentValue = null;
    this.operation = null;
    this.waitingForOperand = false;
  }

  performOperation(nextOperation: string): void {
    const inputValue = parseFloat(this.display);

    if (this.currentValue === null) {
      this.currentValue = inputValue;
    } else if (this.operation) {
      const result = this.calculate(
        this.currentValue,
        inputValue,
        this.operation
      );
      this.currentValue = result;
      this.display = String(result);
    }

    this.waitingForOperand = true;
    this.operation = nextOperation;
  }

  calculate(a: number, b: number, op: string): number {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        return b;
    }
  }

  handleEquals(): void {
    const inputValue = parseFloat(this.display);
    if (this.operation) {
      const result = this.calculate(
        this.currentValue!,
        inputValue,
        this.operation
      );
      this.display = String(result);
      this.currentValue = result;
      this.operation = null;
      this.waitingForOperand = true;
    }
  }
}
