let FreeLetters = 0;
export function CheckPoints(Points)
{
    let Difficulty = document.getElementById("p5");
    if(Points <= -3)
    {
        FreeLetters = 7
        Difficulty.innerText = "Difficulty: Very Easy"
    }
    if(Points >= 0)
    {
        FreeLetters = 5;
        Difficulty.innerText = "Difficulty: Easy"
        Difficulty.style.color = "#008000"
    }
    if(Points >= 3)
    {
        FreeLetters = 4;
        Difficulty.innerText = "Difficulty: Moderate"
        Difficulty.style.color = "#8B8000"
    }
    if(Points >=7)
    {
        FreeLetters = 3
        Difficulty.innerText = "Difficulty: Challenging"
        Difficulty.style.color = "#ff0000"
    }
    if(Points >=10)
    {
        FreeLetters = 2
        Difficulty.innerText = "Difficulty: ALL"
        Difficulty.style.color = "#9090ff"
        document.getElementById("header").innerText = ("CONGRATULATIONS! You beat the Word Decoder alpha. All word difficulties are now possible, Good Luck!")
        Difficulty.innerText = "Difficulty: All"
    }
    return(FreeLetters)
}