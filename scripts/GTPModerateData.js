
let phrasehint = document.getElementById("Phrase");
let WBScale = 0;
let BankType = 0;


const MediumFruit = ["apricot", "plum", "guava", "fig", "avocado", "coconut", "pomegranate", "papaya", "passionfruit", 
"lychee", "tangerine", "clementine", "huckleberry", "nectarine",]

const MediumVegetables =["beet", "squash", "mushroom", "kale", "turnip", "leek", "cauliflower",
"pumpkin", "chard", "bokchoy", "fennel", "parsnip", "arugula","asparagus" , "zucchini"]


const MediumColors =["indigo", "sapphire", "cobalt", "magenta", "lilac", "lavender", 
"tangerine", "beige", "jade", "plum", "chartreuse", "teal", "azure", "turquoise"]

const MediumActivities =["gardening", "photography", "archery", "camping", "singing", "gambling","wrestling", "yoga", "pottery", 
"karate", "meditation", "rugby", "football"]

const MediumAnimals =["elephant", "giraffe", "kangaroo", "meerkat", "ostrich", "porcupine","lemur","mantis","seahorse", "zebra", "cheetah", "gorilla"
, "seagull", "octopus", "jellyfish","eagle", "sparrow", "dolphin", "otter","penguin","parrot", "goldfish"]

/*
const Easy = []
const Medium =[]
const Hard = []                
*/

const MediumWordBank = [MediumFruit,MediumColors,MediumVegetables, MediumActivities,MediumAnimals];

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
    WBScale = 1
    SwitchGenerate(WBScale);
}
function SwitchGenerate(x)
{
    switch(x){
        case 1:
            WordBank = MediumWordBank;
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