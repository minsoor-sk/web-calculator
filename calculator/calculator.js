// Calculator state
let currentDisplay = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let lastOperator = null;
let lastOperand = null;

// Get display element
const display = document.getElementById('display');

// Update display
function updateDisplay() {
    display.textContent = currentDisplay;
}

// Handle number input
function handleNumber(num) {
    if (currentDisplay === 'Error') {
        resetCalculator();
    }

    if (waitingForSecondOperand) {
        currentDisplay = num;
        waitingForSecondOperand = false;
    } else {
        if (currentDisplay === '0') {
            currentDisplay = num;
        } else {
            currentDisplay += num;
        }
    }
    updateDisplay();
}

// Handle decimal point
function handleDecimal() {
    if (currentDisplay === 'Error') {
        resetCalculator();
    }

    if (waitingForSecondOperand) {
        currentDisplay = '0.';
        waitingForSecondOperand = false;
    } else if (!currentDisplay.includes('.')) {
        currentDisplay += '.';
    }
    updateDisplay();
}

// Handle operator selection
function handleOperator(nextOperator) {
    if (currentDisplay === 'Error') {
        resetCalculator();
        return;
    }

    const inputValue = parseFloat(currentDisplay);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator && !waitingForSecondOperand) {
        const result = calculate(firstOperand, operator, inputValue);
        currentDisplay = formatResult(result);
        firstOperand = result;
        updateDisplay();
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

// Calculate result
function calculate(first, op, second) {
    switch (op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '×':
            return first * second;
        case '÷':
            if (second === 0) {
                return 'Error';
            }
            return first / second;
        default:
            return second;
    }
}

// Format result to handle precision
function formatResult(result) {
    if (result === 'Error') {
        return 'Error';
    }

    if (typeof result !== 'number') {
        return result;
    }

    // Round to 8 decimal places to handle floating point precision
    let rounded = Math.round(result * 100000000) / 100000000;

    // Remove trailing zeros
    let formatted = rounded.toString();

    // Handle very large or very small numbers
    if (Math.abs(rounded) > 999999999999) {
        formatted = rounded.toExponential(6);
    }

    return formatted;
}

// Handle equals
function handleEquals() {
    if (currentDisplay === 'Error') {
        resetCalculator();
        return;
    }

    const inputValue = parseFloat(currentDisplay);

    if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, operator, inputValue);
        currentDisplay = formatResult(result);

        // Store for repeat equals
        lastOperator = operator;
        lastOperand = inputValue;

        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;

        updateDisplay();
    } else if (lastOperator && lastOperand !== null) {
        // Repeat last operation
        const result = calculate(inputValue, lastOperator, lastOperand);
        currentDisplay = formatResult(result);
        updateDisplay();
    }
}

// Clear calculator
function resetCalculator() {
    currentDisplay = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    lastOperator = null;
    lastOperand = null;
    updateDisplay();
}

// Event delegation for buttons
document.querySelector('.buttons').addEventListener('click', (event) => {
    const button = event.target;

    if (!button.classList.contains('button')) {
        return;
    }

    const action = button.dataset.action;
    const buttonText = button.textContent;

    switch (action) {
        case 'number':
            handleNumber(buttonText);
            break;
        case 'decimal':
            handleDecimal();
            break;
        case 'operator':
            handleOperator(buttonText);
            break;
        case 'equals':
            handleEquals();
            break;
        case 'clear':
            resetCalculator();
            break;
    }
});

// Initialize display
updateDisplay();
