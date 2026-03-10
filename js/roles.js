let students = [];
let distribution = [];

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    document.getElementById('file-info').textContent = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
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

        document.getElementById('distributeBtn').disabled = students.length === 0;
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

function renderTableView(container, lang) {
    let html = `
        <div class="results-table-container">
            <table id="resultsTable">
                <thead>
                    <tr>
                        <th data-i18n="rep_group">${window.translations[lang]['rep_group']}</th>
                        <th data-i18n="rep_role">${window.translations[lang]['rep_role']}</th>
                        <th data-i18n="rep_name">${window.translations[lang]['rep_name']}</th>
                    </tr>
                </thead>
                <tbody id="resultsBody">`;

    distribution.forEach((item, index) => {
        const roleName = window.translations[lang][`role_${item.roleId}`];
        html += `<tr>
            <td>${index + 1}</td>
            <td class="role-cell">${roleName}</td>
            <td class="name-cell">${item.students}</td>
        </tr>`;
    });

    html += `</tbody></table></div>`;
    container.innerHTML = html;
}

function renderDynamicView(container, lang) {
    const categories = ['cat_an', 'cat_senat', 'cat_etat', 'cat_societe'];
    let html = '<div class="dynamic-view-grid">';

    categories.forEach(catKey => {
        const catRoles = distribution.filter(item => ROLE_CATEGORIES[item.roleId] === catKey);
        if (catRoles.length === 0) return;

        html += `
            <div class="category-group">
                <h3 class="category-title">${window.translations[lang][catKey]}</h3>
                <div class="roles-cards">`;

        catRoles.forEach(item => {
            const roleName = window.translations[lang][`role_${item.roleId}`];
            html += `
                <div class="role-card">
                    <div class="role-info">
                        <span class="role-id">#${item.roleId}</span>
                        <h4 class="role-name">${roleName}</h4>
                    </div>
                    <div class="student-names">${item.students}</div>
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
