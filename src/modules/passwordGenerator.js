/**
 * Generates a secure random integer between min and max (inclusive).
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function secureRandomInt(min, max) {
    const range = max - min + 1;
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    return min + (randomBuffer[0] % range);
}

function getRndUppercase() {
    return String.fromCharCode(secureRandomInt(65, 90));
}

function getRndLowercase() {
    return String.fromCharCode(secureRandomInt(97, 122));
}

function getRndSymbol(symbols) {
    const index = secureRandomInt(0, symbols.length - 1);
    return symbols[index];
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = secureRandomInt(0, i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

export default function generatePassword(numCount, upperCount, lowerCount, symbolCount, symbols) {
    const total = numCount + upperCount + lowerCount + symbolCount;
    if (total <= 0) return '(Password)';

    let password = '';
    const pool = [];

    // Add required characters to the pool
    for (let i = 0; i < numCount; i++) pool.push(String(secureRandomInt(0, 9)));
    for (let i = 0; i < upperCount; i++) pool.push(getRndUppercase());
    for (let i = 0; i < lowerCount; i++) pool.push(getRndLowercase());
    for (let i = 0; i < symbolCount; i++) pool.push(getRndSymbol(symbols));

    // Shuffle the pool to ensure character type distribution is random
    shuffleArray(pool);
    password = pool.join('');

    return password;
}
