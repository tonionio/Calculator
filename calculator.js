let currentInput = "";
let currentOperation = null;
let previousInput = "";

function appendNumber(number) {
  if (number === '.' && currentInput.includes('.')) return;
  currentInput = currentInput.toString() + number.toString();
  updateDisplay();
}

function chooseOperation(operation) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    compute();
  }
  currentOperation = operation;
  previousInput = currentInput;
  currentInput = "";
}

function compute() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) {
      displayError("Invalid input");
      return;
  }
  switch (currentOperation) {
      case '+':
          computation = prev + current;
          break;
      case '-':
          computation = prev - current;
          break;
      case '*':
          computation = prev * current;
          break;
      case '/':
          if (current === 0) {
              displayError("Division by zero");
              return;
          }
          computation = prev / current;
          break;
      default:
          displayError("Invalid operation");
          return;
  }
  currentInput = computation;
  currentOperation = null;
  previousInput = "";
  updateDisplay();
}

function displayError(message) {
  const display = document.querySelector("#display");
  display.value = "Error: " + message;
  setTimeout(function() {
      clearDisplay();
  }, 2000);
}

function clearDisplay() {
  currentInput = "";
  currentOperation = null;
  previousInput = "";
  updateDisplay();
}

function backspace() {
  currentInput = currentInput.toString().slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  const display = document.querySelector("#display");
  display.value = currentInput;
}

document.addEventListener("keydown", function(event) {
    if (event.key >= '0' && event.key <= '9') {
      appendNumber(event.key);
    } else if (event.key === '+') {
      chooseOperation('+');
    } else if (event.key === '-') {
      chooseOperation('-');
    } else if (event.key === '*') {
      chooseOperation('*');
    } else if (event.key === '/') {
      chooseOperation('/');
    } else if (event.key === 'Enter') {
      compute();
    } else if (event.key === 'Backspace') {
      backspace();
    } else if (event.key === 'Escape') {
      clearDisplay();
    }
  });
  