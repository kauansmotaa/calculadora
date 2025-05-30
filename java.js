// script.js

let count = 0; // Inicializa o contador

// Referências para o elemento do botão e o contador
const clickButton = document.getElementById('click-button');
const clickCount = document.getElementById('click-count');

// Função para aumentar o contador
clickButton.addEventListener('click', function() {
    count++;  // Aumenta a contagem a cada clique
    clickCount.textContent = count;  // Atualiza a exibição do contador
});
