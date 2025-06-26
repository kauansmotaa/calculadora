document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const counterElement = document.getElementById('counter');
    const clickBtn = document.getElementById('clickBtn');
    const resetBtn = document.getElementById('resetBtn');
    const saveBtn = document.getElementById('saveBtn');
    const loadBtn = document.getElementById('loadBtn');
    const clicksPerSecondElement = document.getElementById('clicksPerSecond');
    const highestSpeedElement = document.getElementById('highestSpeed');
    const autoClickerUpgrade = document.getElementById('autoClicker');
    const clickMultiplierUpgrade = document.getElementById('clickMultiplier');
    const confettiContainer = document.getElementById('confetti');
    
    // Variáveis do jogo
    let clickCount = 0;
    let clickMultiplier = 1;
    let autoClickerLevel = 0;
    let clickMultiplierLevel = 0;
    let clicksPerSecond = 0;
    let highestSpeed = 0;
    let lastClickTime = 0;
    let clickTimes = [];
    
    // Carregar dados salvos
    loadGame();
    
    // Atualizar display
    updateDisplay();
    
    // Event listeners
    clickBtn.addEventListener('click', handleClick);
    resetBtn.addEventListener('click', resetGame);
    saveBtn.addEventListener('click', saveGame);
    loadBtn.addEventListener('click', loadGame);
    
    // Configurar botões de upgrade
    setupUpgradeButtons();
    
    // Configurar auto clicker
    setInterval(autoClick, 1000);
    setInterval(calculateClicksPerSecond, 1000);
    
    // Função principal de clique
    function handleClick() {
        // Adiciona o valor do multiplicador ao contador
        clickCount += clickMultiplier;
        
        // Registra o tempo do clique
        const now = Date.now();
        clickTimes.push(now);
        
        // Remove cliques antigos (últimos 5 segundos)
        clickTimes = clickTimes.filter(time => now - time <= 5000);
        
        // Efeitos visuais
        counterElement.classList.add('pulse');
        createClickEffect(event);
        
        // Remove a classe de efeito após a animação
        setTimeout(() => {
            counterElement.classList.remove('pulse');
        }, 500);
        
        // Atualiza o display
        updateDisplay();
        
        // Efeito de confete em marcos importantes
        if (clickCount % 100 === 0 && clickCount > 0) {
            createConfetti();
        }
    }
    
    // Função para criar efeito de clique
    function createClickEffect(event) {
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.style.position = 'absolute';
        effect.style.left = `${event.clientX}px`;
        effect.style.top = `${event.clientY}px`;
        effect.style.width = '10px';
        effect.style.height = '10px';
        effect.style.backgroundColor = 'rgba(253, 121, 168, 0.7)';
        effect.style.borderRadius = '50%';
        effect.style.pointerEvents = 'none';
        effect.style.transform = 'translate(-50%, -50%)';
        effect.style.animation = 'clickEffect 0.5s forwards';
        
        document.body.appendChild(effect);
        
        // Remove o efeito após a animação
        setTimeout(() => {
            effect.remove();
        }, 500);
    }
    
    // Função para atualizar o display
    function updateDisplay() {
        counterElement.textContent = clickCount.toLocaleString();
        clicksPerSecondElement.textContent = clicksPerSecond.toFixed(1);
        highestSpeedElement.textContent = highestSpeed.toFixed(1);
        
        // Atualiza os níveis dos upgrades
        document.querySelectorAll('#autoClicker .level')[0].textContent = `Nível ${autoClickerLevel}`;
        document.querySelectorAll('#clickMultiplier .level')[0].textContent = `Nível ${clickMultiplierLevel}`;
        
        // Atualiza os botões de upgrade
        updateUpgradeButtons();
    }
    
    // Função para cliques automáticos
    function autoClick() {
        if (autoClickerLevel > 0) {
            const autoClicks = autoClickerLevel * clickMultiplier;
            clickCount += autoClicks;
            updateDisplay();
        }
    }
    
    // Função para calcular cliques por segundo
    function calculateClicksPerSecond() {
        const now = Date.now();
        const recentClicks = clickTimes.filter(time => now - time <= 1000).length;
        clicksPerSecond = recentClicks * clickMultiplier;
        
        if (clicksPerSecond > highestSpeed) {
            highestSpeed = clicksPerSecond;
        }
        
        updateDisplay();
    }
    
    // Função para reiniciar o jogo
    function resetGame() {
        if (confirm('Tem certeza que deseja reiniciar? Todos os progressos serão perdidos.')) {
            clickCount = 0;
            clickMultiplier = 1;
            autoClickerLevel = 0;
            clickMultiplierLevel = 0;
            clicksPerSecond = 0;
            highestSpeed = 0;
            clickTimes = [];
            
            // Efeito visual
            counterElement.classList.add('bounce');
            setTimeout(() => {
                counterElement.classList.remove('bounce');
            }, 1000);
            
            updateDisplay();
            localStorage.removeItem('clickCounterSave');
        }
    }
    
    // Função para salvar o jogo
    function saveGame() {
        const saveData = {
            clickCount,
            clickMultiplier,
            autoClickerLevel,
            clickMultiplierLevel,
            highestSpeed
        };
        
        localStorage.setItem('clickCounterSave', JSON.stringify(saveData));
        
        // Feedback visual
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-check"></i> Salvo!';
        setTimeout(() => {
            saveBtn.innerHTML = originalText;
        }, 2000);
    }
    
    // Função para carregar o jogo
    function loadGame() {
        const saveData = localStorage.getItem('clickCounterSave');
        if (saveData) {
            const loadedData = JSON.parse(saveData);
            
            clickCount = loadedData.clickCount || 0;
            clickMultiplier = loadedData.clickMultiplier || 1;
            autoClickerLevel = loadedData.autoClickerLevel || 0;
            clickMultiplierLevel = loadedData.clickMultiplierLevel || 0;
            highestSpeed = loadedData.highestSpeed || 0;
            
            // Feedback visual
            const originalText = loadBtn.innerHTML;
            loadBtn.innerHTML = '<i class="fas fa-check"></i> Carregado!';
            setTimeout(() => {
                loadBtn.innerHTML = originalText;
            }, 2000);
            
            updateDisplay();
        }
    }
    
    // Função para configurar os botões de upgrade
    function setupUpgradeButtons() {
        const upgradeButtons = document.querySelectorAll('.upgrade-btn');
        
        // Auto Clicker
        upgradeButtons[0].addEventListener('click', function() {
            const cost = 10 * (autoClickerLevel + 1);
            if (clickCount >= cost) {
                clickCount -= cost;
                autoClickerLevel++;
                updateDisplay();
                
                // Feedback visual
                this.textContent = `Melhorar (${10 * (autoClickerLevel + 1)} cliques)`;
                this.classList.add('pulse');
                setTimeout(() => {
                    this.classList.remove('pulse');
                }, 500);
            } else {
                // Feedback de cliques insuficientes
                this.textContent = 'Cliques insuficientes!';
                this.style.backgroundColor = '#ff7675';
                setTimeout(() => {
                    this.textContent = `Melhorar (${10 * (autoClickerLevel + 1)} cliques)`;
                    this.style.backgroundColor = '';
                }, 1000);
            }
        });
        
        // Multiplicador de Cliques
        upgradeButtons[1].addEventListener('click', function() {
            const cost = 25 * (clickMultiplierLevel + 1);
            if (clickCount >= cost) {
                clickCount -= cost;
                clickMultiplierLevel++;
                clickMultiplier = 1 + (clickMultiplierLevel * 0.5);
                updateDisplay();
                
                // Feedback visual
                this.textContent = `Melhorar (${25 * (clickMultiplierLevel + 1)} cliques)`;
                this.classList.add('pulse');
                setTimeout(() => {
                    this.classList.remove('pulse');
                }, 500);
            } else {
                // Feedback de cliques insuficientes
                this.textContent = 'Cliques insuficientes!';
                this.style.backgroundColor = '#ff7675';
                setTimeout(() => {
                    this.textContent = `Melhorar (${25 * (clickMultiplierLevel + 1)} cliques)`;
                    this.style.backgroundColor = '';
                }, 1000);
            }
        });
    }
    
    // Função para atualizar o estado dos botões de upgrade
    function updateUpgradeButtons() {
        const upgradeButtons = document.querySelectorAll('.upgrade-btn');
        
        // Auto Clicker
        const autoClickerCost = 10 * (autoClickerLevel + 1);
        upgradeButtons[0].textContent = `Melhorar (${autoClickerCost} cliques)`;
        upgradeButtons[0].disabled = clickCount < autoClickerCost;
        
        // Multiplicador de Cliques
        const multiplierCost = 25 * (clickMultiplierLevel + 1);
        upgradeButtons[1].textContent = `Melhorar (${multiplierCost} cliques)`;
        upgradeButtons[1].disabled = clickCount < multiplierCost;
    }
    
    // Função para criar efeito de confete
    function createConfetti() {
        // Limpa confetes antigos
        confettiContainer.innerHTML = '';
        
        // Cria novos confetes
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.setProperty('--random-x', `${Math.random() * 100 - 50}vw`);
            
            confettiContainer.appendChild(confetti);
        }
        
        // Remove os confetes após a animação
        setTimeout(() => {
            confettiContainer.innerHTML = '';
        }, 5000);
    }
    
    // Função auxiliar para gerar cores aleatórias
    function getRandomColor() {
        const colors = ['#6c5ce7', '#a29bfe', '#fd79a8', '#00b894', '#fdcb6e', '#e17055'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Adiciona estilo de animação para os confetes
    const style = document.createElement('style');
    style.textContent = `
        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            top: -10px;
            opacity: 1;
            border-radius: 2px;
        }
        
        @keyframes fall {
            to {
                transform: translate(var(--random-x), 100vh);
                opacity: 0;
            }
        }
        
        @keyframes clickEffect {
            to {
                transform: translate(-50%, -50%) scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});