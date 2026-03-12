/**
 * actors-data.js - Catalogue et constantes pour les acteurs
 */

window.ACTORS_MANIFEST = [
    { id: "AN_majorite", file: "1-AN_majorite.json", type: "membre" },
    { id: "AN_opposition_droite", file: "2-AN_opposition_droite.json", type: "membre" },
    { id: "AN_opposition_gauche", file: "3-AN_opposition_gauche.json", type: "membre" },
    { id: "ED", file: "6-ED.json", type: "membre" },
    { id: "Senat_majorite", file: "4-Senat_majorite.json", type: "membre" },
    { id: "Senat_opposition", file: "5-Senat_opposition.json", type: "membre" },
    { id: "Armees", file: "7-Armees.json", type: "temoin" },
    { id: "Interieur", file: "8-Interieur.json", type: "temoin" },
    { id: "Justice", file: "9-Justice.json", type: "temoin" },
    { id: "CNIL", file: "10-CNIL.json", type: "temoin" },
    { id: "ANSSI", file: "11-ANSSI.json", type: "temoin" },
    { id: "DGSI", file: "12-DGSI.json", type: "temoin" },
    { id: "CYPHERA", file: "13-CYPHERA.json", type: "temoin" },
    { id: "Medias", file: "14-Medias.json", type: "temoin" }
];

window.getActorLabel = function(id) {
    if (id === "ED") return "Assemblée Nationale - Extrême droite";
    return id.replace(/_/g, ' ')
             .replace(/^AN\s/, 'Assemblée nationale - ')
             .replace(/^Senat\s/, 'Sénat - ');
};
