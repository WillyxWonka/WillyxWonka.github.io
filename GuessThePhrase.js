
const Fruit = ["apple", "banana", "orange", "mango", "strawberry", "blueberry", "grape", "pineapple", 
"watermelon", "kiwi", "peach", "pear", "cherry", "raspberry", "blackberry", "lemon", "lime", "grapefruit", 
"papaya", "cranberry", "apricot", "plum", "guava", "fig", "avocado", "coconut", "pomegranate", "passionfruit", 
"lychee", "dragonfruit", "tangerine", "clementine", "persimmon", "elderberry", "huckleberry", "boysenberry", "nectarine", 
"cantaloupe", "honeydewmelon", "starfruit", "jackfruit", "gooseberry", "mulberry", "quince", "date", "blackcurrant", 
"redcurrant", "kiwifruit", "plantain", "ackee"]
const vegetables = ["carrot", "broccoli", "potato", "tomato", "cucumber", "lettuce", "spinach", "zucchini", "pepper", 
"onion", "garlic", "celery", "asparagus", "eggplant", "peas", "corn", "greenbean", "cauliflower", "cabbage", "radish", 
"beet", "squash", "sweetpotato", "mushroom", "brusselsprout", "kale", "turnip", "okra", "leek", "artichoke", "rhubarb", 
"pumpkin", "butternutsquash", "chard", "collardgreens", "bokchoy", "fennel", "parsnip", "endive", "watercress", "arugula", 
"radicchio", "chives", "shallot", "scallion"]
const Activities = ["reading", "writing", "painting", "drawing", "gardening", "cooking", "baking", "photography", "hiking", 
"running", "cycling", "swimming", "Tennis","birdwatching", "knitting", "sewing", "sculpting","fishing", "videogames", "crafting", 
"pottery", "calligraphy", "origami", "dancing", "gambling", "surfing", "skateboarding", "photography", "Guitar", "Piano" ]
const Colors = ["chartreuse", "aubergine", "periwinkle", "mauve", "cerulean", "vermilion", "cinnabar", "ochre", "sepia",
"taupe", "indigo", "saffron", "teal", "marigold", "lilac", "tangerine", "lavender", "fandango", "verdigris", "amethyst", 
"topaz", "fawn", "russet", "sapphire", "azure", "fuchsia", "carmine", "cobalt", "garnet", "jade", "plum", "magenta", "red", 
"blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black", "white", "beige", "turquoise", "teal", "violet",
 "maroon", "gold", "silver"]
const WordBank = [Fruit, vegetables, Activities, Colors]
let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

let AnswerCurrent = [];
let LettersUsed = [];

let int = 0;
let TurnCountMax = 3
let TurnCount = 0;
let Points = 0;
let rand = "";
let txt;
let word = ""; 
let PointCount = "";
let AnswerGuessText ="";
let GuideText = "";
let CorrectLetters = "";
let phrasehint = "";
let AvailableLetters = "";


onload = GeneratePhrase();
onload = PageLoad;

/*Generates phrase from a databank eventually with hint like wheel of fortune/hangman*/
function GeneratePhrase()
{
    rand = Math.floor(Math.random() * WordBank.length);

    const chosenwordbank = WordBank[rand];
    const randomnum = Math.floor(Math.random() * chosenwordbank.length);

    console.log(chosenwordbank[randomnum]);
    word = chosenwordbank[randomnum];

}
function PageLoad()
{
    phrasehint = document.getElementById("Phrase");
    txt = document.getElementById("TxtInput");
    PointCount = document.getElementById("p4");
    CorrectLetters = document.getElementById("CorrectLetters");
    LettersUsed = document.getElementById("LettersUsed");
    GuideText = document.getElementById("p1");
    AnswerGuessText = document.getElementById("WinnerWinner");
    AvailableLetters = document.getElementById("alphabet");
    AnswerGuessText.disabled = true;
    AnswerGuessText.style.opacity = 0;

    SetAnswerField();
    SetHintPhrase(rand);
    FreeLetters();

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
function SetHintPhrase(rand)
{
    switch(rand){
        case 0:
            phrasehint.innerText = ("Guess the Fruit!")
            break;
        case 1:
            phrasehint.innerText = ("Guess the Vegetable!")
            break;
        case 2:
            phrasehint.innerText = ("Guess the Activity/Hobby!")
            break;
        case 3:
            phrasehint.innerText = ("Guess the Color!")
            break;
    }
}
function FreeLetters()
{
    let randomCharacter = [];

    for(let i = 0; i < 3; i++)
    {
        let x = Math.floor(Math.random() * alphabet.length);
        randomCharacter += alphabet[x];
        alphabet.splice(x, 1);
    }
    console.log("random free characters:" + randomCharacter)
    AvailableLetters.innerText = alphabet;
    updateanswer(randomCharacter);
    LettersUsed.innerText += randomCharacter;

}
function UserGuess(Usertxt)
{
    let usertext = Usertxt.value.toLowerCase();
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
function onTurnUse()
{
    if(event.keyCode === 13 && TurnCount < TurnCountMax)
    {
        txt.value = ""
        TurnCount++;
        console.log("Turns used: " + TurnCount);
        document.getElementById("p3").innerText = "Turns Used:\n " +TurnCount+ "/" +TurnCountMax;
    }
    if(TurnCount >= TurnCountMax)
    {
        txt.disabled = true;
        console.log("max input disabled");
        txt.style.opacity = 0;
        EnableFinalGuess();
    }
}
function EnableFinalGuess()
{
    p1.innerText = "FINAL GUESS!"
    
    AnswerGuessText.disabled = false;
    AnswerGuessText.style.opacity = 100;

}
function check(guess)
{
    const wordtolower = guess.value.toLowerCase();

    if(event.keyCode === 13 && wordtolower == word)
    {
        document.getElementById("Phrase").innerText = "Thats Right!";
        CorrectLetters.innerText = word;
        CorrectLetters.style.backgroundColor= "#adff2f";

        document.getElementById("guesswordbtn").disabled = true;
        document.getElementById("generatewordbtn").style.borderColor = "#adff2f"
        Points++;
        PointCount.innerText = "Points:\n " + Points
    }
    if(event.keyCode === 13 && wordtolower != word)
    {
        document.getElementById("Phrase").innerText = "Wrong!";
        CorrectLetters.innerText = word;
        CorrectLetters.style.backgroundColor = "#ff0000";

        AnswerGuessText.disabled = true;
        document.getElementById("guesswordbtn").disabled = true;
        document.getElementById("generatewordbtn").style.borderColor = "#adff2f"
        Points--;
        PointCount.innerText = "Points:\n " + Points
    }
}

function GuessWordBtn()
{
    if(int == 0)
    {
        int = 1;
        document.getElementById("guesswordbtn").innerText = ("Return");
        document.getElementById("guesswordbtn").style.backgroundColor = "#ff0000"
        document.getElementById("guesswordbtn").style.fontWeight = "bold"

        txt.disabled = true;

        txt.style.opacity = 0;
        txt.value = "";
    
        AnswerGuessText.disabled = false;
        AnswerGuessText.style.opacity = 100;
        return;
    }
     if(int == 1)
    {
        int = 0;
        document.getElementById("guesswordbtn").innerText = ("Guess Word");
        document.getElementById("guesswordbtn").style.backgroundColor = "#adff2f"
        document.getElementById("guesswordbtn").style.fontWeight = ""

        
        txt.disabled = false;

        txt.style.opacity = 100;
        txt.value = "";
    
        AnswerGuessText.disabled = true;
        AnswerGuessText.style.opacity = 0;
        return;
    }
}

function GenerateNewWord()
{
    let bet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    alphabet = bet;

    GuideText.innerText = "Pick 2 letters"
    LettersUsed.innerText ="";
    CorrectLetters.style.backgroundColor = "";
    document.getElementById("guesswordbtn").disabled = false;
    document.getElementById("generatewordbtn").style.borderColor = ""
    
    if(int == 1)
    {
        GuessWordBtn();
    }

    TurnCount = 0;
    document.getElementById("p3").innerText = "Turns Used:\n " +TurnCount+ "/" +TurnCountMax;

    txt.disabled = false;
    txt.style.opacity = 100;
    txt.value = "";

    AnswerGuessText.disabled = true;
    AnswerGuessText.style.opacity = 0;

    GeneratePhrase();
    SetAnswerField();
    SetHintPhrase(rand);
    FreeLetters();
}