function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function getRndInteger(min = 0, max = 9) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRndUppercase() {
    return String.fromCharCode(getRndInteger(65, 90));
}

function getRndLowercase() {
    return String.fromCharCode(getRndInteger(97, 122));
}

function getRndSymbol(symbols) {    
    shuffleArray(symbols);
    return symbols[0];
}

export default function generatePassword(qtdNum, qtdUpper, qtdLower, qtdSimbolo, symbols) {
    const total = qtdNum + qtdUpper + qtdLower + qtdSimbolo;
    let password = '';

    let ops = [
        { id: 1, qtd: qtdNum, func: getRndInteger },
        { id: 2, qtd: qtdUpper, func: getRndUppercase },
        { id: 3, qtd: qtdLower, func: getRndLowercase },
        { id: 4, qtd: qtdSimbolo, func: getRndSymbol }];
    
    ops = ops.filter((op) => {
        return op.qtd > 0;
    });

    for (let i = 0; i < total; i++) {
        let op;
        shuffleArray(ops);
        op = ops[0];
        if (op.id == 4)
            password += String(op.func(symbols));
        else
            password += String(op.func());

        op.qtd--;
        if (op.qtd <= 0)
            ops.shift();
    }

    return password !== '' ? password : '(Password)';
}
