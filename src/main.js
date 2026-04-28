import generatePassword from "./modules/passwordGenerator";
import "./assets/css/style.css";

const displayTxt = document.querySelector(".display-passwd span");

const MAX_CHARACTERS = 20;

const ALL_SYMBOLS = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  "|",
  "\\",
  "\:",
  "\;",
  '\"',
  "'",
  "<",
  ",",
  ">",
  ".",
  "?",
  "/",
];

let selectedSymbols = [...ALL_SYMBOLS];

const inputs = {
  numberInputs: document.querySelectorAll(".number-input"),

  getTotalValue() {
    let totalValue = 0;
    this.numberInputs.forEach((input) => {
      totalValue += Number(input.value);
    });

    return totalValue;
  },
};

// Balance the max numbers each change
inputs.numberInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    balanceMaxValue(event.target);
  });
});

function updatePasswordDisplay() {
  const numCount = Number(document.querySelector("#numbers").value);
  const upperCount = Number(document.querySelector("#uppercase").value);
  const lowerCount = Number(document.querySelector("#lowercase").value);
  const symbolCount = Number(document.querySelector("#symbols").value);

  displayTxt.textContent = generatePassword(
    numCount,
    upperCount,
    lowerCount,
    symbolCount,
    selectedSymbols,
  );
}

function balanceMaxValue(targetInput) {
  let targetValue = Number(targetInput.value);

  if (targetValue < 0) {
    targetInput.value = "0";
    targetValue = 0;
  }

  const totalValue = inputs.getTotalValue();

  if (totalValue > MAX_CHARACTERS) {
    targetValue = targetValue - (totalValue - MAX_CHARACTERS);
    targetInput.value = targetValue;
  }
}

/**
 * @param {Element} button
 */
function toggleButtonState(button) {
  button.classList.toggle("pressed");
  button.classList.toggle("unpressed");
}

// Generate button functionality
document.querySelector("#generate-btn").addEventListener("click", function (e) {
  // Ripple effect
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");

  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

  this.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);

  // Check the selection of symbols
  const symbolCount = Number(document.querySelector("#symbols").value);

  if (selectedSymbols.length > 0 || symbolCount <= 0) {
    updatePasswordDisplay();
  } else {
    const errorNotification = document.querySelector(".error-window");
    errorNotification.classList.remove("hidden");
    void errorNotification.offsetWidth;
    errorNotification.classList.add("show");

    setTimeout(() => {
      errorNotification.classList.remove("show");
      setTimeout(() => {
        errorNotification.classList.add("hidden");
      }, 400);
    }, 3000);
  }
});

// Copy button functionality
document.querySelector(".cpy-btn").addEventListener("click", function (e) {
  const ripple = document.createElement("span");
  ripple.classList.add("cpy-ripple");

  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

  this.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);

  const text = displayTxt.textContent;
  if (text !== "(Password)") {
    navigator.clipboard.writeText(text);
  }

  const notification = document.querySelector(".notification");
  notification.classList.remove("hidden");
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 500);
  }, 1500);
});

// Symbols menu functionality
document.querySelector(".symbols-btn").addEventListener("click", function () {
  const symbolsMenu = document.querySelector(".symbols-menu");
  if (symbolsMenu.classList.contains("first")) {
    symbolsMenu.classList.toggle("first");
    symbolsMenu.classList.toggle("show");
  } else {
    symbolsMenu.classList.toggle("hidden");
    symbolsMenu.classList.toggle("show");
  }
  toggleButtonState(this);
});

// Symbol selection buttons functionality
const symbolButtons = document.querySelectorAll(".symbols-selection button");
symbolButtons.forEach((button) => {
  button.addEventListener("click", function () {
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
document.querySelector(".clear-all-btn").addEventListener("click", () => {
  selectedSymbols = [];
  symbolButtons.forEach((button) => {
    if (button.classList.contains("pressed")) {
      toggleButtonState(button);
    }
  });
});

// Select all button functionality
document.querySelector(".select-all-btn").addEventListener("click", () => {
  selectedSymbols = [...ALL_SYMBOLS];
  symbolButtons.forEach((button) => {
    if (button.classList.contains("unpressed")) {
      toggleButtonState(button);
    }
  });
});
