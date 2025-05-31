document.addEventListener('DOMContentLoaded', function() {
    const counter = document.getElementById('counter');
    const clickBtn = document.getElementById('clickBtn');
    const resetBtn = document.getElementById('resetBtn');
    const cpsDisplay = document.getElementById('cps');
    const recordDisplay = document.getElementById('record');
    const particlesContainer = document.getElementById('particles');
    
    let count = 0;
    let record = localStorage.getItem('clickRecord') || 0;
    let clicks = [];
    let clickTimes = [];
    
    // Inicializar recorde
    recordDisplay.textContent = record;
    
    // Atualizar contador
    function updateCounter() {
        counter.textContent = count;
        counter.classList.add('number-pop');
        setTimeout(() => counter.classList.remove('number-pop'), 300);
        
        // Atualizar recorde se necessário
        if (count > record) {
            record = count;
            recordDisplay.textContent = record;
            localStorage.setItem('clickRecord', record);
        }
    }
    
    // Calcular cliques por segundo
    function calculateCPS() {
        const now = Date.now();
        clickTimes = clickTimes.filter(time => now - time < 1000);
        const cps = clickTimes.length;
        cpsDisplay.textContent = cps;
        
        // Mudar cor conforme a velocidade
        if (cps > 8) {
            cpsDisplay.style.color = '#ff7675';
        } else if (cps > 5) {
            cpsDisplay.style.color = '#fdcb6e';
        } else {
            cpsDisplay.style.color = 'white';
        }
    }
    
    // Criar partícula
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x - size/2}px`;
        particle.style.top = `${y - size/2}px`;
        
        // Cor aleatória
        const colors = ['#fd79a8', '#a29bfe', '#74b9ff', '#55efc  ]