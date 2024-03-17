let fl_sound = true, fl_eff = true, fl_screen = false;
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

document.getElementById("check_screen").onclick = function()
{
    text_screen = document.getElementById("text_screen")
    icon_screen = document.getElementById("icon_screen")
    if(fl_screen === true)
    {
        text_screen.textContent = "FULLSCREEN OFF"
        icon_screen.textContent = "fullscreen_exit"
        fl_screen = false;
    }
    else 
    {
        text_screen.textContent = "FULLSCREEN ON"
        icon_screen.textContent = "fullscreen"
        fl_screen = true;
    }
}
