/**
 * Voting System - Summary Integration (Badges & Observer)
 */

window.refreshSummaryResults = function() {
    const allVotes = loadVotes();
    ['President', 'Rapporteur', 'Rapport'].forEach(type => {
        const data = allVotes[type];
        if (!data) return;
        
        const span = document.getElementById(`result-${type}-summary`);
        if (span) {
            let newText = "";
            if (data.validated) {
                // Find winner
                const totaux = {};
                data.candidates.forEach(c => {
                    totaux[c] = 0;
                    parliamentaryGroups.forEach(g => totaux[c] += (data.data[g.id]?.[c] || 0));
                });
                const maxV = Math.max(...Object.values(totaux), 0);
                const winner = Object.entries(totaux).find(([c, v]) => v === maxV && v > 0)?.[0];
                
                newText = winner ? `Élu : ${winner}` : "Aucun élu";
            }

            // ONLY update if changed to avoid infinite loop with MutationObserver
            if (span.textContent !== newText) {
                span.textContent = newText;
            }
        }
    });
}

// Initial refresh when module loads
document.addEventListener('DOMContentLoaded', refreshSummaryResults);

// MutationObserver to refresh badges when acte content is swapped
const observer = new MutationObserver((mutations) => {
    // Only trigger if changes happened outside the result badges themselves
    const isInternal = mutations.every(m => m.target.id?.includes('-summary') || m.target.parentNode?.id?.includes('-summary'));
    if (!isInternal) {
        refreshSummaryResults();
    }
});

if (typeof document !== 'undefined') {
    observer.observe(document.body, { childList: true, subtree: true });
}
