/**
 * I18n logic for switching languages and updating the UI.
 */
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('cyphera-lang') || 'fr';
    setLanguage(savedLang);
});

function setLanguage(lang) {
    localStorage.setItem('cyphera-lang', lang);
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (window.translations[lang] && window.translations[lang][key]) {
            const content = window.translations[lang][key];
            if (content.includes('<')) {
                el.innerHTML = content;
            } else {
                el.textContent = content;
            }
        }
    });

    // Update placeholders if needed
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (window.translations[lang] && window.translations[lang][key]) {
            el.placeholder = window.translations[lang][key];
        }
    });

    // Handle specific updates like titles or button states
    updateActiveLanguageButton(lang);
    
    // Dispatch event for other scripts to respond
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function updateActiveLanguageButton(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

window.setLanguage = setLanguage;
