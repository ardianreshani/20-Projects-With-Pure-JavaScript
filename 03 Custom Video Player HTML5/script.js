const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress= document.getElementById('progress');
const  timestamp = document.getElementById('timestamp');
 
function toggleVideoStatus(){
  if(video.paused){
      video.play();
  }else {
    video.pause();
  }
}

function updatePlayIcon(){
  if(video.paused){
    play.innerHTML = ' <i class="fas fa-play-circle"></i>';
  }else {
    play.innerHTML = ' <i class="fas fa-pause-circle"></i>';
  }
}

function updateProgress(){
  progress.value = (video.currentTime / video.duration) *100;
  // get min 
  let mins = Math.floor(video.currentTime / 60);
  if( mins < 10){
    mins = '0' + String(mins);
  }
  //get seconds
  let secs =  Math.floor( video.currentTime % 60);
  if (secs < 10){
    secs = '0' +String(secs);
  }
  timestamp.innerHTML = `${mins}:${secs}`;
}


function setVideoProgress(){
 video.currentTime = (+progress.value * video.duration) / 100;
}

function stopVideo(){
  video.currentTime = 0;
  video.pause();
}




// Eventss
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause',updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate',updateProgress);
play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
