import * as GTP from "/scripts/GuessThePhrase.js";

let isTimer = false;
let SecondsMax = 20
let seconds = SecondsMax;

export function StartFinalGuessTimer()
{
    setTimeout(FinalGuessTimeOut, 1000);
    isTimer = true;

}
function FinalGuessTimeOut()
{
    document.getElementById("Timer").innerText = "..." + seconds
    if(seconds <= 0)
    {
        StopTimer();
        GTP.GuessWrong();
        console.log("seconds done: ");
        //GTP.checkTimer("Timer");
    }
    else
    {
        setTimeout( Seconds, 1100);
        console.log("seconds: "+ seconds);
    }
}
function Seconds()
{
    if(isTimer)
    {
        seconds--
         FinalGuessTimeOut()
    }
}

export function StopTimer()
{   
    isTimer = false;
    seconds = SecondsMax
    document.getElementById("Timer").innerText = "" 
}
