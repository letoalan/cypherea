function generatePDF(type) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const lang = localStorage.getItem('cyphera-lang') || 'fr';
    
    doc.setFontSize(22);
    doc.setTextColor(30, 58, 138); // Navy
    
    switch(type) {
        case 'ctx':
            doc.text("Contexte Affaire CYPHERA", 20, 20);
            doc.setFontSize(12);
            doc.text("Détails sur l'incident de cybersécurité et les enjeux nationaux.", 20, 35);
            doc.save("contexte_cyphera.pdf");
            break;
        case 'comm':
            doc.text("Commissions Vᵉ République", 20, 20);
            doc.setFontSize(12);
            doc.text("Guide de procédure parlementaire et règles de la commission.", 20, 35);
            doc.save("commissions_v5.pdf");
            break;
        case 'actors':
            doc.text("Fiches des 14 Acteurs", 20, 20);
            doc.setFontSize(12);
            doc.text("Rôles, missions et positions stratégiques des 14 groupes.", 20, 35);
            doc.save("14_acteurs.pdf");
            break;
        case 'eval':
            doc.text("Grille d'Évaluation (20pts)", 20, 20);
            doc.setFontSize(12);
            doc.text("Barème détaillé : Faits, Questions, Argumentation.", 20, 35);
            doc.save("grille_evaluation.pdf");
            break;
        case 'sim':
            doc.text("Déroulé de la Simulation", 20, 20);
            doc.setFontSize(12);
            doc.text("Chronologie des 4 actes de la commission d'enquête.", 20, 35);
            doc.save("deroule_simulation.pdf");
            break;
    }
}
