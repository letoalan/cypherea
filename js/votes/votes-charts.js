/**
 * Voting System - Hemicycle Chart
 */

let hemicycleChart = null;

function updateHemicycle() {
    const allVotes = loadVotes();
    const currentVote = allVotes[activeVoteType];
    const container = document.getElementById('hemicycle-chart');
    if (!container) return;
    
    if (hemicycleChart) {
        hemicycleChart.destroy();
    }
    container.innerHTML = '<canvas id="hemicycle-canvas"></canvas>';
    const canvas = document.getElementById('hemicycle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Aggregate votes by CANDIDATE (Results)
    const candidateResults = currentVote.candidates.map(name => {
        let sum = 0;
        parliamentaryGroups.forEach(g => {
            sum += (currentVote.data[g.id]?.[name] || 0);
        });
        return { name, value: sum };
    });

    const totalVotes = candidateResults.reduce((a, b) => a + b.value, 0);
    const abstention = Math.max(0, 30 - totalVotes);

    const labels = candidateResults.map(r => r.name);
    const dataValues = candidateResults.map(r => r.value);
    
    // Fixed political colors mapping
    const colorMap = {
        'AN Gauche': '#D62828',
        'Sénat Opp.': '#E76FAD',
        'AN Majorité': '#F77F00',
        'Sénat Maj.': '#4D96FF',
        'AN Droite': '#1D4ED8',
        'ED': '#111111'
    };
    
    const backgroundColors = candidateResults.map(r => colorMap[r.name] || '#94a3b8');

    if (abstention > 0) {
        labels.push('Abstention');
        dataValues.push(abstention);
        backgroundColors.push('rgba(255, 255, 255, 0.05)');
    }

    const hasData = totalVotes > 0;

    hemicycleChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: hasData || abstention > 0 ? dataValues : [1],
                backgroundColor: backgroundColors,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 2,
                hoverOffset: 15,
                hoverBorderColor: '#fff',
                hoverBorderWidth: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            rotation: -90,
            circumference: 180,
            cutout: '75%',
            padding: 30,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: { 
                        color: '#fff', 
                        padding: 20, 
                        font: { size: 12, weight: '600', family: "'Outfit', 'Inter', sans-serif" },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleFont: { size: 14, weight: '800' },
                    bodyFont: { size: 13 },
                    padding: 12,
                    borderColor: 'rgba(253, 187, 45, 0.3)',
                    borderWidth: 1
                }
            }
        },
        plugins: [{
            id: 'centerText',
            afterDraw: (chart) => {
                const { ctx, width, height } = chart;
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const centerX = width / 2;
                const centerY = chart.chartArea.bottom - 10;

                // Value Display (Big Number)
                const maxVoix = Math.max(...dataValues.slice(0, candidateResults.length), 0);
                const threshold = (currentVote.round === 1) ? 16 : (Math.floor(totalVotes / 2) + 1);
                const isSuccess = maxVoix >= threshold && maxVoix > 0;

                ctx.font = '800 52px "Outfit", "Inter", sans-serif';
                ctx.fillStyle = isSuccess ? '#4ade80' : '#fff';
                ctx.shadowBlur = 15;
                ctx.shadowColor = isSuccess ? 'rgba(74, 222, 128, 0.5)' : 'transparent';
                ctx.fillText(maxVoix || '0', centerX, centerY - 65);

                // Subtitle (Majority Status)
                ctx.shadowBlur = 0;
                ctx.font = '600 14px "Inter", sans-serif';
                ctx.fillStyle = isSuccess ? '#4ade80' : 'rgba(255, 255, 255, 0.5)';
                ctx.fillText(isSuccess ? 'MAJORITÉ ATTEINTE' : `OBJECTIF : ${threshold} VOIX`, centerX, centerY - 25);

                // Footer (Total Seats)
                ctx.font = '800 18px "Inter", sans-serif';
                ctx.fillStyle = 'rgba(253, 187, 45, 0.9)';
                ctx.fillText('30 SIÈGES', centerX, centerY + 15);
                
                ctx.restore();
            }
        }]
    });

    const chartContainer = document.getElementById('hemicycle-container');
    if (chartContainer) {
        chartContainer.style.backgroundColor = '#1e293b'; // Slightly darker blueprint gray
        chartContainer.style.boxShadow = 'inset 0 0 40px rgba(0,0,0,0.5)';
    }
}
