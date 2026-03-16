/**
 * Voting System - Core Constants & Storage
 */

const STORAGE_KEY = 'cyphera_mega_votes';

const parliamentaryGroups = [
    { id: 'an_gauche', name: 'AN Gauche', seats: 4, color: '#D62828' },
    { id: 'senat_opp', name: 'Sénat Opp.', seats: 2, color: '#E76FAD' },
    { id: 'an_maj', name: 'AN Majorité', seats: 10, color: '#F77F00' },
    { id: 'senat_maj', name: 'Sénat Maj.', seats: 4, color: '#4D96FF' },
    { id: 'an_droite', name: 'AN Droite', seats: 5, color: '#1D4ED8' },
    { id: 'an_ed', name: 'ED', seats: 5, color: '#111111' }
];

const allPotentialCandidates = [
    'AN Gauche', 'Sénat Opp.', 'AN Majorité', 'Sénat Maj.', 'AN Droite', 'ED', 'DGSI', 'ANSSI'
];

function loadVotes() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
        'President': { round: 1, candidates: [], data: {}, validated: false },
        'Rapporteur': { round: 1, candidates: [], data: {}, validated: false },
        'Rapport': { round: 1, candidates: ['Adopté', 'Rejeté'], data: {}, validated: false }
    };
}

function saveVotes(allVotes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allVotes));
}
