/**
 * Voting System - UI Rendering
 */

function initVoteModal(type) {
    activeVoteType = type;
    const allVotes = loadVotes();
    const currentVote = allVotes[type];
    
    document.getElementById('vote-title').textContent = `${type} - Tour ${currentVote.round}`;
    
    // Setup Candidate Selection via Checkboxes
    const container = document.getElementById('candidats-selection-area');
    if (container) {
        container.innerHTML = '';
        const isRapport = (type === 'Rapport');
        
        if (isRapport) {
            container.innerHTML = '<p style="opacity:0.6; font-style:italic;">Candidats fixes : Adopté / Rejeté</p>';
        } else {
            const table = document.createElement('table');
            table.className = 'candidat-selection-table';
            
            const isPresidential = (type === 'President' || type === 'Rapporteur');
            const parliNames = parliamentaryGroups.map(g => g.name);
            
            // Find current winner of President to exclude from Rapporteur (if any)
            let presidentWinner = null;
            if (type === 'Rapporteur') {
                const presVote = allVotes['President'];
                if (presVote && presVote.validated) {
                    const presTotals = {};
                    presVote.candidates.forEach(c => {
                        presTotals[c] = 0;
                        parliamentaryGroups.forEach(g => presTotals[c] += (presVote.data[g.id]?.[c] || 0));
                    });
                    const maxV = Math.max(...Object.values(presTotals), 0);
                    presidentWinner = Object.entries(presTotals).find(([c, v]) => v === maxV && v > 0)?.[0];
                }
            }

            allPotentialCandidates.forEach(name => {
                const isDisallowed = isPresidential && !parliNames.includes(name);
                const isAlreadyPresident = (type === 'Rapporteur' && name === presidentWinner);
                
                const tr = document.createElement('tr');
                if (isDisallowed || isAlreadyPresident) tr.style.opacity = '0.4';
                
                const tdCheck = document.createElement('td');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = name;
                checkbox.checked = currentVote.candidates.includes(name);
                checkbox.disabled = currentVote.validated || isDisallowed || isAlreadyPresident;
                
                checkbox.onchange = () => {
                    if (currentVote.validated) return;
                    currentVote.candidates = Array.from(container.querySelectorAll('input:checked')).map(cb => cb.value);
                    saveVotes(allVotes);
                    renderVoteTable();
                    updateHemicycle();
                };
                
                tdCheck.appendChild(checkbox);
                
                const tdName = document.createElement('td');
                tdName.textContent = name;
                if (isDisallowed) tdName.textContent += ' (Non éligible)';
                if (isAlreadyPresident) tdName.textContent += ' (Déjà élu Président)';
                
                tr.appendChild(tdCheck);
                tr.appendChild(tdName);
                table.appendChild(tr);
            });
            container.appendChild(table);
        }
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
        if (typeof activeVoteType !== 'undefined' && (currentVote.round === 1 && activeVoteType !== 'Rapport' && !currentVote.validated)) {
            roundBtn.style.display = 'inline-block';
        } else {
            roundBtn.style.display = 'none';
        }
        roundBtn.onclick = goToSecondRound;
    }
}

function renderVoteTable() {
    const allVotes = loadVotes();
    const currentVote = allVotes[activeVoteType];
    const candidates = currentVote.candidates;
    const isValidated = currentVote.validated;
    
    const headerRow = document.getElementById('vote-grid-header');
    if (!headerRow) return;

    headerRow.innerHTML = '<th>Groupe</th>';
    candidates.forEach(c => headerRow.innerHTML += `<th>${c}</th>`);
    headerRow.innerHTML += '<th>Abst.</th><th>Total</th>';

    const tableBody = document.getElementById('vote-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    parliamentaryGroups.forEach(group => {
        const rowData = currentVote.data[group.id] || {};
        const row = document.createElement('tr');
        
        // Check if group has voted all seats
        let currentTotal = 0;
        candidates.forEach(c => currentTotal += (rowData[c] || 0));
        const isVoted = currentTotal >= group.seats;

        if (isValidated) row.classList.add('row-validated');
        if (isVoted && !isValidated) row.classList.add('row-voted');
        
        // Group Name Cell
        row.innerHTML = `<td><strong>${group.name} (${group.seats})</strong></td>`;
        
        // Candidate Input Cells
        candidates.forEach(c => {
            const val = rowData[c] || 0;
            const disabledAttr = isValidated ? 'disabled' : '';
            row.innerHTML += `<td><input type="number" class="vote-input" data-group="${group.id}" data-cand="${c}" min="0" max="${group.seats}" value="${val}" ${disabledAttr}></td>`;
        });

        // Abstention & Total Cells
        const currentAbst = group.seats - currentTotal;
        row.innerHTML += `<td class="abst-val">${Math.max(0, currentAbst)}</td>`;
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

// Global exposure
if (typeof window !== 'undefined') {
    window.openVote = (type) => {
        const modal = document.getElementById('vote-modal');
        if (modal) {
            modal.style.display = 'block';
            initVoteModal(type);
        }
    };

    window.closeVote = () => {
        const modal = document.getElementById('vote-modal');
        if (modal) modal.style.display = 'none';
    };
}
