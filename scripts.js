// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.player__video');

const controls = player.querySelector('.player__controls');

const progress = controls.querySelector('.progress');
const progressBar = progress.querySelector('.progress__filled');

const playerButton = controls.querySelector('.toggle');
const ranges = controls.querySelectorAll('.player__slider');
const skipButtons = controls.querySelectorAll('[data-skip]');

// Build functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function keyOperations(e) {
    const keyButton = e.keyCode;
    if (keyButton === 32) {
        e.preventDefault();
        togglePlay(); 
    }
    if (keyButton === 37 || keyButton === 39) {
        const item = document.querySelector(`button[data-key="${keyButton}"`);
        video.currentTime += parseFloat(item.dataset.skip);
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '&#9611&#9611';
    playerButton.innerHTML = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function changeVideoProgress(e) {
    const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = newTime;
}

// Add EventListeners
window.addEventListener('keydown', keyOperations);

// Play or pause
video.addEventListener('click', togglePlay);
playerButton.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Skip
skipButtons.forEach(button => button.addEventListener('click', skip));

//
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('click', changeVideoProgress);
progress.addEventListener('mousemove', (e) => {
    if (mousedown) {
        changeVideoProgress(e);
    }
});