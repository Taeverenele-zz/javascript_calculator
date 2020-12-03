'use strict';

class Calculator {
  constructor(previousTextEl, currentTextEl) {
    this.previousTextEl = previousTextEl;
    this.currentTextEl = currentTextEl;
    this.clear();
  }
  clear() {
    this.current = '';
    this.previous = '';
    this.operation = undefined;
  }
  delete() {
    this.current = this.current.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === '.' && this.current.includes('.')) return;
    this.current = this.current.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.current === '') return;
    if (this.previous !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = '';
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previous);
    const cur = parseFloat(this.current);
    if (isNaN(prev) || isNaN(cur)) return;
    switch (this.operation) {
      case '+':
        computation = prev + cur;
        break;
      case '-':
        computation = prev - cur;
        break;
      case '*':
        computation = prev * cur;
        break;
      case '/':
        computation = prev / cur;
        break;
      default:
        return;
    }
    this.current = computation;
    this.operation = undefined;
    this.previous = '';
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  updateDisplay() {
    this.currentTextEl.innerText = this.getDisplayNumber(this.current);
    if (this.operation != null) {
      this.previousTextEl.innerText = `${this.getDisplayNumber(
        this.previous
      )} ${this.operation}`;
    } else {
      this.previousTextEl.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousTextEl = document.querySelector('[data-previous]');
const currentTextEl = document.querySelector('[data-current]');

const calculator = new Calculator(previousTextEl, currentTextEl);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});

// let calcBtns = document.getElementsByClassName('calc-btn');
// let inputField = document.getElementById('input-field');

// const add = (num1, num2) => {
//   return num1 + num2;
// };
// const subtract = (num1, num2) => {
//   return num1 - num2;
// };
// const multiply = (num1, num2) => {
//   return num1 * num2;
// };
// const divide = (num1, num2) => {
//   return num1 / num2;
// };

// for (let i = 0; i < calcBtns.length; i++) {
//   calcBtns[i].addEventListener('click', e => {
//     e.preventDefault;
//     let btnPressed = calcBtns[i].innerHTML;
//     if (btnPressed >= 0 || btnPressed <= 9) {
//       let num = Number(btnPressed);
//       inputField.value += num;
//     } else if (btnPressed === '+') {
//       let num1 = inputField.value;
//       return num1;
//     }
//   });
// }
