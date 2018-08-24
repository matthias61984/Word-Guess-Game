// SET ALL GLOBAL VARIABLES
// Array defining playable words
var wordBank = [
    'pansearedsalmon',
    'mushroomrisotto',
    'beefwellington',
    'searedscallops',
    'shepherdspie',
    'englishrarebit',
    'lobsterravioli',
    'bangersandmash',
    'fishandchips',
    'yorkshirepudding'
];
// Chooses random word from wordBank
var randomize = Math.floor(Math.random()*wordBank.length);
// Stores random word from wordBank in variable
var wordToGuess = wordBank[randomize];
// Set empty array that will contain the current word
var wordToGuessArr = [];
// Defines empty array that will hold incorrectly guessed letters
var guessedLetters = [];
// Set open array for positions
var positions = [];
// Set guesses left to zero
var guessesLeft = 10;
// Set global letter variable
var letter = "";
// Set win counter
var wins = 0;
// Set loss counter
var losses = 0;
// Target word-blanks h3 element and store in variable
var targetWordBlanks = document.getElementById("word-blanks");
// DEFINE ALL FUNCTIONS
// Define function to set up the game: choose and present hidden word
function startGame() {
    for (var i=0; i < wordToGuess.length; i++) {
        wordToGuessArr.push("_");
    }
    var str = wordToGuessArr.join(" ");
    targetWordBlanks.innerHTML = str;
};
// Play game: if/else deciding if guess = letter in wordToGuess
startGame();
document.onkeyup = makeGuess;
function makeGuess() {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        var eventLetter = String.fromCharCode(event.keyCode);
        var letter = eventLetter.toLowerCase();
        checkGuess(letter);
    };
};

function checkGuess(letter) {
// Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < wordToGuess.length; i++) {
        if(wordToGuess[i] === letter) {
            positions.push(i);
            console.log(positions[i]);
        };
    };
// if there are no indicies, remove a guess and update the hangman image
    if (positions.length > 0) {
        correctGuess();
    } else {
        incorrectGuess();
    };
};

function correctGuess() {
    for(var i = 0; i < positions.length; i++) {
        wordToGuess[positions[i]] = letter;
        console.log(letter);
    };
};

function incorrectGuess() {
    guessesLeft = guessesLeft--;
    console.log("Guesses left: " + guessesLeft);
};

// // Finish game: reset game and counter up wins or losses when word is finished or tries run out
