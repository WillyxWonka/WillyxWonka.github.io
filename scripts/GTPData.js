
let phrasehint = document.getElementById("Phrase");
let WBScale = 0;
let BankType = 0;

const Fruit = ["apple", "banana", "orange", "mango", "strawberry", "blueberry", "grape", "pineapple", 
"watermelon", "kiwi", "peach", "pear", "cherry", "raspberry", "blackberry", "lemon", "lime", "grapefruit", 
"papaya", "cranberry", "apricot", "plum", "guava", "fig", "avocado", "coconut", "pomegranate", "passionfruit", 
"lychee", "dragonfruit", "tangerine", "clementine", "persimmon", "elderberry", "huckleberry", "boysenberry", "nectarine", 
"cantaloupe", "honeydewmelon", "starfruit", "jackfruit", "gooseberry", "mulberry", "quince", "date", "blackcurrant", 
"redcurrant", "kiwifruit", "plantain", "ackee"]
const vegetables = ["carrot", "broccoli", "potato", "tomato", "cucumber", "lettuce", "spinach", "zucchini", "pepper", 
"onion", "garlic", "celery", "asparagus", "eggplant", "peas", "corn", "greenbean", "cauliflower", "cabbage", "radish", 
"beet", "squash", "sweetpotato", "mushroom", "brusselsprout", "kale", "turnip", "okra", "leek", "artichoke", "rhubarb", 
"pumpkin", "chard", "collardgreens", "bokchoy", "fennel", "parsnip", "endive", "watercress", "arugula", 
"radicchio", "chives", "shallot", "scallion"]
const Activities = ["reading", "writing", "painting", "drawing", "gardening", "cooking", "baking", "photography", "hiking", 
"running", "cycling", "swimming", "Tennis","birdwatching", "knitting", "sewing", "sculpting","fishing", "videogames", "crafting", 
"pottery", "calligraphy", "origami", "dancing", "gambling", "surfing", "skateboarding", "photography", "Guitar", "Piano" ]
const Colors = ["chartreuse", "aubergine", "periwinkle", "mauve", "cerulean", "vermilion", "cinnabar", "ochre", "sepia",
"taupe", "indigo", "saffron", "teal", "marigold", "lilac", "tangerine", "lavender", "fandango", "verdigris", "amethyst", 
"topaz", "fawn", "russet", "sapphire", "azure", "fuchsia", "carmine", "cobalt", "garnet", "jade", "plum", "magenta", "red", 
"blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black", "white", "beige", "turquoise", "teal", "violet",
 "maroon", "gold", "silver"]
const Animals= [  "lion", "elephant", "giraffe", "kangaroo", "panda", "hippopotamus", "koala", "penguin", "platypus", 
"meerkat", "panda", "sloth", "ostrich", "armadillo", "wallaby", "aardvark", "raccoon", "chameleon", "porcupine", "lemur", 
"wombat", "capybara", "narwhal", "manatee", "ayeaye", "fox", "axolotl", "pangolin", "mantis", "coelacanth", "tuatara", "tiger", "leopard", 
"peacock", "spider", "shark", "wolf", "serval","dog", "cat", "horse", "cow", "sheep", "chicken", "duck", "goose", "pig", "rabbit", "hamster", 
"parrot", "goldfish", "turtle", "mouse", "frog", "bee", "butterfly", "ant", "eagle", "sparrow", "dolphin", "whale", "seagull", "octopus", "jellyfish",
 "seahorse", "seal", "otter", "bear", "zebra", "cheetah", "gorilla"]
const EasyFruit= ["apple", "banana", "orange", "mango", "strawberry", "blueberry", "grape", "pineapple", "watermelon",
 "kiwi", "peach", "pear", "cherry", "raspberry", "blackberry", "lemon", "lime", "grapefruit", "cranberry"]
const MediumFruit = ["apricot", "plum", "guava", "fig", "avocado", "coconut", "pomegranate", "papaya", "passionfruit", 
"lychee", "tangerine", "clementine", "huckleberry", "nectarine",]
const HardFruit = ["cantaloupe", "honeydewmelon", "starfruit", "jackfruit", "gooseberry", "mulberry", "quince", "date", "blackcurrant", 
"redcurrant", "kiwifruit", "plantain", "ackee" , "elderberry", "boysenberry", "dragonfruit", "persimmon"]

const EasyVegetables = ["carrot", "broccoli", "potato", "tomato", "cucumber", "lettuce", "spinach", "pepper", 
"onion", "garlic", "celery", "eggplant", "peas", "corn", "greenbean", "cabbage", "radish" ]
const MediumVegetables =["beet", "squash", "mushroom", "kale", "turnip", "leek", "cauliflower",
"pumpkin", "chard", "bokchoy", "fennel", "parsnip", "arugula","asparagus" , "zucchini"]
const HardVegetables = ["radicchio", "chives", "shallot", "scallion", "okra", "rhubarb","watercress", "endive", "parsnip","collardgreens", "brusselsprout",
"artichoke"]

const EasyColors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black", "white"
, "teal", "violet", "maroon", "gold", "silver"]
const MediumColors =["indigo", "sapphire", "cobalt", "magenta", "lilac", "lavender", 
"tangerine", "beige", "jade", "plum", "chartreuse", "teal", "azure", "turquoise"]
const HardColors = [ "topaz", "verdigris", "amethyst", "ochre", "sepia", "taupe", "cinnabar", "vermilion",
 "periwinkle", "mauve", "cerulean", "garnet","aubergine", "carmine", "fawn", "fandango","marigold", "fuchsia"]  

 const EasyActivities = ["baking","reading", "swimming", "cooking", "hiking", "painting", "music", "fishing",
 "yoga", "dancing", "cycling", "drawing"]
const MediumActivities =["gardening", "photography", "bouldering", "archery","skydiving",
"astronomy", "juggling", "woodworking", "videogames", "camping", "singing", "gambling","wrestling"]
const HardActivities = ["kiteboarding","geocaching", "calligraphy", "falconry", "beekeeping", "basketweaving","larping", "origami", "glassblowing","capoeira"]  

const EasyAnimals = ["lion", "koala",  "panda", "sloth", "fox", "tiger", "leopard", 
"peacock", "spider", "shark", "wolf","dog", "cat", "horse", "cow", "sheep", "chicken", "duck", "goose", "pig", "rabbit", "hamster", "turtle", "mouse",
 "frog", "bee", "butterfly", "ant", "whale","seal", "bear", ]
const MediumAnimals =["elephant", "giraffe", "kangaroo", "meerkat", "ostrich", "porcupine","lemur","mantis","seahorse", "zebra", "cheetah", "gorilla"
, "seagull", "octopus", "jellyfish","eagle", "sparrow", "dolphin", "otter","penguin","parrot", "goldfish"]
const HardAnimals = ["hippopotamus","platypus", "armadillo", "wallaby", "aardvark","chameleon", "wombat","narwhal", "manatee","axolotl","coelacanth", "tuatara",
, "serval", "capybara"]  
/*
const Easy = []
const Medium =[]
const Hard = []                
*/

const EasyWordBank = [EasyFruit,EasyColors,EasyVegetables, EasyActivities,EasyAnimals];
const MediumWordBank = [MediumFruit,MediumColors,MediumVegetables, MediumActivities,MediumAnimals];
const HardWordBank = [HardFruit,HardColors,HardVegetables, HardActivities, HardAnimals];
const AllWordBank = [Fruit,Colors,vegetables,Activities,Animals]
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
    if(Points <= 3)
    {
        WBScale = 0
    }
    else if(Points <= 6)
    {
        WBScale = 1
    }
    else if(Points <= 9)
    {
        WBScale = 2
    }
    else if(Points >= 10)
    {
        WBScale = 3
    }
    SwitchGenerate(WBScale);
}
function SwitchGenerate(x)
{
    switch(x){
        case 0:
            WordBank = EasyWordBank;
            GeneratePhrase();
            SetHintPhrase(BankType);
            break;
        case 1:
            WordBank = MediumWordBank;
            GeneratePhrase();
            SetHintPhrase(BankType);
            break;
        case 2:
            WordBank = HardWordBank;
            GeneratePhrase();
            SetHintPhrase(BankType);
            break;
        case 3:
            WordBank = AllWordBank;
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