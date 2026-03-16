/**
 * Voting System - Logic & Mechanics
 */

let activeVoteType = ''; // 'President', 'Rapporteur', 'Rapport'

function goToSecondRound() {
    if (!confirm("Passer au second tour ? Seuls les deux candidats en tête seront conservés et les votes seront réinitialisés pour ce tour.")) return;

    const allVotes = loadVotes();
    const currentVote = allVotes[activeVoteType];
    
    // Calculate totals for candidates
    const totaux = {};
    currentVote.candidates.forEach(c => {
        totaux[c] = 0;
        parliamentaryGroups.forEach(g => {
            totaux[c] += (currentVote.data[g.id]?.[c] || 0);
        });
    });

    // Sort and get top 2
    const top2 = Object.entries(totaux)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(entry => entry[0]);

    if (top2.length < 2) {
        alert("Il faut au moins deux candidats ayant reçu des voix pour passer au second tour.");
        return;
    }

    currentVote.round = 2;
    currentVote.candidates = top2;
    currentVote.data = {}; // Reset votes for the new round
    currentVote.validated = false;

    saveVotes(allVotes);
    initVoteModal(activeVoteType);
}

function handleVoteInput(input) {
    const groupId = input.dataset.group;
    const candName = input.dataset.cand;
    const group = parliamentaryGroups.find(g => g.id === groupId);
    const row = input.closest('tr');
    
    const allVotes = loadVotes();
    const currentVote = allVotes[activeVoteType];
    if (!currentVote.data[groupId]) currentVote.data[groupId] = {};
    
    let newVal = parseInt(input.value) || 0;
    
    // Sum other candidates for this group
    let otherVotesSum = 0;
    currentVote.candidates.forEach(c => {
        if (c !== candName) otherVotesSum += (currentVote.data[groupId][c] || 0);
    });

    // Enforce limit
    if (newVal + otherVotesSum > group.seats) {
        newVal = group.seats - otherVotesSum;
        input.value = newVal;
    }

    currentVote.data[groupId][candName] = newVal;
    saveVotes(allVotes);

    // Update UI
    const totalVoted = newVal + otherVotesSum;
    row.querySelector('.abst-val').textContent = Math.max(0, group.seats - totalVoted);
    
    if (totalVoted >= group.seats) {
        row.classList.add('row-voted');
    } else {
        row.classList.remove('row-voted');
    }

    updateThreshold();
    updateHemicycle();
}

function validateVote() {
    if (confirm("Valider définitivement ce vote ? Cette action verrouillera les résultats.")) {
        const allVotes = loadVotes();
        allVotes[activeVoteType].validated = true;
        saveVotes(allVotes);
        initVoteModal(activeVoteType);
        if (typeof refreshSummaryResults === 'function') {
            refreshSummaryResults(); // Update badges immediately
        }
        if (typeof closeVote === 'function') {
            closeVote(); // Fermer le menu après validation
        }
    }
}

function resetVote() {
    if (confirm("Réinitialiser ce vote ? Les données actuelles seront effacées.")) {
        const allVotes = loadVotes();
        allVotes[activeVoteType] = { 
            round: 1, 
            candidates: (activeVoteType === 'Rapport' ? ['Adopté', 'Rejeté'] : []), 
            data: {}, 
            validated: false 
        };
        saveVotes(allVotes);
        initVoteModal(activeVoteType);
    }
}

function updateThreshold() {
    const allVotes = loadVotes();
    const currentVote = allVotes[activeVoteType];
    if (!currentVote) return;

    const isValidated = currentVote.validated;
    const totaux = {};
    
    let totalExpressed = 0;
    currentVote.candidates.forEach(c => {
        totaux[c] = 0;
        parliamentaryGroups.forEach(g => {
            const val = (currentVote.data[g.id]?.[c] || 0);
            totaux[c] += val;
            totalExpressed += val;
        });
    });

    const maxVoix = Math.max(...Object.values(totaux), 0);
    const winnerEntry = Object.entries(totaux).find(([c, v]) => v === maxVoix && v > 0);
    
    const display = document.getElementById('resultat-seuil');
    const validateBtn = document.getElementById('btn-validate-vote');
    
    // Dynamic Threshold: 16 if round 1, otherwise (totalExpressed / 2) + 1
    const threshold = (currentVote.round === 1) ? 16 : (Math.floor(totalExpressed / 2) + 1);
    const majorityReached = maxVoix >= threshold && maxVoix > 0;

    if (display) {
        if (majorityReached) {
            display.textContent = `${maxVoix}/${threshold} voix → ${winnerEntry[0]} ${isValidated ? 'ÉLU !' : '(Majorité atteinte)'}`;
            display.className = isValidated ? 'seuil gagne validated' : 'seuil gagne';
        } else {
            display.textContent = `${maxVoix} voix (Majorité : ${threshold})`;
            display.className = 'seuil perd';
        }
    }

    if (validateBtn && !isValidated) {
        validateBtn.disabled = !majorityReached;
        validateBtn.style.opacity = majorityReached ? '1' : '0.5';
        validateBtn.style.cursor = majorityReached ? 'pointer' : 'not-allowed';
        validateBtn.title = majorityReached ? '' : `Majorité (${threshold} voix) requise pour valider`;
    }
}
