const musicContainer = document.getElementById("music-container");

var songs = [

{name:"Something Conforting",album: "Nurture",artist: "Porter Robinson",
	url:"208gzn.mp3",cover:"y1l1b3.jpeg"},
{name:"Look at the Sky",album: "Nurture",artist: "Porter Robinson",
	url:"yelhxi.mp3",cover:"y1l1b3.jpeg"},

];
let songIndex = 0;

musicContainer.classList.add("music-container");musicContainer.classList.add("flex");musicContainer.classList.add("col");
musicContainer.innerHTML = `

<audio src="https://files.catbox.moe/${songs[songIndex].url}" id="music-player-audio"></audio>

<div class="img-container">
<img decoding="async" src="" alt="music-cover" id="music-player-song-cover" />
</div>


<div class="over-hidden">
<div class="music-info">
<h2 id="music-player-song-title" class="music-player-song-title"></h2>
<h3 id="music-player-song-album" class="music-player-song-album"></h2>
</div>


<div class="navigation flex row">
  <button id="music-player-prev" class="action-btn">
    <i class="fas fa-backward"></i>
  </button>
  <button id="music-player-play" class="action-btn action-btn-big">
    <i class="fas fa-play"></i>
  </button>
  <button id="music-player-next" class="action-btn">
    <i class="fas fa-forward"></i>
  </button>
</div>

<div class=music-player-progress-container id=music-player-progress-container>
<div class=music-player-progress id=music-player-progress></div>
  </div>
</div>

`;

const audio = document.getElementById("music-player-audio");
const playButton = document.getElementById("music-player-play");
const prevButton = document.getElementById("music-player-prev");
const nextButton = document.getElementById("music-player-next");
const progressContainer = document.getElementById("music-player-progress-container");
const progress = document.getElementById("music-player-progress");
const title = document.getElementById("music-player-song-title");
const album = document.getElementById("music-player-song-album");
//const artist = document.getElementById("music-player-song-artist");
const cover = document.getElementById("music-player-song-cover");

audio.volume = 0.2;

//function loadSong(song, cover) {
function loadSong(song) {
  title.innerText = song.name;
  album.innerText = song.album;
//  artist.innerText = song.artist;
  audio.src = `https://files.catbox.moe/${song.url}`;
  cover.src = `https://files.catbox.moe/${song.cover}`;
}

function playSong() {
  musicContainer.classList.add("play");
  playButton.querySelector("i.fas").classList.remove("fa-play");
  playButton.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  playButton.querySelector("i.fas").classList.remove("fa-pause");
  playButton.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}
function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
// Event Listeners
playButton.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

loadSong(songs[songIndex]);


