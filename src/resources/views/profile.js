
let sub = true;
let icon_nar = document.getElementById("icon_nar");
document.getElementById("username").onclick = function()
{

  if (sub === true)
  {
    icon_nar.textContent = "keyboard_arrow_down";
    subnav.style.display = "flex";
    sub = false;
  }
  else
  {
    icon_nar.textContent = "keyboard_arrow_up";
    subnav.style.display = "none";
    sub = true;
  }
}

var progressBarInner = document.querySelector('.progress-bar-inner');
// Lấy phần tử span chứa phần trăm
var progressBarLabel = document.querySelector('.progress-bar-label');
// Hàm cập nhật thanh kinh nghiệm từ dữ liệu trong progress-bar-label
function updateProgressBarFromLabel() {
  var labelContent = progressBarLabel.textContent;
  var parts = labelContent.split('/');
  var value = parseInt(parts[0]);
  var max = parseInt(parts[1]);
  value = Math.min(value, max);
  var percent = (value / max) * 100;
  progressBarInner.style.width = percent + '%';
}

var song = new Howl({
  src: ['/assets/sound/toothless.mp3'],
  loop: true
})
song.volume(document.getElementById("vlInput").value);
document.getElementsByClassName("div_gif")[0].onclick = function()
{
  if(song.playing())
  {
    song.pause();
  }
  else
  {
    song.play();
  }
}

updateProgressBarFromLabel();

if (document.getElementById("empty").textContent == "0"){
  document.getElementById("submit").style.display = "none";
}

let modal = document.getElementById("team_modal")
let name_modal = document.getElementById("change_username_modal");
let deleteuser_modal = document.getElementById("deleteuser_modal");
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
  if (event.target === name_modal) {
    name_modal.style.display = "none";
  }
  if (event.target === deleteuser_modal) {
    deleteuser_modal.style.display = "none";
  }
}

document.querySelector(".up_song_user").onclick = function()
{
  document.querySelector("#team_modal").style.display = "flex";
  document.querySelector(".modal_update_song").style.display = "flex";
}

document.querySelector(".delete_of_user").onclick = function()
{
  document.querySelector("#deleteuser_modal").style.display = "flex";
  document.querySelector(".modal_deleteuser").style.display = "flex";
}

document.querySelector("#Not").onclick = function(e)
{
  e.preventDefault();
  document.querySelector("#deleteuser_modal").style.display = "none";
  document.querySelector(".modal_deleteuser").style.display = "none";
}

document.querySelector("#user_logo").onclick = function()
{
  document.querySelector("#change_username_modal").style.display = "flex";
  document.querySelector(".modal_change_username").style.display = "flex";
}



document.getElementById("audioFile").addEventListener("change", function() {
  if (this.files[0].size > 500000) {
    alert("Kích thước tệp phải nhỏ hơn 500KB.");
    this.value = ""; // Xóa lựa chọn tệp
  }
});