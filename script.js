// Update time in status bar
function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

// Update time immediately and then every minute
updateTime();
setInterval(updateTime, 60000);

// Add haptic-like vibration or effect on button click
const actionBtn = document.getElementById('action-btn');
if (actionBtn) {
    actionBtn.addEventListener('click', () => {
        // iOS style vibration if supported
        if ('vibrate' in navigator) {
            navigator.vibrate(10); // subtle tap
        }
        
        // Visual feedback
        actionBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            actionBtn.style.transform = 'none';
            alert('Neuro Frequency: Strategy details are confidential. Contact us for access.');
        }, 100);
    });
}

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animate chart bars on load
window.addEventListener('load', () => {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const height = bar.style.getPropertyValue('--height');
        bar.style.height = '0';
        setTimeout(() => {
            bar.style.height = height;
        }, 300);
    });
});
