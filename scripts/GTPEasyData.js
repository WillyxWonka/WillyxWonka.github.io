
let phrasehint = document.getElementById("Phrase");
let WBScale = 0;
let BankType = 0;

const EasyFruit= ["apple", "banana", "orange", "mango", "strawberry", "blueberry", "grape", "pineapple", "watermelon",
 "kiwi", "peach", "pear", "cherry", "raspberry", "blackberry", "lemon", "lime", "grapefruit", "cranberry"]

const EasyVegetables = ["carrot", "broccoli", "potato", "tomato", "cucumber", "lettuce", "spinach", "pepper", 
"onion", "garlic", "celery", "eggplant", "peas", "corn", "greenbean", "cabbage", "radish" ]

const EasyColors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black", "white"
,"violet", "maroon", "gold", "silver"]

 const EasyActivities = ["baking","reading", "swimming", "cooking", "hiking", "painting", "music", "fishing",
 "yoga", "dancing", "cycling", "drawing"]

const EasyAnimals = ["lion", "koala",  "panda", "sloth", "fox", "tiger", "leopard", 
"peacock", "spider", "shark", "wolf","dog", "cat", "horse", "cow", "sheep", "chicken", "duck", "goose", "pig", "rabbit", "hamster", "turtle", "mouse",
 "frog", "bee", "butterfly", "ant", "whale","seal", "bear", ]

/*
const Easy = []
const Medium =[]
const Hard = []                
*/

const EasyWordBank = [EasyFruit,EasyColors,EasyVegetables, EasyActivities,EasyAnimals];
let WordBank = [];

export let word = "";

 function GeneratePhrase()
{
    BankType = Math.floor(Math.random() * WordBank.length);
    const chosenwordbank = WordBank[BankType];
    const randomnum = Math.floor(Math.random() * chosenwordbank.length);
    word = chosenwordbank[randomnum];
}
export function GetWordBank(Points)
{
    WBScale = 0
    SwitchGenerate(WBScale);
}
function SwitchGenerate(x)
{
    switch(x)
    {
        case 0:
            WordBank = EasyWordBank;
            GeneratePhrase();
            SetHintPhrase(BankType);
            break;

    }
}
export function SetHintPhrase(x)
{
    switch(x){
        case 0:
            phrasehint.innerText = ("Guess the Fruit!")
            break;
        case 1:
            phrasehint.innerText = ("Guess the Color!")

            break;
        case 2:
            phrasehint.innerText = ("Guess the Vegetable!")

            break;
        case 3:
            phrasehint.innerText = ("Guess the Activity/Hobby!")
            break;
        case 4:
            phrasehint.innerText = ("Guess the Animal!")
    }
}