// Get the modal
var modal_thuong = document.getElementById("team_modal_thuong");
var modal_xep_hang = document.getElementById("team_modal_xep_hang");
var error_ex = document.getElementById("error_ex");
// var modal_create_room = document.getElementById("team_modal_create_room")

// Get the button that opens the modal
var text_thuong = document.getElementById("cd_thuong");
var text_xep_hang = document.getElementById("cd_xep_hang");
// var create_click = document.getElementById("create_room");
//var username = document.getElementById("username");

// Get the <span> element that closes the modal
var span_thuong = document.getElementsByClassName("return_thuong")[0];
var span_xep_hang = document.getElementsByClassName("return_xep_hang")[0];
// var span_create_room = document.getElementsByClassName("return_create_room")[0];

let create_room = document.getElementById("create_room");
let play_now = document.getElementById("play_now");
let input_roomid = document.getElementById("input_roomid");

function generateRoomId() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}
// When the user clicks the button, open the modal 
text_thuong.onclick = function() {
  modal_thuong.style.display = "flex";
}
text_xep_hang.onclick = function() {
  modal_xep_hang.style.display = "flex";
}

// create_click.onclick = function(){
//   modal_create_room.style.display = "flex";
// }
let sub = true;
let icon_arrow = function(icon){
  icon.classList.toggle('fa-angle-up');
}
document.getElementById("username").onclick = function()
{
  subnav = document.getElementById("subnav");
  if (sub === true)
  {
    subnav.style.display = "flex";
    sub = false;
  }
  else
  {
    subnav.style.display = "none";
    sub = true;
  }
}
create_room.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log('test');
  var roomID = generateRoomId().toString();
  console.log(typeof roomID);
  console.log("hello");
  this.setAttribute("action",`/home/roomcreate/${roomID}`);
  this.submit(); 
})
play_now.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log('test');
  //var roomID = generateRoomId().toString();
  //console.log(typeof roomID);
  console.log("hello");
  this.submit(); 
})
// username.onclick = function(){
//   subnav.style.display = "block";
// }

// When the user clicks on <span> (TRỞ LẠI), close the modal
span_thuong.onclick = function() {
  modal_thuong.style.display = "none";
}
span_xep_hang.onclick = function() {
  modal_xep_hang.style.display = "none";
}
// span_create_room.onclick = function() {
//   modal_create_room.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal_thuong) {
    modal_thuong.style.display = "none";
  }
  if (event.target == modal_xep_hang) {
    modal_xep_hang.style.display = "none";
  }
  // if (event.target == modal_create_room) {
  //   modal_create_room.style.display = "none";
  // }
}