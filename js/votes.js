/**
 * Voting System v3 - Advanced Multi-Candidate & Persistent Hemicycle
 */

const STORAGE_KEY = 'cyphera_mega_votes';

const parliamentaryGroups = [
    { id: 'an_gauche', name: 'AN Gauche', seats: 4, color: '#D62828' },
    { id: 'senat_opp', name: 'Sénat Opp.', seats: 2, color: '#E76FAD' },
    { id: 'an_maj', name: 'AN Majorité', seats: 10, color: '#F77F00' },
    { id: 'senat_maj', name: 'Sénat Maj.', seats: 4, color: '#4D96FF' },
    { id: 'an_droite', name: 'AN Droite', seats: 5, color: '#1D4ED8' },
    { id: 'an_ed', name: 'ED', seats: 5, color: '#111111' }
];

let activeVoteType = ''; // 'President', 'Rapporteur', 'Rapport'

function loadVotes() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
        'President': { round: 1, candidates: [], data: {}, validated: false },
        'Rapporteur': { round: 1, candidates: [], data: {}, validated: false },
        'Rapport': { round: 1, candidates: ['Adopté', 'Rejeté'], data: {}, validated: false }
    };
}

function saveVotes(allVotes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allVotes));
}

function initVoteModal(type) {
    activeVoteType = type;
    const allVotes = loadVotes();
    const currentVote = allVotes[type];
    
    document.getElementById('vote-title').textContent = `${type} - Tour ${currentVote.round}`;
    
    // Setup Candidate Selection
    const select = document.getElementById('candidats-select');
    if (select) {
        // Disable selection for 'Rapport' or if validated
        select.disabled = (type === 'Rapport' || currentVote.validated);
        
        // Reflect saved selection
        Array.from(select.options).forEach(opt => {
            opt.selected = currentVote.candidates.includes(opt.value);
        });

        // Event listener for selection change
        select.onchange = () => {
            if (currentVote.validated) return;
            currentVote.candidates = Array.from(select.selectedOptions).map(opt => opt.value);
            saveVotes(allVotes);
            renderVoteTable();
            updateHemicycle();
        };
    }

    // Validation Buttons
    updateValidationButtons(currentVote);

    renderVoteTable();
    updateHemicycle();
}

function updateValidationButtons(currentVote) {
    const validateBtn = document.getElementById('btn-validate-vote');
    const resetBtn = document.getElementById('btn-reset-vote');
    const roundBtn = document.getElementById('btn-next-round');

    if (validateBtn) {
        validateBtn.style.display = currentVote.validated ? 'none' : 'inline-block';
        validateBtn.onclick = validateVote;
    }
    if (resetBtn) {
        resetBtn.style.display = currentVote.validated ? 'inline-block' : 'none';
        resetBtn.onclick = resetVote;
    }
    if (roundBtn) {
        roundBtn.style.display = (currentVote.round === 1 && activeVoteType !== 'Rapport' && !currentVote.validated) ? 'inline-block' : 'none';
    }
}

function renderVoteTable() {
    const allVotes = loadVotes();
    const currentVote = allVotes[activeVoteType];
    const candidates = currentVote.candidates;
    const isValidated = currentVote.validated;
    
    const headerRow = document.getElementById('vote-grid-header');
    headerRow.innerHTML = '<th>Groupe</th>';
    candidates.forEach(c => headerRow.innerHTML += `<th>${c}</th>`);
    headerRow.innerHTML += '<th>Abst.</th><th>Total</th>';

    const tableBody = document.getElementById('vote-table-body');
    tableBody.innerHTML = '';

    parliamentaryGroups.forEach(group => {
        const rowData = currentVote.data[group.id] || {};
        const row = document.createElement('tr');
        if (isValidated) row.classList.add('row-validated');
        
        // Group Name Cell
        row.innerHTML = `<td><strong>${group.name} (${group.seats})</strong></td>`;
        
        // Candidate Input Cells
        candidates.forEach(c => {
            const val = rowData[c] || 0;
            const disabledAttr = isValidated ? 'disabled' : '';
            row.innerHTML += `<td><input type="number" class="vote-input" data-group="${group.id}" data-cand="${c}" min="0" max="${group.seats}" value="${val}" ${disabledAttr}></td>`;
        });

        // Abstention & Total Cells
        const currentAbst = calculateAbstention(group.id, candidates, rowData);
        row.innerHTML += `<td class="abst-val">${currentAbst}</td>`;
        row.innerHTML += `<td>${group.seats}</td>`;
        
        tableBody.appendChild(row);
    });

    // Add event listeners to dynamic inputs
    document.querySelectorAll('.vote-input').forEach(input => {
        input.addEventListener('input', (e) => handleVoteInput(e.target));
    });

    updateThreshold();
}

function calculateAbstention(groupId, candidates, rowData) {
    const group = parliamentaryGroups.find(g => g.id === groupId);
    let totalVotes = 0;
    candidates.forEach(c => totalVotes += (rowData[c] || 0));
    return Math.max(0, group.seats - totalVotes);
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
    row.querySelector('.abst-val').textContent = group.seats - (newVal + otherVotesSum);
    updateThreshold();
    updateHemicycle();
}

function validateVote() {
    if (confirm("Valider définitivement ce vote ? Cette action verrouillera les résultats.")) {
        const allVotes = loadVotes();
        allVotes[activeVoteType].validated = true;
        saveVotes(allVotes);
        initVoteModal(activeVoteType);
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
    const isValidated = currentVote.validated;
    const totaux = {};
    
    currentVote.candidates.forEach(c => {
        totaux[c] = 0;
        parliamentaryGroups.forEach(g => {
            totaux[c] += (currentVote.data[g.id]?.[c] || 0);
        });
    });

    const maxVoix = Math.max(...Object.values(totaux), 0);
    const winnerEntry = Object.entries(totaux).find(([c, v]) => v === maxVoix && v > 0);
    
    const display = document.getElementById('resultat-seuil');
    if (display) {
        if (maxVoix >= 16) {
            display.textContent = `${maxVoix}/30 voix → ${winnerEntry[0]} ${isValidated ? 'ÉLU !' : '(Majorité atteinte)'}`;
            display.className = isValidated ? 'seuil gagne validated' : 'seuil gagne';
        } else {
            display.textContent = `${maxVoix}/30 voix (Majorité : 16)`;
            display.className = 'seuil perd';
        }
    }
}

function updateHemicycle() {
    const allVotes = loadVotes();
    const currentVote = allVotes[activeVoteType];
    
    const candidateVotes = currentVote.candidates.map(c => {
        let total = 0;
        parliamentaryGroups.forEach(g => total += (currentVote.data[g.id]?.[c] || 0));
        return { name: c, value: total };
    }).filter(v => v.value > 0);

    // If no candidate votes, show empty seats
    const values = candidateVotes.length > 0 ? candidateVotes.map(v => v.value) : [0.0001]; 
    const labels = candidateVotes.length > 0 ? candidateVotes.map(v => v.name) : ['Aucun vote'];
    
    // Calculate total abstain for the chart
    let totalAssigned = candidateVotes.reduce((sum, v) => sum + v.value, 0);
    if (totalAssigned < 30) {
        values.push(30 - totalAssigned);
        labels.push('Abstention');
    }

    // Colors mapping
    const candidateColors = ['#4ade80', '#60a5fa', '#f472b6', '#fbbf24', '#a78bfa'];
    const markerColors = candidateVotes.map((v, i) => candidateColors[i % candidateColors.length]);
    if (totalAssigned < 30) markerColors.push('#94a3b8'); // Gray for abstention
    
    // Add the hidden bottom-half slice
    values.push(30);
    labels.push('');
    markerColors.push('rgba(0,0,0,0)');

    const trace = {
        type: 'pie',
        values: values,
        labels: labels,
        marker: { 
            colors: markerColors,
            line: { color: '#FFFFFF', width: 2 } 
        },
        hole: 0.45,
        rotation: 270,
        direction: 'clockwise',
        textinfo: 'none',
        hoverinfo: 'label+value',
        showlegend: true
    };

    const layout = {
        title: {
            text: `Répartition des voix : ${activeVoteType}`,
            font: { color: '#fff', size: 20 }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        height: 500,
        margin: { t: 80, b: 0, l: 0, r: 0 },
        legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: 0, font: { color: '#fff' } },
        annotations: [
            {
                font: { size: 28, color: '#fff', weight: 'bold' },
                showarrow: false,
                text: "30<br>sièges",
                x: 0.5, y: 0.6
            }
        ]
    };

    Plotly.newPlot('hemicycle-chart', [trace], layout, {responsive: true, displayModeBar: false});
}

// Global exposure
window.openVote = (type) => {
    const modal = document.getElementById('vote-modal');
    if (modal) {
        modal.style.display = 'block';
        initVoteModal(type);
    }
};

window.closeVote = () => {
    document.getElementById('vote-modal').style.display = 'none';
};
