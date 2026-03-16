/**
 * Auditions Management System - Acte 2
 */

let auditionTimer = null;
let timeLeft = 0; // in seconds
let isPaused = true;
let currentActorId = null;

const AUDITION_DURATION = 10 * 60; // 10 minutes default for non-parli

window.initAuditionSection = function() {
    const actorsList = [
        { id: 'DGSI', name: 'DGSI', icon: '🏛️' },
        { id: 'ANSSI', name: 'ANSSI', icon: '🛡️' },
        { id: 'CYPHERA', name: 'CYPHERA', icon: '💻' },
        { id: 'CNIL', name: 'CNIL', icon: '👤' },
        { id: 'Armees', name: 'Armées / COMCYBER', icon: '⚔️' },
        { id: 'Medias', name: 'Médias / Journalistes', icon: '📰' },
        { id: 'Interieur', name: 'Ministère Intérieur', icon: '👮' },
        { id: 'Justice', name: 'Ministère Justice', icon: '⚖️' }
    ];

    const container = document.getElementById('audition-actors-list');
    if (!container) return;

    container.innerHTML = '';
    actorsList.forEach(actor => {
        const row = document.createElement('div');
        row.className = 'audition-actor-row';
        row.innerHTML = `
            <span class="actor-icon">${actor.icon}</span>
            <span class="actor-name">${actor.name}</span>
            <span class="actor-status" id="status-${actor.id}">En attente</span>
        `;
        row.onclick = () => selectActorForAudition(actor);
        container.appendChild(row);
    });
}

function selectActorForAudition(actor) {
    // Reset previous
    if (auditionTimer) clearInterval(auditionTimer);
    
    currentActorId = actor.id;
    timeLeft = AUDITION_DURATION;
    isPaused = true;
    
    const activeDisplay = document.getElementById('active-actor-name');
    if (activeDisplay) {
        activeDisplay.textContent = actor.name;
        activeDisplay.classList.add('animated-pulse-brief');
        setTimeout(() => activeDisplay.classList.remove('animated-pulse-brief'), 500);
    }

    document.querySelectorAll('.audition-actor-row').forEach(r => r.classList.remove('active'));
    
    // Find the specific row to activate
    const rows = document.querySelectorAll('.audition-actor-row');
    rows.forEach(row => {
        if (row.querySelector('.actor-name').textContent === actor.name) {
            row.classList.add('active');
        }
    });
    
    updateTimerDisplay();
    updateClepsydre(100);
    
    const toggleBtn = document.getElementById('btn-timer-toggle');
    if (toggleBtn) {
        toggleBtn.textContent = 'Démarrer Mission';
        toggleBtn.disabled = false;
        toggleBtn.className = 'btn-primary';
    }
}

function toggleTimer() {
    if (!currentActorId) return;

    const toggleBtn = document.getElementById('btn-timer-toggle');
    if (isPaused) {
        startTimer();
        if (toggleBtn) {
            toggleBtn.textContent = 'Pause Signal';
            toggleBtn.className = 'btn-vote reset'; // Use established red style for pause
        }
    } else {
        pauseTimer();
        if (toggleBtn) {
            toggleBtn.textContent = 'Reprendre Mission';
            toggleBtn.className = 'btn-primary';
        }
    }
}

function startTimer() {
    isPaused = false;
    const statusEl = document.getElementById(`status-${currentActorId}`);
    if (statusEl) {
        statusEl.textContent = 'Analyse...';
        statusEl.className = 'actor-status active';
    }

    auditionTimer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
            const percent = (timeLeft / AUDITION_DURATION) * 100;
            updateClepsydre(percent);
        } else {
            finishAudition();
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = true;
    clearInterval(auditionTimer);
}

function resetAuditionTimer() {
    pauseTimer();
    timeLeft = AUDITION_DURATION;
    updateTimerDisplay();
    updateClepsydre(100);
    const toggleBtn = document.getElementById('btn-timer-toggle');
    if (toggleBtn) {
        toggleBtn.textContent = 'Démarrer Mission';
        toggleBtn.className = 'btn-primary';
    }
}

function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const display = document.getElementById('timer-digital');
    if (display) {
        display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

function updateClepsydre(percent) {
    const fill = document.getElementById('clepsydre-fill');
    if (fill) {
        fill.style.height = `${percent}%`;
        // High-tech fluid gradients
        if (percent < 20) {
            fill.style.background = 'linear-gradient(to top, #ef4444, #b91c1c)';
            fill.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.5)';
        } else if (percent < 50) {
            fill.style.background = 'linear-gradient(to top, #f59e0b, #d97706)';
            fill.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.4)';
        } else {
            fill.style.background = 'linear-gradient(to top, #4ade80, #16a34a)';
            fill.style.boxShadow = '0 0 20px rgba(74, 222, 128, 0.4)';
        }
    }
}

function finishAudition() {
    pauseTimer();
    const statusEl = document.getElementById(`status-${currentActorId}`);
    if (statusEl) {
        statusEl.textContent = 'Auditionnée';
        statusEl.className = 'actor-status completed';
    }
    
    // Play sound
    try {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
        audio.play();
    } catch(e) {
        console.log("Audio play failed", e);
    }
    
    const activeActor = document.getElementById('active-actor-name').textContent;
    alert(`FIN DE SESSION : ${activeActor}`);
}

// Global exposure for the button in acte2.html
window.startAuditions = () => {
    // This could also switch local view if needed
    initAuditionSection();
};

window.handleTimerToggle = toggleTimer;
window.handleTimerReset = resetAuditionTimer;

// Initial check in case it's already there
if (document.getElementById('audition-actors-list')) {
    initAuditionSection();
}
