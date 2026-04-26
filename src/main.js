import generatePassword from './modules/passwordGenerator';
import './assets/css/style.css';

const displayTxt = document.querySelector('.display-passwd span');

const ALL_SYMBOLS = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_',
    '-', '+', '=', '{', '[', '}', ']', '|', '\\', '\:', '\;', '\"', '\'', '<', ',',
    '>', '.', '?', '/'];

let selectedSymbols = [...ALL_SYMBOLS];

const numberInputs = document.querySelectorAll('.number-input');

function updatePasswordDisplay() {
    const numCount = Number(document.querySelector('#numbers').value);
    const upperCount = Number(document.querySelector('#uppercase').value);
    const lowerCount = Number(document.querySelector('#lowercase').value);
    const symbolCount = Number(document.querySelector('#symbols').value);

    displayTxt.textContent = generatePassword(numCount, upperCount, lowerCount, symbolCount, selectedSymbols);
}

function balanceMaxValue() {
    let totalValue = 0;
    numberInputs.forEach((input) => {
        totalValue += Number(input.value);
    });

    numberInputs.forEach((input) => {
        const value = Number(input.value);
        input.setAttribute('max', String(20 - totalValue + value));
    });
}

/**
* @param {Element} button
*/
function toggleButtonState(button) {
    button.classList.toggle('pressed');
    button.classList.toggle('unpressed');
}

// Balance the max numbers each change
numberInputs.forEach((input) => {
    input.addEventListener('change', balanceMaxValue);
});

// Generate button functionality
document.querySelector('#generate-btn').addEventListener('click', function (e) {
    // Ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    // Check the selection of symbols
    const symbolCount = Number(document.querySelector('#symbols').value);

    if (selectedSymbols.length > 0 || symbolCount <= 0) {
        updatePasswordDisplay();
    } else {
        const errorNotification = document.querySelector('.error-window');
        errorNotification.classList.remove('hidden');
        void errorNotification.offsetWidth;
        errorNotification.classList.add('show');

        setTimeout(() => {
            errorNotification.classList.remove('show');
            setTimeout(() => {
                errorNotification.classList.add('hidden');
            }, 400);
        }, 3000);
    }
});

// Copy button functionality
document.querySelector('.cpy-btn').addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('cpy-ripple');

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    const text = displayTxt.textContent;
    if (text !== '(Password)') {
        navigator.clipboard.writeText(text);
    }

    const notification = document.querySelector('.notification');
    notification.classList.remove('hidden');
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 500);
    }, 1500);
});

// Symbols menu functionality
document.querySelector('.symbols-btn').addEventListener('click', function () {
    const symbolsMenu = document.querySelector('.symbols-menu');
    symbolsMenu.classList.toggle('hidden');
    symbolsMenu.classList.toggle('show');
    toggleButtonState(this);
});

// Symbol selection buttons functionality
const symbolButtons = document.querySelectorAll('.symbols-selection button');
symbolButtons.forEach((button) => {
    button.addEventListener('click', function () {
        toggleButtonState(this);
        const symbol = this.textContent;
        const index = selectedSymbols.indexOf(symbol);
        
        if (index > -1) {
            selectedSymbols.splice(index, 1);
        } else {
            selectedSymbols.push(symbol);
        }
    });
});

// Clear all button functionality
document.querySelector('.clear-all-btn').addEventListener('click', () => {
    selectedSymbols = [];
    symbolButtons.forEach((button) => {
        if (button.classList.contains('pressed')) {
            toggleButtonState(button);
        }
    });
});

// Select all button functionality
document.querySelector('.select-all-btn').addEventListener('click', () => {
    selectedSymbols = [...ALL_SYMBOLS];
    symbolButtons.forEach((button) => {
        if (button.classList.contains('unpressed')) {
            toggleButtonState(button);
        }
    });
});
