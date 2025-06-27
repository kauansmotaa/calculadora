document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('counter');
    const clickBtn = document.getElementById('clickBtn');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');
    const maxCountElement = document.getElementById('maxCount');
    const minCountElement = document.getElementById('minCount');
    const confettiContainer = document.getElementById('confetti');
    
    let count = 0;
    let maxCount = 0;
    let minCount = 0;
    
    // Load saved data from localStorage
    if (localStorage.getItem('clickCounter')) {
        const savedData = JSON.parse(localStorage.getItem('clickCounter'));
        count = savedData.count;
        maxCount = savedData.maxCount;
        minCount = savedData.minCount;
        updateDisplay();
    }
    
    // Main click function
    clickBtn.addEventListener('click', () => {
        count++;
        updateStats();
        updateDisplay();
        animateButton();
        saveData();
        
        // Special effects for milestones
        if (count % 50 === 0) {
            createConfetti();
            counterElement.style.color = '#ff6b6b';
            setTimeout(() => {
                counterElement.style.color = '#4a6bff';
            }, 1000);
        }
    });
    
    // Increment button
    incrementBtn.addEventListener('click', () => {
        count++;
        updateStats();
        updateDisplay();
        saveData();
    });
    
    // Decrement button
    decrementBtn.addEventListener('click', () => {
        count--;
        updateStats();
        updateDisplay();
        saveData();
    });
    
    // Reset button
    resetBtn.addEventListener('click', () => {
        count = 0;
        updateStats();
        updateDisplay();
        saveData();
    });
    
    // Update all displays
    function updateDisplay() {
        counterElement.textContent = count;
        maxCountElement.textContent = maxCount;
        minCountElement.textContent = minCount;
        
        // Size animation
        counterElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            counterElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Update statistics
    function updateStats() {
        if (count > maxCount) {
            maxCount = count;
        }
        
        if (count < minCount) {
            minCount = count;
        }
    }
    
    // Animate main button
    function animateButton() {
        clickBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickBtn.style.transform = 'scale(1)';
        }, 100);
    }
    
    // Save data to localStorage
    function saveData() {
        const data = {
            count,
            maxCount,
            minCount
        };
        localStorage.setItem('clickCounter', JSON.stringify(data));
    }
    
    // Create confetti effect
    function createConfetti() {
        confettiContainer.innerHTML = '';
        const colors = ['#4a6bff', '#ff6b6b', '#2ecc71', '#f1c40f', '#9b59b6'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            
            confettiContainer.appendChild(confetti);
        }
    }
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            clickBtn.click();
        } else if (e.key === '+') {
            incrementBtn.click();
        } else if (e.key === '-') {
            decrementBtn.click();
        } else if (e.key === '0') {
            resetBtn.click();
        }
    });
});
