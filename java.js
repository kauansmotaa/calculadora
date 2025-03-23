function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    let expression = document.getElementById('display').value;
    expression = expression.replace(/\^/g, '**');
    expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
    try {
        document.getElementById('display').value = eval(expression);
    } catch {
        document.getElementById('display').value = 'Erro';
    }
}