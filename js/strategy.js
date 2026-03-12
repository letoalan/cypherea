/**
 * strategy.js - Gestion de la simulation par acteur (Actes 2-4)
 */
window.strategyChoices = JSON.parse(localStorage.getItem("cyphera_strategy_v1") || "{}");
window.actorsTreeCache = {};

async function initStrategyTab() {
    const validated = window.getValidatedPositions();
    const manifest = window.ACTORS_MANIFEST;
    
    // Sync Act 1 from validated positions
    Object.keys(validated).forEach(id => {
        if (!window.strategyChoices[id]) window.strategyChoices[id] = {};
        window.strategyChoices[id].acte1 = validated[id];
    });

    await renderDashboard();
    
    // Auto-select first incomplete or first validated
    const firstIncomplete = manifest.find(a => validated[a.id] && !window.strategyChoices[a.id].acte4);
    if (firstIncomplete) renderStrategyPanel(firstIncomplete.id);
    else if (Object.keys(validated).length > 0) renderStrategyPanel(Object.keys(validated)[0]);
}

async function loadActorTree(actorId) {
    if (window.actorsTreeCache[actorId]) return window.actorsTreeCache[actorId];
    try {
        const resp = await fetch(`data/arbres/arbre_decisions_${actorId}.json`);
        if (!resp.ok) throw new Error();
        return window.actorsTreeCache[actorId] = await resp.json();
    } catch (e) { return null; }
}

async function renderDashboard() {
    const containers = [
        document.getElementById('strategy-dashboard'),
        document.getElementById('strategy-dashboard-results')
    ].filter(c => c !== null);

    const validated = window.getValidatedPositions();
    let html = '<table><thead><tr><th>Acteur</th><th>A1</th><th>A2</th><th>A3</th><th>A4</th><th>Statut</th></tr></thead><tbody>';
    
    let completedCount = 0;
    window.ACTORS_MANIFEST.forEach(actor => {
        const choice = window.strategyChoices[actor.id] || {};
        if (!validated[actor.id]) return;
        
        const label = window.getActorLabel(actor.id);
        const isDone = !!choice.acte4;
        if (isDone) completedCount++;
        
        html += `<tr onclick="renderStrategyPanel('${actor.id}')">
            <td><strong>${label}</strong></td>
            <td><span class="act-badge locked">${choice.acte1 || '—'}</span></td>
            <td><span class="act-badge ${choice.acte2?'filled':''}">${choice.acte2 || '—'}</span></td>
            <td><span class="act-badge ${choice.acte3?'filled':''}">${choice.acte3 || '—'}</span></td>
            <td><span class="act-badge ${choice.acte4?'filled':''}">${choice.acte4 || '—'}</span></td>
            <td><span class="status-badge">${isDone ? '✅ Terminé' : '🔵 En cours'}</span></td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    containers.forEach(c => c.innerHTML = html);
    const progress = (completedCount / 14) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-count').textContent = `${completedCount}/14`;
    
    updateImpactBarometers();
}

/**
 * Calcule et affiche l'impact global des choix
 */
function updateImpactBarometers() {
    const choices = window.strategyChoices;
    const manifest = window.ACTORS_MANIFEST;
    
    // 1. Vote Commission (Parlementaires)
    const seats = { "AN_majorite": 10, "AN_opposition_droite": 5, "ED": 5, "AN_opposition_gauche": 4, "Senat_majorite": 4, "Senat_opposition": 2 };
    let totalVotes = 0;
    Object.keys(seats).forEach(id => {
        const a4 = choices[id]?.acte4;
        if (a4 === 'α' || a4 === 'β') totalVotes += seats[id];
    });
    
    document.getElementById('vote-count').textContent = totalVotes;
    document.getElementById('vote-fill').style.width = `${(totalVotes / 30) * 100}%`;
    const vStatus = document.getElementById('vote-status');
    vStatus.textContent = totalVotes >= 16 ? "✅ Rapport Adopté" : "❌ Rapport Rejeté";
    vStatus.className = totalVotes >= 16 ? "status-success" : "status-fail";

    // 2. Adhésion Institutions
    const insts = ["Armees", "Interieur", "Justice", "CNIL", "ANSSI", "DGSI"];
    let instSupport = 0, instCount = 0;
    insts.forEach(id => {
        const a4 = choices[id]?.acte4;
        if (a4) {
            instCount++;
            if (a4 === 'α' || a4 === 'β') instSupport++;
        }
    });
    const instRate = instCount > 0 ? (instSupport / instCount) * 100 : 50;
    document.getElementById('inst-fill').style.width = `${instRate}%`;
    document.getElementById('inst-value').textContent = instRate > 50 ? "Majoritaire" : (instCount > 0 ? "Minoritaire" : "Neutralité");

    // 3. État CYPHERA
    const cyA4 = choices["CYPHERA"]?.acte4;
    const cyStatus = { "α": "Succès", "β": "Survie", "γ": "Affaibli", "δ": "Disparu" }[cyA4] || "Inconnu";
    document.getElementById('cy-status').textContent = cyStatus;
    document.getElementById('cy-tag').textContent = cyA4 ? `Acte 4: ${cyA4}` : "—";
    
    // 4. Opinion Publique (Médias)
    const medA4 = choices["Medias"]?.acte4;
    const medRate = { "α": 90, "β": 60, "γ": 40, "δ": 10 }[medA4] || 50;
    const medLabel = { "α": "Convaincue", "β": "Détournée", "γ": "Lassée", "δ": "Hostile" }[medA4] || "Indifférence";
    document.getElementById('op-fill').style.width = `${medRate}%`;
    document.getElementById('op-status').textContent = medLabel;
}

async function renderStrategyPanel(actorId) {
    // If we are on Results tab, switch to Strategy tab
    const strategyTab = document.getElementById('subContent3_2');
    if (strategyTab && !strategyTab.classList.contains('active')) {
        switchSubTab(3, 2);
    }

    const panel = document.getElementById('strategy-panel');
    const choice = window.strategyChoices[actorId];
    const tree = await loadActorTree(actorId);

    if (!choice || !choice.acte1) {
        panel.innerHTML = '<p class="placeholder-msg">⚠️ Validez d\'abord votre position Acte 1 pour cet acteur.</p>';
        return;
    }
    if (!tree) {
        panel.innerHTML = `<p class="placeholder-msg">❌ Arbre de décision non disponible pour ${actorId}.</p>`;
        return;
    }

    if (choice.acte4) return revealOutcome(actorId, tree);

    const currentActe = !choice.acte2 ? 2 : (!choice.acte3 ? 3 : 4);
    const label = window.getActorLabel(actorId);
    panel.innerHTML = `<h4>${label} — Acte ${currentActe}</h4>
                       <div class="position-grid">${renderActeChoices(actorId, currentActe, tree)}</div>`;
}

function renderActeChoices(actorId, acteNum, tree) {
    let options = [];
    const choice = window.strategyChoices[actorId];
    if (acteNum === 2) {
        options = Object.keys(tree.acte2).filter(k => tree.acte2[k].parent === choice.acte1).map(k => ({id:k, ...tree.acte2[k]}));
    } else if (acteNum === 3) {
        options = Object.keys(tree.acte3).map(k => ({id:k, ...tree.acte3[k]}));
    } else {
        options = Object.keys(tree.acte4).map(k => ({id:k, ...tree.acte4[k]}));
    }

    return options.map(opt => `
        <div class="position-card" onclick="validateActeChoice('${actorId}', ${acteNum}, '${opt.id}')">
            <div class="pos-header"><span class="pos-badge">${opt.id.split('.').pop()}</span><span class="pos-label">${opt.label}</span></div>
            <p class="pos-desc">${opt.description}</p>
            <div class="pos-meta">
                <span class="tag">${opt.tonalite || ''}</span>
                <span class="tag risque-${opt.risque}">${opt.risque || ''}</span>
            </div>
        </div>`).join('');
}

function validateActeChoice(actorId, acteNum, choiceId) {
    window.strategyChoices[actorId][`acte${acteNum}`] = choiceId;
    localStorage.setItem("cyphera_strategy_v1", JSON.stringify(window.strategyChoices));
    renderDashboard();
    renderStrategyPanel(actorId);
}

function revealOutcome(actorId, tree) {
    const c = window.strategyChoices[actorId];
    const pathId = `${c.acte1}-${c.acte2}-A3${c.acte3}-A4${c.acte4}`;
    const path = tree.chemins.find(p => p.id === pathId);
    const actorData = window.actorsCache[actorId];

    document.getElementById('strategy-panel').innerHTML = `
        <div class="revelation-card">
            <div class="timeline">${c.acte1} ➔ ${c.acte2} ➔ ${c.acte3} ➔ ${c.acte4}</div>
            <div class="scenario-badge"><strong>Résultat :</strong> ${path.scenario_final}</div>
            <div class="score-gauge">Score : ${"█".repeat(path.score + 2)}${"░".repeat(5-(path.score+2))} (${path.score})</div>
            <blockquote class="citation">"${actorData?.citation || ''}"</blockquote>
            <div class="encadre-peda">${actorData?.encadre_pedagogique || ''}</div>
            <button class="btn-reset" onclick="resetActorStrategy('${actorId}', 2)">↺ Rejouer cet acteur</button>
        </div>`;
    renderDashboard();
}

window.resetActorStrategy = (id, from) => {
    for(let i=from; i<=4; i++) delete window.strategyChoices[id][`acte${i}`];
    localStorage.setItem("cyphera_strategy_v1", JSON.stringify(window.strategyChoices));
    renderDashboard(); renderStrategyPanel(id);
};

window.resetAllStrategies = () => {
    if(!confirm("Réinitialiser toutes les stratégies (Actes 2-4) ?")) return;
    Object.keys(window.strategyChoices).forEach(id => {
        for(let i=2; i<=4; i++) delete window.strategyChoices[id][`acte${i}`];
    });
    localStorage.setItem("cyphera_strategy_v1", JSON.stringify(window.strategyChoices));
    initStrategyTab();
};
