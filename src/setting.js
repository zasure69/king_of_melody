let fl_sound = true, fl_eff = true;

const effectInput = document.getElementById("effectInput");
const musicInput = document.getElementById("musicInput");

if (effectInput.value === "on") {
    fl_eff = true;
    document.getElementById("check_eff").checked = true;
    document.getElementById("text_eff").textContent = "EFFECT ON";
    document.getElementById("icon_eff").textContent = "blur_on";
} else {
    fl_eff = false;
    document.getElementById("check_eff").checked = false;
    document.getElementById("text_eff").textContent = "EFFECT OFF";
    document.getElementById("icon_eff").textContent = "blur_off";
}

if (soundInput.value === "on") {
    fl_sound = true;
    document.getElementById("check_sound").checked = true;
    document.getElementById("text_sound").textContent = "SOUND ON";
    document.getElementById("icon_sound").textContent = "volume_up";
} else {
    fl_sound = false;   
    document.getElementById("check_sound").checked = false;
    document.getElementById("text_sound").textContent = "SOUND OFF";
    document.getElementById("icon_sound").textContent = "volume_off";
}

if (document.getElementById("msVL").value == 0) {
    fl_sound = false;   
    document.getElementById("check_sound").checked = false;
    document.getElementById("text_sound").textContent = "SOUND OFF";
    document.getElementById("icon_sound").textContent = "volume_off";
}
if (document.getElementById("efVL").value == 0) {
    fl_eff = false;
    document.getElementById("check_eff").checked = false;
    document.getElementById("text_eff").textContent = "EFFECT OFF";
    document.getElementById("icon_eff").textContent = "blur_off";
}

document.getElementById("check_sound").onclick = function()
{
    text_sound = document.getElementById("text_sound")
    icon_sound = document.getElementById("icon_sound")
    if(fl_sound === true)
    {
        text_sound.textContent = "SOUND OFF"
        icon_sound.textContent = "volume_off"
        fl_sound = false;
    }
    else 
    {
        text_sound.textContent = "SOUND ON"
        icon_sound.textContent = "volume_up"
        fl_sound = true;
    }
    
}


document.getElementById("check_eff").onclick = function()
{
    text_eff = document.getElementById("text_eff")
    icon_eff = document.getElementById("icon_eff")
    if(fl_eff === true)
    {
        text_eff.textContent = "EFFECT OFF"
        icon_eff.textContent = "blur_off"
        fl_eff = false;
    }
    else 
    {
        text_eff.textContent = "EFFECT ON"
        icon_eff.textContent = "blur_ON"
        fl_eff = true;
    }
}

