/**
 * actors.js - Gestion modulaire des acteurs de la simulation (Accords & Détails)
 * Respecte la contrainte des 200 lignes.
 */

window.actorsCache = {};

function initActorsMenu() {
    const container = document.getElementById('actors-menu-container');
    if (!container) return;
    const select = document.createElement('select');
    select.id = 'actorSelect';
    select.className = 'glass-select';
    select.onchange = (e) => loadActorCard(e.target.value);

    const defaultOption = new Option("-- Sélectionner un acteur --", "");
    select.add(defaultOption);

    const groupMembre = document.createElement('optgroup');
    groupMembre.label = "🏛 Membres de la commission";
    const groupTemoin = document.createElement('optgroup');
    groupTemoin.label = "🎙 Témoins auditionnés";

    window.ACTORS_MANIFEST.forEach(actor => {
        const label = window.getActorLabel(actor.id);
        const opt = new Option(label, actor.id);
        if (actor.id === "AN_majorite") opt.selected = true;
        (actor.type === 'membre' ? groupMembre : groupTemoin).appendChild(opt);
    });

    select.appendChild(groupMembre);
    select.appendChild(groupTemoin);
    container.innerHTML = '';
    container.appendChild(select);
    loadActorCard("AN_majorite");
}

async function loadActorCard(actorId) {
    if (!actorId) return;
    const container = document.getElementById('actor-card-container');
    container.innerHTML = '<div class="loading-spinner"></div>';

    if (window.actorsCache[actorId]) {
        renderActorCard(window.actorsCache[actorId]);
    } else {
        try {
            const actor = window.ACTORS_MANIFEST.find(a => a.id === actorId);
            const response = await fetch(`data/acteurs/${actor.file}`);
            const data = await response.json();
            window.actorsCache[actorId] = data;
            renderActorCard(data);
        } catch (error) {
            container.innerHTML = `<p class="error">Erreur : ${error.message}</p>`;
        }
    }
}

function renderActorCard(data) {
    const container = document.getElementById('actor-card-container');
    const badge = data.identite.type === "Membre commission" ? "badge-blue" : "badge-orange";
    const typeLabel = data.identite.type === "Membre commission" ? "🏛 Membre" : "🎙 Témoin";

    container.innerHTML = `
        <div class="actor-card glass slide-in">
            <div class="card-header">
                <span class="badge ${badge}">${typeLabel}</span>
                <h2>${data.acteur}</h2>
                <span class="seats-count">${data.identite.sieges_commission || 0} sièges</span>
            </div>
            
            <div class="card-body">
                <section class="card-section">
                    <h3>RÉACTION INITIALE</h3>
                    <p class="quote">« ${data.position_cyphera.reaction_initiale} »</p>
                    <div id="positions-acte1-container"></div>
                </section>

                <div class="actor-accordion">
                    ${renderAccordionItem("🎯 Objectifs & Intérêts", `
                        <p>✅ <strong>Obtenir :</strong> ${data.objectifs.obtenir.join(' / ')}</p>
                        <p>❌ <strong>Éviter :</strong> ${data.objectifs.eviter.join(' / ')}</p>
                        <hr>
                        <p><strong>Intérêts matériels :</strong> ${data.interets.materiels}</p>
                        <p><strong>Intérêts symboliques :</strong> ${data.interets.symboliques}</p>
                    `)}
                    
                    ${renderAccordionItem("📊 Rapport de Forces", `
                        <div class="force-grid">
                            ${(data.rapport_forces.membres_commission || []).map(m => `
                                <div class="member-mini-tag ${m.statut === '✅' ? 'pos' : m.statut === '❌' ? 'neg' : 'neu'}">
                                    ${m.groupe}: ${m.sieges} ${m.statut}
                                </div>
                            `).join('')}
                        </div>
                        <p class="mt-1"><strong>Coalition :</strong> ${data.rapport_forces.coalition_possible}</p>
                        <hr>
                        <p><strong>Cibles :</strong> ${data.axes_intervention.cibles_privilegiees}</p>
                    `)}

                    ${renderAccordionItem("⚠️ Contraintes & Tensions", `
                        <ul>${data.points_tension.map(t => `<li>${t}</li>`).join('')}</ul>
                        <p><strong>Contrainte politique :</strong> ${data.contraintes.politiques}</p>
                    `)}
                    
                    ${renderAccordionItem("📖 Aide pédagogique", `<p class="small">${data.encadre_pedagogique}</p>`)}
                </div>
            </div>

            <div class="card-footer">
                <p class="citation">« ${data.citation} »</p>
            </div>
        </div>
    `;
    renderPositionsActe1(data.id, data.positions_acte1);
}

function renderAccordionItem(title, content) {
    return `
        <div class="accordion-item">
            <button class="accordion-header" onclick="this.parentElement.classList.toggle('active')">
                <span>${title}</span>
                <span class="icon">▼</span>
            </button>
            <div class="accordion-content">${content}</div>
        </div>
    `;
}

function renderPositionsActe1(actorId, positions) {
    const container = document.getElementById('positions-acte1-container');
    if (!container) return;
    const nav = document.createElement('div'), textZone = document.createElement('p');
    nav.className = 'positions-nav'; textZone.className = 'position-text';
    const validateBtn = document.createElement('button');
    validateBtn.className = 'btn-validate-inline';
    
    let currentPosKey = "";
    const saved = localStorage.getItem(`pos_acte1_${actorId}`);
    let targetButton = null;

    Object.keys(positions).forEach((key, idx) => {
        const pKey = `P${idx + 1}`; // Codage standardisé
        const btn = document.createElement('button');
        btn.textContent = pKey;
        btn.onclick = () => {
            nav.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            textZone.textContent = positions[key];
            currentPosKey = pKey;
            
            const isSaved = localStorage.getItem(`pos_acte1_${actorId}`) === pKey;
            validateBtn.innerHTML = isSaved ? '✅ Validée' : '🎯 Valider';
            validateBtn.classList.toggle('validated', isSaved);
        };
        nav.appendChild(btn);
        if (pKey === saved) targetButton = btn;
    });

    const spacer = document.createElement('div');
    spacer.className = 'nav-spacer';
    nav.appendChild(spacer);

    validateBtn.onclick = () => {
        const isSet = localStorage.getItem(`pos_acte1_${actorId}`) === currentPosKey;
        if (isSet) {
            localStorage.removeItem(`pos_acte1_${actorId}`);
            validateBtn.innerHTML = '🎯 Valider';
            validateBtn.classList.remove('validated');
        } else {
            localStorage.setItem(`pos_acte1_${actorId}`, currentPosKey);
            validateBtn.innerHTML = '✅ Validée';
            validateBtn.classList.add('validated');
        }
    };
    nav.appendChild(validateBtn);
    container.innerHTML = ''; 
    container.appendChild(nav);
    container.appendChild(textZone);
    
    // Restaurer la position choisie ou la première par défaut
    if (targetButton) targetButton.click();
    else if (nav.firstChild) nav.firstChild.click();
}

/**
 * Récupère toutes les positions validées pour l'Acte 1 (pour le moteur de simulation)
 */
window.getValidatedPositions = function() {
    const results = {};
    window.ACTORS_MANIFEST.forEach(actor => {
        const saved = localStorage.getItem(`pos_acte1_${actor.id}`);
        if (saved) results[actor.id] = saved;
    });
    return results;
};
