//getting elements 
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const mid_info = player.querySelector('.pause__play')

console.log(skipButtons)
function toggleplay() {
    if (video.paused) {
        video.play();
        mid_info.textContent = ''
    } else {
        video.pause();
        mid_info.textContent = '▶'
    }
}

function updateButton() {
    const icon = this.paused ? `<img
    src="https://image.flaticon.com/icons/png/512/27/27223.png" alt="" >` : `<img
    src="https://image.flaticon.com/icons/png/128/633/633940.png" alt="" >`;
    toggle.innerHTML = icon;
}

function skip() {
    let skipValue = this.dataset.skip;
    console.log(skipValue);
    video.currentTime += parseFloat(skipValue);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function progressScrub(e) {
    let scrubTime = (e.offsetX / progress.offsetWidth) *
        video.duration;
    video.currentTime = scrubTime;
}

function pausePlay() {
    if (video.paused) {
        video.play();
        mid_info.textContent = ''
    } else {
        video.pause();
        mid_info.textContent = '▶'
    }
}

function spacePausePlay(e){
    if(e.keyCode === 32){
        if(video.paused){
            video.play();
            mid_info.textContent = '';
        }
        else{
            video.pause();
            mid_info.textContent = '▶'
        }
    }
}

video.addEventListener('click', toggleplay);
toggle.addEventListener('click', toggleplay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
document.addEventListener('keydown', spacePausePlay);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(button => {
    button.addEventListener('click', skip);
})

ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
})

ranges.forEach(range => {
    range.addEventListener('mousemove', handleRangeUpdate);
})

progressBar.addEventListener('click', progressScrub);
progress.addEventListener('click', progressScrub);

mid_info.addEventListener('click', pausePlay);