
import * as GTPD from "/scripts/GTPData.js";
import * as Timer from "/scripts/Timer.js"; 
import * as PS from "/scripts/PointScript.js";

let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let bet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let AnswerCurrent = [];

let int = 0;
const TurnCountMax = 3
let TurnCount = 0;
let Points = 0;
let FreeLetters = 5;
const SelectionMax = 3;
let selectionMax = 0;

let UnavailableLetters = ""
let word = ""; 
let PointCount = "";
let CorrectLetters = "";
let FinalGueassInputFieldIndicator = "";
let selectedLetters = []

onload = GetWordBank()
onload = PageLoad;

function PageLoad()
{
    FinalGueassInputFieldIndicator = document.getElementById("FinalGuessInputFieldIndicator")
    PointCount = document.getElementById("p4");
    CorrectLetters = document.getElementById("CorrectLetters");
    SetAnswerField();
    setLetters();
    PS.CheckPoints(Points);
    document.getElementById("LetterButtonsHeader").innerText = (`Pick ${SelectionMax} Letters`)
}
function GetWordBank(){
    GTPD.GetWordBank(Points);
    word = GTPD.word;
    console.log(word)
}


function SetAnswerField()
{
    AnswerCurrent.length = word.length;
    for(let i = 0; i < word.length; i++)
    {
        AnswerCurrent[i] = "?" 
    }
    CorrectLetters.innerText = AnswerCurrent.join("");
}
function setLetters()
{
    let freeLetters = [];

    for(let i = 0; i < FreeLetters; i++)
    {
        let x = Math.floor(Math.random() * bet.length);
        freeLetters += bet[x];
        bet -= bet[x];

        let y = document.getElementById(freeLetters[i])
        UnavailableLetters += y.id;
        y.disabled = true;

        ChangeButtonDisabled(y);
        updateanswer(freeLetters)
    }
    console.log("free letters this word: " + freeLetters)
    console.log("Unavailable Letters this word: " + UnavailableLetters)
}


window.addEventListener('keydown', (e)=> 
{
    switch(e.key)
    {
        case "Enter":
            document.getElementById('Submitbtn').click()
        return;
        case "Backspace":
            document.getElementById('Undobtn').click()
        return;
    }
    let ekey = e.key.toString().toLowerCase()
    console.log(ekey)
    GetKeyButton(ekey)
})

export function GetKeyButton(key)
{
    let keyButton = document.getElementById(key)
    if(int == 0)
    {
        let x = document.getElementById(key)
        x.click()
    }
    if(int == 1)
    {
        FinalGueassInputFieldIndicator.innerText += keyButton.id
    }

}



export function updateAvailableLetters(input) // updates ingame button and things related to it when it is clicked
{
    if(int == 0 && selectionMax < SelectionMax)
    {

        selectionMax++
        selectedLetters[selectedLetters.length] = input.id; //adds letterbuttoin to the end of selectedletter list/array until submit is selected

        input.disabled = true;
        input.style.borderColor = ("#008000")
        input.style.backgroundColor = ("#acff2f4e")
        document.getElementById("guesswordbtn").disabled = true;
        document.getElementById("generatewordbtn").disabled = true;   
        //vibrate();

    }
}
/*function vibrate() {
    if (!window) {
        return;
    }

    if (!window.navigator) {
        return;
    }

    if (!window.navigator.vibrate) {
        return;
    }

    window.navigator.vibrate([200, 100, 200]);
}*/
function ReactivateLetters(list) //reactivates the letters onscreen button // resets unavailable letters value for new word. 
{                                 
    UnavailableLetters = ""
    
    for(let i = 0; i < list.length; i++) //this is for the undo button
    {
        let x = document.getElementById(list[i])
        ChangeButtonEnabled(x) //changes all letterbuttons border colors back to original
        UnavailableLetters = UnavailableLetters.slice(0, -1) //removes letter sent into function from the end of unavailable letters string
    }
}


export function Undo()
{
    if(selectedLetters[0]) //bool check to make sure array isnt empty
    {
        selectionMax--
        let x = selectedLetters.pop(); 

        x = document.getElementById(x);
        ChangeButtonEnabled(x);

        console.log("Selected Letters "+ selectedLetters);

        if(selectedLetters.length == 0)
        {
            document.getElementById("guesswordbtn").disabled = false;
            document.getElementById("generatewordbtn").disabled = false;
        }
    }
    if(int == 1)//Behaves like a backspace button for finalguessinput
    {
        FinalGueassInputFieldIndicator.innerText = FinalGueassInputFieldIndicator.innerText.slice(0, -1);
    }
}
export function Submit()
{
    if(int == 0) //selecting 2 letters
    {
        UnavailableLetters += selectedLetters.join("") //adds current selected letters to Unavailable letters making them untargetable for undo
        selectedLetters.forEach(element => 
            {
                let x =document.getElementById(element)
                ChangeButtonDisabled(x)
            });
    
        selectedLetters = [] //empties array for new word
        ResetSelecionVal()

        document.getElementById("guesswordbtn").disabled = false;// these have to be above onturnuse function call...
        document.getElementById("generatewordbtn").disabled = false;// these have to be above onturnuse function call...

        onTurnUse();  
        updateanswer(UnavailableLetters);
    }
}


function updateanswer(input)
{
    for(let i = 0; i < input.length; i++)
    {
        for(let j = 0; j < word.length; j++)
        {
            if(input[i] == word[j])
            {
                AnswerCurrent[j] = word[j];
            }
            else
            AnswerCurrent[j] = AnswerCurrent[j];
        }
    }
    CorrectLetters.innerText = AnswerCurrent.join("")
}


export function onTurnUse()
{
    if(TurnCount < TurnCountMax)
    {
        TurnCount++;
        console.log("Turns used: " + TurnCount);
        document.getElementById("p3").innerText = "Turns Used: " +TurnCount+ "/" +TurnCountMax;
    }
    if(TurnCount >= TurnCountMax)
    {
        document.getElementById("guesswordbtn").disabled = true; // this is because user must attemt final answer when max turns are reached
        Timer.StartFinalGuessTimer();
        GuessWordBtn()

    }
}


function ChangeButtonDisabled(input)//these functions are needed for instances where a buttons style is change but is not disabled or enabled to trigger a style change
{
    input.style.borderColor = "#000000";
    input.style.backgroundColor = ("#0000002d")
    input.disabled = true;
}
function ChangeButtonEnabled(input)//these functions are needed for instances where a buttons style is change but is not disabled or enabled to trigger a style change
{
    input.style.borderColor = "#000000";
    input.style.backgroundColor = "#e1efff"
    input.disabled = false;
}
function DisableAllButtons()
{
    alphabet.forEach(element => 
    {
        let x = document.getElementById(element)
        ChangeButtonDisabled(x);
        UnavailableLetters += document.getElementById(element).id

    });
    document.getElementById("Undobtn").disabled = true;
    document.getElementById("Submitbtn").disabled = true;
    document.getElementById("guesswordbtn").disabled = true;   
    document.getElementById("generatewordbtn").disabled = false;   
}
function ChangeBackgroundOriginalcss()
{
    document.getElementById("LetterButtons").style.borderColor = "#000000"
    document.getElementById("LetterButtons").style.background = "#ffeee0"
}
function ResetSelecionVal()
{
    selectionMax = 0;
}


export function check()
{   
    if(FinalGueassInputFieldIndicator.innerText == word && int == 1)
    {
        GuessRight();
    }
    if(FinalGueassInputFieldIndicator.innerText != word && int == 1)
    {
        GuessWrong();
    }

}
export function GuessRight()    
{
    DisableAllButtons()
    
    document.getElementById("Phrase").innerText = "Thats Right!";
    CorrectLetters.innerText = word;

    document.getElementById("generatewordbtn").style.borderColor = "#adff2f"

    document.getElementById("LetterButtons").style.borderColor = "#497900"
    document.getElementById("LetterButtons").style.background = "#adff2f"

    Points ++
    PointCount.innerText = "Points: " + Points
    Timer.StopTimer();
}
export function GuessWrong()
{
    DisableAllButtons()

    document.getElementById("Phrase").innerText = "Wrong!";
    CorrectLetters.innerText = word;

    document.getElementById("LetterButtons").style.borderColor = "#ff0000"
    document.getElementById("LetterButtons").style.background = "#ff8787"
    document.getElementById("generatewordbtn").style.borderColor = "#adff2f"

    Points--;
    PointCount.innerText = "Points: " + Points
    Timer.StopTimer();
    
    if (Points < 10)
    {
        document.getElementById("header").innerText = "Word Decoder!"
    }
}


export function FinalGuessInput(input)
{
    if(int == 1)
    {
        FinalGueassInputFieldIndicator.innerText += input
        console.log(FinalGueassInputFieldIndicator.innerText)
    }
}
function SetFinalGuessInputActive()
{
    FinalGueassInputFieldIndicator.innerText = "";
    //document.getElementById("LetterButtonsHeader").innerText = "FINAL GUESS";

    for(let i = 0; i < UnavailableLetters.length; i++) 
    {   
        let x = document.getElementById(UnavailableLetters[i])
        ChangeButtonEnabled(x);
    }

    if(TurnCount < TurnCountMax)
    {
        document.getElementById("LetterButtons").style.borderColor = "#000000"
        document.getElementById("LetterButtons").style.background = "#c9e2ff"
    }
    else if(TurnCount >= TurnCountMax)
    {
        document.getElementById("LetterButtons").style.borderColor = "#ff0000"
    }
}


export function GuessWordBtn()
{ 
    if(int == 0 && selectedLetters.length == 0) // sets final guess state
    {
        int = 1;

        document.getElementById("guesswordbtn").innerText = ("Return");
        document.getElementById("generatewordbtn").disabled = true;
        
        SetFinalGuessInputActive()
        return;
    }
    if(int == 1) //sets original state
    {
        int = 0;

        document.getElementById("guesswordbtn").innerText = ("Guess Word");
        document.getElementById("guesswordbtn").style.fontWeight = ""
        document.getElementById("LetterButtonsHeader").innerText = (`Pick ${SelectionMax} Letters`)
        
        ChangeBackgroundOriginalcss();

        for(let i = 0; i < UnavailableLetters.length; i++)
        {
         ChangeButtonDisabled(document.getElementById(UnavailableLetters[i]));
        }
        document.getElementById("generatewordbtn").disabled = false;
        return;
    }
}
export function GenerateNewWord() //new word button
{
    if(selectedLetters.length == 0)
    {
        bet = alphabet;

        selectedLetters = [] //empties array for new word

        ChangeBackgroundOriginalcss();
        ReactivateLetters(UnavailableLetters)
        Timer.StopTimer();
    
        CorrectLetters.style.backgroundColor = "";
        FinalGueassInputFieldIndicator.innerText = "..."
        document.getElementById("LetterButtonsHeader").innerText = (`Pick ${SelectionMax} Letters`)

        document.getElementById("guesswordbtn").disabled = false;
        document.getElementById("Undobtn").disabled = false;
        document.getElementById("Submitbtn").disabled = false;
        document.getElementById("generatewordbtn").style.borderColor = ""
        
        if(int == 1){ GuessWordBtn();}
    
        TurnCount = 0;
        document.getElementById("p3").innerText = "Turns Used: " +TurnCount+ "/" +TurnCountMax;

        FreeLetters = PS.CheckPoints(Points);  // These need to be called first when new word id pressed or free letters are worong
        PS.CheckPoints(Points);

        GetWordBank();
        SetAnswerField();
        setLetters();
    }

}
