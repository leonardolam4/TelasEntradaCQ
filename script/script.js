let activeCompetitor = null;

function startDrag(event) {
    event.preventDefault();

    const raceTrack = document.querySelector('.race-track');
    const competitors = raceTrack.querySelectorAll('.competitor');

    for (const competitor of competitors) {
        const rect = competitor.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right) {
            activeCompetitor = competitor;
            document.addEventListener('mousemove', dragCompetitor);
            document.addEventListener('mouseup', stopDrag);
            break;
        }
    }
}

function dragCompetitor(event) {
    const raceTrack = document.querySelector('.race-track');
    const raceTrackRect = raceTrack.getBoundingClientRect();

    let newPosition = event.clientX - raceTrackRect.left;
    if (newPosition < 0) {
        newPosition = 0;
    } else if (newPosition > raceTrackRect.width - activeCompetitor.clientWidth) {
        newPosition = raceTrackRect.width - activeCompetitor.clientWidth;
    }

    activeCompetitor.style.left = `${newPosition}px`;
}

function stopDrag() {
    document.removeEventListener('mousemove', dragCompetitor);
    document.removeEventListener('mouseup', stopDrag);

    activeCompetitor = null;
}

// Seleciona todos os checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Seleciona o competidor 1 (supondo que seja o primeiro competidor)
const competidor1 = document.getElementById('competitor1');

// Seleciona a race track
const raceTrack = document.querySelector('.race-track');

// Calcula a largura total da race track (considerando a borda arredondada)
const raceTrackWidth = raceTrack.clientWidth - (parseInt(getComputedStyle(raceTrack).paddingLeft) * 2);

// Função para calcular e atualizar a posição do competidor com base nas checkboxes marcadas
function atualizarPosicaoCompetidor() {
    const checkboxesMarcadas = document.querySelectorAll('input[type="checkbox"]:checked');
    const percentualConcluido = (checkboxesMarcadas.length / checkboxes.length) * 100;

    // Calcula a posição do competidor com base no percentual concluído
    const novaPosicao = (percentualConcluido / 100) * raceTrackWidth;
    competidor1.style.left = `${novaPosicao}px`;
}

// Adiciona um event listener para cada checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        atualizarPosicaoCompetidor();
    });
});
