// Get the modal
var modal_thuong = document.getElementById("team_modal_thuong");
var modal_xep_hang = document.getElementById("team_modal_xep_hang");

// Get the button that opens the modal
var text_thuong = document.getElementById("cd_thuong");
var text_xep_hang = document.getElementById("cd_xep_hang");
//var playbtn = document.getElementsById("asd");

// Get the <span> element that closes the modal
var span_thuong = document.getElementsByClassName("return_thuong")[0];
var span_xep_hang = document.getElementsByClassName("return_xep_hang")[0];

// When the user clicks the button, open the modal 
text_thuong.onclick = function() {
  modal_thuong.style.display = "flex";
}
text_xep_hang.onclick = function() {
  modal_xep_hang.style.display = "flex";
}
// playbtn.onclick = function() {
//   modal_thuong.style.display = "flex"
// }

// When the user clicks on <span> (TRỞ LẠI), close the modal
span_thuong.onclick = function() {
  modal_thuong.style.display = "none";
}
span_xep_hang.onclick = function() {
  modal_xep_hang.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal_thuong) {
    modal_thuong.style.display = "none";
  }
  if (event.target == modal_xep_hang) {
    modal_xep_hang.style.display = "none";
  }
}