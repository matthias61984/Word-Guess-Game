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

// Sets wordToGuess variable globally accessible
var wordToGuess;
// Set empty array that will contain the current word
var wordToGuessArr = [];
// Defines empty array that will hold wrong letters
var wrongLetters = [];
// Set guesses left to zero
var guessesLeft = 8;
// Define empty array to hold win check
var winArray = [];
// Set win counter
var wins = 0;
// Set loss counter
var losses = 0;
// Target word-blanks element and store in variable
var targetWordBlanks = document.getElementById("word-blanks");
// Target guesses-left element and store in variable
var targetGuessesLeft = document.getElementById("guesses-left");
// Target wrong-guesses element and store in variable
var targetWrongGuesses = document.getElementById("wrong-guesses");
// Target loss-counter element and store in variable
var targetLossCounter = document.getElementById("loss-counter");
// Target win-counter element and store in variable
var targetWinCounter = document.getElementById("win-counter");

// DEFINE ALL FUNCTIONS

// Define function to set up the game: choose and present hidden word
function startGame() {
    wordToGuess = wordBank[Math.floor(Math.random()*wordBank.length)];
    for (var i=0; i < wordToGuess.length; i++) {
        wordToGuessArr.push("_");
    };
    var str = wordToGuessArr.join(" ");
    targetWordBlanks.innerHTML = str;
    console.log(wordToGuess);
};
startGame();

// When a letter key is pressed
document.onkeyup = makeGuess;
function makeGuess() {
    if (event.keyCode >= 65 && event.keyCode <= 90 ) {
        var eventLetter = String.fromCharCode(event.keyCode);
        var letter = eventLetter.toLowerCase();
        checkGuess(letter);
    };
};

// What to do when letter is wrong
function wrongGuess(letter) {
    wrongLetters.push(letter);
    guessesLeft--;
    targetWrongGuesses.innerHTML = wrongLetters;
    targetGuessesLeft.innerHTML = guessesLeft;
    if (guessesLeft < 0) {
        alert("You burned it!");
        losses++;
        targetLossCounter.innerHTML = losses;
        wordToGuessArr = [];
        wrongLetters = [];
        targetWrongGuesses.innerHTML = wrongLetters;
        guessesLeft = 8;
        targetGuessesLeft.innerHTML = guessesLeft;
        startGame();
    };
};

// Check for win conditions and reset the game
function checkWin() {
    if (winArray.length == wordToGuessArr.length) {
        alert("Fantastic, you CAN cook!");
        wins++;
        targetWinCounter.innerHTML = wins;
        wordToGuessArr = [];
        wrongLetters = [];
        winArray = [];
        targetWrongGuesses.innerHTML = wrongLetters;
        guessesLeft = 8;
        targetGuessesLeft.innerHTML = guessesLeft;
        startGame();
    };
};

// Check the letter to see if it's in the word
function checkGuess(letter) {
    if (wrongLetters.includes(letter) == true || wordToGuessArr.includes(letter) == true) {
        alert("You already guessed that letter, you donkey!");
    } else if (wordToGuess.includes(letter) == true) {
        for (var i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === letter) {
                wordToGuessArr[i] = letter;
                var displayLetter = wordToGuessArr.join(" ");
                targetWordBlanks.innerHTML = displayLetter;
                winArray.push(letter);
            };
        };
    } else if (wordToGuess.includes(letter) == false) {
        wrongGuess(letter);
    };
    checkWin();
};