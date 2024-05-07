
// document.addEventListener('DOMContentLoaded', function() {
  // Lấy các phần tử DOM cần sử dụng
// import { Howl, Howler } from 'howler';
// const { Howl, Howler } = require('howler');
let volumeSlider = document.querySelector("#progress");
let increaseVolume = document.querySelector("#increase-volume");
let decreaseVolume = document.querySelector("#decrease-volume");
let ctrlIcon = document.querySelector("#ctrlIcon");
let guessButton = document.getElementById("guessButton");
let time = document.getElementById("Time_duration");
let round = document.getElementById("Round_play");
let score_player1 = document.getElementById("Score_player1");
let score_player2 = document.getElementById("Score_player2");
let endmodal = document.getElementById("end-model");
let numright = 0;
let numwrong = 0;

const songsInput = document.getElementById('songsInput');
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

let play_song = [];
let index = 0;
let totalDuration = 0;
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
let countdown = 0, count = 0;


List_song.prototype = {

  play: function(index){
    if (this.songs[index]) {
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
    if (index < 10){
      round.textContent = (index + 1) + "/10";
      calculate_time_song(time_song[player.index + 1]);
      count = -1;
      ctrlIcon.click();
    }
  },

  volume: function(val){
    if (this.songs[this.index]) {
      this.songs[this.index].volume(val);
    }
  }
}
var player = new List_song(play_song);

increaseVolume.addEventListener('click', () => {
  let volume = parseInt(volumeSlider.value);
  volume -= 10;
  if (volume < 0) {
    volume = 0;
  }
  let volume_1 = volume / 100;
  player.volume(volume_1);
  volumeSlider.value = volume;
});

decreaseVolume.addEventListener('click', () =>{
  let volume = parseInt(volumeSlider.value);
  volume += 10;
  if (volume > 100) {
    volume = 100;
  }
  let volume_1 = volume / 100;
  player.volume(volume_1);
  volumeSlider.value = volume;
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
  }
});
volumeSlider.addEventListener('mousedown', function(){
  let volume = parseInt(volumeSlider.value);
  volume += 10;
  let volume_1 = volume / 100;
  player.volume(volume_1);
});

volumeSlider.addEventListener('mousemove', function(){
  let volume = parseInt(volumeSlider.value);
  volume += 10;
  let volume_1 = volume / 100;
  player.volume(volume_1);
});

function playNextSong() {
  player.next();
};
// Hàm để kiểm tra đoán đúng tên bài hát
guessButton.addEventListener('click', () => {
  let answer_song = document.getElementById("answer_song");
  let answer_value = answer_song.value.trim().toLowerCase();
  count = 0;
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
    answer_song.value = songs[player.index].name.toLowerCase();
  }
  if (index == 9){
    document.getElementsByClassName("container")[0].style.opacity = "0.35";
    endmodal.style.display = "flex";
    document.getElementById("endpoint").innerHTML = score_player1.innerHTML;
    endgame.volume(0.5);
    endgame.play();
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
  document.getElementById("detailendpoint").innerHTML = score_player1.innerHTML;
  document.getElementById("num-r").innerHTML = numright;
  document.getElementById("num-w").innerHTML = numwrong;
}

document.getElementById("return").onclick = function(){
  detailmodal.style.display = "none";
}


