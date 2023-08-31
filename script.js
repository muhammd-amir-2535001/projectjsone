
function playSound(keyCode) {
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0; // Rewind audio to the start
    audio.play();
    key.classList.add('playing');

    // Stop the sound after a short delay (500ms)
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        key.classList.remove('playing');
    }, 500);
}

function removeTransition(event) {
    if (event.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

function handleKeyPress(event) {
    const keyCode = event.keyCode;
    playSound(keyCode);
}

function handleTransitionEnd(event) {
    if (event.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
keys.forEach(key => key.addEventListener('click', function () {
    const keyCode = this.getAttribute('data-key');
    playSound(keyCode);
}));

window.addEventListener('keydown', handleKeyPress);
