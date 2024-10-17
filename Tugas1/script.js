const screenOperation = document.getElementById('operation');
const screenResult = document.getElementById('result');

let currentInput = '';
let previousInput = '';
let operator = '';

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const buttonText = button.textContent;

        if (!action) {
            // If it's a number or decimal
            if (currentInput === '0') {
                currentInput = buttonText;
            } else {
                currentInput += buttonText;
            }
            screenResult.textContent = currentInput;
        } else if (action === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = '';
            screenResult.textContent = '0';
            screenOperation.textContent = '';
        } else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide' || action === 'modulus' || action === 'exponent') {
            operator = action;
            previousInput = currentInput;
            currentInput = '';
            screenOperation.textContent = `${previousInput} ${buttonText}`;
        } else if (action === 'equal') {
            calculate();
        } else if (buttonText === '.') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                screenResult.textContent = currentInput;
            }
        }
    });
});

function calculate() {
    let result = '';
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (operator === 'add') {
        result = prev + current;
    } else if (operator === 'subtract') {
        result = prev - current;
    } else if (operator === 'multiply') {
        result = prev * current;
    } else if (operator === 'divide') {
        result = prev / current;
    } else if (operator === 'modulus') {
        result = prev % current;
    } else if (operator === 'exponent') {
        result = Math.pow(prev, current);
    }

    screenResult.textContent = result;
    screenOperation.textContent = `${previousInput} ${getOperatorSymbol(operator)} ${currentInput} =`;
    currentInput = result;
    operator = '';
    previousInput = '';
}

function getOperatorSymbol(operator) {
    switch (operator) {
        case 'add': return '+';
        case 'subtract': return '−';
        case 'multiply': return '×';
        case 'divide': return '÷';
        case 'modulus': return '%';
        case 'exponent': return '^';
    }
}
