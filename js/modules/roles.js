let students = [];
let distribution = [];

// Initialize Drag & Drop
document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    if (!dropZone) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('drag-hover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('drag-hover'), false);
    });

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        handleFileProcessing(file);
    }
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    handleFileProcessing(file);
}

function handleFileProcessing(file) {
    if (!file) return;

    const fileInfo = document.getElementById('file-info');
    const uploadZone = document.getElementById('drop-zone');
    const preview = document.getElementById('mini-hemi-preview');

    // State 1: Loading
    uploadZone.style.display = 'none';
    fileInfo.innerHTML = `
        <div class="file-loaded-badge" style="justify-content: center;">
            <div class="loader-spinner"></div>
            <span style="margin-left: 15px;">Analyse du fichier...</span>
        </div>`;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Convert to JSON (array of arrays)
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Extract students (skip header row)
            students = jsonData.slice(1).map(row => {
                const name = `${row[0] || ''} ${row[1] || ''}`.trim();
                return { name: name || '?' };
            }).filter(s => s.name !== '?');

            if (students.length === 0) {
                throw new Error("Aucun élève trouvé");
            }

            // State 2: Loaded
            fileInfo.innerHTML = `
                <div class="file-loaded-badge slide-in">
                    <span style="font-size: 1.5rem;">📄</span>
                    <div class="file-name" style="color: #fff;">${file.name}</div>
                    <button class="btn-generate-premium" onclick="distributeRoles()">Générer hémicycle</button>
                    <span class="file-remove" onclick="location.reload()" style="font-size: 1.2rem; cursor: pointer;">✕</span>
                </div>`;
            
            // Show Mini Preview
            preview.style.display = 'flex';
            const dotsContainer = document.getElementById('hemi-dots');
            dotsContainer.innerHTML = Array(14).fill('<div class="hemi-dot"></div>').join('');
            document.getElementById('group-number').textContent = "14"; // Cyphera has 14 standard groups

            document.getElementById('distributeBtn').disabled = false;

        } catch (error) {
            fileInfo.innerHTML = `
                <div class="file-loaded-badge" style="border-color: #ef4444; color: #ef4444; background: rgba(239, 68, 68, 0.1);">
                    <span>❌</span>
                    <span style="margin-left: 10px;">Erreur : ${error.message}</span>
                    <span class="file-remove" onclick="location.reload()" style="margin-left: auto;">Réessayer</span>
                </div>`;
            uploadZone.style.display = 'flex';
        }
    };
    reader.onerror = () => {
        alert("Erreur lors de la lecture du fichier");
        location.reload();
    };
    reader.readAsArrayBuffer(file);
}

// parseCSV is now superseded by SheetJS in handleFileSelect

function distributeRoles() {
    const rolesCount = 14;
    const shuffled = [...students].sort(() => 0.5 - Math.random());
    distribution = [];

    // Assign 2 students per role up to 28
    for (let i = 1; i <= rolesCount; i++) {
        const pair = shuffled.splice(0, 2);
        distribution.push({
            roleId: i,
            students: pair.map(s => s.name).join(', ') || '---'
        });
    }

    // Assign leftovers to support roles (e.g., helpers for specific roles)
    shuffled.forEach((leftover, index) => {
        const targetIdx = index % rolesCount;
        distribution[targetIdx].students += `, ${leftover.name} (Soutien)`;
    });

    displayResults();
    document.getElementById('downloadBtn').disabled = false;
}

let currentView = 'table'; // 'table' or 'dynamic'

const ROLE_CATEGORIES = {
    1: 'cat_an', 2: 'cat_an', 3: 'cat_an', 14: 'cat_an',
    4: 'cat_senat', 5: 'cat_senat',
    6: 'cat_etat', 7: 'cat_etat', 8: 'cat_etat', 9: 'cat_etat', 10: 'cat_etat', 11: 'cat_etat',
    12: 'cat_societe', 13: 'cat_societe'
};

function setView(view) {
    currentView = view;
    // Update active button state if they exist
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    displayResults();
}

function displayResults() {
    const container = document.getElementById('resultsContainer');
    if (!container) return;

    const lang = localStorage.getItem('cyphera-lang') || 'fr';
    container.innerHTML = '';

    if (currentView === 'table') {
        renderTableView(container, lang);
    } else {
        renderDynamicView(container, lang);
    }
}

function getActorIcon(roleId) {
    // Mapping roleId (1-14) to ACTORS_MANIFEST icons
    // Match based on translation role index
    const manifestOrder = [
        "AN_majorite", "AN_opposition_droite", "AN_opposition_gauche",
        "Senat_majorite", "Senat_opposition", "Armees", "Interieur",
        "Justice", "CNIL", "ANSSI", "DGSI", "CYPHERA", "Medias", "ED"
    ];
    const actorId = manifestOrder[roleId - 1];
    const actor = window.ACTORS_MANIFEST.find(a => a.id === actorId);
    return actor ? actor.icon : '👤';
}

function renderTableView(container, lang) {
    let html = `
        <div class="results-table-container slide-in">
            <table class="glass-table">
                <thead>
                    <tr>
                        <th class="th-group">${window.translations[lang]['rep_group']}</th>
                        <th class="th-role">${window.translations[lang]['rep_role']}</th>
                        <th class="th-name">${window.translations[lang]['rep_name']}</th>
                    </tr>
                </thead>
                <tbody>`;

    distribution.forEach((item, index) => {
        const roleName = window.translations[lang][`role_${item.roleId}`];
        const icon = getActorIcon(item.roleId);
        html += `
            <tr class="table-row-premium">
                <td class="cell-group">#${index + 1}</td>
                <td class="cell-role">
                    <span class="role-icon-small">${icon}</span>
                    <span class="role-text-premium">${roleName}</span>
                </td>
                <td class="cell-name">${item.students}</td>
            </tr>`;
    });

    html += `</tbody></table></div>`;
    container.innerHTML = html;
}

function renderDynamicView(container, lang) {
    const categories = ['cat_an', 'cat_senat', 'cat_etat', 'cat_societe'];
    let html = '<div class="dynamic-view-grid slide-in">';

    categories.forEach(catKey => {
        const catRoles = distribution.filter(item => ROLE_CATEGORIES[item.roleId] === catKey);
        if (catRoles.length === 0) return;

        html += `
            <div class="category-block">
                <h3 class="category-title-premium">${window.translations[lang][catKey]}</h3>
                <div class="roles-cards-grid">`;

        catRoles.forEach(item => {
            const roleName = window.translations[lang][`role_${item.roleId}`];
            const icon = getActorIcon(item.roleId);
            html += `
                <div class="role-card-premium">
                    <div class="card-header-premium">
                        <div class="role-icon-large">${icon}</div>
                        <div class="role-meta-premium">
                            <span class="role-id-badge">#${item.roleId}</span>
                            <h4 class="role-name-premium">${roleName}</h4>
                        </div>
                    </div>
                    <div class="student-names-premium">
                        <span class="label-students">Élèves :</span> ${item.students}
                    </div>
                </div>`;
        });

        html += `</div></div>`;
    });

    html += '</div>';
    container.innerHTML = html;
}

function downloadCSV() {
    const lang = localStorage.getItem('cyphera-lang') || 'fr';
    const data = [["Groupe", "Rôle", "Élèves"]];

    distribution.forEach((item, index) => {
        const roleName = window.translations[lang][`role_${item.roleId}`];
        data.push([index + 1, roleName, item.students]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Répartition");

    XLSX.writeFile(workbook, "repartition_cyphera.xlsx");
}

function downloadTemplate() {
    const data = [
        ["Nom", "Prénom"],
        ["DUPONT", "Jean"],
        ["MARTIN", "Alice"]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Liste Élèves");

    XLSX.writeFile(workbook, "modele_eleves_cyphera.xlsx");
}
