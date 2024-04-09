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
