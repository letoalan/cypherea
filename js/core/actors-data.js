/**
 * actors-data.js - Catalogue et constantes pour les acteurs
 */

window.ACTORS_MANIFEST = [
    { id: "AN_majorite", file: "1-AN_majorite.json", type: "membre", icon: "🏛️" },
    { id: "AN_opposition_droite", file: "2-AN_opposition_droite.json", type: "membre", icon: "🦅" },
    { id: "AN_opposition_gauche", file: "3-AN_opposition_gauche.json", type: "membre", icon: "✊" },
    { id: "ED", file: "6-ED.json", type: "membre", icon: "🛡️" },
    { id: "Senat_majorite", file: "4-Senat_majorite.json", type: "membre", icon: "🏛️" },
    { id: "Senat_opposition", file: "5-Senat_opposition.json", type: "membre", icon: "🏢" },
    { id: "Armees", file: "7-Armees.json", type: "temoin", icon: "🎖️" },
    { id: "Interieur", file: "8-Interieur.json", type: "temoin", icon: "👮" },
    { id: "Justice", file: "9-Justice.json", type: "temoin", icon: "⚖️" },
    { id: "CNIL", file: "10-CNIL.json", type: "temoin", icon: "🔒" },
    { id: "ANSSI", file: "11-ANSSI.json", type: "temoin", icon: "💻" },
    { id: "DGSI", file: "12-DGSI.json", type: "temoin", icon: "👁️" },
    { id: "CYPHERA", file: "13-CYPHERA.json", type: "temoin", icon: "🦊" },
    { id: "Medias", file: "14-Medias.json", type: "temoin", icon: "📰" }
];

window.getActorLabel = function(id) {
    if (id === "ED") return "Assemblée Nationale - Extrême droite";
    return id.replace(/_/g, ' ')
             .replace(/^AN\s/, 'Assemblée nationale - ')
             .replace(/^Senat\s/, 'Sénat - ');
};
