const player = document.querySelector('.player');
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");




const togglePlay = () => {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

const updateButton = () => {
  if(video.paused) {
    toggle.textContent = "►";
  } else {
    toggle.textContent = "▌▌";
  }
}

const skip = (e) => {
  if(e.target.dataset.skip === "25") {
    video.currentTime += 25
  } else if (e.target.dataset.skip === "-10") {
    video.currentTime -= 10
  }
  //video.currentTime += Number(e.target.dataset.skip)
}

const handleRangeValues = e => {
  video[e.target.name] = e.target.value;
}

const handleProgress = () => {
  const percent = (video.currentTime * 100) / video.duration;
  progressBar.style.flexBasis = `${percent}%`
}

const scrub = e => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}




video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('progress', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeValues));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeValues));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);