/**
 * Simulation logic with modular loading
 */

// Global state for 14 actors (OBSOLETE - moved to actors.js)

function switchMainTab(tabNumber) {
    // Update main tabs
    document.querySelectorAll('.main-tab-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx + 1 === tabNumber);
    });

    // Update main content visibility
    document.querySelectorAll('.main-tab-content').forEach((content, idx) => {
        content.classList.toggle('active', idx + 1 === tabNumber);
    });

    // Special initialization if needed
    if (tabNumber === 3 && typeof initActorsMenu === 'function') {
        initActorsMenu();
    }
}

function switchSubTab(mainTabId, subTabIndex) {
    const mainTab = document.getElementById(`mainTab${mainTabId}`);
    if (!mainTab) return;

    // Update sub-tab buttons
    mainTab.querySelectorAll('.sub-tab-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx + 1 === subTabIndex);
    });

    // Update sub-content visibility
    // Look for both ID-based and class-based sub-containers
    const containers = mainTab.querySelectorAll('.sub-tab-container');
    containers.forEach((container, idx) => {
        container.classList.toggle('active', idx + 1 === subTabIndex);
    });

    // Special initialization for Strategy and Results
    if (mainTabId === 3) {
        if (subTabIndex === 2 && typeof initStrategyTab === 'function') initStrategyTab();
        if (subTabIndex === 3 && typeof updateImpactBarometers === 'function') updateImpactBarometers();
    }
}

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

        // Refresh vote badges if voting script is loaded
        if (typeof window.refreshSummaryResults === 'function') {
            window.refreshSummaryResults();
        }

        // Initialize auditions if on Acte 2
        if (acteNumber === 2 && typeof window.initAuditionSection === 'function') {
            window.initAuditionSection();
        }
    } catch (error) {
        console.error('Erreur chargement acte:', error);
        container.innerHTML = '<p class="error">Erreur lors du chargement de l\'acte. Veuillez réessayer.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize with "L'Affaire" tab (Tab 1)
    switchMainTab(1);

    // Pre-initialize acts for tab 4
    loadActe(1);

    const modal = document.getElementById('actorModal');
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
});


function showEvaluation() {
    alert("Affichage de la grille d'évaluation (en développement).");
}
