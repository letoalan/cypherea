/**
 * Shared Header Injection script.
 * Keeps HTML files small and maintainable.
 */
function injectHeader() {
    const headerHtml = `
    <header class="main-header">
        <div class="logo-container">
            <h1 data-i18n="title">Simulation Parlementaire – Affaire CYPHERA</h1>
        </div>
        <nav class="main-nav">
            <ul>
                <li><a href="index.html" data-i18n="nav_home">Accueil</a></li>
                <li><a href="objectifs.html" data-i18n="nav_objectives">Objectifs</a></li>
                <li><a href="repartition.html" data-i18n="nav_distribution">Répartition</a></li>
                <li><a href="simulation.html" data-i18n="nav_simulation">Simulation</a></li>
            </ul>
        </nav>
        <div class="lang-selector">
            <button class="lang-btn" data-lang="fr" onclick="setLanguage('fr')">FR</button>
            <button class="lang-btn" data-lang="en" onclick="setLanguage('en')">EN</button>
            <button class="lang-btn" data-lang="de" onclick="setLanguage('de')">DE</button>
        </div>
    </header>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', headerHtml);
    
    // Highlight active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

function injectFooter() {
    const footerHtml = `
    <footer class="main-footer">
        <p data-i18n="footer_text">2026 Simulation Parlementaire CYPHERA - Outil Pédagogique - Par Alan Duval</p>
    </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHtml);
}

document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
    // Re-trigger translation after injection
    if (window.setLanguage) {
        const lang = localStorage.getItem('cyphera-lang') || 'fr';
        window.setLanguage(lang);
    }
});
