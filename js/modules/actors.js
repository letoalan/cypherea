/**
 * actors.js - Gestion modulaire des acteurs de la simulation (Accords & Détails)
 * Respecte la contrainte des 200 lignes.
 */

window.actorsCache = {};

function initActorsMenu() {
    const container = document.getElementById('actors-menu-container');
    if (!container) return;

    const grid = document.createElement('div');
    grid.className = 'actors-grid';

    window.ACTORS_MANIFEST.forEach(actor => {
        const label = window.getActorLabel(actor.id);
        const btn = document.createElement('button');
        btn.className = `actor-menu-item ${actor.type}`;
        btn.dataset.id = actor.id;
        
        const shortLabel = label.split(' - ').pop() || label;
        btn.innerHTML = `
            <span class="actor-icon">${actor.icon || (actor.type === 'membre' ? '🏛' : '🎙')}</span>
            <span class="actor-name">${shortLabel}</span>
        `;
        
        btn.onclick = () => {
            grid.querySelectorAll('.actor-menu-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadActorCard(actor.id);
        };
        
        if (actor.id === "AN_majorite") btn.classList.add('active');
        grid.appendChild(btn);
    });

    container.innerHTML = '';
    container.appendChild(grid);
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
            data.id = actorId; // Ensure ID is present
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
                <div>
                    <span class="badge ${badge}">${typeLabel}</span>
                    <span class="seats-count">${data.identite.sieges_commission || 0} sièges</span>
                </div>
                <h2>${data.acteur}</h2>
            </div>
            
            <div class="card-body">
                <section class="card-section reaction-section">
                    <h3>RÉACTION INITIALE</h3>
                    <p class="quote">« ${data.position_cyphera.reaction_initiale} »</p>
                    <div id="positions-acte1-container" class="positions-interactive"></div>
                </section>

                <div class="actor-accordion">
                    ${renderAccordionItem("🎯 Objectifs & Intérêts", `
                        <div class="accordion-inner">
                            <div class="obj-list">
                                <p class="obj-item pos">✅ <strong>Obtenir :</strong> ${data.objectifs.obtenir.join(' / ')}</p>
                                <p class="obj-item neg">❌ <strong>Éviter :</strong> ${data.objectifs.eviter.join(' / ')}</p>
                            </div>
                            <hr class="card-divider">
                            <div class="interests-grid">
                                <div class="interest-box"><strong>Matériels</strong><p>${data.interets.materiels}</p></div>
                                <div class="interest-box"><strong>Symboliques</strong><p>${data.interets.symboliques}</p></div>
                            </div>
                        </div>
                    `)}
                    
                    ${renderAccordionItem("📊 Rapport de Forces", `
                        <div class="accordion-inner">
                            <div class="force-grid">
                                ${(data.rapport_forces.membres_commission || []).map(m => `
                                    <div class="member-mini-tag ${m.statut === '✅' ? 'pos' : m.statut === '❌' ? 'neg' : 'neu'}">
                                        <strong>${m.groupe}</strong><br>${m.sieges} sièges ${m.statut}
                                    </div>
                                `).join('')}
                            </div>
                            <p class="coalition-text"><strong>🤝 Coalition possible :</strong> ${data.rapport_forces.coalition_possible}</p>
                            <hr class="card-divider">
                            <p class="targets-text"><strong>🎯 Cibles privilégiées :</strong> ${data.axes_intervention.cibles_privilegiees}</p>
                        </div>
                    `)}

                    ${renderAccordionItem("⚠️ Contraintes & Tensions", `
                        <div class="accordion-inner">
                            <ul class="tension-list">${data.points_tension.map(t => `<li>${t}</li>`).join('')}</ul>
                            <div class="constraint-box">
                                <strong>⚖️ Contrainte politique</strong>
                                <p>${data.contraintes.politiques}</p>
                            </div>
                        </div>
                    `)}
                    
                    ${renderAccordionItem("📖 Aide pédagogique", `
                        <div class="accordion-inner help-box">
                            <p>${data.encadre_pedagogique}</p>
                        </div>
                    `)}
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
            </button>
            <div class="accordion-content">${content}</div>
        </div>
    `;
}

function renderPositionsActe1(actorId, positions) {
    const container = document.getElementById('positions-acte1-container');
    if (!container) return;
    
    const nav = document.createElement('div'), textZone = document.createElement('p');
    nav.className = 'positions-nav-premium'; 
    textZone.className = 'position-text-premium';
    
    const validateBtn = document.createElement('button');
    validateBtn.className = 'btn-validate-premium';
    
    let currentPosKey = "";
    const saved = localStorage.getItem(`pos_acte1_${actorId}`);
    let targetButton = null;

    Object.keys(positions).forEach((key, idx) => {
        const pKey = `P${idx + 1}`;
        const btn = document.createElement('button');
        btn.className = 'pos-btn-premium';
        btn.innerHTML = `<span>${pKey}</span>`;
        btn.onclick = () => {
            nav.querySelectorAll('.pos-btn-premium').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            textZone.innerHTML = `<strong>Position actuelle :</strong> ${positions[key]}`;
            currentPosKey = pKey;
            
            const isSaved = localStorage.getItem(`pos_acte1_${actorId}`) === pKey;
            validateBtn.innerHTML = isSaved ? '✅ Validée' : '🎯 Valider';
            validateBtn.classList.toggle('validated', isSaved);
        };
        nav.appendChild(btn);
        if (pKey === saved) targetButton = btn;
    });

    const spacer = document.createElement('div');
    spacer.className = 'nav-flex-spacer';
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
