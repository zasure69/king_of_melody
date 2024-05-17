const socket = io();
// Lấy các phần tử DOM cần sử dụng

let songSlider = document.querySelector("#progress");
let increaseVolume = document.querySelector("#increase-volume");
let decreaseVolume = document.querySelector("#decrease-volume");
let ctrlIcon = document.querySelector("#ctrlIcon");
let disc = document.getElementById("music_disc");
let guessButton = document.getElementById("guessButton");
let time = document.getElementById("Time_duration");
let round = document.getElementById("Round_play");
let score_player1 = document.getElementById("Score_player1");
let score_player2 = document.getElementById("Score_player2");
let player1_name = document.getElementById("player1name");
let player2_name = document.getElementById("player2name");
let endmodal = document.getElementById("end-model");
let home = document.getElementById("home_render");
let home1 = document.getElementById("home-btn");
let numright = 0;
let numwrong = 0;
let back = document.getElementById("btn_back");

const userid = document.getElementById('userid');
const iduser = userid.dataset.user;
const songsInput = document.getElementById('songsInput');
const efVL = document.getElementById('efInput');
const msVL = document.getElementById('msInput');
const roundNum = document.getElementById("roundNum");
const Numround = roundNum.dataset.round; 
console.log("ef: ", efVL);
console.log("ms: ", msVL);
const ef = efVL.dataset.efvolume;

const ms = msVL.dataset.volume;

const songs = JSON.parse(songsInput.dataset.songs);
const length = songs.length;

window.addEventListener('load', function() {
  // Mã JavaScript để xác nhận rằng trang đã tải hoàn chỉnh
  console.log('Trang đã tải xong.');
});

// window.history.pushState(null,null,window.location.href);
// window.onpopstate = function(event) {
//   window.history.forward();
// }

//Sử dụng biến songs trong các xử lý JavaScript khác
for(let i = 0; i < length; i++)
{
  console.log(songs[i].name);
}
 // In danh sách bài hát trong console

var correct_answer = new Howl({
  src: ['/assets/sound/sound_correct_answer.mp3'],
});
var incorrect_answer = new Howl({
  src: ['/assets/sound/sound_incorrect_answer.mp3'],
});
var endgame = new Howl({
  src: ['/assets/sound/Cheap_Thrills.mp3'],
  loop: true
});
var endgame_lose = new Howl({
  src: ['/assets/sound/gameover.mp3'],
  loop: true
});

correct_answer.volume(ef);
incorrect_answer.volume(ef);
endgame.volume(ef);
endgame_lose.volume(ef);

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
  calculate_time(totalDuration);
}
function calculate_time(totalDuration){
  let minutes = Math.floor((totalDuration + Numround*30) / 60) || 0;
  let second = Math.ceil(totalDuration + Numround*30 - minutes * 60) || 0;
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

var List_song = function (songs) {
  this.songs = songs;
  this.index = 0;
}
let countdown = 0, count = 0, click = false, score = 0;


List_song.prototype = {

  play: function(index){
    if (this.songs[index]) {
      this.songs[index].volume(ms);
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
    if (index < Numround){
      round.textContent = (index + 1) + "/" + Numround;
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
let start = true;
let tmp = 0;
ctrlIcon.addEventListener('click', ()=>{
  if (start == true){
    if (ctrlIcon.classList.contains("fa-pause"))
    {
      player.play(index);
      count++;
      if (count == 1){
        var time = time_song[player.index];
        tmp = time;
        countdown = setInterval(() => {
          time--;
          tmp = time;
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
        time = time_song[player.index];
        tmp = time;
        countdown = setInterval(() => {
          time--;
          tmp = time;
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
        numright++;
        if (tmp != 0)
          score += tmp * 10;
        else
          score += 10;
        score_player1.textContent = score;
        console.log(socket.id);
        socket.emit("addpointtooppent",score);
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
      if (index == Numround - 1){
        socket.emit("done");
          
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
  document.getElementById("detailendpoint").innerHTML = score_player1.innerHTML;
  document.getElementById("num-r").innerHTML = numright;
  document.getElementById("num-w").innerHTML = numwrong;
}

document.getElementById("return").onclick = function(){
  detailmodal.style.display = "none";
}

socket.on("wait", function() {
  start = false;
})

socket.on("start", function(){
  start = true;
})

socket.on("reconnect", function() {
    console.log('bạn đã kết nối lại thành công');
})

socket.on("player1", function(room) {
    if (room.vacant){
      player1_name.textContent = room.player[0].username;
      player2_name.textContent = "Hãy đợi người chơi 2";
    }
    else{
      player1_name.textContent = room.player[0].username;
      player2_name.textContent = room.player[1].username;
      console.log("player 1:",room.player[0]);
      console.log("player 2:",room.player[1]);
    }

})

socket.on("player2", function(room){
    player2_name.textContent = room.player[0].username;
    player1_name.textContent = room.player[1].username;
})

socket.on("remain_players", function(nameplayer1, nameplayer2){
  console.log(nameplayer1," ",nameplayer2);
  if (player1_name.textContent != nameplayer1)
  {
    player2_name.textContent = nameplayer1;
  }
  else
  {
    player2_name.textContent = nameplayer2;
  }
  
})

socket.on("addpointtooppent", (score) =>{
    score_player2.textContent = score;
})

socket.on('endgame',() => {
  if (parseInt(score_player1.textContent) >  parseInt(score_player2.textContent)){
    socket.emit("score_win", score, iduser);
    document.getElementsByClassName("container")[0].style.opacity = "0.35";
    document.getElementById("end-result").textContent = "Bạn đã dành chiến thắng!";
    endmodal.style.display = "flex";
    document.getElementById("endpoint").innerHTML = score_player1.innerHTML;
    endgame.volume(0.5);
    endgame.play();
  }
  else if (parseInt(score_player1.textContent) <  parseInt(score_player2.textContent)){
    socket.emit("score_lose", score, iduser);
    document.getElementsByClassName("container")[0].style.opacity = "0.35";
    document.getElementById("end-result").textContent = "Bạn đã thua!";
    endmodal.style.display = "flex";
    document.getElementById("img-model-ava").src = "/assets/img/lose_rain.gif";
    document.getElementById("endpoint").innerHTML = score_player1.innerHTML;
    endgame_lose.volume(0.5);
    endgame_lose.play();
  }
  else {
    socket.emit("score_draw", score, iduser);
    document.getElementsByClassName("container")[0].style.opacity = "0.35";
    document.getElementById("end-result").textContent = "OMG! Bạn đã vô tình hòa đối thủ!";
    endmodal.style.display = "flex";
    document.getElementById("endpoint").innerHTML = score_player1.innerHTML;
    endgame.volume(0.5);
    endgame.play();
  }
  
})
home.addEventListener('click', (e)=>{
  socket.emit("render_home", iduser);

})
home1.addEventListener('click', (e)=>{
  console.log(userid.dataset);
  socket.emit("render_home", iduser);
})

back.addEventListener('click', (e)=> {
  socket.emit("render_home", iduser);
})

