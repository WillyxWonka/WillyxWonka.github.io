
import * as GTPD from "/scripts/GTPData.js";
import * as NCC from "/scripts/NonCoreCode.js"; 
let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let AnswerCurrent = [];
let LettersUsed = [];

let int = 0;
let TurnCountMax = 3
let TurnCount = 0;
let Points = 0;
let FL = 5;

let rand = "";
let UserText;
let word = ""; 
let PointCount = "";
let AnswerGuessText ="";
let GuideText = "";
let CorrectLetters = "";
let AvailableLetters = "";
let UserInputfieldIndicator = "";
let FinalGueassInputFieldIndicator = "";

onload = GetWordBank()//GeneratePhrase();
onload = PageLoad;
function PageLoad()
{
    UserInputfieldIndicator = document.getElementById("InputFieldIndicator");
    FinalGueassInputFieldIndicator = document.getElementById("FinalGuessInputFieldIndicator")
    UserText = document.getElementById("UserInput");
    AnswerGuessText = document.getElementById("FinalGuessInput");
    PointCount = document.getElementById("p4");
    CorrectLetters = document.getElementById("CorrectLetters");
    LettersUsed = document.getElementById("LettersUsed");
    GuideText = document.getElementById("p1");
    AvailableLetters = document.getElementById("alphabet");
    AnswerGuessText.disabled = true;
    AnswerGuessText.style.opacity = 0;

    SetAnswerField();
    SetLetters();
    SetUserInputActive();
    CheckPoints(Points);
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
        AnswerCurrent[i] = "[?]" 
    }
    CorrectLetters.innerText = AnswerCurrent.join("");
}

function SetLetters()
{
    let randomCharacter = [];

    for(let i = 0; i < FL; i++)
    {
        let x = Math.floor(Math.random() * alphabet.length);
        randomCharacter += alphabet[x];
        alphabet.splice(x, 1);
    }
    console.log("random free characters:" + randomCharacter)

    AvailableLetters.innerText = alphabet;
    LettersUsed.innerText += randomCharacter;

    updateanswer(randomCharacter);
}


export function UserGuess(input)
{
    let usertext = input.value.toLowerCase();

    if(event.keyCode === 13 && TurnCount < TurnCountMax)
    {
        LettersUsed.innerText += usertext;
        UpdateAvailableLetters(usertext)
        updateanswer(usertext)
    } 
}
function UpdateAvailableLetters(input)
{
    for(let i = 0; i < input.length; i++)
    {
        for(let j = 0; j < alphabet.length; j++)
        {
            if(input[i] == alphabet[j])
            {     
                alphabet.splice(j, 1);
            }
        }
    }
    AvailableLetters.innerText = alphabet;
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
    if(event.keyCode === 13 && TurnCount < TurnCountMax)
    {
        UserText.value = ""
        UserText.blur();
        TurnCount++;
        console.log("Turns used: " + TurnCount);
        document.getElementById("p3").innerText = "Turns Used: " +TurnCount+ "/" +TurnCountMax;
    }
    if(TurnCount >= TurnCountMax)
    {
        UserText.blur();
        document.getElementById("guesswordbtn").disabled = true;
        SetFinalGuessInputActive();
    }
}
export function check(guess)
{
    const wordtolower = guess.value.toLowerCase();
    if(event.keyCode === 13 && wordtolower == word)
    {
        guess.value = ""
        guess.blur();
        document.getElementById("Phrase").innerText = "Thats Right!";
        CorrectLetters.innerText = word;
        CorrectLetters.style.backgroundColor= "#adff2f";

        document.getElementById("guesswordbtn").disabled = true;
        document.getElementById("generatewordbtn").style.borderColor = "#adff2f"
        Points ++
        PointCount.innerText = "Points: " + Points
    }
    if(event.keyCode === 13 && wordtolower != word)
    {
        guess.value = ""
        guess.blur();
        document.getElementById("Phrase").innerText = "Wrong!";
        CorrectLetters.innerText = word;
        CorrectLetters.style.backgroundColor = "#ff0000";

        AnswerGuessText.disabled = true;
        document.getElementById("guesswordbtn").disabled = true;
        document.getElementById("generatewordbtn").style.borderColor = "#adff2f"
        Points--;
        PointCount.innerText = "Points: " + Points
        if (Points < 10)
        {
            document.getElementById("header").innerText = "Word Decoder!"
        }
    }
}


function SetUserInputActive() //also sets final guess "inactive"
{
    UserInputfieldIndicator.innerText = "Your Letters Here."
    FinalGueassInputFieldIndicator.innerText = ""
    GuideText.innerText = `Pick 2 letters`

    UserText.disabled = false;
    UserText.style.opacity = 100;
    UserText.value = "";
    AnswerGuessText.value = "";

    AnswerGuessText.disabled = true;
    AnswerGuessText.style.opacity = 0;

}
function SetFinalGuessInputActive() //also sets user guess "inactive"
{
    FinalGueassInputFieldIndicator.innerText = "Final Guess Here"
    UserInputfieldIndicator.innerText = ""
    p1.innerText = "FINAL GUESS"

    UserText.disabled = true;
    UserText.style.opacity = 0;
    UserText.value = "";
    AnswerGuessText.value = "";

    AnswerGuessText.disabled = false;
    AnswerGuessText.style.opacity = 100;
}


export function GuessWordBtn()
{
    if(int == 0)
    {
        int = 1;
        document.getElementById("guesswordbtn").innerText = ("Return");
        document.getElementById("guesswordbtn").style.backgroundColor = "#ff0000"
        document.getElementById("guesswordbtn").style.fontWeight = "bold"
        SetFinalGuessInputActive()
        return;
    }
     if(int == 1)
    {
        int = 0;
        document.getElementById("guesswordbtn").innerText = ("Guess Word");
        document.getElementById("guesswordbtn").style.backgroundColor = "#adff2f"
        document.getElementById("guesswordbtn").style.fontWeight = ""
        SetUserInputActive();
        return;
    }
}


function CheckPoints(Points)
{
    let Difficulty = document.getElementById("p5");
    if(Points <= -3)
    {
        FL = 7
        Difficulty.innerText = "Difficulty: Very Easy"
    }
    if(Points >= 0)
    {
        FL = 5;
        Difficulty.innerText = "Difficulty: Easy"
        Difficulty.style.color = "#008000"
    }
    if(Points >= 3)
    {
        FL = 4;
        Difficulty.innerText = "Difficulty: Moderate"
        Difficulty.style.color = "#8B8000"
    }
    if(Points >=7)
    {
        FL = 3
        Difficulty.innerText = "Difficulty: Challenging"
        Difficulty.style.color = "#ff0000"
    }
    if(Points >=10)
    {
        FL = 2
        Difficulty.innerText = "Difficulty: ALL"
        Difficulty.style.color = "#9090ff"
        document.getElementById("header").innerText = ("CONGRATULATIONS! You beat the Word Decoder alpha. All word difficulties are now possible, Good Luck!")
        Difficulty.innerText = "Difficulty: All"
    }

}
export function GenerateNewWord()
{
    let bet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    alphabet = bet;

    LettersUsed.innerText = ""; 
    CorrectLetters.style.backgroundColor = "";
    document.getElementById("guesswordbtn").disabled = false;
    document.getElementById("generatewordbtn").style.borderColor = ""
    
    if(int == 1){ GuessWordBtn();}

    TurnCount = 0;
    document.getElementById("p3").innerText = "Turns Used: " +TurnCount+ "/" +TurnCountMax;

    CheckPoints(Points);
    SetUserInputActive();
    GetWordBank();
    SetAnswerField();
    SetLetters();
}