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

// Seleciona o botão de confirmação
const confirmButton = document.querySelector('button[type="submit"]');

// Adiciona um event listener para o botão de confirmação
confirmButton.addEventListener('click', (event) => {
    event.preventDefault(); // Previne o envio do formulário padrão

    const competidor1 = document.getElementById('competitor1');
    const raceTrack = document.querySelector('.race-track');
    const raceTrackWidth = raceTrack.clientWidth - (parseInt(getComputedStyle(raceTrack).paddingLeft) * 2);

    // Calcula o progresso com base nas checkboxes marcadas
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkboxesMarcadas = document.querySelectorAll('input[type="checkbox"]:checked');
    const percentualConcluido = (checkboxesMarcadas.length / checkboxes.length) * 100;

    // Calcula a nova posição do competidor com base no percentual concluído
    const novaPosicao = (percentualConcluido / 100) * raceTrackWidth;

    // Animação para mover o competidor gradualmente até a nova posição
    animateCompetitor(competidor1, novaPosicao);
});

// Função para animar o movimento do competidor até a nova posição
function animateCompetitor(competitor, novaPosicao) {
    const posicaoAtual = parseFloat(competitor.style.left) || 0;
    const distancia = novaPosicao - posicaoAtual;
    const duracao = 1000; // Duração da animação em milissegundos (1 segundo)

    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;

        // Calcula a nova posição com base no progresso da animação
        const newPos = posicaoAtual + (distancia * (progress / duracao));

        // Atualiza a posição do competidor
        competitor.style.left = `${newPos}px`;

        // Continua a animação até a duração completa
        if (progress < duracao) {
            requestAnimationFrame(step);
        }
    }

    // Inicia a animação
    requestAnimationFrame(step);
}
