
let phrasehint = document.getElementById("Phrase");
let WBScale = 0;
let BankType = 0;

const HardFruit = ["cantaloupe", "honeydewmelon", "starfruit", "jackfruit", "gooseberry", "mulberry", "quince", "date", "blackcurrant", 
"redcurrant", "kiwifruit", "plantain", "ackee" , "elderberry", "boysenberry", "dragonfruit", "persimmon"]

const HardVegetables = ["radicchio", "chives", "shallot", "scallion", "okra", "rhubarb","watercress", "endive", "parsnip","collardgreens", "brusselsprout",
"artichoke"]

const HardColors = [ "topaz", "verdigris", "amethyst", "ochre", "sepia", "taupe", "cinnabar", "vermilion",
 "periwinkle", "mauve", "cerulean", "garnet","aubergine", "carmine", "fawn", "fandango","marigold", "fuchsia", "chartreuse"]  

 const HardActivities = ["calligraphy", "falconry", "beekeeping", "basketweaving","larping", "origami", "glassblowing",
 "capoeira", "scubadiving", "parkour", "bungeejumping", "basejumping", "hanggliding", "videogames", "bouldering","astronomy", 
 "tabletennis"]  

const HardAnimals = ["hippopotamus","platypus", "armadillo", "wallaby", "aardvark","chameleon", "wombat","narwhal", "manatee","axolotl","coelacanth", "tuatara",
, "serval", "capybara", "liger"]  
/*
const Easy = []
const Medium =[]
const Hard = []                
*/
const HardWordBank = [HardFruit,HardColors,HardVegetables, HardActivities, HardAnimals];
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
    WBScale = 2
    SwitchGenerate(WBScale);
}
function SwitchGenerate(x)
{
    switch(x){
        case 2:
            WordBank = HardWordBank;
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