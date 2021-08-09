const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");




const togglePlay = e => {
  if(video.paused || e.key === 'Backspace') {
    video.play()
  } else {
    video.pause()
  }
}

const replaceBtn = () => {
  if (video.paused) {
    toggle.textContent = '►'
  } else {
    toggle.textContent = '❚❚ '
  }
}

const skipFn = e => {
  if(e.target.dataset.skip === '-10') {
    video.currentTime -= 10;
  } else if(e.target.dataset.skip === '25') {
    video.currentTime += 25;
  }
}

const handleRangeUpdate = e => {
  video[e.target.name] = e.target.value
}

const handleProgress = () => {
  const percent = (video.currentTime * 100) / video.duration;
  progressBar.style.flexBasis = `${percent}%`
}

const scrubProgress = e => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime
}

video.addEventListener('click', togglePlay);
window.addEventListener('keydown', togglePlay);
video.addEventListener('play', replaceBtn);
video.addEventListener('pause', replaceBtn);
video.addEventListener('progress', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(skip => skip.addEventListener('click', skipFn));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrubProgress);
progress.addEventListener('mousemove', (e) => mousedown && scrubProgress(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);