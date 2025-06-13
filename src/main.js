import gerarSenha from './modules/geradorSenha';

import './assets/css/style.css';

const displayTxt = document.querySelector('.display-passwd span');

const allSymbols = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_',
    '-', '+', '=', '{', '[', '}', ']', '|', '\\', '\:', '\;', '\"', '\'', '<', ',',
    '>', '.', '?', '/'];

let symbols = allSymbols.slice();

const numberInputs = document.querySelectorAll('.number-input');

function displaySenha() {
    const qtdNum = Number(document.querySelector('#numbers').value);
    const qtdUpper = Number(document.querySelector('#uppercase').value);
    const qtdLower = Number(document.querySelector('#lowercase').value);
    const qtdSimbolo = Number(document.querySelector('#symbols').value);

    displayTxt.textContent = gerarSenha(qtdNum, qtdUpper, qtdLower, qtdSimbolo, symbols);
}

function balanceMaxValue() {
    let sum = 0;

    numberInputs.forEach((input) => {
        sum += Number(input.value);
    });

    numberInputs.forEach((input) => {
        const value = Number(input.value);

        input.setAttribute('max', String(20 - sum + value));
    });
}

/**
* @param {Element} button
*/
function changeButtonPress(button) {
    if (!button.classList.contains('pressed')) {
        button.classList.add('pressed');
        button.classList.remove('unpressed');
    } else {
        button.classList.remove('pressed');
        button.classList.add('unpressed');
    }
}

// Balance the max numbers each change
numberInputs.forEach(function (input) {
    input.addEventListener('change', balanceMaxValue);
});

// Generate button funcionalities
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
    const qtdSimbolo = Number(document.querySelector('#symbols').value);

    if (symbols.length > 0 || qtdSimbolo <= 0) {
        displaySenha();
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

// Copy button functionalities
document.querySelector('.cpy-btn').addEventListener('click', function (e) {
    // Ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('cpy-ripple');

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);


    // Copy password to clipboard
    const txt = displayTxt.textContent;
    if (txt !== '(Senha)')
        navigator.clipboard.writeText(txt);
    else navigator.clipboard.writeText('');

    // "Copied!" notification
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

// Symbols button menu functionalites
document.querySelector('.symbols-btn').addEventListener('click', function (e) {
    // Change the menu display
    const symbolsMenu = document.querySelector('.symbols-menu');

    if (symbolsMenu.classList.contains('hidden')) {
        symbolsMenu.classList.remove('hidden');
        symbolsMenu.classList.add('show');
    } else {
        symbolsMenu.classList.remove('show');
        symbolsMenu.classList.add('hidden');
    }

    // Change button press
    changeButtonPress(this);
});

// Symbol selection buttons functionalites
const buttons = document.querySelectorAll('.symbols-selection button');
buttons.forEach(function (button) {
    button.addEventListener('click', function (e) {
        // Change button color
        changeButtonPress(this);

        // Add/remove symbols from the list
        const index = symbols.indexOf(this.textContent);
        if (index > -1) {
            symbols.splice(index, 1);
        } else {
            symbols.push(this.textContent);
        }
    });
});

// Clear all button funcionality
document.querySelector('.clear-all-btn').addEventListener('click', function (e) {
    // Press/unpress button

    // Clear array
    symbols.splice(0, symbols.length);

    // Unpress all buttons
    buttons.forEach(function (button) {
        if (button.classList.contains('pressed'))
            changeButtonPress(button);
    });
});

// Select all button funcionality
document.querySelector('.select-all-btn').addEventListener('click', function (e) {
    // Press/unpress button

    // Fill array
    symbols = allSymbols.slice();

    // Press all buttons
    buttons.forEach(function (button) {
        if (button.classList.contains('unpressed'))
         changeButtonPress(button);
    });
});