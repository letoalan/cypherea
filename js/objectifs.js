// objectifs.js - Système 3 boutons séquentiels + Export PDF Grille
document.addEventListener('DOMContentLoaded', function() {
    console.log("Objectifs JS loaded");
    
    const buttons = document.querySelectorAll('.objectif-btn');
    const sections = document.querySelectorAll('.content-section');
    
    if (buttons.length === 0) {
        console.warn("No objectif-btn found");
    } else {
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                const target = this.dataset.section;
                console.log("Switching to section:", target);
                
                // Reset active states
                buttons.forEach(b => b.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                
                // Activate target button and section
                this.classList.add('active');
                const targetEl = document.getElementById(target);
                if (targetEl) {
                    targetEl.classList.add('active');
                    
                    // Smooth scroll
                    targetEl.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            });
        });
    }

    // PDF Download Grille
    const downloadBtn = document.getElementById('download-grille-pdf');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            generateGrillePDF();
        });
    }

    // i18n refresh just in case
    if (window.i18n && typeof window.i18n.updatePage === 'function') {
        window.i18n.updatePage();
    }
});

// Fonction de génération PDF de la grille complète
function generateGrillePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const lang = localStorage.getItem('cyphera-lang') || 'fr';
    const t = window.translations[lang] || window.translations['fr'];

    // Styles de base
    const primaryColor = [26, 42, 108]; // Navy
    const accentColor = [253, 187, 45]; // Gold

    // --- TITRE ---
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(t["eval.title"] || "Grille d'Évaluation", 20, 20);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(t["eval.description"] || "", 20, 28);
    
    // --- TABLEAU PRINCIPAL (4 CRITÈRES) ---
    const mainHeaders = [
        t["eval.criteria"], 
        t["eval.description_col"], 
        t["eval.0to1"], 
        t["eval.2to3"], 
        t["eval.4to5"]
    ];
    
    const mainBody = [
        [t["eval.criterion1"], t["eval.desc1"], "Flou", "Plausible", "Nuancé"],
        [t["eval.criterion2"], t["eval.desc2"], "Imprécis", "Corrects", "Enrichis"],
        [t["eval.criterion3"], t["eval.desc3"], "Vagues", "Basiques", "Stratégiques"],
        [t["eval.criterion4"], t["eval.desc4"], "Faibles", "Logiques", "Complexes"]
    ];

    doc.autoTable({
        head: [mainHeaders],
        body: mainBody,
        startY: 35,
        theme: 'grid',
        headStyles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' },
        columnStyles: {
            0: { cellWidth: 25 },
            1: { cellWidth: 55 },
            2: { cellWidth: 20 },
            3: { cellWidth: 20 },
            4: { cellWidth: 20, fillColor: accentColor, textColor: 0, fontStyle: 'bold' }
        },
        styles: { fontSize: 9, cellPadding: 3 }
    });

    // --- PHASES BREAKDOWN ---
    let yPos = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Phases de la Simulation", 20, yPos);
    yPos += 8;

    const phasePhases = [
        { title: t["eval.phase1"], data: [["Rôle", "Négociation président/rapporteur crédible"], ["Faits", "Procédure résolution, bureau commission"], ["Questions", "\"Qui élit président ?\", \"Champ enquête ?\""], ["Argumentation", "Compromis majorités/oppositions"]] },
        { title: t["eval.phase2"], data: [["Rôle", "CNIL→RGPD, Extrême droite→Singapour"], ["Faits", "CYPHERA SECURITY, surveillance collatérale"], ["Questions", "\"Pourquoi surveiller innocents ?\""], ["Argumentation", "Défense/attaque selon position"]] },
        { title: t["eval.phase3"], data: [["Rôle", "4 positions/acteur/acte cohérentes"], ["Faits", "Synthèse auditions, responsabilités"], ["Questions", "Réformes proposées (CNCTR, loi)"], ["Argumentation", "Propositions législatives réalistes"]] },
        { title: t["eval.phase4"], data: [["Rôle", "Plaidoyer final convaincant"], ["Faits", "Conséquences politiques (loi, opinion)"], ["Questions", "Gestion objections adversaires"], ["Argumentation", "Vision stratégique éthique"]] }
    ];

    phasePhases.forEach(phase => {
        if (yPos > 240) { doc.addPage(); yPos = 20; }
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text(phase.title, 20, yPos);
        yPos += 3;

        doc.autoTable({
            body: phase.data,
            startY: yPos,
            theme: 'plain',
            styles: { fontSize: 8, cellPadding: 1.5 },
            columnStyles: { 0: { fontStyle: 'bold', cellWidth: 30 } },
            margin: { left: 25 }
        });
        yPos = doc.lastAutoTable.finalY + 5;
    });

    // --- BARÈME ---
    if (yPos > 240) { doc.addPage(); yPos = 20; }
    yPos += 5;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(t["eval.scale"], 20, yPos);
    yPos += 8;

    const scaleData = [
        ["16-20/20", t["eval.excellent"], "Rôles nuancés, argumentation fine, maîtrise institutions"],
        ["12-15/20", t["eval.veryGood"], "Rôles cohérents, arguments solides, procédure juste"],
        ["8-11/20", t["eval.satisfying"], "Rôles identifiés, faits corrects, participation active"],
        ["<8/20", t["eval.insufficient"], "Rôles flous, faits imprécis, participation passive"]
    ];

    doc.autoTable({
        head: [[t["eval.points"], t["eval.level"], t["eval.expectations"]]],
        body: scaleData,
        startY: yPos,
        theme: 'grid',
        headStyles: { fillColor: primaryColor },
        styles: { fontSize: 9 }
    });

    // --- INSTRUCTIONS PROFESSEUR ---
    yPos = doc.lastAutoTable.finalY + 15;
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(t["eval.instructions"], 20, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(0);
    const instructions = [t["eval.inst1"], t["eval.inst2"], t["eval.inst3"], t["eval.inst4"]];
    instructions.forEach(inst => {
        doc.text("• " + inst, 25, yPos);
        yPos += 6;
    });

    // Pied de page
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`CYPHERA - Simulation Commission d'Enquête | Page ${i} / ${totalPages}`, 105, 290, { align: 'center' });
    }

    doc.save('CYPHERA_Grille_Evaluation_20pts.pdf');
}
