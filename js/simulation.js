/**
 * Simulation logic with modular loading
 */

// Global state for 14 actors
const actorsData = [
    { id: 1, org: "Assemblée", role: "Majorité", pos: "Défense exécutif" },
    { id: 2, org: "Assemblée", role: "Opposition Droite", pos: "Critique constructive" },
    { id: 3, org: "Extrême Droite", role: "Opposition", pos: "Patriot Act singapourien" },
    { id: 4, org: "Sénat", role: "Majorité", pos: "Encadrement législatif" },
    { id: 5, org: "Sénat", role: "Opposition", pos: "Garantie libertés" },
    { id: 6, org: "Ministère Armées", role: "Témoin", pos: "COMCYBER / Sécurité" },
    { id: 7, org: "Ministère Intérieur", role: "Témoin", pos: "Ordre public" },
    { id: 8, org: "Ministère Justice", role: "Témoin", pos: "Légalité procédures" },
    { id: 9, org: "CNIL", role: "Témoin", pos: "RGPD / Données" },
    { id: 10, org: "ANSSI", role: "Témoin", pos: "Technique Cyber" },
    { id: 11, org: "DGSI", role: "Témoin", pos: "Renseignement" },
    { id: 12, org: "CYPHERA SECURITY", role: "Témoin", pos: "Partenaire Privé" },
    { id: 13, org: "Journalistes", role: "Témoin", pos: "Liberté d'information" },
    { id: 14, org: "Groupe Divers", role: "Membre", pos: "Neutralité" }
];

async function loadActe(acteNumber) {
    const container = document.getElementById('dynamicacte');
    if (!container) return;

    // UI Feedback
    document.querySelectorAll('.tab-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx + 1 === acteNumber);
    });

    container.innerHTML = '<div class="loading-spinner"></div>';

    try {
        const response = await fetch(`sous-modules/acte${acteNumber}.html`);
        if (!response.ok) throw new Error('Module non trouvé');
        
        const html = await response.text();
        container.innerHTML = html;

        // Re-inject translation
        const lang = localStorage.getItem('cyphera-lang') || 'fr';
        if (typeof window.setLanguage === 'function') {
            window.setLanguage(lang);
        }

        // Special initialization for Act 3
        if (acteNumber === 3) {
            initPositionsGrid();
        }
    } catch (error) {
        console.error('Erreur chargement acte:', error);
        container.innerHTML = '<p class="error">Erreur lors du chargement de l\'acte. Veuillez réessayer.</p>';
    }
}

function initActorsMiniTable() {
    const body = document.getElementById('actorsMiniBody');
    if (!body) return;

    const lang = localStorage.getItem('cyphera-lang') || 'fr';
    body.innerHTML = '';

    actorsData.forEach(actor => {
        const row = document.createElement('tr');
        let roleName = actor.role;
        
        // Safety guard for translations
        if (window.translations && window.translations[lang]) {
            roleName = window.translations[lang][`role_${actor.id}`] || actor.role;
        }
        
        row.innerHTML = `
            <td>${actor.org}</td>
            <td>${roleName}</td>
            <td>${actor.pos}</td>
        `;
        
        row.style.cursor = 'pointer';
        row.onclick = () => openActorModal(actor.id);
        body.appendChild(row);
    });
}

function initPositionsGrid() {
    const grid = document.getElementById('positionsGrid');
    if (!grid) return;

    const lang = localStorage.getItem('cyphera-lang') || 'fr';
    grid.innerHTML = '';

    actorsData.forEach(actor => {
        const card = document.createElement('div');
        card.className = 'position-card glass';
        let roleName = actor.role;
        
        if (window.translations && window.translations[lang]) {
            roleName = window.translations[lang][`role_${actor.id}`] || actor.role;
        }

        let positionsHTML = `
            <ul>
                <li>Position 1 : Soutien stratégique</li>
                <li>Position 2 : Approche modérée</li>
                <li>Position 3 : Neutralité active</li>
                <li>Position 4 : Opposition constructive</li>
            </ul>
        `;

        // Case ED / Minority (as in prompt)
        if (actor.id === 3 || actor.id === 14) {
             const p1 = (window.translations && window.translations[lang]) ? window.translations[lang]['pos_ed_1'] : "ED 1";
             const p2 = (window.translations && window.translations[lang]) ? window.translations[lang]['pos_ed_2'] : "ED 2";
             const p3 = (window.translations && window.translations[lang]) ? window.translations[lang]['pos_ed_3'] : "ED 3";
             const p4 = (window.translations && window.translations[lang]) ? window.translations[lang]['pos_ed_4'] : "ED 4";

             positionsHTML = `
                <ul>
                    <li data-i18n="pos_ed_1">${p1}</li>
                    <li data-i18n="pos_ed_2">${p2}</li>
                    <li data-i18n="pos_ed_3">${p3}</li>
                    <li data-i18n="pos_ed_4">${p4}</li>
                </ul>
            `;
        }

        card.innerHTML = `
            <h4>${roleName}</h4>
            ${positionsHTML}
        `;
        grid.appendChild(card);
    });
}

function openActorModal(id) {
    const modal = document.getElementById('actorModal');
    const body = document.getElementById('modalBody');
    if (!modal || !body) return;

    const lang = localStorage.getItem('cyphera-lang') || 'fr';
    const actor = actorsData.find(a => a.id === id);
    let roleName = actor ? actor.role : "Actor";

    if (actor && window.translations && window.translations[lang]) {
        roleName = window.translations[lang][`role_${id}`] || actor.role;
    }
    
    body.innerHTML = `
        <h2 style="color: var(--accent-color);">${roleName}</h2>
        <div class="modal-acts">
            <h3>4 Positions par Acte</h3>
            <div class="positions-list">
                <p><strong>Acte 1 :</strong> ${actor ? actor.pos : "N/A"}</p>
                <p><strong>Acte 2 :</strong> Auditions stratégiques</p>
                <p><strong>Acte 3 :</strong> Négociation Rapport</p>
                <p><strong>Acte 4 :</strong> Débat Final</p>
            </div>
            <button class="btn-download gold" style="margin-top:1.5rem">📥 Fiche Complète PDF</button>
        </div>
    `;
    modal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts if necessary, but DOMContentLoaded should be fine
    // However, if translations.js is async or loaded at the bottom, we might need a small delay or check
    if (document.getElementById('actorsMiniBody')) {
        initActorsMiniTable();
        loadActe(1); 
    }
    
    const modal = document.getElementById('actorModal');
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
});
