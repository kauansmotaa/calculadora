function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    let expression = document.getElementById('display').value;
    expression = expression.replace(/%/g, '/100'); // Transforma "%" em "/100"

    try {
        document.getElementById('display').value = eval(expression);
    } catch {
        document.getElementById('display').value = 'Erro';
    }
}
