const socket = io();
// document.addEventListener('DOMContentLoaded', function() {
  // Lấy các phần tử DOM cần sử dụng
// import { Howl, Howler } from 'howler';
// const { Howl, Howler } = require('howler');
let songSlider = document.querySelector("#progress");
let increaseVolume = document.querySelector("#increase-volume");
let decreaseVolume = document.querySelector("#decrease-volume");
let ctrlIcon = document.querySelector("#ctrlIcon");
let disc = document.getElementById("music_disc");
let guessButton = document.getElementById("guessButton");
let time = document.getElementById("Time_duration");
let round = document.getElementById("Round_play");
let endmodal = document.getElementById("end-model");
let numright = 0;
let numwrong = 0;

const userid = document.getElementById('userid');
const iduser = userid.dataset.user;
const mode_player = document.getElementById('mode');
const mode = mode_player.dataset.mode;
const songsInput = document.getElementById('songsInput');
const efVL = document.getElementById('efVLInput');
const msVL = document.getElementById('msVLInput');
const songs = JSON.parse(songsInput.dataset.songs);
const length = songs.length;

// Sử dụng biến songs trong các xử lý JavaScript khác
for(let i = 0; i < length; i++)
{
  console.log(songs[i].name);
}
 // In danh sách bài hát trong console

var correct_answer = new Howl({
  src: ['assets/sound/sound_correct_answer.mp3'],
})
var incorrect_answer = new Howl({
  src: ['assets/sound/sound_incorrect_answer.mp3'],
})
var endgame = new Howl({
  src: ['assets/sound/Cheap_Thrills.mp3'],
  loop: true
})
correct_answer.volume(efVL.value);
incorrect_answer.volume(efVL.value);
endgame.volume(efVL.value);


let play_song = [];
let index = 0;
let totalDuration = 0, dem_tg = 0;
let time_song = [];

function loadSongs() {
  return new Promise(function(resolve, reject) 
  {
    let loadedCount = 0;
    for (let i = 0; i < length; i++)
    {
      play_song.push(
        new Howl({
        src: ["data:audio/ogg;base64," + songs[i].content],
        autoplay: false,
        loop: false,
        volume: 0.3,
        format: ["ogg"],
        onload: function() {
          loadedCount++;
          if (loadedCount === play_song.length) {
            resolve();
          }
        },
        onplay: function(){
          disc.style.animationPlayState = "running";
          
        },
        onpause: function(){
          disc.style.animationPlayState = "paused";
          clearInterval(dem_tg);
        },
        onend: function(){
          disc.style.animationPlayState = "paused";
          clearInterval(dem_tg);
          songSlider.value = 0;
          if (ctrlIcon.classList.contains('fa-play'))
          {
            ctrlIcon.classList.remove("fa-play");
            ctrlIcon.classList.add("fa-pause");
          }
        }
        })
      );
    }
  });
}
function calculateDuration() {
  for (let j = 0; j < play_song.length; j++) {
    totalDuration += Math.ceil(play_song[j].duration());
    time_song.push(Math.ceil(play_song[j].duration() + 30));
  }
  //console.log("Tổng thời lượng của các bài hát:", totalDuration);
  calculate_time(totalDuration);
}
function calculate_time(totalDuration){
  let minutes = Math.floor((totalDuration + 300) / 60) || 0;
  let second = Math.ceil(totalDuration + 300 - minutes * 60) || 0;
  //minutes += 5;
  if (second < 10)
    second = "0" + second;
  else if (second == 60)
  {
    minutes += 1;
    second = "00";
  }
  time.textContent = minutes + ":" + second;
  totalDuration = parseInt(minutes * 60) + parseInt(second);
  
}
function calculate_time_song(totalDuration){
  let minutes = Math.floor((totalDuration) / 60) || 0;
  let second = Math.ceil(totalDuration - minutes * 60) || 0;
  //minutes += 5;
  if (second < 10)
    second = "0" + second;
  else if (second == 60)
  {
    minutes += 1;
    second = "00";
  }
  time.textContent = minutes + ":" + second;
  totalDuration = parseInt(minutes * 60) + parseInt(second);
 // return totalDuration;
}

loadSongs()
  .then(function() {
    calculateDuration();
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(totalDuration);
      }, 400);
    });
  })
  .then(function() {
    console.log("Kết quả duration:", totalDuration);
    })
  .catch(function(error) {
    console.log("Đã xảy ra lỗi:", error);
  });


// function countdown(time_songs)
// {

// }
var List_song = function (songs) {
  this.songs = songs;
  this.index = 0;
}
let countdown = 0, click = true, count = 0;


List_song.prototype = {

  play: function(index){
    if (this.songs[index]) {
      this.songs[index].volume(msVL.value);
      this.songs[index].play();
      this.index = index;
      
    }
  },
  
  pause: function(){
    if (this.songs[this.index]) {
      this.songs[this.index].pause();
    }
  },

  next: function(){
    let answer_song = document.getElementById("answer_song");
    answer_song.value = "";
    index = this.index + 1;
    if (index < 10)
    {
      round.textContent = (index + 1) + "/10";
      let minutes = Math.floor((time_song[player.index + 1]) / 60) || 0;
      let second = Math.ceil(time_song[player.index + 1] - minutes * 60) || 0;
      //minutes += 5;
      if (second < 10)
        second = "0" + second;
      else if (second == 60)
      {
        minutes += 1;
        second = "00";
      }
      time.textContent = minutes + ":" + second;
      count = -1;
      ctrlIcon.click();
    }
    // var time = time_song[index];
    // //totalDuration = 
    // countdown = setInterval(() => {
    //   time--;
    //   calculate_time_song(time);
    //   if (time == 0)
    //     clearInterval(countdown);
    // }, 1000)
  
  },

  volume: function(val){
    if (this.songs[this.index]) {
      this.songs[this.index].volume(val);
    }
  }
}
var player = new List_song(play_song);

increaseVolume.addEventListener('click', () => {
  let volume = play_song[index].volume();
  volume += 0.1;
  if (volume > 1) {
    volume = 1;
  }
  player.volume(volume);
});

decreaseVolume.addEventListener('click', () =>{
  let volume = play_song[index].volume();
  volume -= 0.1;
  if (volume < 0) {
    volume = 0;
  }
  player.volume(volume);
});

ctrlIcon.addEventListener('click', ()=>{
  //console.log(time_song);
  if (ctrlIcon.classList.contains("fa-pause"))
  {
    player.play(index);
    count++;
    if (count == 1){
      var time = time_song[player.index];
      countdown = setInterval(() => {
        time--;
        calculate_time_song(time);
        if (time == 0){
          clearInterval(countdown);
          guessButton.click();
        }
          
      }, 1000)
    }
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
    click = true;
    dem_tg = setInterval(updateSlider, 1000);
  }
  else
  {
    player.pause();
    count++;
    if (count == 1){
      var time = time_song[player.index];
      countdown = setInterval(() => {
        time--;
        calculate_time_song(time);
        if (time == 0){
          clearInterval(countdown);
          guessButton.click();
        }
          
      }, 1000)
    }
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
    clearInterval(dem_tg);
  }
});
function updateSlider() {
  var currentTime = play_song[index].seek();
  var duration = play_song[index].duration();
  songSlider.max = duration;
  var progress = currentTime;
  songSlider.value = progress;
}
songSlider.addEventListener("input", function() {
  var progress = parseInt(songSlider.value);
  var seekTime = progress;
  play_song[index].seek(seekTime);
});

function playNextSong() {
  player.next();
};
// Hàm để kiểm tra đoán đúng tên bài hát
guessButton.addEventListener('click', () => {
  let answer_song = document.getElementById("answer_song");
  let answer_value = answer_song.value.trim().toLowerCase();
  disc.style.animationPlayState = "paused";
  count = 0;
  if (click == true)
  {
    if (answer_value == songs[index].name.toLowerCase())
      {
        correct_answer.play();
        if (ctrlIcon.classList.contains("fa-pause")){
          ctrlIcon.classList.remove("fa-pause");
          ctrlIcon.classList.add("fa-play");
        }
        if (player.songs[player.index]){
          player.songs[player.index].stop();
        }
        clearInterval(countdown); // Dừng đếm ngược
        const str_time = document.getElementById("Time_duration").innerHTML.split(":");
        document.getElementById("Point_play").innerHTML = parseInt(document.getElementById("Point_play").innerHTML) + parseInt(str_time[1]) * 10;
        numright++;
        setTimeout(playNextSong, 1000);
        answer_song.value = "";
      }
      else if ( answer_value != songs[index].name.toLowerCase() || answer_song.value == "")
      {
        incorrect_answer.play();
        if (ctrlIcon.classList.contains("fa-pause")){
          ctrlIcon.classList.remove("fa-pause");
          ctrlIcon.classList.add("fa-play");
        }
        if (player.songs[player.index]){
          player.songs[player.index].stop();
        }
        clearInterval(countdown); // Dừng đếm ngược
        numwrong++;
        setTimeout(playNextSong, 1000);
        answer_song.value = songs[player.index].name.toLowerCase() + " - " + songs[player.index].singer;
      }
      if (index == 9){
        document.getElementsByClassName("play-area")[0].style.opacity = "0.35";
        endmodal.style.display = "flex";
        document.getElementById("endpoint").innerHTML = document.getElementById("Point_play").innerHTML;
        let score = document.getElementById("Point_play").innerHTML;
        endgame.volume(0.5);
        endgame.play();
        socket.emit("score_end", score, iduser, mode, numright);
      }
      click = false;
  }

})

let answer_song = document.getElementById("answer_song");
let answer_value = answer_song.value.trim().toLowerCase();
answer_song.addEventListener('keypress', function(event){
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    guessButton.click();
  }
});

let detailmodal = document.getElementById("detail-model");
document.getElementById("btn-detail").onclick = function(){
  detailmodal.style.display = "flex";
  document.getElementById("detailendpoint").innerHTML = document.getElementById("Point_play").innerHTML;
  document.getElementById("num-r").innerHTML = numright;
  document.getElementById("num-w").innerHTML = numwrong;
}

document.getElementById("return").onclick = function(){
  detailmodal.style.display = "none";
}

function clicknamesong(div){
  document.getElementById("answer_song").value = div.querySelector("#hintname").textContent;
}
