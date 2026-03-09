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

function displayResults() {
    const body = document.getElementById('resultsBody');
    const lang = localStorage.getItem('cyphera-lang') || 'fr';
    body.innerHTML = '';
    
    distribution.forEach((item, index) => {
        const roleName = window.translations[lang][`role_${item.roleId}`];
        const row = `<tr>
            <td>${index + 1}</td>
            <td class="role-cell">${roleName}</td>
            <td class="name-cell">${item.students}</td>
        </tr>`;
        body.insertAdjacentHTML('beforeend', row);
    });
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
